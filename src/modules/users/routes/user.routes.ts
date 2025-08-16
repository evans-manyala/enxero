import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware';
import { validateRequest } from '../../../shared/middlewares/validation.middleware';
import { z } from 'zod';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

// Security routes - Moved to top for prioritization
/**
 * @swagger
 * /users/password-history:
 *   get:
 *     summary: Get user password history
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User password history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PasswordHistoryOutput'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/password-history',
  authenticate,
  userController.getPasswordHistory.bind(userController)
);

// Validation schemas
const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phoneNumber: z.string().optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
    preferences: z.record(z.any()).optional(),
    language: z.string().length(2).optional(),
    timezone: z.string().optional(),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    roleId: z.string().uuid().optional(),
    isActive: z.boolean().optional(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    search: z.string().optional(),
    roleId: z.string().uuid().optional(),
    isActive: z.string().optional().transform(val => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    }),
    sortBy: z.enum(['firstName', 'lastName', 'email', 'createdAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

const updateAccountStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['active', 'suspended', 'deactivated']),
    reason: z.string().optional(),
  }),
});

const toggleUserActiveStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean({ required_error: "isActive status (boolean) is required" }),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Public routes
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile', authenticate, userController.getProfile.bind(userController));

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad request, validation error
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  '/profile',
  authenticate,
  validateRequest(updateProfileSchema),
  userController.updateProfile.bind(userController)
);

/**
 * @swagger
 * /users/change-password:
 *   put:
 *     summary: Change the authenticated user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Password changed successfully
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
 *                     message:
 *                       type: string
 *                       example: Password updated successfully
 *       400:
 *         description: Bad request, validation error or current password incorrect
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  '/change-password',
  authenticate,
  validateRequest(changePasswordSchema),
  userController.changePassword.bind(userController)
);

// Protected routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users with pagination, search, and filtering
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for email, username, first name, or last name
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter users by role ID
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter users by active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstName, lastName, email, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (asc/desc)
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPagination'
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
 */
router.get(
  '/',
  authenticate,
  authorize('read:users'),
  validateRequest(paginationSchema),
  userController.getUsers.bind(userController)
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/:id',
  authenticate,
  authorize('read:users'),
  userController.getUserById.bind(userController)
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
 *       400:
 *         description: Bad request, validation error
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
 *         description: User or Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  '/:id',
  authenticate,
  authorize('write:users'),
  validateRequest(updateUserSchema),
  userController.updateUser.bind(userController)
);

/**
 * @swagger
 * /users/{id}/status:
 *   put:
 *     summary: Update a user's account status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the user to update status for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAccountStatusInput'
 *     responses:
 *       200:
 *         description: User account status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
 *       400:
 *         description: Bad request, validation error or user ID is required
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  '/:id/status',
  authenticate,
  authorize('write:users'),
  validateRequest(updateAccountStatusSchema),
  userController.updateAccountStatus.bind(userController)
);

/**
 * @swagger
 * /users/{id}/toggle-active:
 *   patch:
 *     summary: Toggle a user's active status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the user to toggle active status for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToggleUserActiveStatusInput'
 *     responses:
 *       200:
 *         description: User active status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/ToggleUserActiveStatusOutput'
 *       400:
 *         description: Bad request, validation error or isActive status is required
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  '/:id/toggle-active',
  authenticate,
  authorize('write:users'), // Assuming 'write:users' permission is needed
  validateRequest(toggleUserActiveStatusSchema),
  userController.toggleUserActiveStatus.bind(userController)
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     ToggleUserActiveStatusInput:
 *       type: object
 *       required:
 *         - isActive
 *       properties:
 *         isActive:
 *           type: boolean
 *           description: Set user's active status (true for active, false for inactive)
 *     ToggleUserActiveStatusOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User ID
 *         isActive:
 *           type: boolean
 *           description: User's new active status
 *         accountStatus:
 *           type: string
 *           enum: [active, suspended, deactivated]
 *           description: User's new account status
 *         message:
 *           type: string
 *           description: Status message for the operation
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User ID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         username:
 *           type: string
 *           description: User's username
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         avatar:
 *           type: string
 *           description: URL to user's avatar
 *         bio:
 *           type: string
 *           description: User's short biography
 *         preferences:
 *           type: object
 *           description: User's preferences (e.g., UI settings)
 *         language:
 *           type: string
 *           description: User's preferred language (e.g., 'en')
 *         timezone:
 *           type: string
 *           description: User's timezone
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             permissions:
 *               type: array
 *               items:
 *                 type: string
 *         company:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *     UpdateProfileInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         avatar:
 *           type: string
 *           format: url
 *           description: URL to user's avatar
 *         bio:
 *           type: string
 *           maxLength: 500
 *           description: User's short biography
 *         preferences:
 *           type: object
 *           description: User's preferences (e.g., UI settings)
 *         language:
 *           type: string
 *           minLength: 2
 *           maxLength: 2
 *           description: User's preferred language (e.g., 'en')
 *         timezone:
 *           type: string
 *           description: User's timezone
 *     ChangePasswordInput:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           description: User's current password
 *         newPassword:
 *           type: string
 *           format: password
 *           description: User's new password (min 6 characters)
 *     PasswordHistoryEntry:
 *       type: object
 *       properties:
 *         changedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the password was changed
 *     PasswordHistoryOutput:
 *       type: object
 *       properties:
 *         passwordHistory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PasswordHistoryEntry'
 *           description: List of past password change entries
 *         lastPasswordChange:
 *           type: string
 *           format: date-time
 *           description: Last time the password was changed
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         roleId:
 *           type: string
 *           format: uuid
 *           description: New role ID for the user
 *         isActive:
 *           type: boolean
 *           description: User's active status
 *     UserAccountStatusInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [active, suspended, deactivated]
 *           description: New account status for the user
 *         reason:
 *           type: string
 *           description: Reason for status change (e.g., deactivation reason)
 *     UserPagination:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             totalPages:
 *               type: integer
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         company:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *     UserDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         avatar:
 *           type: string
 *         isActive:
 *           type: boolean
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             permissions:
 *               type: array
 *               items:
 *                 type: string
 *         company:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 */ 