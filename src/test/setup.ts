import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

// Create a new Prisma Client instance for testing
const prisma = new PrismaClient();

// Clean up the database before all tests
beforeAll(async () => {
  await cleanupDatabase();
  
  // Create default 'USER' role with proper error handling
  try {
    await prisma.role.create({
      data: {
        name: 'USER',
        description: 'Default user role',
        permissions: [],
        isActive: true,
      },
    });
  } catch (error: any) {
    // If role already exists, that's fine - continue
    if (error.code !== 'P2002') {
      throw error;
    }
  }
});

// Disconnect Prisma after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

// Helper function to clean up database
async function cleanupDatabase() {
  try {
    // Delete in order to respect foreign key constraints
    await prisma.failedLoginAttempt.deleteMany();
    await prisma.userSession.deleteMany();
    await prisma.userActivity.deleteMany();
    await prisma.form_submissions.deleteMany();
    await prisma.formResponse.deleteMany();
    await prisma.formField.deleteMany();
    await prisma.forms.deleteMany();
    await prisma.notifications.deleteMany();
    await prisma.payrollRecord.deleteMany();
    await prisma.payrollPeriod.deleteMany();
    await prisma.payrollConfig.deleteMany();
    await prisma.leaveRequest.deleteMany();
    await prisma.leaveBalance.deleteMany();
    await prisma.leaveType.deleteMany();
    await prisma.files.deleteMany();
    await prisma.audit_logs.deleteMany();
    await prisma.integration.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();
    
    // Delete all roles except the default USER role
    await prisma.role.deleteMany({
      where: {
        name: {
          not: 'USER'
        }
      }
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    // Continue even if cleanup fails
  }
} 