import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';

interface GetIntegrationsOptions {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  status?: 'active' | 'inactive';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface CreateIntegrationData {
  name: string;
  type: string;
  config: Record<string, any>;
  status: 'active' | 'inactive';
  companyId: string;
}

interface UpdateIntegrationData {
  name?: string;
  type?: string;
  config?: Record<string, any>;
  status?: 'active' | 'inactive';
}

export class IntegrationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getIntegrations(options: GetIntegrationsOptions) {
    try {
      const { page, limit, search, type, status, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.IntegrationWhereInput = {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
                  { type: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
              }
            : {},
          type ? { type } : {},
          status ? { status } : {},
        ],
      };

      const [integrations, total] = await Promise.all([
        this.prisma.integration.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        this.prisma.integration.count({ where }),
      ]);

      return {
        data: integrations,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getIntegrations service:', error);
      throw new AppError(
        'Failed to fetch integrations',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getIntegrationById(id: string) {
    try {
      const integration = await this.prisma.integration.findUnique({
        where: { id },
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          logs: {
            take: 10,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!integration) {
        throw new AppError('Integration not found', HttpStatus.NOT_FOUND);
      }

      return integration;
    } catch (error) {
      logger.error('Error in getIntegrationById service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch integration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createIntegration(data: CreateIntegrationData) {
    try {
      const integration = await this.prisma.integration.create({
        data,
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return integration;
    } catch (error) {
      logger.error('Error in createIntegration service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(
            'Integration with this name already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to create integration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateIntegration(id: string, data: UpdateIntegrationData) {
    try {
      const integration = await this.prisma.integration.update({
        where: { id },
        data,
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return integration;
    } catch (error) {
      logger.error('Error in updateIntegration service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Integration not found', HttpStatus.NOT_FOUND);
        }
        if (error.code === 'P2002') {
          throw new AppError(
            'Integration with this name already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to update integration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteIntegration(id: string) {
    try {
      await this.prisma.integration.delete({
        where: { id },
      });
    } catch (error) {
      logger.error('Error in deleteIntegration service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Integration not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new AppError(
        'Failed to delete integration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getIntegrationLogs(id: string, options: GetIntegrationsOptions) {
    try {
      const { page, limit, search, type, status, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;

      // First check if integration exists
      const integration = await this.prisma.integration.findUnique({
        where: { id },
      });

      if (!integration) {
        throw new AppError('Integration not found', HttpStatus.NOT_FOUND);
      }

      const where: Prisma.IntegrationLogWhereInput = {
        integrationId: id,
        AND: [
          search
            ? {
                OR: [
                  { message: { contains: search, mode: Prisma.QueryMode.insensitive } },
                  { type: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
              }
            : {},
          type ? { type } : {},
          status ? { status } : {},
        ],
      };

      const [logs, total] = await Promise.all([
        this.prisma.integrationLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        }),
        this.prisma.integrationLog.count({ where }),
      ]);

      return {
        data: logs,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getIntegrationLogs service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch integration logs',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 