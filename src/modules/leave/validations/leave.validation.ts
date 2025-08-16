import { z } from 'zod';

export const leaveTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  maxDays: z.number().min(1),
  accrualRate: z.number().min(0).max(1),
  isPaid: z.boolean().default(true),
  requiresApproval: z.boolean().default(true),
});

export const leaveRequestSchema = z.object({
  body: z.object({
    typeId: z.string().uuid(),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    notes: z.string().min(1),
    attachments: z.array(z.string().uuid()).optional(),
  }),
});

export const updateLeaveRequestSchema = z.object({
  body: z.object({
    typeId: z.string().uuid().optional(),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }).optional(),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }).optional(),
    notes: z.string().min(1).optional(),
    status: z.string().optional(),
    attachments: z.array(z.string().uuid()).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const approveLeaveSchema = z.object({
  notes: z.string().optional(),
});

export const rejectLeaveSchema = z.object({
  notes: z.string().min(1),
}); 