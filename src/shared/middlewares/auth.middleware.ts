import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import env from '../../config/environment';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roleId: string;
    companyId?: string;
    email: string;
    role: {
      name: string;
      permissions: string[];
    };
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Support both old and new token formats
    const decoded = jwt.verify(token, env.JWT_SECRET) as { 
      id?: string; 
      userId?: string; 
      roleId?: string; 
      type?: string;
    };

    // Handle old token format
    if (decoded.type === 'access') {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { 
          id: true, 
          roleId: true, 
          companyId: true, 
          email: true,
          isActive: true,
          role: {
            select: {
              name: true,
              permissions: true,
            },
          },
        },
      });

      if (!user || !user.isActive || !user.role) {
        throw new AppError('User not found or inactive', 401);
      }

      req.user = {
        id: user.id,
        roleId: user.roleId!,
        companyId: user.companyId!,
        email: user.email,
        role: {
          name: user.role.name,
          permissions: user.role.permissions,
        },
      };

      return next();
    }

    // Handle new token format
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        roleId: true,
        companyId: true,
        isActive: true,
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
      },
    });

    if (!user || !user.isActive || !user.role) {
      throw new AppError('User not found or inactive', 401);
    }

    req.user = {
      id: user.id,
      roleId: user.roleId!,
      companyId: user.companyId!,
      email: user.email,
      role: {
        name: user.role.name,
        permissions: user.role.permissions,
      },
    };

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...permissions: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.roleId) {
        throw new AppError('User not authenticated', 401);
      }

      // Get user's role and permissions
      const role = await prisma.role.findUnique({
        where: { id: req.user.roleId },
        select: { permissions: true },
      });

      if (!role) {
        throw new AppError('Role not found', 401);
      }

      // Check if user has required permissions
      const hasPermission = permissions.every((permission) =>
        role.permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new AppError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        next(error);
      } else {
        next(new AppError('Authorization failed', 403));
      }
    }
  };
}; 