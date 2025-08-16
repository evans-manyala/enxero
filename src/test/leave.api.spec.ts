import request from 'supertest';
import app from '../app';
import '../test/setup';
import { PrismaClient } from '@prisma/client';

describe('Leave API Integration', () => {
  const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  let accessToken: string;
  let companyId: string;
  let employeeId: string;
  let leaveId: string;
  let prisma: PrismaClient;
  let leaveTypeId: string;
  let leaveBalanceId: string;
  let userId: string;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    // Create employee manager role
    let employeeManagerRole;
    try {
      employeeManagerRole = await prisma.role.upsert({
        where: { name: 'EMPLOYEE_MANAGER' },
        update: {
          permissions: [
            'write:employees',
            'read:employees',
            'write:leave',
            'read:leave',
            'create:leave_requests',
            'view:leave_requests',
            'update:leave_requests',
            'delete:leave_requests',
          ],
        },
        create: {
          name: 'EMPLOYEE_MANAGER',
          description: 'Employee Manager role',
          permissions: [
            'write:employees',
            'read:employees',
            'write:leave',
            'read:leave',
            'create:leave_requests',
            'view:leave_requests',
            'update:leave_requests',
            'delete:leave_requests',
          ],
          isActive: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        employeeManagerRole = await prisma.role.findUnique({
          where: { name: 'EMPLOYEE_MANAGER' },
        });
      } else {
        throw error;
      }
    }

    if (!employeeManagerRole) {
      throw new Error('Failed to create or find EMPLOYEE_MANAGER role');
    }

    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `leaveuser_${uniqueId}@example.com`,
        username: `leaveuser_${uniqueId}`,
        password: 'TestPassword123!',
        firstName: 'Leave',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    companyId = registerRes.body.data.user.companyId || registerRes.body.data.user.company?.id;
    userId = registerRes.body.data.user.id;

    // Update user role
    await prisma.user.update({
      where: { id: registerRes.body.data.user.id },
      data: { roleId: employeeManagerRole.id },
    });

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: `leaveuser_${uniqueId}@example.com`,
        password: 'TestPassword123!',
      });
    expect(loginRes.status).toBe(200);
    accessToken = loginRes.body.data.accessToken;

    // Create employee
    const empRes = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: `EMP${uniqueId}`,
        firstName: 'Leave',
        lastName: 'Employee',
        email: `leaveemployee_${uniqueId}@example.com`,
        department: 'HR',
        position: 'HR Specialist',
        status: 'active',
        hireDate: new Date().toISOString(),
        salary: 3000.00,
        companyId,
      });
    expect(empRes.status).toBe(201);
    employeeId = empRes.body.data.id;

    // Patch employee to set userId
    await prisma.employee.update({
      where: { id: employeeId },
      data: { userId },
    });

    // Create leave type for this company
    const leaveType = await prisma.leaveType.create({
      data: {
        name: 'Annual Leave',
        description: 'Annual paid leave',
        maxDays: 25,
        isActive: true,
        companyId,
      },
    });
    leaveTypeId = leaveType.id;

    // Create leave balance for the employee and leave type
    const leaveBalance = await prisma.leaveBalance.create({
      data: {
        employeeId,
        typeId: leaveTypeId,
        totalDays: 25,
        usedDays: 0,
        remainingDays: 25,
        year: new Date().getFullYear(),
      },
    });
    leaveBalanceId = leaveBalance.id;
  }, 10000);

  afterAll(async () => {
    if (prisma) {
      await prisma.user.deleteMany({
        where: { email: `leaveuser_${uniqueId}@example.com` },
      });
      await prisma.employee.deleteMany({
        where: { email: `leaveemployee_${uniqueId}@example.com` },
      });
      await prisma.leaveRequest.deleteMany({
        where: { employeeId },
      });
      await prisma.leaveType.deleteMany({
        where: { id: leaveTypeId },
      });
      await prisma.company.deleteMany({
        where: { id: companyId },
      });
      await prisma.leaveBalance.deleteMany({
        where: { id: leaveBalanceId },
      });
      await prisma.$disconnect();
    }
  });

  it('should create a leave request', async () => {
    const startDate = new Date();
    const endDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const requestPayload = {
      typeId: leaveTypeId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      notes: 'Vacation',
    };
    // Debug logs
    const leaveBalance = await prisma.leaveBalance.findFirst({ where: { employeeId, typeId: leaveTypeId } });
    const user = await prisma.user.findUnique({ where: { id: leaveBalance?.employeeId } });
    console.log('DEBUG: employeeId', employeeId);
    console.log('DEBUG: leaveTypeId', leaveTypeId);
    console.log('DEBUG: leaveBalance', leaveBalance);
    console.log('DEBUG: user', user);
    console.log('DEBUG: requestPayload', requestPayload);
    const res = await request(app)
      .post('/api/v1/leave/requests')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(requestPayload);
    if (res.status !== 201) {
      console.log('DEBUG: leave request error response', res.body);
    }
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    leaveId = res.body.data.id;
  });

  it('should get all leave requests', async () => {
    const res = await request(app)
      .get('/api/v1/leave/requests')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((l: any) => l.id === leaveId)).toBe(true);
  });

  it('should get a leave request by id', async () => {
    const res = await request(app)
      .get(`/api/v1/leave/requests/${leaveId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.id).toBe(leaveId);
  });

  it('should update a leave request', async () => {
    const res = await request(app)
      .put(`/api/v1/leave/requests/${leaveId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'approved', notes: 'Approved for vacation' });
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.status).toBe('approved');
    expect(res.body.data.notes).toBe('Approved for vacation');
  });

  it('should delete a leave request', async () => {
    // Create a separate leave request for deletion
    const deleteRequestPayload = {
      typeId: leaveTypeId,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'To be deleted',
    };
    
    const createRes = await request(app)
      .post('/api/v1/leave/requests')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(deleteRequestPayload);
    
    const deleteLeaveId = createRes.body.data.id;
    
    const res = await request(app)
      .delete(`/api/v1/leave/requests/${deleteLeaveId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    expect(res.status).toBe(204);
  });
}); 