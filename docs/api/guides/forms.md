# Forms API Documentation

## Overview

The Forms module provides endpoints for managing dynamic forms, form submissions, and form-related operations.

**Base URL:** `/api/v1`

**Authentication:** All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

## Endpoints

### Get All Forms

**GET** `/forms`

Retrieve a list of forms with pagination and filtering options.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10, max: 100)
- `search` (string): Search term for form title
- `type` (string): Filter by form type
- `status` (string): Filter by status (active, inactive)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "forms": [
      {
        "id": "uuid",
        "title": "Employee Onboarding",
        "description": "Form for onboarding new employees",
        "type": "onboarding",
        "status": "active",
        "fields": [
          { "name": "firstName", "type": "text", "label": "First Name" },
          { "name": "lastName", "type": "text", "label": "Last Name" }
        ],
        "createdBy": "user_uuid",
        "companyId": "company_uuid",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 5, "pages": 1 }
  }
}
```

### Get Form by ID

**GET** `/forms/:id`

Retrieve a specific form by its ID.

**Path Parameters:**

- `id` (string): Form UUID

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
    "title": "Employee Onboarding",
    "description": "Form for onboarding new employees",
    "type": "onboarding",
    "status": "active",
    "fields": [
      { "name": "firstName", "type": "text", "label": "First Name" },
      { "name": "lastName", "type": "text", "label": "Last Name" }
    ],
    "createdBy": "user_uuid",
    "companyId": "company_uuid",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Form

**POST** `/forms`

Create a new form.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "title": "New Form",
  "description": "Form description",
  "type": "custom",
  "fields": [{ "name": "field1", "type": "text", "label": "Field 1" }],
  "status": "active"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Form created successfully",
  "data": { "id": "uuid" }
}
```

### Update Form

**PUT** `/forms/:id`

Update a form.

**Path Parameters:**

- `id` (string): Form UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "title": "Updated Form Title",
  "description": "Updated description",
  "fields": [
    { "name": "field1", "type": "text", "label": "Field 1" },
    { "name": "field2", "type": "number", "label": "Field 2" }
  ],
  "status": "inactive"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Form updated successfully"
}
```

### Delete Form

**DELETE** `/forms/:id`

Delete a form.

**Path Parameters:**

- `id` (string): Form UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Form deleted successfully"
}
```

### Submit Form

**POST** `/forms/:id/submit`

Submit a form response.

**Path Parameters:**

- `id` (string): Form UUID

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "data": {
    "field1": "value1",
    "field2": 123
  }
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": { "submissionId": "uuid" }
}
```

### Get Form Submissions

**GET** `/forms/:id/submissions`

Retrieve submissions for a specific form.

**Path Parameters:**

- `id` (string): Form UUID

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
    "submissions": [
      {
        "id": "uuid",
        "formId": "form_uuid",
        "data": { "field1": "value1", "field2": 123 },
        "submittedBy": "user_uuid",
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
  "errors": ["Title is required", "Fields must be an array"]
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
  "message": "Form not found"
}
```

**409 Conflict:**

```json
{
  "success": false,
  "message": "Form with this title already exists"
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
- Form data is isolated by company ID
- Form submissions are auditable
- Sensitive data is protected
- Rate limiting is applied to prevent abuse
