import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';
import { v4 as uuidv4 } from 'uuid';

interface ListNotificationsOptions {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  status?: 'unread' | 'read';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  userId?: string;
}

interface SendNotificationData {
  userId: string;
  type: string;
  message: string;
  data?: Record<string, any>;
  title?: string;
  category?: string;
  companyId?: string;
}

export class NotificationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async listNotifications(options: ListNotificationsOptions) {
    try {
      const { page, limit, search, type, status, sortBy, sortOrder, userId } = options;
      const skip = (page - 1) * limit;
      const where: Prisma.notificationsWhereInput = {
        AND: [
          userId ? { userId } : {},
          search ? { message: { contains: search, mode: Prisma.QueryMode.insensitive } } : {},
          type ? { type } : {},
          status ? { isRead: status === 'read' } : {},
        ],
      };
      const [notifications, total] = await Promise.all([
        this.prisma.notifications.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        }),
        this.prisma.notifications.count({ where }),
      ]);
      return {
        data: notifications,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in listNotifications service:', error);
      throw new AppError('Failed to fetch notifications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async markAsRead(id: string, userId?: string) {
    try {
      const notification = await this.prisma.notifications.findUnique({ where: { id } });
      if (!notification || (userId && notification.userId !== userId)) {
        throw new AppError('Notification not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.notifications.update({
        where: { id },
        data: { isRead: true },
      });
    } catch (error) {
      logger.error('Error in markAsRead service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to mark notification as read', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteNotification(id: string, userId?: string) {
    try {
      const notification = await this.prisma.notifications.findUnique({ where: { id } });
      if (!notification || (userId && notification.userId !== userId)) {
        throw new AppError('Notification not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.notifications.delete({ where: { id } });
    } catch (error) {
      logger.error('Error in deleteNotification service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async sendNotification(data: SendNotificationData) {
    try {
      if (!data.companyId) {
        throw new AppError('Company ID is required', HttpStatus.BAD_REQUEST);
      }
      
      const notification = await this.prisma.notifications.create({
        data: {
          id: uuidv4(),
          userId: data.userId,
          type: data.type,
          message: data.message,
          data: data.data,
          isRead: false,
          title: data.title || 'Notification',
          category: data.category || 'general',
          companyId: data.companyId,
        },
      });
      return notification;
    } catch (error) {
      logger.error('Error in sendNotification service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new AppError('Invalid company ID or user ID', HttpStatus.BAD_REQUEST);
        }
      }
      throw new AppError('Failed to send notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 