import { Request, Response } from 'express';
import { UserService, PaginationParams } from '../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
        });
      }

      const profile = await this.userService.getProfile(userId);
      return res.json({
        status: 'success',
        data: profile,
      });
    } catch (error: any) {
      console.error('getProfile error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
        });
      }

      const { 
        firstName, 
        lastName, 
        phoneNumber, 
        avatar,
        bio,
        preferences,
        language,
        timezone
      } = req.body;

      const updatedProfile = await this.userService.updateProfile(userId, {
        firstName,
        lastName,
        phoneNumber,
        avatar,
        bio,
        preferences,
        language,
        timezone
      });

      return res.json({
        status: 'success',
        data: updatedProfile,
      });
    } catch (error: any) {
      console.error('updateProfile error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
        });
      }

      const { currentPassword, newPassword } = req.body;
      const result = await this.userService.changePassword(userId, currentPassword, newPassword);

      return res.json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('changePassword error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { page, limit, search } = req.query;
      const paginationParams: PaginationParams = {
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
      };

      const result = await this.userService.getUsers(paginationParams);
      return res.json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('getUsers error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      return res.json({
        status: 'success',
        data: user,
      });
    } catch (error: any) {
      console.error('getUserById error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { roleId, isActive } = req.body;
      const updatedUser = await this.userService.updateUser(id, { roleId, isActive });
      return res.json({
        status: 'success',
        data: updatedUser,
      });
    } catch (error: any) {
      console.error('updateUser error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateAccountStatus(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({
          status: 'error',
          message: 'User ID is required',
        });
      }

      const { status, reason } = req.body;
      const updatedUser = await this.userService.updateAccountStatus(userId, status, reason);
      return res.json({
        status: 'success',
        data: updatedUser,
      });
    } catch (error: any) {
      console.error('updateAccountStatus error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getPasswordHistory(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
        });
      }
      const result = await this.userService.getPasswordHistory(userId);
      res.json({ status: 'success', data: result });
    } catch (error: any) {
      console.error('getPasswordHistory error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async toggleUserActiveStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (typeof isActive !== 'boolean') {
        return res.status(400).json({
          status: 'error',
          message: 'isActive status (boolean) is required',
        });
      }

      const result = await this.userService.toggleUserActiveStatus(id, isActive);
      return res.json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('toggleUserActiveStatus error:', error);
      return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
} 