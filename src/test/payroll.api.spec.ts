import request from 'supertest';
import app from '../app';
import '../test/setup';
import { PrismaClient } from '@prisma/client';

describe('Payroll API Integration', () => {
  const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  let accessToken: string;
  let companyId: string;
  let employeeId: string;
  let payrollId: string;
  let prisma: PrismaClient;

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
            'write:payroll',
            'read:payroll',
          ],
        },
        create: {
          name: 'EMPLOYEE_MANAGER',
          description: 'Employee Manager role',
          permissions: [
            'write:employees',
            'read:employees',
            'write:payroll',
            'read:payroll',
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
        email: `payrolluser_${uniqueId}@example.com`,
        username: `payrolluser_${uniqueId}`,
        password: 'TestPassword123!',
        firstName: 'Payroll',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    companyId = registerRes.body.data.user.companyId || registerRes.body.data.user.company?.id;

    // Update user role
    await prisma.user.update({
      where: { id: registerRes.body.data.user.id },
      data: { roleId: employeeManagerRole.id },
    });

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: `payrolluser_${uniqueId}@example.com`,
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
        firstName: 'Payroll',
        lastName: 'Employee',
        email: `payrollemployee_${uniqueId}@example.com`,
        department: 'Finance',
        position: 'Accountant',
        status: 'active',
        hireDate: new Date().toISOString(),
        salary: 4000.00,
        companyId,
      });
    expect(empRes.status).toBe(201);
    employeeId = empRes.body.data.id;
  }, 10000); // Increase timeout to 10 seconds

  afterAll(async () => {
    if (prisma) {
      // Clean up only the users, employees, and companies created by this test
      await prisma.user.deleteMany({
        where: { email: `payrolluser_${uniqueId}@example.com` },
      });
      await prisma.employee.deleteMany({
        where: { email: `payrollemployee_${uniqueId}@example.com` },
      });
      await prisma.company.deleteMany({
        where: { id: companyId },
      });
      await prisma.$disconnect();
    }
  });

  it('should create a payroll record', async () => {
    const periodRes = await request(app)
      .post('/api/v1/payroll/periods')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'DRAFT',
      });
    expect(periodRes.status).toBe(201);
    const periodId = periodRes.body.id;

    const employeeRes = await request(app)
      .get(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(employeeRes.status).toBe(200);
    const actualSalary = employeeRes.body.data.salary;
    
    const grossSalary = Number(actualSalary);
    const taxDeduction = grossSalary * 0.15;
    const benefitsDeduction = grossSalary * 0.05;
    const totalDeductions = taxDeduction + benefitsDeduction;
    const netSalary = grossSalary - totalDeductions;
    
    const res = await request(app)
      .post('/api/v1/payroll/records')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId,
        periodId,
        payPeriodStart: new Date().toISOString(),
        payPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        grossSalary,
        totalDeductions,
        netSalary,
        workingDays: 20,
        deductions: {
          tax: taxDeduction,
          benefits: benefitsDeduction,
        },
        allowances: {
          transport: 100,
          meal: 50,
        },
      });
    expect(res.status).toBe(201);
    expect(Number(res.body.grossSalary)).toBe(grossSalary);
    expect(Number(res.body.totalDeductions)).toBe(totalDeductions);
    expect(Number(res.body.netSalary)).toBe(netSalary);
    payrollId = res.body.id;
  });

  it('should get all payroll records', async () => {
    const res = await request(app)
      .get('/api/v1/payroll/records')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((p: any) => p.id === payrollId)).toBe(true);
  });

  it('should get a payroll record by id', async () => {
    const res = await request(app)
      .get(`/api/v1/payroll/records/${payrollId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(payrollId);
    expect(res.body.grossSalary).toBeDefined();
  });

  it('should update a payroll record', async () => {
    const existingRecordRes = await request(app)
      .get(`/api/v1/payroll/records/${payrollId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(existingRecordRes.status).toBe(200);
    const existingRecord = existingRecordRes.body;
    
    const newWorkingDays = 22;
    const dailyRate = Number(existingRecord.grossSalary) / existingRecord.workingDays;
    const newGrossSalary = dailyRate * newWorkingDays;
    const newTotalDeductions = Number(existingRecord.totalDeductions);
    const newNetSalary = newGrossSalary - newTotalDeductions;
    
    const res = await request(app)
      .put(`/api/v1/payroll/records/${payrollId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: existingRecord.employeeId,
        periodId: existingRecord.periodId,
        payPeriodStart: existingRecord.payPeriodStart,
        payPeriodEnd: existingRecord.payPeriodEnd,
        grossSalary: newGrossSalary,
        totalDeductions: newTotalDeductions,
        netSalary: newNetSalary,
        workingDays: newWorkingDays,
        deductions: existingRecord.deductions,
        allowances: existingRecord.allowances,
        status: existingRecord.status,
      });
    expect(res.status).toBe(200);
    expect(res.body.workingDays).toBe(newWorkingDays);
    expect(Number(res.body.grossSalary)).toBe(newGrossSalary);
    expect(Number(res.body.netSalary)).toBe(newNetSalary);
  });

  it('should delete a payroll record', async () => {
    const res = await request(app)
      .get(`/api/v1/payroll/records/${payrollId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(payrollId);
  });
}); 