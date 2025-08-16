import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';

export class RoleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRole(data: { name: string; description?: string; permissions: string[] }) {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: data.name },
    });

    if (existingRole) {
      throw new AppError('Role already exists', 400);
    }

    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissions,
      },
    });
  }

  async getRoles() {
    return this.prisma.role.findMany({
      where: { isActive: true },
    });
  }

  async getRoleById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new AppError('Role not found', 404);
    }

    return role;
  }

  async updateRole(id: string, data: { name?: string; description?: string; permissions?: string[]; isActive?: boolean }) {
    const role = await this.getRoleById(id);

    if (data.name && data.name !== role.name) {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: data.name },
      });

      if (existingRole) {
        throw new AppError('Role name already exists', 400);
      }
    }

    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async deleteRole(id: string) {
    const role = await this.getRoleById(id);

    // Check if role is assigned to any users
    const usersWithRole = await this.prisma.user.findFirst({
      where: { roleId: id },
    });

    if (usersWithRole) {
      throw new AppError('Cannot delete role that is assigned to users', 400);
    }

    return this.prisma.role.delete({
      where: { id },
    });
  }
} 