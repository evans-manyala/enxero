import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  private readonly redis: Redis;
  private readonly defaultTTL: number = 3600; // 1 hour in seconds

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
      password: this.configService.get('REDIS_PASSWORD'),
      db: this.configService.get('REDIS_DB', 0),
    });
  }

  // Payroll Caching Methods
  async getPayrollConfig(companyId: string): Promise<any> {
    const key = `payroll:config:${companyId}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setPayrollConfig(companyId: string, config: any): Promise<void> {
    const key = `payroll:config:${companyId}`;
    await this.redis.set(key, JSON.stringify(config), 'EX', this.defaultTTL);
  }

  async getPayrollPeriod(companyId: string, periodId: string): Promise<any> {
    const key = `payroll:period:${companyId}:${periodId}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setPayrollPeriod(companyId: string, periodId: string, period: any): Promise<void> {
    const key = `payroll:period:${companyId}:${periodId}`;
    await this.redis.set(key, JSON.stringify(period), 'EX', this.defaultTTL);
  }

  async getEmployeePayroll(employeeId: string, periodId: string): Promise<any> {
    const key = `payroll:employee:${employeeId}:${periodId}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setEmployeePayroll(employeeId: string, periodId: string, payroll: any): Promise<void> {
    const key = `payroll:employee:${employeeId}:${periodId}`;
    await this.redis.set(key, JSON.stringify(payroll), 'EX', this.defaultTTL);
  }

  // Leave Management Caching Methods
  async getLeaveBalance(employeeId: string, year: number): Promise<any> {
    const key = `leave:balance:${employeeId}:${year}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setLeaveBalance(employeeId: string, year: number, balance: any): Promise<void> {
    const key = `leave:balance:${employeeId}:${year}`;
    await this.redis.set(key, JSON.stringify(balance), 'EX', this.defaultTTL);
  }

  async getLeaveTypes(companyId: string): Promise<any> {
    const key = `leave:types:${companyId}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setLeaveTypes(companyId: string, types: any): Promise<void> {
    const key = `leave:types:${companyId}`;
    await this.redis.set(key, JSON.stringify(types), 'EX', this.defaultTTL);
  }

  async getLeaveRequests(employeeId: string, status?: string): Promise<any> {
    const key = `leave:requests:${employeeId}:${status || 'all'}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async setLeaveRequests(employeeId: string, requests: any, status?: string): Promise<void> {
    const key = `leave:requests:${employeeId}:${status || 'all'}`;
    await this.redis.set(key, JSON.stringify(requests), 'EX', this.defaultTTL);
  }

  // Generic Cache Methods
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl || this.defaultTTL);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async deletePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Cache Invalidation Methods
  async invalidatePayrollCache(companyId: string): Promise<void> {
    await this.deletePattern(`payroll:*:${companyId}:*`);
  }

  async invalidateEmployeePayrollCache(employeeId: string): Promise<void> {
    await this.deletePattern(`payroll:employee:${employeeId}:*`);
  }

  async invalidateLeaveCache(employeeId: string): Promise<void> {
    await this.deletePattern(`leave:*:${employeeId}:*`);
  }

  async invalidateCompanyLeaveCache(companyId: string): Promise<void> {
    await this.deletePattern(`leave:*:${companyId}:*`);
  }
} 