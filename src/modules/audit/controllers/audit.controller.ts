import { Request, Response } from 'express';
import { AuditService } from '../services/audit.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';

export class AuditController {
  private auditService: AuditService;

  constructor() {
    this.auditService = new AuditService();
  }

  public async getLogs(req: Request, res: Response) {
    try {
      const {
        page = 1,
        limit = 10,
        action,
        entityType,
        entityId,
        userId,
        startDate,
        endDate,
      } = req.query;

      const result = await this.auditService.getLogs({
        page: Number(page),
        limit: Number(limit),
        action: action as string,
        entityType: entityType as string,
        entityId: entityId as string,
        userId: userId as string,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });

      res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch audit logs',
        });
      }
    }
  }

  public async getLogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const log = await this.auditService.getLogById(id);
      res.json({ status: 'success', data: log });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch audit log',
        });
      }
    }
  }

  public async getEntityLogs(req: Request, res: Response) {
    try {
      const { entityType, entityId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const result = await this.auditService.getEntityLogs({
        entityType,
        entityId,
        page: Number(page),
        limit: Number(limit),
      });

      res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to fetch entity audit logs',
        });
      }
    }
  }
} 