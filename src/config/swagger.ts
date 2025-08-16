import swaggerJsdoc from 'swagger-jsdoc';
import env from './environment';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Enxero Platform Backend API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for the Enxero Platform Backend, including Authentication, User Management, Company Management, Employee Management, Payroll Management, Leave Management, Forms Management, File Management, Notifications, Audit Logging, Integrations, and System Configuration.',
      contact: {
        name: 'Enxero Support',
        url: 'https://www.enxero.com/support',
        email: 'support@enxero.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'Development Server',
      },
      // You can add more servers for different environments (e.g., production, staging)
      // {
      //   url: 'https://api.yourdomain.com/api/v1',
      //   description: 'Production Server',
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token in the format "Bearer <token>"',
        },
      },
      schemas: {
        // User schemas
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            role: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive', 'pending'] },
            companyId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Company schemas
        Company: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            postalCode: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
            subscriptionPlan: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Employee schemas
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            position: { type: 'string' },
            department: { type: 'string' },
            hireDate: { type: 'string', format: 'date' },
            salary: { type: 'number' },
            status: { type: 'string', enum: ['active', 'inactive', 'terminated'] },
            companyId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Payroll schemas
        PayrollConfig: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            companyId: { type: 'string', format: 'uuid' },
            payFrequency: { type: 'string', enum: ['weekly', 'biweekly', 'monthly'] },
            taxSettings: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        PayrollPeriod: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            companyId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            status: { type: 'string', enum: ['open', 'closed', 'processed'] },
            totalAmount: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        PayrollRecord: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string', format: 'uuid' },
            periodId: { type: 'string', format: 'uuid' },
            grossSalary: { type: 'number' },
            totalDeductions: { type: 'number' },
            netPay: { type: 'number' },
            status: { type: 'string', enum: ['pending', 'processed', 'paid'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // Leave schemas
        LeaveType: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            companyId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            maxDays: { type: 'integer' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        LeaveRequest: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string', format: 'uuid' },
            leaveTypeId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            status: { type: 'string', enum: ['pending', 'approved', 'rejected', 'cancelled'] },
            reason: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        LeaveBalance: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string', format: 'uuid' },
            leaveTypeId: { type: 'string', format: 'uuid' },
            year: { type: 'integer' },
            totalDays: { type: 'integer' },
            usedDays: { type: 'integer' },
            remainingDays: { type: 'integer' },
          },
        },
        // Form schemas
        Form: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            fields: { type: 'array', items: { type: 'object' } },
            status: { type: 'string', enum: ['active', 'inactive'] },
            createdBy: { type: 'string', format: 'uuid' },
            companyId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        FormSubmission: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            formId: { type: 'string', format: 'uuid' },
            data: { type: 'object' },
            submittedBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // File schemas
        File: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'File ID',
            },
            filename: {
              type: 'string',
              description: 'Original filename',
            },
            storageName: {
              type: 'string',
              description: 'Name of the file in storage',
            },
            mimetype: {
              type: 'string',
              description: 'MIME type of the file',
            },
            size: {
              type: 'integer',
              description: 'File size in bytes',
            },
            description: {
              type: 'string',
              description: 'File description',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'File tags',
            },
            entityType: {
              type: 'string',
              description: 'Type of entity the file is associated with',
            },
            entityId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the entity the file is associated with',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'File creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        // Notification schemas
        Notification: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Notification ID',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'User ID',
            },
            type: {
              type: 'string',
              description: 'Notification type',
              enum: ['system_alert', 'user_mention', 'document_shared', 'task_assigned', 'leave_request', 'payroll_update', 'system_update'],
            },
            message: {
              type: 'string',
              description: 'Notification message',
            },
            data: {
              type: 'object',
              description: 'Additional notification data',
            },
            status: {
              type: 'string',
              enum: ['unread', 'read'],
              description: 'Notification status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Notification creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        // Audit schemas
        AuditLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            action: { type: 'string' },
            entityType: { type: 'string' },
            entityId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            description: { type: 'string' },
            ipAddress: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // Integration schemas
        Integration: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            companyId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive'] },
            config: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        IntegrationLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            integrationId: { type: 'string', format: 'uuid' },
            status: { type: 'string', enum: ['success', 'error'] },
            message: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // System schemas
        SystemConfig: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            key: { type: 'string' },
            value: { type: 'string' },
            description: { type: 'string' },
            active: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        SystemLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            level: { type: 'string', enum: ['info', 'warning', 'error'] },
            message: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        // Common schemas
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            pages: { type: 'integer' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    // Core modules
    './src/modules/auth/routes/*.ts',
    './src/modules/users/routes/*.ts',
    './src/modules/roles/routes/*.ts',
    './src/modules/companies/routes/*.ts',
    './src/modules/employees/routes/*.ts',
    
    // Business modules
    './src/modules/payroll/routes/*.ts',
    './src/modules/leave/routes/*.ts',
    './src/modules/forms/routes/*.ts',
    
    // File and communication modules
    './src/modules/files/routes/*.ts',
    './src/modules/notifications/routes/*.ts',
    
    // System and audit modules
    './src/modules/audit/routes/*.ts',
    './src/modules/integrations/routes/*.ts',
    './src/modules/system/routes/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec; 