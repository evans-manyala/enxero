import { PrismaClient } from '@prisma/client';
import { AuthService } from '../auth.service';
import { SecurityService } from '../security.service';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const securityService = new SecurityService();
const authService = new AuthService();

describe('AuthService', () => {
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

    console.log('Retrieved role:', testRole);

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

  describe('Login with Security Features', () => {
    it('should track failed login attempts', async () => {
      const loginData = {
        email: `test_${uniqueId}@example.com`,
        password: 'wrongPassword',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      try {
        await authService.login(loginData);
      } catch (error) {
        // Expected error
      }

      const attempts = await prisma.failedLoginAttempt.findMany({
        where: { email: loginData.email },
      });

      expect(attempts).toHaveLength(1);
      expect(attempts[0].ipAddress).toBe(loginData.ipAddress);
    });

    it('should lock account after maximum failed attempts', async () => {
      const loginData = {
        email: `test_${uniqueId}@example.com`,
        password: 'wrongPassword',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      // Simulate maximum failed attempts
      for (let i = 0; i < 5; i++) {
        try {
          await authService.login(loginData);
        } catch (error) {
          // Expected error
        }
      }

      const user = await prisma.user.findUnique({
        where: { email: loginData.email },
      });

      expect(user?.accountStatus).toBe('LOCKED');
    });

    it('should create session on successful login', async () => {
      const loginData = {
        email: `test_${uniqueId}@example.com`,
        password: 'testPassword123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      const response = await authService.login(loginData);

      const sessions = await prisma.userSession.findMany({
        where: { userId: testUser.id },
      });

      expect(sessions).toHaveLength(1);
      expect(sessions[0].token).toBe(response.refreshToken);
      expect(sessions[0].ipAddress).toBe(loginData.ipAddress);
    });

    it('should track login activity', async () => {
      const loginData = {
        email: `test_${uniqueId}@example.com`,
        password: 'testPassword123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      await authService.login(loginData);

      const activities = await prisma.userActivity.findMany({
        where: { userId: testUser.id },
      });

      expect(activities).toHaveLength(1);
      expect(activities[0].action).toBe('USER_LOGGED_IN');
      expect(activities[0].ipAddress).toBe(loginData.ipAddress);
    });
  });

  describe('Registration with Security Features', () => {
    it('should create session and track activity on registration', async () => {
      const registerData = {
        email: `newuser_${uniqueId}@example.com`,
        username: `newuser_${uniqueId}`,
        password: 'newPassword123',
        firstName: 'New',
        lastName: 'User',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      const response = await authService.register(registerData);

      const user = await prisma.user.findUnique({
        where: { email: registerData.email },
      });

      expect(user).not.toBeNull();
      if (!user) throw new Error('User not found after registration');

      const sessions = await prisma.userSession.findMany({
        where: { userId: user.id },
      });

      const activities = await prisma.userActivity.findMany({
        where: { userId: user.id },
      });

      expect(sessions).toHaveLength(1);
      expect(sessions[0].token).toBe(response.refreshToken);
      expect(activities).toHaveLength(1);
      expect(activities[0].action).toBe('USER_REGISTERED');
    });
  });

  describe('Token Refresh with Security Features', () => {
    it('should create new session and track activity on token refresh', async () => {
      const loginData = {
        email: testUser.email,
        password: 'testPassword123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      const loginResponse = await authService.login(loginData);
      const refreshResponse = await authService.refreshToken({
        refreshToken: loginResponse.refreshToken,
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      });

      const sessions = await prisma.userSession.findMany({
        where: { userId: testUser.id },
      });

      const activities = await prisma.userActivity.findMany({
        where: { userId: testUser.id },
      });

      expect(sessions).toHaveLength(1);
      expect(refreshResponse.refreshToken).not.toBe(loginResponse.refreshToken);
      expect(activities).toHaveLength(2);
      expect(activities[1].action).toBe('TOKEN_REFRESHED');
    });
  });

  describe('Logout with Security Features', () => {
    it('should invalidate session on logout', async () => {
      const loginData = {
        email: `test_${uniqueId}@example.com`,
        password: 'testPassword123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      };

      const loginResponse = await authService.login(loginData);
      await authService.logout(loginResponse.refreshToken);

      const sessions = await prisma.userSession.findMany({
        where: { userId: testUser.id },
      });

      expect(sessions).toHaveLength(0);
    });
  });
}); 