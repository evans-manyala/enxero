# Integrations API Documentation

## Overview

The Integrations module provides endpoints for managing third-party integrations, integration logs, and related operations.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get All Integrations

**GET** `/integrations`

Retrieve a list of integrations for the company.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "id": "uuid",
        "companyId": "company_uuid",
        "name": "Slack",
        "type": "messaging",
        "status": "active",
        "config": { "webhookUrl": "https://hooks.slack.com/..." },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Get Integration by ID

**GET** `/integrations/:id`

Retrieve a specific integration by its ID.

**Path Parameters:**

- `id` (string): Integration UUID

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
    "name": "Slack",
    "type": "messaging",
    "status": "active",
    "config": { "webhookUrl": "https://hooks.slack.com/..." },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Integration

**POST** `/integrations`

Create a new integration.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Slack",
  "type": "messaging",
  "config": { "webhookUrl": "https://hooks.slack.com/..." }
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Integration created successfully",
  "data": { "id": "uuid" }
}
```

### Update Integration

**PUT** `/integrations/:id`

Update an integration.

**Path Parameters:**

- `id` (string): Integration UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Updated Integration",
  "type": "messaging",
  "config": { "webhookUrl": "https://hooks.slack.com/updated" },
  "status": "inactive"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Integration updated successfully"
}
```

### Delete Integration

**DELETE** `/integrations/:id`

Delete an integration.

**Path Parameters:**

- `id` (string): Integration UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Integration deleted successfully"
}
```

### Get Integration Logs

**GET** `/integrations/:id/logs`

Retrieve logs for a specific integration.

**Path Parameters:**

- `id` (string): Integration UUID

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)
- `status` (string): Filter by status (success, error)

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
        "integrationId": "integration_uuid",
        "status": "success",
        "message": "Message sent to Slack",
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
  "errors": ["Name is required", "Invalid config"]
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
  "message": "Integration not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Integration with this name already exists"
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
- Integration data is isolated by company ID
- Integration logs are auditable
- Sensitive data is protected
- Rate limiting is applied to prevent abuse
