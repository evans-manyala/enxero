export interface ILoginDto {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface IRegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    companyId: string;
  };
}

export interface IRefreshTokenDto {
  refreshToken: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ITokenPayload {
  userId: string;
  roleId: string;
  type: 'access' | 'refresh';
}
