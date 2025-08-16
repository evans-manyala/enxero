import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate } from '../../../shared/middlewares/auth.middleware';
import multer from 'multer';
import { z } from 'zod';

const router = Router();
const controller = new FileController();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const uploadSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    entityType: z.string().optional(),
    entityId: z.string().optional(),
  }),
});

const fileIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    search: z.string().optional(),
    entityType: z.string().optional(),
    entityId: z.string().optional(),
    sortBy: z.enum(['filename', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload, download, and metadata management
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Retrieve a paginated list of files with optional filtering and sorting
 *     tags: [Files]
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
 *         description: Search term for filename
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
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (filename, createdAt)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort direction (asc, desc)
 *     responses:
 *       200:
 *         description: List of files
 */
router.get(
  '/',
  authenticate,
  validateRequest(paginationSchema),
  controller.listFiles
);

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Retrieve metadata for a specific file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: File UUID
 *     responses:
 *       200:
 *         description: File metadata
 */
router.get(
  '/:id',
  authenticate,
  validateRequest(fileIdSchema),
  controller.getFileMetadata
);

/**
 * @swagger
 * /files/{id}/download:
 *   get:
 *     summary: Download a specific file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: File UUID
 *     responses:
 *       200:
 *         description: File stream
 */
router.get(
  '/:id/download',
  authenticate,
  validateRequest(fileIdSchema),
  controller.downloadFile
);

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a new file with optional metadata
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               entityType:
 *                 type: string
 *               entityId:
 *                 type: string
 *     responses:
 *       201:
 *         description: File uploaded successfully
 */
router.post(
  '/upload',
  authenticate,
  upload.single('file') as any,
  controller.uploadFile
);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a specific file and its metadata
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: File UUID
 *     responses:
 *       204:
 *         description: File deleted successfully
 */
router.delete(
  '/:id',
  authenticate,
  validateRequest(fileIdSchema),
  controller.deleteFile
);

export default router; 