import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roleId: string;
        email: string;
        role: {
          name: string;
          permissions: string[];
        };
      };
    }
  }
} 