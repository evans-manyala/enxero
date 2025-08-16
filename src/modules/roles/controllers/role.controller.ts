import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async createRole(req: Request, res: Response) {
    try {
      const role = await this.roleService.createRole(req.body);
      res.status(201).json({ status: 'success', data: role });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getRoles();
      res.json({ status: 'success', data: roles });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const role = await this.roleService.getRoleById(req.params.id);
      res.json({ status: 'success', data: role });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const role = await this.roleService.updateRole(req.params.id, req.body);
      res.json({ status: 'success', data: role });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      await this.roleService.deleteRole(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
} 