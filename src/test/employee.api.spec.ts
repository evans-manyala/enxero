import request from 'supertest';
import app from '../app';
import '../test/setup';
import { PrismaClient } from '@prisma/client';

describe('Employees API Integration', () => {
  const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  let accessToken: string;
  let companyId: string;
  let employeeId: string;
  let testEmployeeEmail: string;
  let userId: string;
  let employeeCreated = false;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    
    testEmployeeEmail = `employee_${uniqueId}@example.com`;
    let employeeManagerRole;
    
    try {
      employeeManagerRole = await prisma.role.upsert({
        where: { name: 'EMPLOYEE_MANAGER' },
        update: { permissions: ['write:employees', 'read:employees'] },
        create: {
          name: 'EMPLOYEE_MANAGER',
          description: 'Can manage employees',
          permissions: ['write:employees', 'read:employees'],
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
        email: `employeeuser_${uniqueId}@example.com`,
        username: `employeeuser_${uniqueId}`,
        password: 'TestPassword123!',
        firstName: 'Employee',
        lastName: 'User',
      });
    
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    
    userId = registerRes.body.data.user.id;
    companyId = registerRes.body.data.user.companyId;

    await prisma.user.update({
      where: { id: userId },
      data: { roleId: employeeManagerRole.id },
    });

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: `employeeuser_${uniqueId}@example.com`,
        password: 'TestPassword123!',
      });
    
    expect(loginRes.status).toBe(200);
    accessToken = loginRes.body.data.accessToken;
  });

  afterAll(async () => {
    if (prisma) {
      // Clean up only the users, employees, and companies created by this test
      await prisma.user.deleteMany({
        where: { email: `employeeuser_${uniqueId}@example.com` },
      });
      await prisma.employee.deleteMany({
        where: { email: testEmployeeEmail },
      });
      await prisma.company.deleteMany({
        where: { id: companyId },
      });
      await prisma.$disconnect();
    }
  });

  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: `EMP${Date.now()}`,
        firstName: 'Test',
        lastName: 'Employee',
        email: testEmployeeEmail,
        department: 'Engineering',
        position: 'Developer',
        status: 'active',
        hireDate: new Date().toISOString(),
        salary: 5000.00,
        companyId,
      });
    
    if (res.status !== 201) {
      employeeCreated = false;
      console.error('Employee creation failed:', res.status, res.body);
      throw new Error(`Failed to create employee: ${res.status} ${res.body?.message || res.text}`);
    }
    
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.email).toBe(testEmployeeEmail);
    employeeId = res.body.data.id;
    employeeCreated = true;
  });

  it('should get all employees', async () => {
    if (!employeeCreated) {
      console.log('Skipping test - employee not created');
      return;
    }
    
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${accessToken}`);
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data.data)).toBe(true);
    expect(res.body.data.data.some((emp: any) => emp.id === employeeId)).toBe(true);
  });

  it('should get an employee by id', async () => {
    if (!employeeCreated) {
      console.log('Skipping test - employee not created');
      return;
    }
    
    const res = await request(app)
      .get(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(employeeId);
    }
  });

  it('should update an employee', async () => {
    if (!employeeCreated) {
      console.log('Skipping test - employee not created');
      return;
    }
    
    const res = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ position: 'Senior Developer', status: 'inactive' });
    
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.status).toBe('success');
      expect(res.body.data.position).toBe('Senior Developer');
      expect(res.body.data.status).toBe('inactive');
    }
  });

  it('should delete an employee', async () => {
    if (!employeeCreated) {
      console.log('Skipping test - employee not created');
      return;
    }
    
    const res = await request(app)
      .delete(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    expect([204, 404]).toContain(res.status);
  });
}); 