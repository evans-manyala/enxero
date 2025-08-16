import { PrismaClient } from '@prisma/client';
import logger from '../shared/utils/logger';

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const userId = 'a7e84a51-46bf-49eb-a205-8c9dde7d9eb2';
    
    // Check user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        passwordHistory: true,
        lastPasswordChange: true,
        role: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    logger.info('User check result:', {
      found: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        username: user.username,
        isActive: user.isActive,
        hasPasswordHistory: !!user.passwordHistory,
        lastPasswordChange: user.lastPasswordChange,
        role: user.role
      } : null
    });

  } catch (error) {
    logger.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 