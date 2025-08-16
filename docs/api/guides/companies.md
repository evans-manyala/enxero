# Companies API Documentation

## Overview

The Companies module provides endpoints for managing company information, settings, and company-related operations.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get All Companies

**GET** `/companies`

Retrieve a list of companies with pagination and filtering options.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10, max: 100)
- `search` (string): Search term for company name or email
- `status` (string): Filter by status (active, inactive, suspended)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "companies": [
      {
        "id": "uuid",
        "name": "Example Corp",
        "email": "contact@example.com",
        "phone": "+1234567890",
        "address": "123 Business St",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "postalCode": "10001",
        "status": "active",
        "subscriptionPlan": "premium",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
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

### Get Company by ID

**GET** `/companies/:id`

Retrieve a specific company by their ID.

**Path Parameters:**

- `id` (string): Company UUID

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
    "name": "Example Corp",
    "email": "contact@example.com",
    "phone": "+1234567890",
    "address": "123 Business St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "postalCode": "10001",
    "website": "https://example.com",
    "taxId": "12-3456789",
    "status": "active",
    "subscriptionPlan": "premium",
    "subscriptionExpiresAt": "2024-12-31T23:59:59Z",
    "settings": {
      "timezone": "America/New_York",
      "currency": "USD",
      "dateFormat": "MM/DD/YYYY"
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Company

**POST** `/companies`

Create a new company.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "New Company Inc",
  "email": "contact@newcompany.com",
  "phone": "+1234567890",
  "address": "456 Corporate Ave",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "postalCode": "90210",
  "website": "https://newcompany.com",
  "taxId": "98-7654321",
  "subscriptionPlan": "basic"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Company created successfully",
  "data": {
    "id": "uuid",
    "name": "New Company Inc",
    "email": "contact@newcompany.com",
    "status": "active",
    "subscriptionPlan": "basic",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Company

**PUT** `/companies/:id`

Update an existing company's information.

**Path Parameters:**

- `id` (string): Company UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Updated Company Name",
  "email": "updated@company.com",
  "phone": "+1987654321",
  "address": "789 Updated St",
  "city": "Chicago",
  "state": "IL",
  "country": "USA",
  "postalCode": "60601"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Company updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Company Name",
    "email": "updated@company.com",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Delete Company

**DELETE** `/companies/:id`

Delete a company (soft delete).

**Path Parameters:**

- `id` (string): Company UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Company deleted successfully"
}
```

### Get Company Settings

**GET** `/companies/:id/settings`

Get company-specific settings and configuration.

**Path Parameters:**

- `id` (string): Company UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "timezone": "America/New_York",
    "currency": "USD",
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "12h",
    "language": "en",
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    },
    "security": {
      "twoFactorAuth": true,
      "sessionTimeout": 3600,
      "passwordPolicy": "strong"
    }
  }
}
```

### Update Company Settings

**PUT** `/companies/:id/settings`

Update company settings and configuration.

**Path Parameters:**

- `id` (string): Company UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "timezone": "America/Los_Angeles",
  "currency": "EUR",
  "dateFormat": "DD/MM/YYYY",
  "notifications": {
    "email": true,
    "sms": true,
    "push": false
  }
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Company settings updated successfully",
  "data": {
    "timezone": "America/Los_Angeles",
    "currency": "EUR",
    "dateFormat": "DD/MM/YYYY",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Company Statistics

**GET** `/companies/:id/statistics`

Get company statistics and metrics.

**Path Parameters:**

- `id` (string): Company UUID

**Query Parameters:**

- `period` (string): Time period (daily, weekly, monthly, yearly)
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
    "totalEmployees": 150,
    "activeEmployees": 145,
    "totalRevenue": 2500000.0,
    "monthlyGrowth": 12.5,
    "subscriptionStatus": "active",
    "lastActivity": "2024-01-01T00:00:00Z",
    "metrics": {
      "payrollProcessed": 12,
      "leaveRequests": 45,
      "activeProjects": 8
    }
  }
}
```

### Update Subscription

**PUT** `/companies/:id/subscription`

Update company subscription plan.

**Path Parameters:**

- `id` (string): Company UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "plan": "premium",
  "billingCycle": "monthly",
  "autoRenew": true
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Subscription updated successfully",
  "data": {
    "plan": "premium",
    "billingCycle": "monthly",
    "autoRenew": true,
    "nextBillingDate": "2024-02-01T00:00:00Z"
  }
}
```

## Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Company name is required", "Invalid email format"]
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
  "message": "Company not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Company email already exists"
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
- Company data is isolated by company ID
- Subscription validation is performed
- Audit logging tracks all company operations
- Rate limiting is applied to prevent abuse
- Company deletion is soft-delete to preserve data integrity
