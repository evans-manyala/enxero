# Audit API Documentation

## Overview

The Audit module provides endpoints for retrieving audit logs and tracking system and user activities for compliance and traceability.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get Audit Logs

**GET** `/audit/logs`

Retrieve a list of audit logs with filtering and pagination.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)
- `action` (string): Filter by action type
- `entityType` (string): Filter by entity type
- `entityId` (string): Filter by entity ID
- `userId` (string): Filter by user ID
- `startDate` (string): Start date filter (ISO format)
- `endDate` (string): End date filter (ISO format)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "action": "login",
        "entityType": "User",
        "entityId": "user_uuid",
        "userId": "user_uuid",
        "description": "User logged in",
        "ipAddress": "192.168.1.1",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 50, "pages": 5 }
  }
}
```

### Get Audit Log by ID

**GET** `/audit/logs/:id`

Retrieve a specific audit log by its ID.

**Path Parameters:**

- `id` (string): AuditLog UUID

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
    "action": "update_profile",
    "entityType": "User",
    "entityId": "user_uuid",
    "userId": "user_uuid",
    "description": "User updated profile",
    "ipAddress": "192.168.1.1",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Entity Audit Logs

**GET** `/audit/logs/entity/:entityType/:entityId`

Retrieve audit logs for a specific entity type and ID.

**Path Parameters:**

- `entityType` (string): Entity type (e.g., User, Company, Employee)
- `entityId` (string): Entity UUID

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
    "logs": [
      {
        "id": "uuid",
        "action": "update",
        "entityType": "Employee",
        "entityId": "employee_uuid",
        "userId": "user_uuid",
        "description": "Employee updated",
        "ipAddress": "192.168.1.1",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 2, "pages": 1 }
  }
}
```

## Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Invalid entity type"]
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
  "message": "Audit log not found"
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
- Audit logs are immutable
- Access to logs is restricted to authorized roles
- Audit data is isolated by company ID
- Audit logging is performed for all sensitive operations
- Rate limiting is applied to prevent abuse
