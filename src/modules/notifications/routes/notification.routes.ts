import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const controller = new NotificationController();

const notificationIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    search: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(['unread', 'read']).optional(),
    sortBy: z.enum(['createdAt', 'type', 'status']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

const sendNotificationSchema = z.object({
  body: z.object({
    type: z.string().min(1),
    message: z.string().min(1),
    data: z.record(z.any()).optional(),
  }),
});

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications management
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Retrieve a paginated list of notifications with optional filtering and sorting
 *     tags: [Notifications]
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
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for message content
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by notification type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (unread, read)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (createdAt, type, status)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort direction (asc, desc)
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get(
  '/',
  authenticate,
  validateRequest(paginationSchema),
  controller.listNotifications
);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a specific notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification UUID
 *     responses:
 *       204:
 *         description: Notification marked as read
 */
router.patch(
  '/:id/read',
  authenticate,
  validateRequest(notificationIdSchema),
  controller.markAsRead
);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a specific notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification UUID
 *     responses:
 *       204:
 *         description: Notification deleted successfully
 */
router.delete(
  '/:id',
  authenticate,
  validateRequest(notificationIdSchema),
  controller.deleteNotification
);

/**
 * @swagger
 * /notifications/send:
 *   post:
 *     summary: Send a new notification to a specific user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Notification sent successfully
 */
router.post(
  '/send',
  authenticate,
  validateRequest(sendNotificationSchema),
  controller.sendNotification
);

export default router; 