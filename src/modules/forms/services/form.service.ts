import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../../../shared/utils/AppError';
import { HttpStatus } from '../../../shared/utils/http-status';
import logger from '../../../shared/utils/logger';
import { v4 as uuidv4 } from 'uuid';

interface GetFormsOptions {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  status?: 'draft' | 'published' | 'archived';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface CreateFormData {
  title: string;
  description?: string;
  type: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    validation?: Record<string, any>;
  }>;
  status: 'draft' | 'published' | 'archived';
  companyId: string;
  userId: string;
}

interface UpdateFormData {
  title?: string;
  description?: string;
  type?: string;
  fields?: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    validation?: Record<string, any>;
  }>;
  status?: 'draft' | 'published' | 'archived';
}

export class FormService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getForms(options: GetFormsOptions) {
    try {
      const { page, limit, search, status, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.formsWhereInput = {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
                  { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      };

      const [forms, total] = await Promise.all([
        this.prisma.forms.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
          include: {
            companies: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        this.prisma.forms.count({ where }),
      ]);

      return {
        data: forms,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getForms service:', error);
      throw new AppError(
        'Failed to fetch forms',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getFormById(id: string) {
    try {
      const form = await this.prisma.forms.findUnique({
        where: { id },
        include: {
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          formFields: true,
          form_submissions: {
            take: 10,
            orderBy: { submittedAt: 'desc' },
          },
        },
      });

      if (!form) {
        throw new AppError('Form not found', HttpStatus.NOT_FOUND);
      }

      return form;
    } catch (error) {
      logger.error('Error in getFormById service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to fetch form',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createForm(data: CreateFormData) {
    try {
      const form = await this.prisma.forms.create({
        data: {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          category: data.type,
          status: data.status,
          isTemplate: false,
          settings: {},
          createdAt: new Date(),
          updatedAt: new Date(),
          companyId: data.companyId,
          createdBy: data.userId,
          formFields: {
            create: data.fields.map((field) => ({
              ...field,
              id: uuidv4(),
              order: 0,
            })),
          },
        },
        include: {
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          formFields: true,
        },
      });
      return form;
    } catch (error) {
      logger.error('Error in createForm service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(
            'Form with this title already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to create form',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateForm(id: string, data: UpdateFormData) {
    try {
      const form = await this.prisma.forms.update({
        where: { id },
        data,
        include: {
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return form;
    } catch (error) {
      logger.error('Error in updateForm service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Form not found', HttpStatus.NOT_FOUND);
        }
        if (error.code === 'P2002') {
          throw new AppError(
            'Form with this title already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new AppError(
        'Failed to update form',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteForm(id: string) {
    try {
      await this.prisma.forms.delete({
        where: { id },
      });
    } catch (error) {
      logger.error('Error in deleteForm service:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError('Form not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new AppError(
        'Failed to delete form',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async submitForm(id: string, data: Record<string, any>, userId: string) {
    try {
      const form = await this.prisma.forms.findUnique({
        where: { id },
        include: {
          formFields: true,
        },
      });

      if (!form) {
        throw new AppError('Form not found', HttpStatus.NOT_FOUND);
      }

      if (form.status !== 'published') {
        throw new AppError(
          'Cannot submit to a non-published form',
          HttpStatus.BAD_REQUEST
        );
      }

      // Transform responses array to field name mapping if needed
      let fieldData: Record<string, any> = data;
      if (data.responses && Array.isArray(data.responses)) {
        fieldData = {};
        for (const response of data.responses) {
          if (response.fieldName && response.value !== undefined) {
            fieldData[response.fieldName] = response.value;
          }
        }
      }

      // Validate required fields
      const requiredFields = form.formFields.filter((field: any) => field.required);
      for (const field of requiredFields) {
        if (!fieldData[field.name]) {
          throw new AppError(
            `Field ${field.label} is required`,
            HttpStatus.BAD_REQUEST
          );
        }
      }

      const submission = await this.prisma.form_submissions.create({
        data: {
          id: uuidv4(),
          formId: id,
          submittedBy: userId,
          submittedAt: new Date(),
        },
      });

      return submission;
    } catch (error) {
      logger.error('Error in submitForm service:', error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        'Failed to submit form',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getFormSubmissions(id: string, options: GetFormsOptions) {
    try {
      const { page, limit, search, status, sortBy, sortOrder } = options;
      const skip = (page - 1) * limit;

      const where: Prisma.form_submissionsWhereInput = {
        formId: id,
      };

      const [submissions, total] = await Promise.all([
        this.prisma.form_submissions.findMany({
          where,
          skip,
          take: limit,
          orderBy: { submittedAt: sortOrder || 'desc' },
        }),
        this.prisma.form_submissions.count({ where }),
      ]);

      return {
        data: submissions,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error in getFormSubmissions service:', error);
      throw new AppError(
        'Failed to fetch form submissions',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 