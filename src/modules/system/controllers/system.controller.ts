import { Request, Response } from 'express';
import { SystemService } from '../services/system.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';

export class SystemController {
  private systemService: SystemService;

  constructor() {
    this.systemService = new SystemService();
  }

  public async getConfigs(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, search, isActive } = req.query;
      const result = await this.systemService.getConfigs({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        isActive: isActive === 'true',
      });
      res.json({ status: 'success', data: result.data, meta: result.meta });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch system configurations',
        });
      }
    }
  }

  public async getConfigByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const config = await this.systemService.getConfigByKey(key);
      res.json({ status: 'success', data: config });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch system configuration',
        });
      }
    }
  }

  public async createConfig(req: Request, res: Response) {
    try {
      const { key, value, description } = req.body;
      const config = await this.systemService.createConfig({
        key,
        value,
        description,
      });
      res.status(HttpStatus.CREATED).json({ status: 'success', data: config });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to create system configuration',
        });
      }
    }
  }

  public async updateConfig(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const { value, description, isActive } = req.body;
      const config = await this.systemService.updateConfig(key, {
        value,
        description,
        isActive,
      });
      res.json({ status: 'success', data: config });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to update system configuration',
        });
      }
    }
  }

  public async getLogs(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, level } = req.query;
      const result = await this.systemService.getLogs({
        page: Number(page),
        limit: Number(limit),
        level: level as string,
      });
      res.json({ status: 'success', data: result.data, meta: result.meta });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch system logs',
        });
      }
    }
  }
} 