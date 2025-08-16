# Payroll API Documentation

## Overview

The Payroll module provides endpoints for managing payroll configurations, periods, records, and payroll processing for employees.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get Payroll Config

**GET** `/payroll/config`

Retrieve payroll configuration for the current company.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "companyId": "company_uuid",
    "payFrequency": "monthly",
    "taxSettings": { "taxRate": 0.15 },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Payroll Config

**POST** `/payroll/config`

Create payroll configuration for the company.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "payFrequency": "monthly",
  "taxSettings": { "taxRate": 0.15 }
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Payroll config created successfully",
  "data": { "id": "uuid", "companyId": "company_uuid" }
}
```

### Update Payroll Config

**PUT** `/payroll/config/:id`

Update payroll configuration.

**Path Parameters:**

- `id` (string): PayrollConfig UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "payFrequency": "biweekly",
  "taxSettings": { "taxRate": 0.18 }
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Payroll config updated successfully"
}
```

### List Payroll Periods

**GET** `/payroll/periods`

Retrieve a list of payroll periods.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)
- `status` (string): Filter by status (open, closed, processed)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "periods": [
      {
        "id": "uuid",
        "companyId": "company_uuid",
        "startDate": "2024-01-01",
        "endDate": "2024-01-31",
        "status": "open",
        "totalAmount": 100000.0,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 5, "pages": 1 }
  }
}
```

### Create Payroll Period

**POST** `/payroll/periods`

Create a new payroll period.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "startDate": "2024-02-01",
  "endDate": "2024-02-28"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Payroll period created successfully",
  "data": { "id": "uuid", "status": "open" }
}
```

### List Payroll Records

**GET** `/payroll/records`

Retrieve a list of payroll records for the company.

**Query Parameters:**

- `periodId` (string): Filter by payroll period
- `employeeId` (string): Filter by employee
- `status` (string): Filter by status (pending, processed, paid)
- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "uuid",
        "employeeId": "employee_uuid",
        "periodId": "period_uuid",
        "grossSalary": 5000.0,
        "totalDeductions": 500.0,
        "netPay": 4500.0,
        "status": "processed",
        "createdAt": "2024-01-31T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 20, "pages": 2 }
  }
}
```

### Get Payroll Record by ID

**GET** `/payroll/records/:id`

Retrieve a specific payroll record by its ID.

**Path Parameters:**

- `id` (string): PayrollRecord UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "employeeId": "employee_uuid",
    "periodId": "period_uuid",
    "grossSalary": 5000.0,
    "totalDeductions": 500.0,
    "netPay": 4500.0,
    "status": "processed",
    "createdAt": "2024-01-31T00:00:00Z"
  }
}
```

### Process Payroll

**POST** `/payroll/process/:periodId`

Process payroll for a specific period.

**Path Parameters:**

- `periodId` (string): PayrollPeriod UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Payroll processed successfully",
  "data": {
    "periodId": "period_uuid",
    "processedRecords": 50
  }
}
```

### Approve Payroll

**POST** `/payroll/approve/:periodId`

Approve payroll for a specific period.

**Path Parameters:**

- `periodId` (string): PayrollPeriod UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Payroll approved successfully"
}
```

## Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Start date is required", "End date must be after start date"]
}
```

**401 Unauthorized:**

```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden:**

```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

**404 Not Found:**

```json
{
  "success": false,
  "message": "Payroll record not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Payroll period already processed"
}
```

**500 Internal Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Security Considerations

- All endpoints require authentication
- Role-based access control is enforced
- Payroll data is isolated by company ID
- Payroll processing is auditable
- Sensitive data (salaries, deductions) is protected
- Rate limiting is applied to prevent abuse
