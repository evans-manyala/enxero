import { Router } from 'express';
import { AuditController } from '../controllers/audit.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const auditController = new AuditController();

/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Audit trail management
 */

// Validation schemas
const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    search: z.string().optional(),
    action: z.string().optional(),
    entityType: z.string().optional(),
    entityId: z.string().optional(),
    userId: z.string().optional(),
    startDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    endDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  }),
});

// Protected routes
/**
 * @swagger
 * /audit/logs:
 *   get:
 *     summary: Get audit logs
 *     tags: [Audit]
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
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter by action
 *       - in: query
 *         name: entityType
 *         schema:
 *           type: string
 *         description: Filter by entity type
 *       - in: query
 *         name: entityId
 *         schema:
 *           type: string
 *         description: Filter by entity ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: List of audit logs
 */
router.get(
  '/logs',
  authenticate,
  authorize('read:all'),
  validateRequest(paginationSchema),
  auditController.getLogs.bind(auditController)
);

/**
 * @swagger
 * /audit/logs/{id}:
 *   get:
 *     summary: Get audit log by ID
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Audit log ID
 *     responses:
 *       200:
 *         description: Audit log details
 */
router.get(
  '/logs/:id',
  authenticate,
  authorize('read:all'),
  auditController.getLogById.bind(auditController)
);

/**
 * @swagger
 * /audit/logs/entity/{entityType}/{entityId}:
 *   get:
 *     summary: Get audit logs for an entity
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityType
 *         schema:
 *           type: string
 *         required: true
 *         description: Entity type
 *       - in: path
 *         name: entityId
 *         schema:
 *           type: string
 *         required: true
 *         description: Entity ID
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
 *         description: List of audit logs for the entity
 */
router.get(
  '/logs/entity/:entityType/:entityId',
  authenticate,
  authorize('read:all'),
  validateRequest(paginationSchema),
  auditController.getEntityLogs.bind(auditController)
);

export default router; 