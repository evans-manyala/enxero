import { PrismaClient, User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { ILoginDto, IRegisterDto, IAuthResponse, IRefreshTokenDto } from '../interfaces/auth.interface';
import { AppError } from '../../../shared/utils/AppError';
import env from '../../../config/environment';
import { SecurityService } from './security.service';
import { SignOptions } from 'jsonwebtoken';

export class AuthService {
  private prisma: PrismaClient;
  private securityService: SecurityService;

  constructor() {
    this.prisma = new PrismaClient();
    this.securityService = new SecurityService();
  }

  async register(data: IRegisterDto): Promise<IAuthResponse> {
    const { email, username, password } = data;

    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Get default role
    const defaultRole = await this.prisma.role.findFirst({
      where: { name: 'USER' },
    });

    if (!defaultRole) {
      throw new AppError('Default role not found', 500);
    }

    // Create default company
    const defaultCompany = await this.prisma.company.create({
      data: {
        name: `${data.firstName}'s Company`,
        identifier: username.toUpperCase(),
        isActive: true,
      },
    });

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: defaultRole.id,
        companyId: defaultCompany.id,
      },
      include: {
        role: true,
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Create session
    await this.securityService.createSession(
      user.id,
      tokens.refreshToken,
      data.ipAddress,
      data.userAgent
    );

    // Track activity
    await this.securityService.trackActivity(
      user.id,
      'USER_REGISTERED',
      { username: user.username },
      data.ipAddress,
      data.userAgent
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role?.name || 'USER',
        companyId: user.companyId,
      },
    };
  }

  async login(data: ILoginDto): Promise<IAuthResponse> {
    const { email, password, ipAddress, userAgent } = data;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      await this.securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      throw new AppError('Invalid credentials', 401);
    }

    // Check if account is locked
    const isLocked = await this.securityService.isAccountLocked(user.id);
    if (isLocked) {
      throw new AppError('Account is locked due to too many failed attempts. Please try again later.', 401);
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      await this.securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      throw new AppError('Invalid credentials', 401);
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Create session
    await this.securityService.createSession(
      user.id,
      tokens.refreshToken,
      ipAddress,
      userAgent
    );

    // Track activity
    await this.securityService.trackActivity(
      user.id,
      'USER_LOGGED_IN',
      { username: user.username },
      ipAddress,
      userAgent
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role?.name || 'USER',
        companyId: user.companyId,
      },
    };
  }

  async refreshToken(data: IRefreshTokenDto): Promise<IAuthResponse> {
    const { refreshToken, ipAddress, userAgent } = data;

    try {
      // Verify refresh token
      const decoded = verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string };

      // Find user
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new AppError('User not found', 401);
      }

      // Invalidate the old session (refresh token)
      await this.securityService.invalidateSession(refreshToken);

      // Generate new tokens
      const tokens = this.generateTokens(user);

      // Create new session
      await this.securityService.createSession(
        user.id,
        tokens.refreshToken,
        ipAddress,
        userAgent
      );

      // Track activity
      await this.securityService.trackActivity(
        user.id,
        'TOKEN_REFRESHED',
        { username: user.username },
        ipAddress,
        userAgent
      );

      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role?.name || 'USER',
          companyId: user.companyId,
        },
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  private generateTokens(user: User) {
    const accessToken = sign(
      { userId: user.id, roleId: user.roleId, type: 'access' } as object,
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN as string } as SignOptions
    );

    const refreshToken = sign(
      { userId: user.id, type: 'refresh', jti: Date.now() + '_' + Math.random().toString(36).substr(2, 9) } as object,
      env.JWT_REFRESH_SECRET as string,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN as string } as SignOptions
    );

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await this.securityService.invalidateSession(refreshToken);
    } catch (error) {
      console.error('Error during logout, refresh token might not exist:', error);
    }
  }
}
