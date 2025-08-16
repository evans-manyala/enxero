import { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class FileController {
  private service: FileService;

  constructor() {
    this.service = new FileService();
  }

  public listFiles = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, search, entityType, entityId, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const result = await this.service.listFiles({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        entityType: entityType as string,
        entityId: entityId as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });
      res.status(HttpStatus.OK).json({ 
        status: 'success', 
        data: result.data,
        meta: result.meta 
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public getFileMetadata = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const file = await this.service.getFileMetadata(id);
      res.status(HttpStatus.OK).json({ status: 'success', data: file });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public downloadFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const fileStream = await this.service.downloadFile(id);
      if (!fileStream) {
        throw new AppError('File not found', HttpStatus.NOT_FOUND);
      }
      fileStream.pipe(res);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public uploadFile = async (req: Request, res: Response) => {
    try {
      const mReq = req as MulterRequest;
      const file = mReq.file;
      if (!file) {
        throw new AppError('No file uploaded', HttpStatus.BAD_REQUEST);
      }
      const { description, tags, entityType, entityId } = req.body;
      const uploaded = await this.service.uploadFile({ file, description, tags, entityType, entityId });
      res.status(HttpStatus.CREATED).json({ status: 'success', data: uploaded });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  public deleteFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.deleteFile(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };
} 