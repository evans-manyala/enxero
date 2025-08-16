import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { AppError } from '../../../shared/utils/AppError';
import logger from '../../../shared/utils/logger';

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  isActive?: boolean;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        avatar: true,
        bio: true,
        preferences: true,
        language: true,
        timezone: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateProfile(userId: string, data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
    bio?: string;
    preferences?: Record<string, any>;
    language?: string;
    timezone?: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        avatar: true,
        bio: true,
        preferences: true,
        language: true,
        timezone: true,
      },
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { 
        password: true,
        passwordHistory: true,
        lastPasswordChange: true
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Check if new password is in password history
    const passwordHistory = user.passwordHistory as { password: string; changedAt: string }[] || [];
    for (const history of passwordHistory) {
      const isPasswordInHistory = await compare(newPassword, history.password);
      if (isPasswordInHistory) {
        throw new AppError('New password cannot be the same as any of your last 5 passwords', 400);
      }
    }

    const hashedPassword = await hash(newPassword, 10);

    // Update password history (keep last 5 passwords)
    const updatedHistory = [
      { password: hashedPassword, changedAt: new Date().toISOString() },
      ...passwordHistory.slice(0, 4)
    ];

    await this.prisma.user.update({
      where: { id: userId },
      data: { 
        password: hashedPassword,
        passwordHistory: updatedHistory,
        lastPasswordChange: new Date()
      },
    });

    return { message: 'Password updated successfully' };
  }

  async updateAccountStatus(userId: string, status: 'active' | 'suspended' | 'deactivated', reason?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updateData: any = {
      accountStatus: status,
      isActive: status === 'active'
    };

    if (status === 'deactivated') {
      updateData.deactivatedAt = new Date();
      updateData.deactivationReason = reason;
    } else if (status === 'active') {
      updateData.deactivatedAt = null;
      updateData.deactivationReason = null;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        accountStatus: true,
        deactivatedAt: true,
        deactivationReason: true,
        isActive: true
      },
    });
  }

  async getPasswordHistory(userId: string) {
    logger.info('getPasswordHistory service - userId received:', { userId });
    
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          isActive: true,
          passwordHistory: true,
          lastPasswordChange: true
        },
      });

      logger.info('User query result:', { 
        found: !!user,
        userId: user?.id,
        email: user?.email,
        isActive: user?.isActive,
        hasPasswordHistory: !!user?.passwordHistory,
        lastPasswordChange: user?.lastPasswordChange,
        rawPasswordHistory: user?.passwordHistory
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Safely handle password history data
      let passwordHistory = [];
      try {
        if (user.passwordHistory) {
          logger.info('Raw password history:', user.passwordHistory);
          const history = Array.isArray(user.passwordHistory) 
            ? user.passwordHistory 
            : JSON.parse(user.passwordHistory as string);
          
          logger.info('Parsed password history:', history);
          passwordHistory = history.map((entry: any) => ({
            changedAt: entry.changedAt
          }));
          logger.info('Final password history:', passwordHistory);
        }
      } catch (error) {
        logger.error('Error parsing password history:', error);
        passwordHistory = [];
      }

      return {
        passwordHistory,
        lastPasswordChange: user.lastPasswordChange
      };
    } catch (error) {
      logger.error('Error in getPasswordHistory:', error);
      throw error;
    }
  }

  async getUsers(params: PaginationParams = {}) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      roleId, 
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;
    
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    // Add search condition if search term is provided
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add role filter if roleId is provided
    if (roleId) {
      where.roleId = roleId;
    }

    // Add active status filter if isActive is provided
    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          isActive: true,
          createdAt: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        avatar: true,
        isActive: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateUser(id: string, data: {
    roleId?: string;
    isActive?: boolean;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (data.roleId) {
      const role = await this.prisma.role.findUnique({
        where: { id: data.roleId },
      });

      if (!role) {
        throw new AppError('Role not found', 404);
      }
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async toggleUserActiveStatus(userId: string, newIsActiveStatus: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, isActive: true, accountStatus: true, deactivatedAt: true, deactivationReason: true },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isActive === newIsActiveStatus) {
      // No change needed, return current status
      return {
        id: user.id,
        isActive: user.isActive,
        accountStatus: user.accountStatus,
        message: `User is already ${newIsActiveStatus ? 'active' : 'inactive'}`
      };
    }

    const newAccountStatus = newIsActiveStatus ? 'active' : 'deactivated';

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: newIsActiveStatus,
        accountStatus: newAccountStatus,
        // Clear deactivation reasons if reactivating
        deactivatedAt: newIsActiveStatus ? null : user.deactivatedAt,
        deactivationReason: newIsActiveStatus ? null : user.deactivationReason,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        accountStatus: true,
        deactivatedAt: true,
        deactivationReason: true,
      },
    });

    return {
      id: updatedUser.id,
      isActive: updatedUser.isActive,
      accountStatus: updatedUser.accountStatus,
      message: `User account has been ${newIsActiveStatus ? 'activated' : 'deactivated'}.`
    };
  }
} 