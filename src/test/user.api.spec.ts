import request from 'supertest';
import app from '../app';
import '../test/setup';
import { PrismaClient } from '@prisma/client';

describe('Users API Integration', () => {
  const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const testEmail = `testuser_${uniqueId}@example.com`;
  const testPassword = 'TestPassword123!';
  let accessToken: string;
  let userId: string;
  let currentPassword = testPassword;
  let adminAccessToken: string;
  let adminUserId: string;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    // Create admin role if it doesn't exist
    let adminRole;
    try {
      adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: { 
          permissions: [
            'read:users', 
            'write:users', 
            'read:all', 
            'write:all',
            'manage:users',
            'manage:roles'
          ] 
        },
        create: {
          name: 'ADMIN',
          description: 'Administrator role',
          permissions: [
            'read:users', 
            'write:users', 
            'read:all', 
            'write:all',
            'manage:users',
            'manage:roles'
          ],
          isActive: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        adminRole = await prisma.role.findUnique({
          where: { name: 'ADMIN' },
        });
      } else {
        throw error;
      }
    }

    if (!adminRole) {
      throw new Error('Failed to create or find ADMIN role');
    }

    const adminEmail = `admin_${uniqueId}@example.com`;
    const adminRegisterRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: adminEmail,
        username: `admin_${uniqueId}`,
        password: 'AdminPassword123!',
        firstName: 'Admin',
        lastName: 'User',
      });
    expect(adminRegisterRes.status).toBe(201);
    adminUserId = adminRegisterRes.body.data.user.id;
    
    // Update admin user role
    await prisma.user.update({
      where: { id: adminUserId },
      data: { roleId: adminRole.id },
    });

    const adminLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: adminEmail,
        password: 'AdminPassword123!',
      });
    expect(adminLoginRes.status).toBe(200);
    adminAccessToken = adminLoginRes.body.data.accessToken;

    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testEmail,
        username: `testuser_${uniqueId}`,
        password: testPassword,
        firstName: 'Test',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    userId = registerRes.body.data.user.id;

    // Update test user role
    await prisma.user.update({
      where: { id: userId },
      data: { roleId: adminRole.id },
    });

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });
    expect(loginRes.status).toBe(200);
    accessToken = loginRes.body.data.accessToken;
  });

  afterAll(async () => {
    if (prisma) {
      // Clean up only the users created by this test
      await prisma.user.deleteMany({
        where: {
          OR: [
            { email: testEmail },
            { email: { contains: 'admin_' + uniqueId } },
          ],
        },
      });
      await prisma.$disconnect();
    }
  });

  it('should get the user profile', async () => {
    const res = await request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.email).toBe(testEmail);
  });

  it('should update the user profile', async () => {
    const res = await request(app)
      .put('/api/v1/users/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'Updated',
        lastName: 'User',
        phoneNumber: '1234567890',
        bio: 'Updated bio',
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.firstName).toBe('Updated');
    expect(res.body.data.phoneNumber).toBe('1234567890');
  });

  it('should change the user password', async () => {
    const res = await request(app)
      .put('/api/v1/users/change-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        currentPassword,
        newPassword: 'NewPassword123!'
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    currentPassword = 'NewPassword123!';
  });

  it('should get a list of users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data.data)).toBe(true);
  });

  it('should get a user by id', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.id).toBe(userId);
  });

  it('should update a user (role and isActive)', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ isActive: true });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.isActive).toBe(true);
  });

  it('should update account status', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'active' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.accountStatus).toBe('active');
  });

  it('should toggle user active status', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${userId}/toggle-active`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ isActive: false });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.isActive).toBe(false);
  });

  it('should get password history', async () => {
    const reactivateRes = await request(app)
      .patch(`/api/v1/users/${userId}/toggle-active`)
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({ isActive: true });
    expect(reactivateRes.status).toBe(200);
    expect(reactivateRes.body.status).toBe('success');
    expect(reactivateRes.body.data.isActive).toBe(true);

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: currentPassword,
      });
    expect(loginRes.status).toBe(200);
    accessToken = loginRes.body.data.accessToken;

    const res = await request(app)
      .get('/api/v1/users/password-history')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data.passwordHistory)).toBe(true);
  });
}); 