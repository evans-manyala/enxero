import { PrismaClient } from '@prisma/client';
import { SecurityService } from '../security.service';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const securityService = new SecurityService();

describe('SecurityService', () => {
  let testUser: any;
  let testCompany: any;
  let testRole: any;
  let uniqueId: string;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    uniqueId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Clean up any existing test data first
    await prisma.userActivity.deleteMany({
      where: {
        user: {
          email: { contains: 'test@example.com' }
        }
      }
    });
    await prisma.userSession.deleteMany({
      where: {
        user: {
          email: { contains: 'test@example.com' }
        }
      }
    });
    await prisma.failedLoginAttempt.deleteMany({
      where: {
        email: { contains: 'test@example.com' }
      }
    });
    await prisma.user.deleteMany({
      where: {
        email: { contains: 'test@example.com' }
      }
    });
    await prisma.company.deleteMany({
      where: {
        identifier: { contains: 'TEST_' }
      }
    });

    // Get the default role first
    testRole = await prisma.role.findUnique({
      where: { name: 'USER' }
    });

    if (!testRole) {
      throw new Error('Default role not found. Please run the seed script first.');
    }

    // Create test company with unique identifier
    testCompany = await prisma.company.create({
      data: {
        name: `Test Company ${uniqueId}`,
        identifier: `TEST_${uniqueId}`,
        isActive: true
      }
    });

    // Create a test user
    const hashedPassword = await hash('testPassword123', 10);
    testUser = await prisma.user.create({
      data: {
        email: `test_${uniqueId}@example.com`,
        username: `testuser_${uniqueId}`,
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        companyId: testCompany.id,
        roleId: testRole.id,
        accountStatus: 'ACTIVE'
      }
    });

    // Verify that the user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { email: `test_${uniqueId}@example.com` },
    });
    expect(userExists).not.toBeNull();
  });

  afterEach(async () => {
    // Clean up test data in reverse order of dependencies
    await prisma.userActivity.deleteMany({
      where: {
        user: {
          email: { contains: 'test@example.com' }
        }
      }
    });
    await prisma.userSession.deleteMany({
      where: {
        user: {
          email: { contains: 'test@example.com' }
        }
      }
    });
    await prisma.failedLoginAttempt.deleteMany({
      where: {
        email: { contains: 'test@example.com' }
      }
    });
    await prisma.user.deleteMany({
      where: {
        email: { contains: 'test@example.com' }
      }
    });
    await prisma.company.deleteMany({
      where: {
        identifier: { contains: 'TEST_' }
      }
    });
  });

  describe('Failed Login Attempts', () => {
    it('should track failed login attempts', async () => {
      const email = `test_${uniqueId}@example.com`;
      const ipAddress = '127.0.0.1';
      const userAgent = 'test-agent';

      await securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);

      const attempts = await prisma.failedLoginAttempt.findMany({
        where: { email },
      });

      expect(attempts).toHaveLength(1);
      expect(attempts[0].ipAddress).toBe(ipAddress);
      expect(attempts[0].userAgent).toBe(userAgent);
    });

    it('should lock account after maximum failed attempts', async () => {
      const email = `test_${uniqueId}@example.com`;
      const ipAddress = '127.0.0.1';
      const userAgent = 'test-agent';

      // Simulate maximum failed attempts
      for (let i = 0; i < 5; i++) {
        await securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      expect(user?.accountStatus).toBe('LOCKED');
      expect(user?.deactivatedAt).toBeTruthy();
    });

    it('should auto-unlock account after lockout duration', async () => {
      const email = `test_${uniqueId}@example.com`;
      const ipAddress = '127.0.0.1';
      const userAgent = 'test-agent';

      // Lock the account
      for (let i = 0; i < 5; i++) {
        await securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      }

      // Mock the lockout duration to be expired
      await prisma.user.update({
        where: { email },
        data: {
          deactivatedAt: new Date(Date.now() - 16 * 60 * 1000), // 16 minutes ago
        },
      });

      const isLocked = await securityService.isAccountLocked(testUser.id);
      expect(isLocked).toBe(false);

      const user = await prisma.user.findUnique({
        where: { email },
      });
      expect(user?.accountStatus).toBe('ACTIVE');
    });
  });

  describe('Session Management', () => {
    it('should create and retrieve user sessions', async () => {
      const token = 'test-token';
      const ipAddress = '127.0.0.1';
      const userAgent = 'test-agent';

      await securityService.createSession(testUser.id, token, ipAddress, userAgent);

      const sessions = await securityService.getUserSessions(testUser.id);
      expect(sessions).toHaveLength(1);
      expect(sessions[0].token).toBe(token);
      expect(sessions[0].ipAddress).toBe(ipAddress);
    });

    it('should invalidate specific session', async () => {
      const token = 'test-token';
      await securityService.createSession(testUser.id, token);
      await securityService.invalidateSession(token);

      const sessions = await securityService.getUserSessions(testUser.id);
      expect(sessions).toHaveLength(0);
    });

    it('should invalidate all user sessions', async () => {
      // Create multiple sessions
      await securityService.createSession(testUser.id, 'token1');
      await securityService.createSession(testUser.id, 'token2');

      await securityService.invalidateAllSessions(testUser.id);

      const sessions = await securityService.getUserSessions(testUser.id);
      expect(sessions).toHaveLength(0);
    });
  });

  describe('Activity Tracking', () => {
    it('should track user activity', async () => {
      const action = 'TEST_ACTION';
      const metadata = { test: 'data' };
      const ipAddress = '127.0.0.1';
      const userAgent = 'test-agent';

      await securityService.trackActivity(
        testUser.id,
        action,
        metadata,
        ipAddress,
        userAgent
      );

      const activities = await securityService.getUserActivities(testUser.id);
      expect(activities).toHaveLength(1);
      expect(activities[0].action).toBe(action);
      expect(activities[0].metadata).toEqual(metadata);
      expect(activities[0].ipAddress).toBe(ipAddress);
    });

    it('should retrieve user activities with pagination', async () => {
      // Create multiple activities
      await securityService.trackActivity(testUser.id, 'ACTION_1');
      await securityService.trackActivity(testUser.id, 'ACTION_2');
      await securityService.trackActivity(testUser.id, 'ACTION_3');

      const activities = await securityService.getUserActivities(testUser.id, 2, 0);
      expect(activities).toHaveLength(2);
      expect(activities[0].action).toBe('ACTION_3'); // Most recent first
    });
  });

  describe('Cleanup', () => {
    it('should cleanup expired sessions and old failed attempts', async () => {
      // Create an expired session
      await prisma.userSession.create({
        data: {
          userId: testUser.id,
          token: 'expired-token',
          expiresAt: new Date(Date.now() - 1000), // Expired
        },
      });

      // Create an old failed attempt
      await prisma.failedLoginAttempt.create({
        data: {
          email: `test_${uniqueId}@example.com`,
          ipAddress: '127.0.0.1',
          userAgent: 'test-agent',
          userId: testUser.id,
          createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
        },
      });

      await securityService.cleanupOldRecords();

      const sessions = await prisma.userSession.findMany({
        where: { userId: testUser.id },
      });
      const attempts = await prisma.failedLoginAttempt.findMany({
        where: { email: `test_${uniqueId}@example.com` },
      });

      expect(sessions).toHaveLength(0);
      expect(attempts).toHaveLength(0);
    });
  });
}); 