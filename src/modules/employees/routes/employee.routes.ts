import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const employeeController = new EmployeeController();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management operations
 */

// Validation schemas
const createEmployeeSchema = z.object({
  body: z.object({
    employeeId: z.string().min(1, 'Employee ID is required'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().optional(),
    department: z.string().min(2, 'Department must be at least 2 characters'),
    position: z.string().min(2, 'Position must be at least 2 characters'),
    status: z.string().min(2, 'Status must be at least 2 characters'),
    hireDate: z.string().transform((str) => new Date(str)),
    terminationDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
    salary: z.number().positive('Salary must be a positive number'),
    emergencyContact: z.record(z.any()).optional(),
    address: z.record(z.any()).optional(),
    bankDetails: z.record(z.any()).optional(),
    taxInfo: z.record(z.any()).optional(),
    benefits: z.record(z.any()).optional(),
    managerId: z.string().uuid().optional(),
    companyId: z.string().uuid('Company ID must be a valid UUID'),
  }),
});

const updateEmployeeSchema = z.object({
  body: z.object({
    employeeId: z.string().optional(),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    department: z.string().min(2).optional(),
    position: z.string().min(2).optional(),
    status: z.string().min(2).optional(),
    hireDate: z.string().transform((str) => new Date(str)).optional(),
    terminationDate: z.string().transform((str) => new Date(str)).optional(),
    salary: z.number().positive().optional(),
    emergencyContact: z.record(z.any()).optional(),
    address: z.record(z.any()).optional(),
    bankDetails: z.record(z.any()).optional(),
    taxInfo: z.record(z.any()).optional(),
    benefits: z.record(z.any()).optional(),
    managerId: z.string().uuid().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    search: z.string().optional(),
    department: z.string().optional(),
    position: z.string().optional(),
    status: z.string().optional(),
    sortBy: z.enum(['firstName', 'lastName', 'email', 'department', 'position', 'hireDate']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

// Public routes
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of all employees
 *     tags: [Employees]
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 */
router.get(
  '/',
  authenticate,
  validateRequest(paginationSchema),
  employeeController.getEmployees.bind(employeeController)
);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 */
router.get(
  '/:id',
  authenticate,
  employeeController.getEmployeeById.bind(employeeController)
);

// Protected routes
/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeInput'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 */
router.post(
  '/',
  authenticate,
  authorize('write:employees'),
  validateRequest(createEmployeeSchema),
  employeeController.createEmployee.bind(employeeController)
);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeInput'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 */
router.put(
  '/:id',
  authenticate,
  authorize('write:employees'),
  validateRequest(updateEmployeeSchema),
  employeeController.updateEmployee.bind(employeeController)
);

/**
 * @swagger
 * /employees/{id}/manager:
 *   get:
 *     summary: Get an employee's manager
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: Employee's manager retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 */
router.get(
  '/:id/manager',
  authenticate,
  employeeController.getEmployeeManager.bind(employeeController)
);

/**
 * @swagger
 * /employees/{id}/direct-reports:
 *   get:
 *     summary: Get an employee's direct reports
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: Employee's direct reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 */
router.get(
  '/:id/direct-reports',
  authenticate,
  employeeController.getEmployeeDirectReports.bind(employeeController)
);

export default router; 