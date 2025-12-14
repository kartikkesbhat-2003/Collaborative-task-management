# Collaborative Task Management Backend

A production-ready Node.js backend for collaborative task management with real-time updates, built with TypeScript, Express, MongoDB, and Socket.io.

## Features

### Core Functionality
- ✅ User authentication (JWT + cookies)
- ✅ Task CRUD operations with permissions
- ✅ Real-time notifications via Socket.io
- ✅ Password reset with email
- ✅ Role-based access control (RBAC)

### Security & Production
- ✅ Rate limiting (express-rate-limit)
- ✅ Security headers (Helmet)
- ✅ Input validation & sanitization (Zod + express-validator)
- ✅ Environment variable validation
- ✅ Error tracking (Sentry)
- ✅ Structured logging (Winston)

### Documentation & Monitoring
- ✅ API documentation (Swagger/OpenAPI)
- ✅ Comprehensive logging
- ✅ Error monitoring

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   NODE_ENV=development
   SENTRY_DSN=your-sentry-dsn (optional, for production)
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **View API documentation:**
   Visit `http://localhost:5000/api-docs` for Swagger documentation.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Tasks
- `GET /api/v1/tasks` - List user's tasks
- `GET /api/v1/tasks/:id` - Get specific task
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Users (Admin)
- `GET /api/v1/users` - List all users (admin only)

### Notifications
- `GET /api/v1/notifications` - Get user's notifications
- `PUT /api/v1/notifications/:id/read` - Mark notification as read
- `DELETE /api/v1/notifications/:id` - Delete notification

## Architecture

```
src/
├── config/          # Environment configuration
├── middlewares/     # Custom middleware (auth, error, role)
├── modules/         # Feature modules
│   ├── auth/        # Authentication
│   ├── task/        # Task management
│   ├── user/        # User management
│   └── notification/# Notifications
├── utils/           # Utilities (bcrypt, jwt, email, logger, sentry)
└── app.ts           # Express app setup
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## Technologies Used

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Real-time:** Socket.io
- **Authentication:** JWT
- **Validation:** Zod, express-validator
- **Security:** Helmet, express-rate-limit
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Error Tracking:** Sentry
- **Testing:** Jest

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set up SMTP for email
4. Configure Sentry DSN for error tracking
5. Use a reverse proxy (nginx) for SSL and load balancing

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update Swagger documentation
4. Ensure TypeScript compilation passes
5. Follow security best practices