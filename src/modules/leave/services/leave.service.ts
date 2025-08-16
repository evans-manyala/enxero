import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';

const prisma = new PrismaClient();

export class LeaveService {
  async listLeaveTypes(companyId: string) {
    return prisma.leaveType.findMany({
      where: { companyId },
    });
  }

  async createLeaveType(data: any) {
    return prisma.leaveType.create({
      data,
    });
  }

  async updateLeaveType(id: string, data: any) {
    return prisma.leaveType.update({
      where: { id },
      data,
    });
  }

  async listLeaveRequests(companyId: string, options: { page: number; limit: number; [key: string]: any }) {
    const { page, limit, ...filters } = options;
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where: { companyId, ...filters },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          employee: true,
          type: true,
        },
      }),
      prisma.leaveRequest.count({
        where: { companyId, ...filters },
      }),
    ]);

    return {
      data: requests,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getLeaveRequest(id: string, companyId: string) {
    return prisma.leaveRequest.findFirst({
      where: { id, companyId },
      include: {
        employee: true,
        type: true,
      },
    });
  }

  async createLeaveRequest(data: any) {
    const { employeeId, typeId, startDate, endDate } = data;

    // Check leave balance
    const balance = await prisma.leaveBalance.findFirst({
      where: { employeeId, typeId },
    });

    if (!balance) {
      throw new AppError('Leave balance not found', 404);
    }

    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    if (balance.remainingDays < days) {
      throw new AppError('Insufficient leave balance', 400);
    }

    // Create leave request with default status
    const request = await prisma.leaveRequest.create({
      data: {
        ...data,
        status: 'PENDING',
      },
      include: {
        employee: true,
        type: true,
      },
    });

    // Update leave balance
    await prisma.leaveBalance.update({
      where: { id: balance.id },
      data: {
        usedDays: balance.usedDays + days,
        remainingDays: balance.remainingDays - days,
      },
    });

    return request;
  }

  async updateLeaveRequest(id: string, data: any) {
    return prisma.leaveRequest.update({
      where: { id },
      data,
      include: {
        employee: true,
        type: true,
      },
    });
  }

  async approveLeaveRequest(id: string, data: any) {
    const { approverId, notes } = data;

    const request = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: true,
        type: true,
      },
    });

    if (!request) {
      throw new AppError('Leave request not found', 404);
    }

    if (request.status !== 'PENDING') {
      throw new AppError('Leave request is not in pending status', 400);
    }

    return prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approverId,
        approvalNotes: notes,
        approvedAt: new Date(),
      },
      include: {
        employee: true,
        type: true,
      },
    });
  }

  async rejectLeaveRequest(id: string, data: any) {
    const { approverId, notes } = data;

    const request = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: true,
        type: true,
      },
    });

    if (!request) {
      throw new AppError('Leave request not found', 404);
    }

    if (request.status !== 'PENDING') {
      throw new AppError('Leave request is not in pending status', 400);
    }

    // Restore leave balance
    const balance = await prisma.leaveBalance.findFirst({
      where: {
        employeeId: request.employeeId,
        typeId: request.typeId,
      },
    });

    if (balance) {
      const days = Math.ceil(
        (new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      await prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          usedDays: balance.usedDays - days,
          remainingDays: balance.remainingDays + days,
        },
      });
    }

    return prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        approverId,
        rejectionNotes: notes,
        rejectedAt: new Date(),
      },
      include: {
        employee: true,
        type: true,
      },
    });
  }

  async getLeaveBalance(employeeId: string, companyId: string) {
    const balances = await prisma.leaveBalance.findMany({
      where: { employeeId },
      include: {
        type: true,
      },
    });

    return balances;
  }

  async deleteLeaveRequest(id: string, companyId: string) {
    const request = await prisma.leaveRequest.findFirst({
      where: { id, companyId },
      include: {
        employee: true,
        type: true,
      },
    });

    if (!request) {
      throw new AppError('Leave request not found', 404);
    }

    // Only allow deletion of pending requests
    if (request.status !== 'PENDING') {
      throw new AppError('Cannot delete non-pending leave request', 400);
    }

    await prisma.leaveRequest.delete({
      where: { id },
    });
  }
} 