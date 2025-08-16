import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const companyController = new CompanyController();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management operations
 */

// Validation schemas
const createCompanySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    identifier: z.string().optional(),
    fullName: z.string().optional(),
    shortName: z.string().optional(),
    workPhone: z.string().optional(),
    city: z.string().optional(),
    address: z.record(z.any()).optional(),
    settings: z.record(z.any()).optional(),
  }),
});

const updateCompanySchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    identifier: z.string().optional(),
    fullName: z.string().optional(),
    shortName: z.string().optional(),
    workPhone: z.string().optional(),
    city: z.string().optional(),
    address: z.record(z.any()).optional(),
    settings: z.record(z.any()).optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const companyInviteSchema = z.object({
  body: z.object({
    email: z.string().email(),
    roleId: z.string().uuid(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Public routes
/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get a list of all companies
 *     tags: [Companies]
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
 *         description: List of companies retrieved successfully
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
 *                     $ref: '#/components/schemas/Company'
 */
router.get('/', authenticate, companyController.getCompanies.bind(companyController));

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company to retrieve
 *     responses:
 *       200:
 *         description: Company retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 */
router.get('/:id', authenticate, companyController.getCompanyById.bind(companyController));

// Protected routes
/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompanyInput'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 */
router.post(
  '/',
  authenticate,
  authorize('write:all'),
  validateRequest(createCompanySchema),
  companyController.createCompany.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompanyInput'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 */
router.put(
  '/:id',
  authenticate,
  authorize('write:all'),
  validateRequest(updateCompanySchema),
  companyController.updateCompany.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company to delete
 *     responses:
 *       204:
 *         description: Company deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, insufficient permissions
 *       404:
 *         description: Company not found
 */
router.delete(
  '/:id',
  authenticate,
  authorize('write:all'),
  companyController.deleteCompany.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}/invite:
 *   post:
 *     summary: Invite a user to a company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInviteInput'
 *     responses:
 *       200:
 *         description: User invited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     inviteId:
 *                       type: string
 *                       format: uuid
 */
router.post(
  '/:id/invite',
  authenticate,
  authorize('write:all'),
  validateRequest(companyInviteSchema),
  companyController.inviteUser.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}/members:
 *   get:
 *     summary: Get all members of a company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company
 *     responses:
 *       200:
 *         description: Company members retrieved successfully
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
 *                     $ref: '#/components/schemas/User'
 */
router.get(
  '/:id/members',
  authenticate,
  companyController.getCompanyMembers.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}/settings:
 *   get:
 *     summary: Get company settings
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company
 *     responses:
 *       200:
 *         description: Company settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 */
router.get(
  '/:id/settings',
  authenticate,
  companyController.getCompanySettings.bind(companyController)
);

/**
 * @swagger
 * /companies/{id}/settings:
 *   put:
 *     summary: Update company settings
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               settings:
 *                 type: object
 *     responses:
 *       200:
 *         description: Company settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 */
router.put(
  '/:id/settings',
  authenticate,
  authorize('write:all'),
  companyController.updateCompanySettings.bind(companyController)
);

export default router; 