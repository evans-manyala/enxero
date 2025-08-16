import { Request, Response, NextFunction } from 'express';
import { PayrollService } from '../services/payroll.service';
import { catchAsync } from '../../../shared/utils/catch-async';
import { AppError } from '../../../shared/utils/AppError';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';

export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  private getCompanyId(req: AuthRequest): string {
    if (!req.user?.companyId) {
      throw new AppError('Company ID is required', 400);
    }
    return req.user.companyId;
  }

  getPayrollConfig = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const config = await this.payrollService.getPayrollConfig(companyId);
      res.json(config);
    } catch (error) {
      next(error);
    }
  };

  createPayrollConfig = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const config = await this.payrollService.createPayrollConfig({
        ...req.body,
        companyId,
      });
      res.status(201).json(config);
    } catch (error) {
      next(error);
    }
  };

  updatePayrollConfig = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const config = await this.payrollService.updatePayrollConfig(id, req.body);
      res.json(config);
    } catch (error) {
      next(error);
    }
  };

  listPayrollPeriods = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { page, limit, ...filters } = req.query;
      const periods = await this.payrollService.listPayrollPeriods(companyId, {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        ...filters,
      });
      res.json(periods);
    } catch (error) {
      next(error);
    }
  };

  createPayrollPeriod = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const period = await this.payrollService.createPayrollPeriod({
        ...req.body,
        companyId,
      });
      res.status(201).json(period);
    } catch (error) {
      next(error);
    }
  };

  getPayrollPeriod = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { id } = req.params;
      const period = await this.payrollService.getPayrollPeriod(companyId, id);
      if (!period) {
        throw new AppError('Payroll period not found', 404);
      }
      res.json(period);
    } catch (error) {
      next(error);
    }
  };

  processPayroll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { id } = req.params;
      const period = await this.payrollService.processPayroll(id, companyId);
      res.json(period);
    } catch (error) {
      next(error);
    }
  };

  approvePayroll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { id } = req.params;
      const period = await this.payrollService.approvePayroll(id, companyId);
      res.json(period);
    } catch (error) {
      next(error);
    }
  };

  listPayrollRecords = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { page, limit, ...filters } = req.query;
      const records = await this.payrollService.listPayrollRecords(companyId, {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        ...filters,
      });
      res.json(records);
    } catch (error) {
      next(error);
    }
  };

  getPayrollRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const { id } = req.params;
      const record = await this.payrollService.getPayrollRecord(id, companyId);
      if (!record) {
        throw new AppError('Payroll record not found', 404);
      }
      res.json(record);
    } catch (error) {
      next(error);
    }
  };

  createPayrollRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const companyId = this.getCompanyId(req);
      const record = await this.payrollService.createPayrollRecord({
        ...req.body,
        companyId,
      });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  };

  updatePayrollRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const record = await this.payrollService.updatePayrollRecord(id, req.body);
      res.json(record);
    } catch (error) {
      next(error);
    }
  };

  getEmployeePayroll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { employeeId, periodId } = req.params;
      const payroll = await this.payrollService.getEmployeePayroll(employeeId, periodId);
      if (!payroll) {
        throw new AppError('Payroll record not found', 404);
      }
      res.json(payroll);
    } catch (error) {
      next(error);
    }
  };
} 