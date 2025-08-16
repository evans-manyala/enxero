import { Router } from 'express';
import { IntegrationController } from '../controllers/integration.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const controller = new IntegrationController();

// Validation schemas
const createIntegrationSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  config: z.record(z.any()),
  status: z.enum(['active', 'inactive']).default('active'),
});

const updateIntegrationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: z.string().min(1).max(50).optional(),
  config: z.record(z.any()).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

const paginationSchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  search: z.string().optional(),
  type: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  sortBy: z.enum(['name', 'type', 'status', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

const paramsSchema = z.object({ id: z.string().uuid() });

// Wrap schemas for validateRequest
const queryPaginationSchema = z.object({ query: paginationSchema });
const bodyCreateIntegrationSchema = z.object({ body: createIntegrationSchema });
const bodyUpdateIntegrationSchema = z.object({ 
  body: updateIntegrationSchema,
  params: paramsSchema
});
const queryPaginationWithParamsSchema = z.object({ 
  query: paginationSchema,
  params: paramsSchema
});

/**
 * @swagger
 * tags:
 *   name: Integrations
 *   description: Third-party integrations management
 */

/**
 * @swagger
 * /integrations:
 *   get:
 *     summary: Retrieve a list of integrations for the company
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of integrations
 */
router.get(
  '/',
  authenticate,
  validateRequest(queryPaginationSchema),
  controller.getIntegrations
);

/**
 * @swagger
 * /integrations/{id}:
 *   get:
 *     summary: Retrieve a specific integration by its ID
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Integration UUID
 *     responses:
 *       200:
 *         description: Integration details
 */
router.get(
  '/:id',
  authenticate,
  controller.getIntegrationById
);

/**
 * @swagger
 * /integrations:
 *   post:
 *     summary: Create a new integration
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Integration'
 *     responses:
 *       201:
 *         description: Integration created successfully
 */
router.post(
  '/',
  authenticate,
  validateRequest(bodyCreateIntegrationSchema),
  controller.createIntegration
);

/**
 * @swagger
 * /integrations/{id}:
 *   put:
 *     summary: Update an integration
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Integration UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Integration'
 *     responses:
 *       200:
 *         description: Integration updated successfully
 */
router.put(
  '/:id',
  authenticate,
  validateRequest(bodyUpdateIntegrationSchema),
  controller.updateIntegration
);

/**
 * @swagger
 * /integrations/{id}:
 *   delete:
 *     summary: Delete an integration
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Integration UUID
 *     responses:
 *       200:
 *         description: Integration deleted successfully
 */
router.delete(
  '/:id',
  authenticate,
  controller.deleteIntegration
);

/**
 * @swagger
 * /integrations/{id}/logs:
 *   get:
 *     summary: Retrieve logs for a specific integration
 *     tags: [Integrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Integration UUID
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
 *         description: Filter by status (success, error)
 *     responses:
 *       200:
 *         description: List of integration logs
 */
router.get(
  '/:id/logs',
  authenticate,
  validateRequest(queryPaginationWithParamsSchema),
  controller.getIntegrationLogs
);

export default router; 