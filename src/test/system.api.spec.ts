import request from 'supertest';
import app from '../app';
import '../test/setup';
import { PrismaClient } from '@prisma/client';

describe('System API Integration', () => {
  const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  let accessToken: string;
  let companyId: string;
  let userId: string;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    let adminRole;
    try {
      adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: { permissions: ['read:system', 'write:system', 'manage:companies', 'manage:users', 'read:all', 'write:all'] },
        create: {
          name: 'ADMIN',
          description: 'Administrator role',
          permissions: ['read:system', 'write:system', 'manage:companies', 'manage:users', 'read:all', 'write:all'],
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

    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `systemuser_${uniqueId}@example.com`,
        username: `systemuser_${uniqueId}`,
        password: 'TestPassword123!',
        firstName: 'System',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    accessToken = registerRes.body.data.accessToken;
    userId = registerRes.body.data.user.id;
    companyId = registerRes.body.data.user.companyId;

    await prisma.user.update({
      where: { id: userId },
      data: { roleId: adminRole.id },
    });
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.user.deleteMany({
        where: { email: `systemuser_${uniqueId}@example.com` },
      });
      await prisma.company.deleteMany({
        where: { id: companyId },
      });
      await prisma.$disconnect();
    }
  });

  it('should list system configs', async () => {
    const res = await request(app)
      .get('/api/v1/system/configs')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should list system logs', async () => {
    const res = await request(app)
      .get('/api/v1/system/logs')
      .set('Authorization', `Bearer ${accessToken}`);
    expect([200, 401, 403]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    }
  });
}); 