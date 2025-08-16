import { Router } from 'express';
import { LeaveController } from '../controllers/leave.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import {
  leaveTypeSchema,
  leaveRequestSchema,
  updateLeaveRequestSchema,
  approveLeaveSchema,
  rejectLeaveSchema,
} from '../validations/leave.validation';

const router = Router();
const leaveController = new LeaveController();

/**
 * @swagger
 * tags:
 *   name: Leave
 *   description: Leave management operations
 */

/**
 * @swagger
 * /leave/types:
 *   get:
 *     summary: Retrieve a list of leave types for the company
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leave types
 */
router.get(
  '/types',
  authenticate,
  authorize('view:leave_types'),
  leaveController.listLeaveTypes
);

/**
 * @swagger
 * /leave/types:
 *   post:
 *     summary: Create a new leave type
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveType'
 *     responses:
 *       201:
 *         description: Leave type created successfully
 */
router.post(
  '/types',
  authenticate,
  authorize('create:leave_types'),
  validateRequest(leaveTypeSchema),
  leaveController.createLeaveType
);

/**
 * @swagger
 * /leave/types/{id}:
 *   put:
 *     summary: Update a leave type
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: LeaveType UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveType'
 *     responses:
 *       200:
 *         description: Leave type updated successfully
 */
router.put(
  '/types/:id',
  authenticate,
  authorize('update:leave_types'),
  validateRequest(leaveTypeSchema),
  leaveController.updateLeaveType
);

/**
 * @swagger
 * /leave/requests:
 *   get:
 *     summary: Retrieve a list of leave requests with filtering and pagination
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         description: Filter by employee
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (pending, approved, rejected, cancelled)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by leave type
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
 *         description: List of leave requests
 */
router.get(
  '/requests',
  authenticate,
  authorize('view:leave_requests'),
  leaveController.listLeaveRequests
);

/**
 * @swagger
 * /leave/requests/{id}:
 *   get:
 *     summary: Retrieve a specific leave request by ID
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: LeaveRequest UUID
 *     responses:
 *       200:
 *         description: Leave request details
 */
router.get(
  '/requests/:id',
  authenticate,
  authorize('view:leave_requests'),
  leaveController.getLeaveRequest
);

/**
 * @swagger
 * /leave/requests:
 *   post:
 *     summary: Create a new leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveRequest'
 *     responses:
 *       201:
 *         description: Leave request created successfully
 */
router.post(
  '/requests',
  authenticate,
  authorize('create:leave_requests'),
  validateRequest(leaveRequestSchema),
  leaveController.createLeaveRequest
);

/**
 * @swagger
 * /leave/requests/{id}:
 *   put:
 *     summary: Update a leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: LeaveRequest UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveRequest'
 *     responses:
 *       200:
 *         description: Leave request updated successfully
 */
router.put(
  '/requests/:id',
  authenticate,
  authorize('update:leave_requests'),
  validateRequest(updateLeaveRequestSchema),
  leaveController.updateLeaveRequest
);

/**
 * @swagger
 * /requests/{id}:
 *   delete:
 *     summary: Delete a leave request by ID
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the leave request to delete
 *     responses:
 *       204:
 *         description: Leave request deleted successfully
 *       400:
 *         description: Cannot delete non-pending leave request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, insufficient permissions
 *       404:
 *         description: Leave request not found
 */
router.delete(
  '/requests/:id',
  authenticate,
  authorize('delete:leave_requests'),
  leaveController.deleteLeaveRequest
);

// Leave Approval Routes
router.post(
  '/requests/:id/approve',
  authenticate,
  authorize('approve:leave_requests'),
  validateRequest(approveLeaveSchema),
  leaveController.approveLeaveRequest
);

router.post(
  '/requests/:id/reject',
  authenticate,
  authorize('reject:leave_requests'),
  validateRequest(rejectLeaveSchema),
  leaveController.rejectLeaveRequest
);

/**
 * @swagger
 * /leave/balance:
 *   get:
 *     summary: Retrieve leave balances for employees
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         description: Filter by employee
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by year
 *     responses:
 *       200:
 *         description: List of leave balances
 */
router.get(
  '/balance',
  authenticate,
  authorize('view:leave_balance'),
  leaveController.getLeaveBalance
);

export default router; 