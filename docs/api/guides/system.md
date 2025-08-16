# System API Documentation

## Overview

The System module provides endpoints for managing system-wide configurations, logs, and system health checks.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get System Configurations

**GET** `/system/configs`

Retrieve a list of system configurations.

**Query Parameters:**

- `key` (string): Filter by config key
- `active` (boolean): Filter by active status
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
    "configs": [
      {
        "id": "uuid",
        "key": "maintenanceMode",
        "value": true,
        "description": "Enable/disable maintenance mode",
        "active": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 2, "pages": 1 }
  }
}
```

### Get System Config by Key

**GET** `/system/configs/:key`

Retrieve a specific system configuration by its key.

**Path Parameters:**

- `key` (string): Config key

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
    "key": "maintenanceMode",
    "value": true,
    "description": "Enable/disable maintenance mode",
    "active": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create System Config

**POST** `/system/configs`

Create a new system configuration.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "key": "newConfigKey",
  "value": "some value",
  "description": "Description of the config",
  "active": true
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "System config created successfully",
  "data": { "id": "uuid" }
}
```

### Update System Config

**PUT** `/system/configs/:key`

Update a system configuration by key.

**Path Parameters:**

- `key` (string): Config key

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "value": "updated value",
  "description": "Updated description",
  "active": false
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "System config updated successfully"
}
```

### Get System Logs

**GET** `/system/logs`

Retrieve a list of system logs with filtering and pagination.

**Query Parameters:**

- `level` (string): Filter by log level (info, warning, error)
- `startDate` (string): Start date filter (ISO format)
- `endDate` (string): End date filter (ISO format)
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
        "level": "info",
        "message": "System started",
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
  "errors": ["Key is required"]
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
  "message": "System config not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Config with this key already exists"
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
- System configs are auditable
- Sensitive configs are protected
- Rate limiting is applied to prevent abuse
