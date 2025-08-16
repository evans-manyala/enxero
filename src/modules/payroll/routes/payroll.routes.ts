import { Router } from 'express';
import { PayrollController } from '../controllers/payroll.controller';
import { PayrollService } from '../services/payroll.service';
import { PrismaClient } from '@prisma/client';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { z } from 'zod';
import { authenticate } from '../../../shared/middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();
const payrollService = new PayrollService(prisma);
const payrollController = new PayrollController(payrollService);

// Validation schemas
const payrollConfigSchema = z.object({
  body: z.object({
    payFrequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
    payDay: z.number().min(1).max(31),
    taxSettings: z.any(),
    deductions: z.array(z.any()),
    allowances: z.array(z.any()),
  }),
});

const payrollPeriodSchema = z.object({
  body: z.object({
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
    status: z.enum(['DRAFT', 'PROCESSED', 'APPROVED', 'PAID']).default('DRAFT'),
  }),
});

const payrollRecordSchema = z.object({
  body: z.object({
    employeeId: z.string(),
    periodId: z.string(),
    payPeriodStart: z.string().transform((str) => new Date(str)),
    payPeriodEnd: z.string().transform((str) => new Date(str)),
    grossSalary: z.number(),
    totalDeductions: z.number(),
    netSalary: z.number(),
    workingDays: z.number(),
    deductions: z.any(),
    allowances: z.any(),
    status: z.enum(['DRAFT', 'PROCESSED', 'APPROVED', 'PAID']).default('DRAFT'),
  }),
});

const payrollRecordUpdateSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    employeeId: z.string(),
    periodId: z.string(),
    payPeriodStart: z.string().transform((str) => new Date(str)),
    payPeriodEnd: z.string().transform((str) => new Date(str)),
    grossSalary: z.number(),
    totalDeductions: z.number(),
    netSalary: z.number(),
    workingDays: z.number(),
    deductions: z.any(),
    allowances: z.any(),
    status: z.enum(['DRAFT', 'PROCESSED', 'APPROVED', 'PAID']).default('DRAFT'),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
  }),
});

/**
 * @swagger
 * tags:
 *   name: Payroll
 *   description: Payroll management operations
 */

/**
 * @swagger
 * /payroll/config:
 *   get:
 *     summary: Retrieve payroll configuration for the current company
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payroll configuration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollConfig'
 */
router.get(
  '/config',
  authenticate,
  validateRequest(paginationSchema),
  payrollController.getPayrollConfig
);

/**
 * @swagger
 * /payroll/config:
 *   post:
 *     summary: Create payroll configuration for the company
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayrollConfig'
 *     responses:
 *       201:
 *         description: Payroll config created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollConfig'
 */
router.post(
  '/config',
  authenticate,
  validateRequest(payrollConfigSchema),
  payrollController.createPayrollConfig
);

/**
 * @swagger
 * /payroll/config/{id}:
 *   put:
 *     summary: Update payroll configuration
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollConfig UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayrollConfig'
 *     responses:
 *       200:
 *         description: Payroll config updated successfully
 */
router.put(
  '/config/:id',
  authenticate,
  validateRequest(payrollConfigSchema),
  payrollController.updatePayrollConfig
);

/**
 * @swagger
 * /payroll/periods:
 *   get:
 *     summary: Retrieve a list of payroll periods
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (open, closed, processed)
 *     responses:
 *       200:
 *         description: List of payroll periods
 */
router.get(
  '/periods',
  authenticate,
  validateRequest(paginationSchema),
  payrollController.listPayrollPeriods
);

/**
 * @swagger
 * /payroll/periods:
 *   post:
 *     summary: Create a new payroll period
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayrollPeriod'
 *     responses:
 *       201:
 *         description: Payroll period created successfully
 */
router.post(
  '/periods',
  authenticate,
  validateRequest(payrollPeriodSchema),
  payrollController.createPayrollPeriod
);

/**
 * @swagger
 * /payroll/periods/{id}:
 *   get:
 *     summary: Get payroll period by ID
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollPeriod UUID
 *     responses:
 *       200:
 *         description: Payroll period details
 */
router.get(
  '/periods/:id',
  authenticate,
  payrollController.getPayrollPeriod
);

/**
 * @swagger
 * /payroll/periods/{id}/process:
 *   post:
 *     summary: Process payroll for a period
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollPeriod UUID
 *     responses:
 *       200:
 *         description: Payroll processed successfully
 */
router.post(
  '/periods/:id/process',
  authenticate,
  payrollController.processPayroll
);

/**
 * @swagger
 * /payroll/periods/{id}/approve:
 *   post:
 *     summary: Approve payroll for a period
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollPeriod UUID
 *     responses:
 *       200:
 *         description: Payroll approved successfully
 */
router.post(
  '/periods/:id/approve',
  authenticate,
  payrollController.approvePayroll
);

/**
 * @swagger
 * /payroll/records:
 *   get:
 *     summary: Retrieve a list of payroll records for the company
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: periodId
 *         schema:
 *           type: string
 *         description: Filter by payroll period
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         description: Filter by employee
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (pending, processed, paid)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of payroll records
 */
router.get(
  '/records',
  authenticate,
  validateRequest(paginationSchema),
  payrollController.listPayrollRecords
);

/**
 * @swagger
 * /payroll/records:
 *   post:
 *     summary: Create a new payroll record
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayrollRecord'
 *     responses:
 *       201:
 *         description: Payroll record created successfully
 */
router.post(
  '/records',
  authenticate,
  validateRequest(payrollRecordSchema),
  payrollController.createPayrollRecord
);

/**
 * @swagger
 * /payroll/records/{id}:
 *   get:
 *     summary: Get payroll record by ID
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollRecord UUID
 *     responses:
 *       200:
 *         description: Payroll record details
 */
router.get(
  '/records/:id',
  authenticate,
  payrollController.getPayrollRecord
);

/**
 * @swagger
 * /payroll/records/{id}:
 *   put:
 *     summary: Update payroll record by ID
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollRecord UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayrollRecord'
 *     responses:
 *       200:
 *         description: Payroll record updated successfully
 */
router.put(
  '/records/:id',
  authenticate,
  validateRequest(payrollRecordUpdateSchema),
  payrollController.updatePayrollRecord
);

/**
 * @swagger
 * /payroll/employee/{employeeId}/period/{periodId}:
 *   get:
 *     summary: Get payroll details for an employee in a specific period
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee UUID
 *       - in: path
 *         name: periodId
 *         schema:
 *           type: string
 *         required: true
 *         description: PayrollPeriod UUID
 *     responses:
 *       200:
 *         description: Payroll details for the employee and period
 */
router.get(
  '/employee/:employeeId/period/:periodId',
  authenticate,
  payrollController.getEmployeePayroll
);

export default router; 