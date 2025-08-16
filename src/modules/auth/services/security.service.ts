import { PrismaClient, User, FailedLoginAttempt, UserSession, UserActivity } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import env from '../../../config/environment';

export class SecurityService {
  private prisma: PrismaClient;
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private readonly SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Track a failed login attempt and check if account should be locked
   */
  async trackFailedLoginAttempt(email: string, ipAddress?: string, userAgent?: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    // Create failed attempt record
    await this.prisma.failedLoginAttempt.create({
      data: {
        email,
        ipAddress,
        userAgent,
        userId: user?.id,
      },
    });

    // Check if account should be locked
    if (user) {
      const recentAttempts = await this.prisma.failedLoginAttempt.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: new Date(Date.now() - this.LOCKOUT_DURATION),
          },
        },
      });

      if (recentAttempts >= this.MAX_FAILED_ATTEMPTS) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            accountStatus: 'LOCKED',
            deactivatedAt: new Date(),
            deactivationReason: 'Too many failed login attempts',
          },
        });
      }
    }
  }

  /**
   * Check if an account is locked
   */
  async isAccountLocked(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { accountStatus: true, deactivatedAt: true },
    });

    if (!user) return false;

    if (user.accountStatus === 'LOCKED' && user.deactivatedAt) {
      const lockoutEnd = new Date(user.deactivatedAt.getTime() + this.LOCKOUT_DURATION);
      if (new Date() < lockoutEnd) {
        return true;
      } else {
        // Auto-unlock after lockout duration
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            accountStatus: 'ACTIVE',
            deactivatedAt: null,
            deactivationReason: null,
          },
        });
        return false;
      }
    }

    return false;
  }

  /**
   * Create a new user session
   */
  async createSession(userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<UserSession> {
    // Ensure token is unique by deleting any existing session with the same token
    await this.prisma.userSession.deleteMany({ where: { token } });
    return this.prisma.userSession.create({
      data: {
        userId,
        token,
        ipAddress,
        userAgent,
        expiresAt: new Date(Date.now() + this.SESSION_EXPIRY),
      },
    });
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<UserSession[]> {
    return this.prisma.userSession.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Invalidate a specific session
   */
  async invalidateSession(token: string): Promise<void> {
    await this.prisma.userSession.delete({
      where: { token },
    });
  }

  /**
   * Invalidate all sessions for a user
   */
  async invalidateAllSessions(userId: string): Promise<void> {
    await this.prisma.userSession.deleteMany({
      where: { userId },
    });
  }

  /**
   * Track user activity
   */
  async trackActivity(
    userId: string,
    action: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data: {
        userId,
        action,
        metadata,
        ipAddress,
        userAgent,
      },
    });
  }

  /**
   * Get recent activities for a user
   */
  async getUserActivities(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<UserActivity[]> {
    return this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Clean up expired sessions and old failed attempts
   */
  async cleanupOldRecords(): Promise<void> {
    const now = new Date();

    // Delete expired sessions
    await this.prisma.userSession.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });

    // Delete old failed attempts (older than 24 hours)
    await this.prisma.failedLoginAttempt.deleteMany({
      where: {
        createdAt: {
          lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }
} 