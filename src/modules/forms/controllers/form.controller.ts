import { Response } from 'express';
import { FormService } from '../services/form.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';

export class FormController {
  private service: FormService;

  constructor() {
    this.service = new FormService();
  }

  private getCompanyId(req: AuthRequest): string {
    if (!req.user?.companyId) {
      throw new AppError('Company ID is required', 400);
    }
    return req.user.companyId;
  }

  public getForms = async (req: AuthRequest, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        type,
        status,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = req.query;

      const result = await this.service.getForms({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as string,
        status: status as 'draft' | 'published' | 'archived',
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });

      res.status(HttpStatus.OK).json({ status: 'success', data: result.data, meta: result.meta });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public getFormById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const form = await this.service.getFormById(id);
      res.status(HttpStatus.OK).json({ status: 'success', data: form });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public createForm = async (req: AuthRequest, res: Response) => {
    try {
      const companyId = this.getCompanyId(req);
      if (!req.user || !req.user.id) {
        throw new AppError('Unauthorized: user not found', HttpStatus.UNAUTHORIZED);
      }
      const form = await this.service.createForm({
        ...req.body,
        companyId,
        userId: req.user.id,
      });
      res.status(HttpStatus.CREATED).json({ status: 'success', data: form });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public updateForm = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const form = await this.service.updateForm(id, req.body);
      res.status(HttpStatus.OK).json({ status: 'success', data: form });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public deleteForm = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.deleteForm(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public submitForm = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (!req.user || !req.user.id) {
        throw new AppError('Unauthorized: user not found', HttpStatus.UNAUTHORIZED);
      }
      const submission = await this.service.submitForm(id, req.body, req.user.id);
      res.status(HttpStatus.CREATED).json({ status: 'success', data: submission });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };

  public getFormSubmissions = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const {
        page = 1,
        limit = 10,
        search,
        type,
        status,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = req.query;

      const result = await this.service.getFormSubmissions(id, {
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as string,
        status: status as 'draft' | 'published' | 'archived',
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });

      res.status(HttpStatus.OK).json({ status: 'success', data: result.data, meta: result.meta });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  };
} 