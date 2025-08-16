# Notifications API Documentation

## Overview

The Notifications module provides endpoints for managing user notifications, including listing, marking as read, deleting, and sending notifications. Notifications can be associated with specific users and include various types of messages.

## Base URL

```
/api/v1
```

## Authentication

All endpoints require authentication using a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### List Notifications

Retrieves a paginated list of notifications with optional filtering and sorting.

```http
GET /notifications
```

#### Query Parameters

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| page      | number | No       | Page number (default: 1)             |
| limit     | number | No       | Items per page (default: 10)         |
| search    | string | No       | Search term for message content      |
| type      | string | No       | Filter by notification type          |
| status    | string | No       | Filter by status (unread, read)      |
| sortBy    | string | No       | Sort field (createdAt, type, status) |
| sortOrder | string | No       | Sort direction (asc, desc)           |

#### Response

```json
{
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "companyId": "uuid",
      "type": "system_alert",
      "message": "System maintenance scheduled",
      "data": {
        "maintenanceTime": "2024-03-21T02:00:00Z"
      },
      "status": "unread",
      "createdAt": "2024-03-20T10:00:00Z",
      "updatedAt": "2024-03-20T10:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Mark Notification as Read

Marks a specific notification as read.

```http
PATCH /notifications/:id/read
```

#### Path Parameters

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| id        | string | Yes      | Notification UUID |

#### Response

204 No Content

### Delete Notification

Deletes a specific notification.

```http
DELETE /notifications/:id
```

#### Path Parameters

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| id        | string | Yes      | Notification UUID |

#### Response

204 No Content

### Send Notification

Sends a new notification to a specific user.

```http
POST /notifications/send
```

#### Request Body

```json
{
  "userId": "uuid",
  "type": "system_alert",
  "message": "System maintenance scheduled",
  "data": {
    "maintenanceTime": "2024-03-21T02:00:00Z"
  }
}
```

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| userId    | string | Yes      | UUID of the recipient user           |
| type      | string | Yes      | Type of notification                 |
| message   | string | Yes      | Notification message                 |
| data      | object | No       | Additional data for the notification |

#### Response

```json
{
  "id": "uuid",
  "userId": "uuid",
  "companyId": "uuid",
  "type": "system_alert",
  "message": "System maintenance scheduled",
  "data": {
    "maintenanceTime": "2024-03-21T02:00:00Z"
  },
  "status": "unread",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

## Error Responses

All endpoints may return the following error responses:

```json
{
  "message": "Error message"
}
```

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 400         | Bad Request - Invalid input             |
| 401         | Unauthorized - Invalid or missing token |
| 403         | Forbidden - Insufficient permissions    |
| 404         | Not Found - Resource doesn't exist      |
| 500         | Internal Server Error                   |

## Notification Types

The system supports various notification types, including but not limited to:

- `system_alert`: System-wide notifications
- `user_mention`: When a user is mentioned
- `document_shared`: When a document is shared
- `task_assigned`: When a task is assigned
- `comment_added`: When a comment is added
- `status_update`: When a status is updated

## Security Considerations

- Notifications are user-specific and can only be accessed by the intended recipient
- System notifications should be properly authorized
- Consider implementing rate limiting for notification sending
- Implement proper access control for notification management
