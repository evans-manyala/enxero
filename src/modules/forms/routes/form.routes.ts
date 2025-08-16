import { Router } from 'express';
import { FormController } from '../controllers/form.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const controller = new FormController();

// Validation schemas
const createFormSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().optional(),
    type: z.string().min(1).max(50),
    fields: z.array(
      z.object({
        name: z.string().min(1).max(100),
        label: z.string().min(1).max(200),
        type: z.string().min(1).max(50),
        required: z.boolean().default(false),
        options: z.array(z.string()).optional(),
        validation: z.record(z.any()).optional(),
      })
    ),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
  }),
});

const updateFormSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    type: z.string().min(1).max(50).optional(),
    fields: z
      .array(
        z.object({
          name: z.string().min(1).max(100),
          label: z.string().min(1).max(200),
          type: z.string().min(1).max(50),
          required: z.boolean().default(false),
          options: z.array(z.string()).optional(),
          validation: z.record(z.any()).optional(),
        })
      )
      .optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
  }),
  params: z.object({ id: z.string().uuid() }),
});

const submitFormSchema = z.object({
  body: z.record(z.any()),
  params: z.object({ id: z.string().uuid() }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    search: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    sortBy: z.enum(['title', 'type', 'status', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

const paginationWithParamsSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    search: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    sortBy: z.enum(['title', 'type', 'status', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
  params: z.object({ id: z.string().uuid() }),
});

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: Dynamic forms management
 */

/**
 * @swagger
 * /forms:
 *   get:
 *     summary: Retrieve a list of forms with pagination and filtering
 *     tags: [Forms]
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
 *         description: Search term for form title
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by form type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (active, inactive)
 *     responses:
 *       200:
 *         description: List of forms
 */
router.get(
  '/',
  authenticate,
  validateRequest(paginationSchema),
  controller.getForms
);

/**
 * @swagger
 * /forms/{id}:
 *   get:
 *     summary: Retrieve a specific form by its ID
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Form UUID
 *     responses:
 *       200:
 *         description: Form details
 */
router.get(
  '/:id',
  authenticate,
  controller.getFormById
);

/**
 * @swagger
 * /forms/{id}/submissions:
 *   get:
 *     summary: Retrieve submissions for a specific form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Form UUID
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
 *         description: List of form submissions
 */
router.get(
  '/:id/submissions',
  authenticate,
  validateRequest(paginationWithParamsSchema),
  controller.getFormSubmissions
);

/**
 * @swagger
 * /forms:
 *   post:
 *     summary: Create a new form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Form'
 *     responses:
 *       201:
 *         description: Form created successfully
 */
router.post(
  '/',
  authenticate,
  validateRequest(createFormSchema),
  controller.createForm
);

/**
 * @swagger
 * /forms/{id}:
 *   patch:
 *     summary: Update a form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Form UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Form'
 *     responses:
 *       200:
 *         description: Form updated successfully
 */
router.patch(
  '/:id',
  authenticate,
  validateRequest(updateFormSchema),
  controller.updateForm
);

/**
 * @swagger
 * /forms/{id}:
 *   delete:
 *     summary: Delete a form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Form UUID
 *     responses:
 *       204:
 *         description: Form deleted successfully
 */
router.delete(
  '/:id',
  authenticate,
  controller.deleteForm
);

/**
 * @swagger
 * /forms/{id}/submit:
 *   post:
 *     summary: Submit a form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Form UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Form submitted successfully
 */
router.post(
  '/:id/submit',
  authenticate,
  validateRequest(submitFormSchema),
  controller.submitForm
);

export default router; 