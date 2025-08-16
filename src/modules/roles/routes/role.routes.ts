import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { z } from 'zod';

const router = Router();
const roleController = new RoleController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management operations
 */

const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Role name must be at least 2 characters'),
    description: z.string().optional(),
    permissions: z.array(z.string()),
  }),
});

const updateRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Role name must be at least 2 characters').optional(),
    description: z.string().optional(),
    permissions: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

// Public routes
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get a list of all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles retrieved successfully
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
 *                     $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', roleController.getRoles.bind(roleController));

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the role to retrieve
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', roleController.getRoleById.bind(roleController));

// Protected routes (Admin only)
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleInput'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, validation error or role already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden, insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', 
  authenticate, 
  authorize('write:all'), 
  validateRequest(createRoleSchema), 
  roleController.createRole.bind(roleController)
);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleInput'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, validation error or role name conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden, insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', 
  authenticate, 
  authorize('write:all'), 
  validateRequest(updateRoleSchema), 
  roleController.updateRole.bind(roleController)
);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the role to delete
 *     responses:
 *       204:
 *         description: Role deleted successfully (No Content)
 *       400:
 *         description: Bad request, role assigned to users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden, insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', 
  authenticate, 
  authorize('write:all'), 
  roleController.deleteRole.bind(roleController)
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Role ID
 *         name:
 *           type: string
 *           description: Role name
 *         description:
 *           type: string
 *           description: Role description
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: List of permissions associated with the role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Role creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     CreateRoleInput:
 *       type: object
 *       required:
 *         - name
 *         - permissions
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Name of the role
 *         description:
 *           type: string
 *           description: Optional description of the role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: List of permissions for the role
 *     UpdateRoleInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: New name for the role
 *         description:
 *           type: string
 *           description: New description for the role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: New list of permissions for the role
 */ 