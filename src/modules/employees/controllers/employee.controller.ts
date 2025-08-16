import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  public getEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page, limit, search, department, position, status, sortBy, sortOrder } = req.query;
      const employees = await this.employeeService.getEmployees({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search: search as string,
        department: department as string,
        position: position as string,
        status: status as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });

      res.status(HttpStatus.OK).json({
        status: 'success',
        data: employees,
      });
    } catch (error) {
      logger.error('Error in getEmployees:', error);
      throw new AppError(
        'Failed to fetch employees',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

  public getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.getEmployeeById(id);

      if (!employee) {
        throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
      }

      res.status(HttpStatus.OK).json({
        status: 'success',
        data: employee,
      });
    } catch (error) {
      logger.error('Error in getEmployeeById:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

  public createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
      const employeeData = req.body;
      const employee = await this.employeeService.createEmployee(employeeData);

      res.status(HttpStatus.CREATED).json({
        status: 'success',
        data: employee,
      });
    } catch (error) {
      logger.error('Error in createEmployee:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to create employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

  public updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const employee = await this.employeeService.updateEmployee(id, updateData);

      if (!employee) {
        throw new AppError('Employee not found', HttpStatus.NOT_FOUND);
      }

      res.status(HttpStatus.OK).json({
        status: 'success',
        data: employee,
      });
    } catch (error) {
      logger.error('Error in updateEmployee:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to update employee',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

  public getEmployeeManager = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const manager = await this.employeeService.getEmployeeManager(id);

      if (!manager) {
        throw new AppError('Manager not found', HttpStatus.NOT_FOUND);
      }

      res.status(HttpStatus.OK).json({
        status: 'success',
        data: manager,
      });
    } catch (error) {
      logger.error('Error in getEmployeeManager:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee manager',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

  public getEmployeeDirectReports = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const directReports = await this.employeeService.getEmployeeDirectReports(id);

      res.status(HttpStatus.OK).json({
        status: 'success',
        data: directReports,
      });
    } catch (error) {
      logger.error('Error in getEmployeeDirectReports:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch employee direct reports',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };
} 