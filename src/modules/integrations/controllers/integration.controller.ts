import { Response } from 'express';
import { IntegrationService } from '../services/integration.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';

export class IntegrationController {
  private service: IntegrationService;

  constructor() {
    this.service = new IntegrationService();
  }

  private getCompanyId(req: AuthRequest): string {
    if (!req.user?.companyId) {
      throw new AppError('Company ID is required', 400);
    }
    return req.user.companyId;
  }

  public getIntegrations = async (req: AuthRequest, res: Response) => {
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

      const result = await this.service.getIntegrations({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as string,
        status: status as 'active' | 'inactive',
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

  public getIntegrationById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const integration = await this.service.getIntegrationById(id);
      res.status(HttpStatus.OK).json({ status: 'success', data: integration });
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

  public createIntegration = async (req: AuthRequest, res: Response) => {
    try {
      const companyId = this.getCompanyId(req);
      const integration = await this.service.createIntegration({
        ...req.body,
        companyId,
      });
      res.status(HttpStatus.CREATED).json({ status: 'success', data: integration });
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

  public updateIntegration = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const integration = await this.service.updateIntegration(id, req.body);
      res.status(HttpStatus.OK).json({ status: 'success', data: integration });
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

  public deleteIntegration = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.deleteIntegration(id);
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

  public getIntegrationLogs = async (req: AuthRequest, res: Response) => {
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

      const result = await this.service.getIntegrationLogs(id, {
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        type: type as string,
        status: status as 'active' | 'inactive',
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