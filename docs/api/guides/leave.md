# Leave API Documentation

## Overview

The Leave module provides endpoints for managing leave types, leave requests, leave balances, and approvals for employees.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get Leave Types

**GET** `/leave/types`

Retrieve a list of leave types for the company.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "leaveTypes": [
      {
        "id": "uuid",
        "companyId": "company_uuid",
        "name": "Annual Leave",
        "description": "Paid annual leave",
        "maxDays": 30,
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Create Leave Type

**POST** `/leave/types`

Create a new leave type.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Sick Leave",
  "description": "Paid sick leave",
  "maxDays": 10
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Leave type created successfully",
  "data": { "id": "uuid" }
}
```

### Update Leave Type

**PUT** `/leave/types/:id`

Update a leave type.

**Path Parameters:**

- `id` (string): LeaveType UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Updated Leave Name",
  "description": "Updated description",
  "maxDays": 15,
  "isActive": true
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Leave type updated successfully"
}
```

### Get Leave Balances

**GET** `/leave/balances`

Retrieve leave balances for employees.

**Query Parameters:**

- `employeeId` (string): Filter by employee
- `year` (number): Filter by year

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "leaveBalances": [
      {
        "id": "uuid",
        "employeeId": "employee_uuid",
        "leaveTypeId": "leave_type_uuid",
        "year": 2024,
        "totalDays": 30,
        "usedDays": 5,
        "remainingDays": 25
      }
    ]
  }
}
```

### Get Leave Requests

**GET** `/leave/requests`

Retrieve a list of leave requests with filtering and pagination.

**Query Parameters:**

- `employeeId` (string): Filter by employee
- `status` (string): Filter by status (pending, approved, rejected, cancelled)
- `type` (string): Filter by leave type
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
    "leaveRequests": [
      {
        "id": "uuid",
        "employeeId": "employee_uuid",
        "leaveTypeId": "leave_type_uuid",
        "startDate": "2024-03-01",
        "endDate": "2024-03-05",
        "status": "pending",
        "reason": "Family vacation",
        "createdAt": "2024-02-15T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 5, "pages": 1 }
  }
}
```

### Create Leave Request

**POST** `/leave/requests`

Create a new leave request.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "leaveTypeId": "leave_type_uuid",
  "startDate": "2024-03-01",
  "endDate": "2024-03-05",
  "reason": "Family vacation"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Leave request created successfully",
  "data": { "id": "uuid", "status": "pending" }
}
```

### Update Leave Request

**PUT** `/leave/requests/:id`

Update a leave request.

**Path Parameters:**

- `id` (string): LeaveRequest UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "startDate": "2024-03-02",
  "endDate": "2024-03-06",
  "reason": "Updated reason"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Leave request updated successfully"
}
```

### Approve Leave Request

**POST** `/leave/requests/:id/approve`

Approve a leave request.

**Path Parameters:**

- `id` (string): LeaveRequest UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Leave request approved"
}
```

### Reject Leave Request

**POST** `/leave/requests/:id/reject`

Reject a leave request.

**Path Parameters:**

- `id` (string): LeaveRequest UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Leave request rejected"
}
```

### Cancel Leave Request

**POST** `/leave/requests/:id/cancel`

Cancel a leave request.

**Path Parameters:**

- `id` (string): LeaveRequest UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Leave request cancelled"
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
  "message": "Leave request not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Leave request already processed"
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
- Leave data is isolated by company ID
- Leave approvals are auditable
- Sensitive data is protected
- Rate limiting is applied to prevent abuse
