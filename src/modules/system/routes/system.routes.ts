import { Router } from 'express';
import { SystemController } from '../controllers/system.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const systemController = new SystemController();

/**
 * @swagger
 * tags:
 *   name: System
 *   description: System configuration and management
 */

// Validation schemas
const createConfigSchema = z.object({
  body: z.object({
    key: z.string().min(2, 'Key must be at least 2 characters'),
    value: z.any(),
    description: z.string().optional(),
  }),
});

const updateConfigSchema = z.object({
  body: z.object({
    value: z.any(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    key: z.string(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    search: z.string().optional(),
    isActive: z.string().optional().transform(val => val === 'true'),
  }),
});

// Public routes
/**
 * @swagger
 * /system/configs:
 *   get:
 *     summary: Get system configurations
 *     tags: [System]
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
 *     responses:
 *       200:
 *         description: List of system configurations
 */
router.get(
  '/configs',
  authenticate,
  authorize('read:all'),
  validateRequest(paginationSchema),
  systemController.getConfigs.bind(systemController)
);

/**
 * @swagger
 * /system/configs/{key}:
 *   get:
 *     summary: Get system configuration by key
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Configuration key
 *     responses:
 *       200:
 *         description: System configuration details
 */
router.get(
  '/configs/:key',
  authenticate,
  authorize('read:all'),
  systemController.getConfigByKey.bind(systemController)
);

// Protected routes
/**
 * @swagger
 * /system/configs:
 *   post:
 *     summary: Create system configuration
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: object
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: System configuration created
 */
router.post(
  '/configs',
  authenticate,
  authorize('write:all'),
  validateRequest(createConfigSchema),
  systemController.createConfig.bind(systemController)
);

/**
 * @swagger
 * /system/configs/{key}:
 *   put:
 *     summary: Update system configuration
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Configuration key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: object
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: System configuration updated
 */
router.put(
  '/configs/:key',
  authenticate,
  authorize('write:all'),
  validateRequest(updateConfigSchema),
  systemController.updateConfig.bind(systemController)
);

/**
 * @swagger
 * /system/logs:
 *   get:
 *     summary: Get system logs
 *     tags: [System]
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
 *         name: level
 *         schema:
 *           type: string
 *         description: Log level filter
 *     responses:
 *       200:
 *         description: List of system logs
 */
router.get(
  '/logs',
  authenticate,
  authorize('read:all'),
  systemController.getLogs.bind(systemController)
);

export default router; 