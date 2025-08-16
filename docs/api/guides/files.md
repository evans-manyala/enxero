# Files API Documentation

## Overview

The Files module provides endpoints for managing file uploads, downloads, and metadata. Files can be associated with specific entities (e.g., employees, companies) and include metadata such as description and tags.

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

### List Files

Retrieves a paginated list of files with optional filtering and sorting.

```http
GET /files
```

#### Query Parameters

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| page       | number | No       | Page number (default: 1)                 |
| limit      | number | No       | Items per page (default: 10)             |
| search     | string | No       | Search term for filename                 |
| entityType | string | No       | Filter by entity type (e.g., 'employee') |
| entityId   | string | No       | Filter by entity ID                      |
| sortBy     | string | No       | Sort field (filename, createdAt)         |
| sortOrder  | string | No       | Sort direction (asc, desc)               |

#### Response

```json
{
  "data": [
    {
      "id": "uuid",
      "filename": "example.pdf",
      "storageName": "1234567890_example.pdf",
      "mimetype": "application/pdf",
      "size": 1024,
      "description": "Example document",
      "tags": ["document", "pdf"],
      "entityType": "employee",
      "entityId": "uuid",
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

### Get File Metadata

Retrieves metadata for a specific file.

```http
GET /files/:id
```

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | File UUID   |

#### Response

```json
{
  "id": "uuid",
  "filename": "example.pdf",
  "storageName": "1234567890_example.pdf",
  "mimetype": "application/pdf",
  "size": 1024,
  "description": "Example document",
  "tags": ["document", "pdf"],
  "entityType": "employee",
  "entityId": "uuid",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

### Download File

Downloads a specific file.

```http
GET /files/:id/download
```

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | File UUID   |

#### Response

File stream with appropriate Content-Type and Content-Disposition headers.

### Upload File

Uploads a new file with optional metadata.

```http
POST /files/upload
```

#### Request Body (multipart/form-data)

| Parameter   | Type     | Required | Description                        |
| ----------- | -------- | -------- | ---------------------------------- |
| file        | file     | Yes      | The file to upload                 |
| description | string   | No       | File description                   |
| tags        | string[] | No       | Array of tags                      |
| entityType  | string   | No       | Type of entity the file belongs to |
| entityId    | string   | No       | ID of the entity                   |

#### Response

```json
{
  "id": "uuid",
  "filename": "example.pdf",
  "storageName": "1234567890_example.pdf",
  "mimetype": "application/pdf",
  "size": 1024,
  "description": "Example document",
  "tags": ["document", "pdf"],
  "entityType": "employee",
  "entityId": "uuid",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

### Delete File

Deletes a specific file and its metadata.

```http
DELETE /files/:id
```

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | File UUID   |

#### Response

204 No Content

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

## File Storage

Files are stored in the local filesystem under the `uploads` directory. Each file is stored with a unique name generated using a timestamp and the original filename.

## Security Considerations

- File uploads are restricted to authenticated users
- File types and sizes should be validated on the client side
- Consider implementing virus scanning for uploaded files
- Implement proper access control for file downloads
