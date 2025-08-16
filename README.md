# Enxero Platform Backend

A robust backend service for the Enxero Platform built with Node.js, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (RBAC)
  - Refresh token mechanism for secure session management
  - Password hashing and history tracking for enhanced security
  - Account status management (active, suspended, deactivated)

- **User Management**

  - Comprehensive User Profile management (CRUD operations)
  - Retrieve user password history (securely)
  - Advanced user listing with pagination, search, filtering (by role and active status), and sorting
  - Update user accounts and account status

- **Role Management**

  - CRUD operations for roles
  - Assign and manage permissions for each role
  - Secure role assignment to users

- **Company Management**

  - Company profile and settings management
  - Multi-tenant architecture support
  - Company-specific configurations

- **Employee Management**

  - Complete employee lifecycle management
  - Employee profiles, documents, and history
  - Organizational hierarchy and reporting structure

- **Payroll Management**

  - Payroll configuration and processing
  - Payroll periods and records
  - Salary calculations and deductions

- **Leave Management**

  - Leave types and policies
  - Leave requests and approvals
  - Leave balance tracking

- **Forms Management**

  - Dynamic form creation and management
  - Form submissions and data collection
  - Custom form fields and validation

- **File Management**

  - Secure file upload and storage
  - File metadata and organization
  - Entity-based file associations

- **Notifications**

  - Real-time notification system
  - Multiple notification types
  - User-specific notification management

- **Audit Logging**

  - Comprehensive activity tracking
  - System and user action logging
  - Compliance and security auditing

- **Integrations**

  - Third-party service integrations
  - Webhook management
  - Integration monitoring and logging

- **System Configuration**
  - System-wide settings management
  - Configuration versioning
  - Environment-specific configurations

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** zod
- **Testing:** Jest
- **Documentation:** Swagger (OpenAPI, auto-generated)
- **Caching:** Redis (via ioredis)
- **File Storage:** Local filesystem (configurable for cloud storage)

## 📁 Project Structure

```
backend
├── README.md
├── docs/
│   └── api/                    # API documentation files
│       ├── openapi.md          # ← Auto-generated, up-to-date API reference (Markdown)
│       ├── openapi.html        # ← Auto-generated, browsable HTML API doc (optional)
│       └── guides/             # ← Guides, onboarding, and conceptual docs (old per-endpoint .md files)
│           ├── auth.md
│           ├── users.md
│           ├── companies.md
│           ├── employees.md
│           ├── payroll.md
│           ├── leave.md
│           ├── forms.md
│           ├── files.md
│           ├── notifications.md
│           ├── audit.md
│           ├── integrations.md
│           └── system.md
├── prisma/
│   ├── migrations/            # Database migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/                # Configuration files
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── swagger.ts
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management
│   │   ├── roles/             # Role management
│   │   ├── companies/         # Company management
│   │   ├── employees/         # Employee management
│   │   ├── payroll/           # Payroll management
│   │   ├── leave/             # Leave management
│   │   ├── forms/             # Forms management
│   │   ├── files/             # File management
│   │   ├── notifications/     # Notifications
│   │   ├── audit/             # Audit logging
│   │   ├── integrations/      # Third-party integrations
│   │   └── system/            # System configuration
│   ├── routes/                # Route registration
│   ├── shared/                # Shared utilities
│   │   ├── middlewares/       # Express middlewares
│   │   ├── services/          # Shared services
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utility functions
│   └── test/                  # Automated tests (API, integration, unit)
├── uploads/                   # File upload directory
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (optional, for caching)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/enxero-platform-backend.git
   cd enxero-platform-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration.

4. **Set up the database:**

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run prisma:studio` - Open Prisma Studio for database management
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database with initial data
- `npm run generate:api-docs:all` - Build, generate Markdown and HTML API docs (see below)

## 📚 API Documentation

### **Automated API Reference**

- **`openapi.md`**: The single source of truth for your API reference, always up-to-date and auto-generated from inline Swagger JSDoc comments in the codebase.
- **`openapi.html`**: (Optional) A beautiful, browsable HTML version of the API docs, also auto-generated.
- **How to generate:**
  ```bash
  npm run generate:api-docs:all
  ```
  This will build your TypeScript, generate `openapi.md` and `openapi.html` in `docs/api/`.
- **Tip:** Open `openapi.html` in your browser for a rich, interactive API documentation experience.

### **Guides and Onboarding**

- The `docs/api/guides/` folder contains conceptual, onboarding, and extended documentation.
- The old per-endpoint markdown files (e.g., `auth.md`, `users.md`, etc.) are now considered guides and are no longer the main API reference.
- You can add new guides for onboarding, authentication, best practices, or any other narrative documentation.

### **How It Works**

- The API reference is generated from inline Swagger JSDoc comments in your route files (see `src/modules/*/routes/*.ts`).
- This ensures your documentation is always in sync with your codebase.
- The guides folder is for any additional documentation you want to provide beyond the auto-generated API reference.

### **Interactive Docs**

- When running the server, interactive Swagger UI is available at `/api-docs` (e.g., `http://localhost:3000/api-docs`).

## API Versioning

The API follows semantic versioning (v1, v2, etc.).

- **Current version:** v1
- **Base URL:** `http://localhost:3000/api/v1`

## 🔒 Security

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Helmet security headers
- Input validation with zod
- SQL injection prevention (Prisma ORM)
- Audit logging for compliance

## 📝 Environment Variables

Required environment variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/enxero_db"

# JWT Authentication
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis (Optional - for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# CORS
CORS_ORIGIN=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Users** - User accounts and authentication
- **Roles** - Role definitions and permissions
- **Companies** - Multi-tenant company data
- **Employees** - Employee information and relationships
- **Payroll** - Payroll configurations, periods, and records
- **Leave** - Leave types, requests, and balances
- **Forms** - Dynamic forms and submissions
- **Files** - File storage and metadata
- **Notifications** - User notifications
- **Audit Logs** - System activity tracking
- **Integrations** - Third-party service connections
- **System Configs** - System-wide configurations

For detailed schema information, refer to `prisma/schema.prisma`

## 🧪 Testing

All test files are located in the `src/test/` directory.

Run the test suite:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## 🚢 Deployment

### Production Deployment

1. Set environment variables for production
2. Run database migrations: `npm run prisma:migrate`
3. Build the application: `npm run build`
4. Start the server: `npm start`

### Docker Deployment

```bash
# Build the Docker image
docker build -t enxero-platform-backend .

# Run the container
docker run -p 3000:3000 enxero-platform-backend
```

## 📈 Monitoring & Health Checks

### Health Check Endpoints

- `GET /health` - Basic health check
- `GET /api/v1/health` - API health check

### Logging

The application uses Winston for structured logging with different levels:

- Error logging for debugging
- Request/response logging
- Audit trail logging

### Monitoring Integration

Can be integrated with:

- Prometheus for metrics
- Grafana for visualization
- ELK Stack for log management

## 🔄 Development Workflow

### Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Hotfixes: `hotfix/issue-description`

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Jest for testing

## 📞 Support

For support and questions:

- Email: support@enxero.com
- Documentation: `http://localhost:3000/api-docs`
- Issues: GitHub Issues

## 📄 License

This project is licensed under the MIT License.
