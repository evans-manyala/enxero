import { PrismaClient } from '@prisma/client';
import logger from '../shared/utils/logger';

const prisma = new PrismaClient();

async function checkPasswordHistory() {
  try {
    const userId = 'a7e84a51-46bf-49eb-a205-8c9dde7d9eb2';
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        passwordHistory: true
      }
    });

    logger.info('Password history check result:', {
      found: !!user,
      userId: user?.id,
      email: user?.email,
      rawPasswordHistory: user?.passwordHistory
    });

  } catch (error) {
    logger.error('Error checking password history:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPasswordHistory(); 