import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }
    return PrismaService.instance;
  }

  getClient(): PrismaClient {
    return PrismaService.getInstance();
  }
} 