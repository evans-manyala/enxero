import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';

interface GetEmployeesOptions {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  position?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface CreateEmployeeData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department: string;
  position: string;
  status: string;
  hireDate: Date;
  terminationDate?: Date;
  salary: number;
  emergencyContact?: Record<string, any>;
  address?: Record<string, any>;
  bankDetails?: Record<string, any>;
  taxInfo?: Record<string, any>;
  benefits?: Record<string, any>;
  managerId?: string;
  companyId: string;
}

interface UpdateEmployeeData {
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  status?: string;
  hireDate?: Date;
  terminationDate?: Date;
  salary?: number;
  emergencyContact?: Record<string, any>;
  address?: Record<string, any>;
  bankDetails?: Record<string, any>;
  taxInfo?: Record<string, any>;
  benefits?: Record<string, any>;
  managerId?: string;
}

export class EmployeeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getEmployees(options: GetEmployeesOptions) {
    try {
      const { page, limit, search, department, position, status, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.EmployeeWhereInput = {
        AND: [
          search
            ? {
                OR: [
                  {
                    firstName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    lastName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              }
            : {},
          department ? { department } : {},
          position ? { position } : {},
          status ? { status } : {},
        ],
      };

      const orderBy: Prisma.EmployeeOrderByWithRelationInput = sortBy
        ? { [sortBy]: sortOrder || 'asc' }
        : { createdAt: 'desc' };

      const [employees, total] = await Promise.all([
        this.prisma.employee.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            manager: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                position: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                role: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),
        this.prisma.employee.count({ where }),
      ]);

      return {
        data: employees,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getEmployees service:', error);
      throw new AppError(
        'Failed to fetch employees',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getEmployeeById(id: string) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          directReports: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
            },
          },
        },
      });

      if (!employee) {
        throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
      }

      return employee;
    } catch (error) {
      logger.error('Error in getEmployeeById service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createEmployee(data: CreateEmployeeData) {
    try {
      const { managerId, companyId, ...employeeData } = data;
      const employee = await this.prisma.employee.create({
        data: {
          ...employeeData,
          emergencyContact: data.emergencyContact || {},
          address: data.address || {},
          bankDetails: data.bankDetails || {},
          taxInfo: data.taxInfo || {},
          benefits: data.benefits || {},
          manager: managerId ? {
            connect: { id: managerId }
          } : undefined,
          company: {
            connect: { id: companyId }
          }
        },
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return employee;
    } catch (error) {
      logger.error('Error in createEmployee service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(
            'Employee with this email or employee ID already exists',
            HttpStatus.CONFLICT
          );
        }
        if (error.code === 'P2025') {
          throw new AppError(
            'Company or manager not found',
            HttpStatus.NOT_FOUND
          );
        }
      }
      throw new AppError(
        'Failed to create employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateEmployee(id: string, data: UpdateEmployeeData) {
    try {
      const employee = await this.prisma.employee.update({
        where: { id },
        data: {
          ...data,
          emergencyContact: data.emergencyContact
            ? { ...data.emergencyContact }
            : undefined,
          address: data.address ? { ...data.address } : undefined,
          bankDetails: data.bankDetails ? { ...data.bankDetails } : undefined,
          taxInfo: data.taxInfo ? { ...data.taxInfo } : undefined,
          benefits: data.benefits ? { ...data.benefits } : undefined,
        },
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
            },
          },
        },
      });

      return employee;
    } catch (error) {
      logger.error('Error in updateEmployee service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
        }
        if (error.code === 'P2002') {
          throw new AppError(
            'Employee with this email or employee ID already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to update employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getEmployeeManager(id: string) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
              department: true,
            },
          },
        },
      });

      if (!employee) {
        throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
      }

      if (!employee.manager) {
        throw new AppError('Employee has no manager', HttpStatus.NOT_FOUND);
      }

      return employee.manager;
    } catch (error) {
      logger.error('Error in getEmployeeManager service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee manager',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getEmployeeDirectReports(id: string) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          directReports: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
              department: true,
            },
          },
        },
      });

      if (!employee) {
        throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
      }

      return employee.directReports;
    } catch (error) {
      logger.error('Error in getEmployeeDirectReports service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee direct reports',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 