import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';

type PayrollConfig = {
  id: string;
  companyId: string;
  payFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  payDay: number;
  taxSettings: Prisma.JsonValue;
  deductions: Prisma.JsonValue[];
  allowances: Prisma.JsonValue[];
  createdAt: Date;
  updatedAt: Date;
};

type PayrollPeriod = {
  id: string;
  companyId: string;
  startDate: Date;
  endDate: Date;
  status: 'DRAFT' | 'PROCESSED' | 'APPROVED' | 'PAID';
  createdAt: Date;
  updatedAt: Date;
  records?: PayrollRecord[];
};

type PayrollRecord = {
  id: string;
  companyId: string;
  employeeId: string;
  periodId: string;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  grossSalary: Prisma.Decimal;
  totalDeductions: Prisma.Decimal;
  netSalary: Prisma.Decimal;
  workingDays: number;
  deductions: Prisma.JsonValue;
  allowances: Prisma.JsonValue;
  status: 'DRAFT' | 'PROCESSED' | 'APPROVED' | 'PAID';
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  employee?: any;
  period?: any;
};

export class PayrollService {
  constructor(private prisma: PrismaClient) {}

  async getPayrollConfig(companyId: string): Promise<PayrollConfig | null> {
    const config = await this.prisma.payrollConfig.findFirst({
      where: { companyId },
    });
    return config as PayrollConfig | null;
  }

  async getPayrollPeriod(companyId: string, periodId: string) {
    const period = await this.prisma.payrollPeriod.findFirst({
      where: {
        companyId,
        id: periodId,
      },
      include: {
        records: {
          include: {
            employee: true,
          },
        },
      },
    });
    return period as PayrollPeriod | null;
  }

  async getEmployeePayroll(employeeId: string, periodId: string) {
    const payroll = await this.prisma.payrollRecord.findFirst({
      where: {
        employeeId,
        periodId,
      },
    });
    return payroll as PayrollRecord | null;
  }

  async updatePayrollConfig(id: string, data: Partial<PayrollConfig>): Promise<PayrollConfig> {
    const config = await this.prisma.payrollConfig.update({
      where: { id },
      data: data as any,
    });
    return config as PayrollConfig;
  }

  async processPayroll(periodId: string, companyId: string): Promise<PayrollPeriod> {
    const period = await this.prisma.payrollPeriod.findFirst({
      where: { id: periodId, companyId },
      include: {
        records: true,
      },
    });

    if (!period) {
      throw new AppError('Payroll period not found', 404);
    }

    if (period.status !== 'DRAFT') {
      throw new AppError('Payroll period is not in draft status', 400);
    }

    // Calculate totals and update records
    await Promise.all(
      period.records.map(async (record) => {
        const total = Number(record.grossSalary) - Number(record.totalDeductions);
        return this.prisma.payrollRecord.update({
          where: { id: record.id },
          data: {
            netSalary: total,
            status: 'PROCESSED',
            processedAt: new Date(),
          },
        });
      })
    );

    // Update period status
    const updatedPeriod = await this.prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'PROCESSED',
      },
      include: {
        records: true,
      },
    });
    return updatedPeriod as PayrollPeriod;
  }

  async createPayrollConfig(data: Partial<PayrollConfig>): Promise<PayrollConfig> {
    const config = await this.prisma.payrollConfig.create({
      data: data as any,
    });
    return config as PayrollConfig;
  }

  async listPayrollPeriods(
    companyId: string,
    options: { page: number; limit: number; [key: string]: any }
  ) {
    const { page, limit, ...filters } = options;
    const skip = (page - 1) * limit;

    const [periods, total] = await Promise.all([
      this.prisma.payrollPeriod.findMany({
        where: { companyId, ...filters },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          records: true,
        },
      }),
      this.prisma.payrollPeriod.count({
        where: { companyId, ...filters },
      }),
    ]);

    return {
      data: periods as PayrollPeriod[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createPayrollPeriod(data: Partial<PayrollPeriod>): Promise<PayrollPeriod> {
    const period = await this.prisma.payrollPeriod.create({
      data: data as any,
      include: {
        records: true,
      },
    });
    return period as PayrollPeriod;
  }

  async listPayrollRecords(
    companyId: string,
    options: { page: number; limit: number; [key: string]: any }
  ) {
    const { page, limit, ...filters } = options;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      this.prisma.payrollRecord.findMany({
        where: { companyId, ...filters },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          employee: true,
          period: true,
        },
      }),
      this.prisma.payrollRecord.count({
        where: { companyId, ...filters },
      }),
    ]);

    return {
      data: records as PayrollRecord[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPayrollRecord(id: string, companyId: string): Promise<PayrollRecord | null> {
    const record = await this.prisma.payrollRecord.findFirst({
      where: { id, companyId },
      include: {
        employee: true,
        period: true,
      },
    });
    return record as PayrollRecord | null;
  }

  async createPayrollRecord(data: Partial<PayrollRecord>): Promise<PayrollRecord> {
    const record = await this.prisma.payrollRecord.create({
      data: data as any,
      include: {
        employee: true,
        period: true,
      },
    });
    return record as PayrollRecord;
  }

  async updatePayrollRecord(id: string, data: Partial<PayrollRecord>): Promise<PayrollRecord> {
    const record = await this.prisma.payrollRecord.update({
      where: { id },
      data: data as any,
      include: {
        employee: true,
        period: true,
      },
    });
    return record as PayrollRecord;
  }

  async approvePayroll(periodId: string, companyId: string): Promise<PayrollPeriod> {
    const period = await this.prisma.payrollPeriod.findFirst({
      where: { id: periodId, companyId },
      include: {
        records: true,
      },
    });

    if (!period) {
      throw new AppError('Payroll period not found', 404);
    }

    if (period.status !== 'PROCESSED') {
      throw new AppError('Payroll period is not in processed status', 400);
    }

    // Update records status
    await Promise.all(
      period.records.map((record) =>
        this.prisma.payrollRecord.update({
          where: { id: record.id },
          data: {
            status: 'APPROVED',
          },
        })
      )
    );

    // Update period status
    const updatedPeriod = await this.prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'APPROVED',
      },
      include: {
        records: true,
      },
    });
    return updatedPeriod as PayrollPeriod;
  }
} 