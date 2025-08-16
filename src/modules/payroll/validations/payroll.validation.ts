import { z } from 'zod';

export const payrollConfigSchema = z.object({
  payFrequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
  taxSettings: z.object({
    taxRate: z.number().min(0).max(100),
    taxThreshold: z.number().min(0),
  }),
  deductions: z.array(z.object({
    name: z.string(),
    amount: z.number().min(0),
    type: z.enum(['FIXED', 'PERCENTAGE']),
  })),
  allowances: z.array(z.object({
    name: z.string(),
    amount: z.number().min(0),
    type: z.enum(['FIXED', 'PERCENTAGE']),
  })),
});

export const payrollPeriodSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  status: z.enum(['DRAFT', 'PROCESSED', 'APPROVED']).default('DRAFT'),
});

export const payrollRecordSchema = z.object({
  employeeId: z.string().uuid(),
  periodId: z.string().uuid(),
  basicSalary: z.number().min(0),
  allowances: z.number().min(0),
  deductions: z.number().min(0),
  total: z.number().min(0),
  status: z.enum(['PENDING', 'PAID']).default('PENDING'),
  paymentDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const processPayrollSchema = z.object({
  periodId: z.string().uuid(),
});

export const approvePayrollSchema = z.object({
  periodId: z.string().uuid(),
}); 