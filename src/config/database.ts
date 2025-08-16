import { PrismaClient } from '@prisma/client';
import env from './environment';

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;