import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';

interface GetConfigsOptions {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
}

interface CreateConfigData {
  key: string;
  value: any;
  description?: string;
}

interface UpdateConfigData {
  value?: any;
  description?: string;
  isActive?: boolean;
}

interface GetLogsOptions {
  page: number;
  limit: number;
  level?: string;
}

export class SystemService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getConfigs(options: GetConfigsOptions) {
    try {
      const { page, limit, search, isActive } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.SystemConfigWhereInput = {
        AND: [
          search
            ? {
                key: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              }
            : {},
          isActive !== undefined ? { isActive } : {},
        ],
      };

      const [configs, total] = await Promise.all([
        this.prisma.systemConfig.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.systemConfig.count({ where }),
      ]);

      return {
        data: configs,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getConfigs service:', error);
      throw new AppError(
        'Failed to fetch system configurations',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getConfigByKey(key: string) {
    try {
      const config = await this.prisma.systemConfig.findUnique({
        where: { key },
      });

      if (!config) {
        throw new AppError('Configuration not found', HttpStatus.NOT_FOUND);
      }

      return config;
    } catch (error) {
      logger.error('Error in getConfigByKey service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch system configuration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createConfig(data: CreateConfigData) {
    try {
      const config = await this.prisma.systemConfig.create({
        data: {
          key: data.key,
          value: data.value,
          description: data.description,
        },
      });

      return config;
    } catch (error) {
      logger.error('Error in createConfig service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(
            'Configuration with this key already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to create system configuration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateConfig(key: string, data: UpdateConfigData) {
    try {
      const config = await this.prisma.systemConfig.update({
        where: { key },
        data: {
          value: data.value,
          description: data.description,
          isActive: data.isActive,
        },
      });

      return config;
    } catch (error) {
      logger.error('Error in updateConfig service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Configuration not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new AppError(
        'Failed to update system configuration',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getLogs(options: GetLogsOptions) {
    try {
      const { page, limit, level } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.SystemLogWhereInput = {
        level: level ? { equals: level } : undefined,
      };

      const [logs, total] = await Promise.all([
        this.prisma.systemLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.systemLog.count({ where }),
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
      logger.error('Error in getLogs service:', error);
      throw new AppError(
        'Failed to fetch system logs',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 