import { Response } from 'express';
import { LeaveService } from '../services/leave.service';
import { catchAsync } from '../../../shared/utils/catch-async';
import { AppError } from '../../../shared/utils/AppError';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LeaveController {
  private leaveService: LeaveService;

  constructor() {
    this.leaveService = new LeaveService();
  }

  private getCompanyId(req: AuthRequest): string {
    if (!req.user?.companyId) {
      throw new AppError('Company ID is required', 400);
    }
    return req.user.companyId;
  }

  listLeaveTypes = catchAsync(async (req: AuthRequest, res: Response) => {
    const companyId = this.getCompanyId(req);
    const types = await this.leaveService.listLeaveTypes(companyId);
    res.json(types);
  });

  createLeaveType = catchAsync(async (req: AuthRequest, res: Response) => {
    const companyId = this.getCompanyId(req);
    const type = await this.leaveService.createLeaveType({
      ...req.body,
      companyId,
    });
    res.status(201).json(type);
  });

  updateLeaveType = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    const type = await this.leaveService.updateLeaveType(id, {
      ...req.body,
      companyId,
    });
    res.json(type);
  });

  listLeaveRequests = catchAsync(async (req: AuthRequest, res: Response) => {
    const companyId = this.getCompanyId(req);
    const { page = 1, limit = 10, ...filters } = req.query;
    const requests = await this.leaveService.listLeaveRequests(companyId, {
      page: Number(page),
      limit: Number(limit),
      ...filters,
    });
    res.json({ status: 'success', data: requests.data, meta: requests.meta });
  });

  getLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    const request = await this.leaveService.getLeaveRequest(id, companyId);
    if (!request) {
      throw new AppError('Leave request not found', 404);
    }
    res.json({ status: 'success', data: request });
  });

  createLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const companyId = this.getCompanyId(req);
    
    // Manual validation
    const { typeId, startDate, endDate, notes } = req.body;
    if (!typeId || !startDate || !endDate || !notes) {
      throw new AppError('Missing required fields: typeId, startDate, endDate, notes', 400);
    }
    
    // Get the employee record for the authenticated user
    const employee = await prisma.employee.findFirst({
      where: { userId: req.user!.id, companyId },
    });
    
    if (!employee) {
      throw new AppError('Employee record not found for user', 400);
    }
    
    const request = await this.leaveService.createLeaveRequest({
      ...req.body,
      companyId,
      employeeId: employee.id,
    });
    res.status(201).json({ status: 'success', data: request });
  });

  updateLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    const request = await this.leaveService.updateLeaveRequest(id, {
      ...req.body,
      companyId,
    });
    res.json({ status: 'success', data: request });
  });

  deleteLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    await this.leaveService.deleteLeaveRequest(id, companyId);
    res.status(204).send();
  });

  approveLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    const request = await this.leaveService.approveLeaveRequest(id, {
      ...req.body,
      companyId,
      approverId: req.user!.id,
    });
    res.json(request);
  });

  rejectLeaveRequest = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const companyId = this.getCompanyId(req);
    const request = await this.leaveService.rejectLeaveRequest(id, {
      ...req.body,
      companyId,
      approverId: req.user!.id,
    });
    res.json(request);
  });

  getLeaveBalance = catchAsync(async (req: AuthRequest, res: Response) => {
    const companyId = this.getCompanyId(req);
    const balance = await this.leaveService.getLeaveBalance(req.user!.id, companyId);
    res.json(balance);
  });
} 