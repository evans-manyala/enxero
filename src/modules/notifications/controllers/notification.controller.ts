import { Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';

export class NotificationController {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  public listNotifications = async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 10, search, type, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const result = await this.service.listNotifications({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as string,
        status: status as 'unread' | 'read',
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
        userId: req.user?.id,
      });
      res.status(HttpStatus.OK).json({ status: 'success', data: result.data, meta: result.meta });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public markAsRead = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.markAsRead(id, req.user?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public deleteNotification = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.deleteNotification(id, req.user?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public sendNotification = async (req: AuthRequest, res: Response) => {
    try {
      const { type, message, data } = req.body;
      const userId = req.user?.id;
      const companyId = req.user?.companyId;
      
      if (!userId) {
        throw new AppError('User ID is required', HttpStatus.BAD_REQUEST);
      }
      
      if (!companyId) {
        throw new AppError('Company ID is required', HttpStatus.BAD_REQUEST);
      }
      
      const notification = await this.service.sendNotification({ userId, type, message, data, companyId });
      res.status(HttpStatus.CREATED).json({ status: 'success', data: notification });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };
} 