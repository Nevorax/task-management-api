# Task Management API

A scalable task management REST API built with Node.js, featuring authentication, user-based data isolation, filtering, pagination, and clean architecture principles. Designed to simulate a real-world backend system.

## 📋 Project Overview

This project implements a complete task management backend system with:
- User authentication and authorization
- RESTful API endpoints for task management
- PostgreSQL database integration
- Proper middleware configuration
- Error handling and validation
- Clean architecture pattern

---

## 🚀 Implementation Steps

### Step 1: Project Setup & Dependencies
- **Status**: ✅ COMPLETED
- **Description**: Initialize project with Node.js, Express, and required dependencies
- **Files Involved**:
  - `package.json` - Project configuration and dependencies
  - `src/index.js` - Application entry point
  - `src/app.js` - Express app initialization

### Step 2: Environment Configuration
- **Status**: ⏳ TODO
- **Description**: Set up environment variables for database connection and API configuration
- **Files to Create**:
  - `.env` - Environment variables file (add to .gitignore)
  - `.env.example` - Template for environment variables
  - `src/config/database.js` - PostgreSQL connection configuration
  - `src/config/index.js` - Centralized config exports
- **Required Variables**:
  ```
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=task_management
  DB_USER=postgres
  DB_PASSWORD=your_password
  JWT_SECRET=your_jwt_secret
  PORT=3000
  NODE_ENV=development
  ```

### Step 3: Database Schema & Models
- **Status**: ⏳ TODO
- **Description**: Create PostgreSQL database and define data models
- **Files to Create**:
  - `src/models/User.js` - User model (id, email, password_hash, created_at)
  - `src/models/Task.js` - Task model (id, user_id, title, description, status, priority, created_at, updated_at)
  - Database migration scripts
- **Dependencies to Install**: `pg`, `bcrypt`, `jsonwebtoken`
- **Key Fields**:
  - Users: id, email, password_hash, created_at, updated_at
  - Tasks: id, user_id, title, description, status (pending/in_progress/completed), priority (low/medium/high), created_at, updated_at

### Step 4: Middleware Setup
- **Status**: ⏳ TODO
- **Description**: Implement global and route-specific middleware
- **Files to Create**:
  - `src/middlewares/errorHandler.js` - Global error handling middleware
  - `src/middlewares/authentication.js` - JWT verification middleware
  - `src/middlewares/validation.js` - Input validation middleware
  - `src/middlewares/requestLogger.js` - Request logging middleware
- **Middleware Functions**:
  - CORS configuration
  - JSON body parsing
  - Request logging
  - JWT authentication
  - Error handling

### Step 5: User Authentication Service
- **Status**: ⏳ TODO
- **Description**: Implement user registration and login functionality
- **Files to Create**:
  - `src/services/userService.js` - User business logic
  - `src/controller/userController.js` - User route handlers
  - `src/routes/userRoutes.js` - User endpoints
- **Endpoints**:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login (returns JWT token)
  - `GET /api/auth/profile` - Get current user profile (protected)
- **Implementation Details**:
  - Hash passwords with bcrypt
  - Generate JWT tokens on login
  - Validate email format and password strength

### Step 6: Task Management Service - CRUD Operations
- **Status**: ⏳ TODO
- **Description**: Implement complete task management endpoints
- **Files to Create**:
  - `src/services/taskService.js` - Task business logic
  - `src/controller/taskController.js` - Task route handlers
  - `src/routes/taskRoutes.js` - Task endpoints
- **Endpoints**:
  - `POST /api/tasks` - Create a new task (protected)
  - `GET /api/tasks` - List all tasks for logged-in user with filtering & pagination (protected)
  - `GET /api/tasks/:id` - Get a specific task (protected)
  - `PUT /api/tasks/:id` - Update a task (protected)
  - `DELETE /api/tasks/:id` - Delete a task (protected)
- **Features**:
  - User-based data isolation (only see own tasks)
  - Filter by status and priority
  - Pagination support (limit, offset)
  - Sorting options (created_at, priority)

### Step 7: Input Validation & Error Handling
- **Status**: ⏳ TODO
- **Description**: Implement comprehensive validation and error handling
- **Implementation**:
  - Validate email format in registration
  - Validate required fields in task creation
  - Implement consistent error response format
  - Handle 404, 400, 401, 403, 500 errors appropriately
- **Error Response Format**:
  ```json
  {
    "success": false,
    "error": "Error message",
    "statusCode": 400
  }
  ```

### Step 8: Testing
- **Status**: ⏳ TODO
- **Description**: Write unit and integration tests for all endpoints
- **Tools**: Jest or Mocha + Chai
- **Coverage**:
  - User registration and login
  - Task CRUD operations
  - Authentication middleware
  - Input validation
  - Error handling

### Step 9: Documentation & Deployment
- **Status**: ⏳ TODO
- **Description**: Create API documentation and prepare for deployment
- **Documentation**:
  - API endpoint documentation (Swagger/OpenAPI)
  - Setup instructions
  - Example requests and responses
- **Deployment**:
  - Production environment configuration
  - Database backup strategy
  - Error logging setup

---

## 📦 Required Dependencies

```bash
npm install express cors dotenv pg bcrypt jsonwebtoken
npm install --save-dev nodemon
```

## 🛠️ Quick Start

### Installation
```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

### Environment Setup
1. Create `.env` file based on `.env.example`
2. Configure PostgreSQL database connection
3. Set JWT secret key

---

## 📁 Project Structure

```
src/
├── index.js              # Entry point
├── app.js                # Express app setup
├── config/               # Configuration files
│   ├── database.js       # DB connection
│   └── index.js          # Config exports
├── models/               # Data models
│   ├── User.js
│   └── Task.js
├── routes/               # API routes
│   ├── userRoutes.js
│   └── taskRoutes.js
├── controller/           # Request handlers
│   ├── userController.js
│   └── taskController.js
├── services/             # Business logic
│   ├── userService.js
│   └── taskService.js
└── middlewares/          # Custom middleware
    ├── authentication.js
    ├── errorHandler.js
    ├── validation.js
    └── requestLogger.js
```

---

## 🔐 API Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 📝 Progress Tracking

- [ ] Step 1: Project Setup & Dependencies
- [ ] Step 2: Environment Configuration
- [ ] Step 3: Database Schema & Models
- [ ] Step 4: Middleware Setup
- [ ] Step 5: User Authentication Service
- [ ] Step 6: Task Management Service
- [ ] Step 7: Input Validation & Error Handling
- [ ] Step 8: Testing
- [ ] Step 9: Documentation & Deployment

---

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Agustín Montes de Oca 
