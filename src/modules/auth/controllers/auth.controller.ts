import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ILoginDto, IRegisterDto, IRefreshTokenDto } from '../interfaces/auth.interface';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const data: IRegisterDto = req.body;
      const result = await this.authService.register(data);
      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('Register error:', error);
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
        details: error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: ILoginDto = req.body;
      const result = await this.authService.login(data);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
        details: error,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const data: IRefreshTokenDto = req.body;
      const result = await this.authService.refreshToken(data);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
