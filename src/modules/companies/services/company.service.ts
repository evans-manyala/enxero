import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';

interface GetCompaniesOptions {
  page: number;
  limit: number;
  search?: string;
}

interface CreateCompanyData {
  name: string;
  identifier?: string;
  fullName?: string;
  shortName?: string;
  workPhone?: string;
  city?: string;
  address?: Record<string, any>;
  settings?: Record<string, any>;
}

interface UpdateCompanyData {
  name?: string;
  identifier?: string;
  fullName?: string;
  shortName?: string;
  workPhone?: string;
  city?: string;
  address?: Record<string, any>;
  settings?: Record<string, any>;
  isActive?: boolean;
}

interface InviteUserData {
  email: string;
  roleId: string;
  firstName: string;
  lastName: string;
}

export class CompanyService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCompanies(options: GetCompaniesOptions) {
    try {
      const { page, limit, search } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.CompanyWhereInput = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                identifier: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const [companies, total] = await Promise.all([
        this.prisma.company.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: {
                users: true,
                employees: true,
              },
            },
          },
        }),
        this.prisma.company.count({ where }),
      ]);

      return {
        data: companies,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getCompanies service:', error);
      throw new AppError(
        'Failed to fetch companies',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCompanyById(id: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              users: true,
              employees: true,
            },
          },
        },
      });

      if (!company) {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }

      return company;
    } catch (error) {
      logger.error('Error in getCompanyById service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch company',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createCompany(data: CreateCompanyData) {
    try {
      const company = await this.prisma.company.create({
        data: {
          ...data,
          settings: data.settings || {},
          address: data.address || {},
        },
      });

      return company;
    } catch (error) {
      logger.error('Error in createCompany service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError(
          'Company with this identifier already exists',
          HttpStatus.CONFLICT
        );
      }
      throw new AppError(
        'Failed to create company',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateCompany(id: string, data: UpdateCompanyData) {
    try {
      const company = await this.prisma.company.update({
        where: { id },
        data: {
          ...data,
          settings: data.settings
            ? { ...data.settings }
            : undefined,
          address: data.address
            ? { ...data.address }
            : undefined,
        },
      });

      return company;
    } catch (error) {
      logger.error('Error in updateCompany service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Company not found', HttpStatus.NOT_FOUND);
        }
        if (error.code === 'P2002') {
          throw new AppError(
            'Company with this identifier already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to update company',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async inviteUser(companyId: string, data: InviteUserData) {
    try {
      const { email, roleId, firstName, lastName } = data;

      // Check if company exists
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }

      // Check if role exists
      const role = await this.prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        throw new AppError('Role not found', HttpStatus.NOT_FOUND);
      }

      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AppError(
          'User with this email already exists',
          HttpStatus.CONFLICT
        );
      }

      // Create user with company association
      const user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          username: email.split('@')[0],
          password: '', // Will be set when user accepts invitation
          companyId,
          roleId,
          emailVerified: false,
        },
      });

      // TODO: Send invitation email

      return {
        userId: user.id,
        email: user.email,
        status: 'invited',
      };
    } catch (error) {
      logger.error('Error in inviteUser service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to invite user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCompanyMembers(companyId: string) {
    try {
      const members = await this.prisma.user.findMany({
        where: { companyId },
        include: {
          role: true,
          employee: true,
        },
      });

      return members;
    } catch (error) {
      logger.error('Error in getCompanyMembers service:', error);
      throw new AppError(
        'Failed to fetch company members',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCompanySettings(companyId: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
        select: { settings: true },
      });

      if (!company) {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }

      return company.settings;
    } catch (error) {
      logger.error('Error in getCompanySettings service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch company settings',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateCompanySettings(
    companyId: string,
    settings: Record<string, any>
  ) {
    try {
      const company = await this.prisma.company.update({
        where: { id: companyId },
        data: {
          settings: {
            ...settings,
          },
        },
        select: { settings: true },
      });

      return company.settings;
    } catch (error) {
      logger.error('Error in updateCompanySettings service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }
      throw new AppError(
        'Failed to update company settings',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteCompany(id: string) {
    try {
      // Check if company exists
      const company = await this.prisma.company.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              users: true,
              employees: true,
            },
          },
        },
      });

      if (!company) {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }

      // Check if company has associated users or employees
      if (company._count.users > 0 || company._count.employees > 0) {
        throw new AppError(
          'Cannot delete company with associated users or employees',
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.company.delete({
        where: { id },
      });
    } catch (error) {
      logger.error('Error in deleteCompany service:', error);
      if (error instanceof AppError) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new AppError('Company not found', HttpStatus.NOT_FOUND);
      }
      throw new AppError(
        'Failed to delete company',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 