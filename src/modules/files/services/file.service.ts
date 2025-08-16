import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.resolve(__dirname, '../../../../uploads');

interface ListFilesOptions {
  page: number;
  limit: number;
  search?: string;
  entityType?: string;
  entityId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UploadFileData {
  file: Express.Multer.File;
  description?: string;
  tags?: string[];
  entityType?: string;
  entityId?: string;
}

export class FileService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  }

  public async listFiles(options: ListFilesOptions) {
    try {
      const { page, limit, search, entityType, entityId, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;
      const where: Prisma.filesWhereInput = {
        AND: [
          search ? { filename: { contains: search, mode: Prisma.QueryMode.insensitive } } : {},
          entityType ? { entityType } : {},
          entityId ? { entityId } : {},
        ],
      };
      const [files, total] = await Promise.all([
        this.prisma.files.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        }),
        this.prisma.files.count({ where }),
      ]);
      return {
        data: files,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in listFiles service:', error);
      throw new AppError('Failed to fetch files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getFileMetadata(id: string) {
    try {
      const file = await this.prisma.files.findUnique({ where: { id } });
      if (!file) {
        throw new AppError('File not found', HttpStatus.NOT_FOUND);
      }
      return file;
    } catch (error) {
      logger.error('Error in getFileMetadata service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch file metadata', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async downloadFile(id: string) {
    try {
      const file = await this.prisma.files.findUnique({ where: { id } });
      if (!file) {
        throw new AppError('File not found', HttpStatus.NOT_FOUND);
      }
      const filePath = path.join(UPLOAD_DIR, file.storageName);
      if (!fs.existsSync(filePath)) {
        throw new AppError('File not found on disk', HttpStatus.NOT_FOUND);
      }
      return fs.createReadStream(filePath);
    } catch (error) {
      logger.error('Error in downloadFile service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to download file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async uploadFile(data: UploadFileData) {
    try {
      const { file, description, tags, entityType, entityId } = data;
      if (!file) {
        throw new AppError('No file uploaded', HttpStatus.BAD_REQUEST);
      }
      const storageName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(UPLOAD_DIR, storageName);
      fs.writeFileSync(filePath, file.buffer);
      const created = await this.prisma.files.create({
        data: {
          filename: file.originalname,
          storageName,
          mimetype: file.mimetype,
          size: file.size,
          description,
          tags,
          entityType,
          entityId,
        },
      });
      return created;
    } catch (error) {
      logger.error('Error in uploadFile service:', error);
      throw new AppError('Failed to upload file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteFile(id: string) {
    try {
      const file = await this.prisma.files.findUnique({ where: { id } });
      if (!file) {
        throw new AppError('File not found', HttpStatus.NOT_FOUND);
      }
      const filePath = path.join(UPLOAD_DIR, file.storageName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await this.prisma.files.delete({ where: { id } });
    } catch (error) {
      logger.error('Error in deleteFile service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 