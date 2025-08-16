# Employees API Documentation

## Overview

The Employees module provides endpoints for managing employee information, profiles, and employee-related operations.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get All Employees

**GET** `/employees`

Retrieve a list of employees with pagination and filtering options.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10, max: 100)
- `search` (string): Search term for firstName, lastName, or email
- `department` (string): Filter by department
- `status` (string): Filter by status (active, inactive, terminated)
- `position` (string): Filter by job position

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "employees": [
      {
        "id": "uuid",
        "employeeId": "EMP001",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@company.com",
        "phone": "+1234567890",
        "position": "Software Engineer",
        "department": "Engineering",
        "status": "active",
        "hireDate": "2023-01-15",
        "salary": 75000.0,
        "managerId": "manager_uuid",
        "companyId": "company_uuid",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15
    }
  }
}
```

### Get Employee by ID

**GET** `/employees/:id`

Retrieve a specific employee by their ID.

**Path Parameters:**

- `id` (string): Employee UUID

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
    "employeeId": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-05-15",
    "address": "123 Employee St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "position": "Software Engineer",
    "department": "Engineering",
    "hireDate": "2023-01-15",
    "salary": 75000.0,
    "managerId": "manager_uuid",
    "companyId": "company_uuid",
    "status": "active",
    "emergencyContact": {
      "name": "Jane Doe",
      "relationship": "Spouse",
      "phone": "+1234567891"
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Employee

**POST** `/employees`

Create a new employee record.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "phone": "+1234567890",
  "dateOfBirth": "1992-08-20",
  "address": "456 New Employee Ave",
  "city": "Los Angeles",
  "state": "CA",
  "postalCode": "90210",
  "country": "USA",
  "position": "Marketing Manager",
  "department": "Marketing",
  "hireDate": "2024-01-01",
  "salary": 65000.0,
  "managerId": "manager_uuid"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": "uuid",
    "employeeId": "EMP002",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@company.com",
    "position": "Marketing Manager",
    "department": "Marketing",
    "status": "active",
    "hireDate": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Employee

**PUT** `/employees/:id`

Update an existing employee's information.

**Path Parameters:**

- `id` (string): Employee UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "firstName": "Updated John",
  "lastName": "Updated Doe",
  "position": "Senior Software Engineer",
  "department": "Engineering",
  "salary": 85000.0
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": "uuid",
    "firstName": "Updated John",
    "lastName": "Updated Doe",
    "position": "Senior Software Engineer",
    "department": "Engineering",
    "salary": 85000.0,
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Delete Employee

**DELETE** `/employees/:id`

Delete an employee record (soft delete).

**Path Parameters:**

- `id` (string): Employee UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

### Get Employee Manager

**GET** `/employees/:id/manager`

Get the manager of a specific employee.

**Path Parameters:**

- `id` (string): Employee UUID

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
    "employeeId": "EMP003",
    "firstName": "Manager",
    "lastName": "Johnson",
    "email": "manager.johnson@company.com",
    "position": "Engineering Manager",
    "department": "Engineering"
  }
}
```

### Get Employee Direct Reports

**GET** `/employees/:id/direct-reports`

Get all direct reports of a specific employee.

**Path Parameters:**

- `id` (string): Employee UUID

**Query Parameters:**

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
    "directReports": [
      {
        "id": "uuid",
        "employeeId": "EMP004",
        "firstName": "Direct",
        "lastName": "Report",
        "email": "direct.report@company.com",
        "position": "Junior Developer",
        "department": "Engineering"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}
```

### Get Employee Documents

**GET** `/employees/:id/documents`

Get all documents associated with an employee.

**Path Parameters:**

- `id` (string): Employee UUID

**Query Parameters:**

- `type` (string): Filter by document type
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
    "documents": [
      {
        "id": "uuid",
        "filename": "employment_contract.pdf",
        "type": "contract",
        "size": 1024000,
        "uploadedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8,
      "pages": 1
    }
  }
}
```

### Upload Employee Document

**POST** `/employees/:id/documents`

Upload a document for an employee.

**Path Parameters:**

- `id` (string): Employee UUID

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body:**

```
Form data with file and metadata
```

**Response (201):**

```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": "uuid",
    "filename": "new_document.pdf",
    "type": "contract",
    "size": 2048000,
    "uploadedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Employee History

**GET** `/employees/:id/history`

Get employee history and changes.

**Path Parameters:**

- `id` (string): Employee UUID

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)
- `type` (string): Filter by change type

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "history": [
      {
        "id": "uuid",
        "type": "position_change",
        "description": "Position changed from Junior Developer to Software Engineer",
        "changedBy": "admin_uuid",
        "changedAt": "2024-01-01T00:00:00Z",
        "oldValue": "Junior Developer",
        "newValue": "Software Engineer"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

## Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["First name is required", "Invalid email format"]
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
  "message": "Employee not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Employee email already exists"
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
- Employee data is isolated by company ID
- Sensitive information (salary, personal details) requires appropriate permissions
- Document uploads are validated for security
- Employee deletion is soft-delete to preserve data integrity
- Audit logging tracks all employee operations
- Rate limiting is applied to prevent abuse
