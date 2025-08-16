# Authentication API Documentation

## Overview

The Authentication module provides endpoints for user authentication, registration, password management, and account activation.

**Base URL:** `/api/v1`

**Authentication:** Most endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Example Corp",
  "role": "admin"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "status": "pending_activation"
  }
}
```

### Login

**POST** `/auth/login`

Authenticate user and receive access token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "companyId": "company_uuid"
    }
  }
}
```

### Activate Account

**POST** `/auth/activate`

Activate user account using activation token.

**Request Body:**

```json
{
  "token": "activation_token_here"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Account activated successfully"
}
```

### Forgot Password

**POST** `/auth/forgot-password`

Request password reset email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### Reset Password

**POST** `/auth/reset-password`

Reset password using reset token.

**Request Body:**

```json
{
  "token": "reset_token_here",
  "password": "newPassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Refresh Token

**POST** `/auth/refresh`

Refresh access token using refresh token.

**Headers:**

```
Authorization: Bearer <refresh_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here"
  }
}
```

### Logout

**POST** `/auth/logout`

Logout user and invalidate token.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Change Password

**POST** `/auth/change-password`

Change user password (authenticated).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email is required", "Password must be at least 8 characters"]
}
```

**401 Unauthorized:**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**403 Forbidden:**

```json
{
  "success": false,
  "message": "Account not activated"
}
```

**404 Not Found:**

```json
{
  "success": false,
  "message": "User not found"
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

- Passwords are hashed using bcrypt
- JWT tokens have expiration times
- Rate limiting is applied to login attempts
- Password reset tokens expire after 1 hour
- Account activation tokens expire after 24 hours
- All sensitive operations require proper authentication
