# Users API Documentation

## Overview

The Users module provides endpoints for managing user accounts, profiles, and user-related operations.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get All Users

**GET** `/users`

Retrieve a list of users with pagination and filtering options.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10, max: 100)
- `search` (string): Search term for email, firstName, or lastName
- `role` (string): Filter by role
- `status` (string): Filter by status (active, inactive, pending)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "admin",
        "status": "active",
        "companyId": "company_uuid",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

### Get User by ID

**GET** `/users/:id`

Retrieve a specific user by their ID.

**Path Parameters:**

- `id` (string): User UUID

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
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "status": "active",
    "companyId": "company_uuid",
    "lastLoginAt": "2024-01-01T00:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create User

**POST** `/users`

Create a new user account.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "user",
  "companyId": "company_uuid"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "user",
    "status": "active",
    "companyId": "company_uuid",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update User

**PUT** `/users/:id`

Update an existing user's information.

**Path Parameters:**

- `id` (string): User UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "firstName": "Updated John",
  "lastName": "Updated Doe",
  "role": "manager",
  "status": "active"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Updated John",
    "lastName": "Updated Doe",
    "role": "manager",
    "status": "active",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Delete User

**DELETE** `/users/:id`

Delete a user account.

**Path Parameters:**

- `id` (string): User UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Get User Profile

**GET** `/users/profile`

Get the current authenticated user's profile.

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
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "status": "active",
    "companyId": "company_uuid",
    "lastLoginAt": "2024-01-01T00:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update User Profile

**PUT** `/users/profile`

Update the current authenticated user's profile.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "firstName": "Updated John",
  "lastName": "Updated Doe"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "firstName": "Updated John",
    "lastName": "Updated Doe",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get User Activity

**GET** `/users/:id/activity`

Get user activity logs.

**Path Parameters:**

- `id` (string): User UUID

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)
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
    "activities": [
      {
        "id": "uuid",
        "action": "login",
        "description": "User logged in",
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
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
  "errors": ["Email is required", "Invalid email format"]
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
  "message": "User not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Email already exists"
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
- Users can only access their own profile or have admin permissions
- Password changes require current password verification
- User deletion is soft-delete (marks as inactive)
- Activity logging tracks all user actions
- Rate limiting is applied to prevent abuse
