# Authentication System Documentation

## Overview
This document describes the complete authentication and authorization system implemented for the CourseFinder application.

## Features Implemented

### User Authentication
- ✅ Email + password login with JWT
- ✅ Passwords securely hashed using bcrypt
- ✅ Short-lived access tokens (15 minutes) and refresh tokens (7 days)
- ✅ Automatic token refresh on expiration
- ✅ Refresh tokens stored in httpOnly + Secure cookies

### Google Login
- ✅ Google Identity Services integration on frontend
- ✅ Google token verification with backend
- ✅ Auto-creation of new users in DB
- ✅ JWT issuance (same flow as local login)

### Role-Based Authorization
- ✅ Two roles: "user" (default) and "admin"
- ✅ Admin user predefined with email `admin@coursefinder.com` and password `admin123`
- ✅ Middleware for role checks:
  - `authMiddleware` → validates JWT
  - `isAdminMiddleware` → checks if `req.user.role === "admin"`
- ✅ Route protection:
  - `/admin/*` → admin only
  - `/user/*` → logged-in users

### Frontend Behavior
- ✅ AuthContext to store user + accessToken
- ✅ Axios interceptors for automatic token refresh
- ✅ Protected routes with react-router-dom:
  - `/admin` → only accessible if role=admin
  - `/dashboard`, `/profile`, `/reviews` → accessible if logged in
- ✅ Google Login button + email/password login form (Tailwind styled)
- ✅ Graceful error message display

## Security & Deployment Safety
- ✅ Refresh tokens in httpOnly + Secure cookies
- ✅ Environment variables (dotenv) for secrets, DB URI, and Google client ID
- ✅ Unique constraint on admin@coursefinder.com
- ✅ Prepared for Vercel (frontend) + Render (backend) deployment
- ✅ Environment variables properly configured
- ✅ Staging Google credentials ready for testing

## Tech Stack

### Backend
- `jsonwebtoken` for JWT handling
- `bcryptjs` for password hashing
- `cookie-parser` for cookie management
- `google-auth-library` for Google token verification
- `mongoose` for MongoDB integration

### Frontend
- `@react-oauth/google` for Google Identity Services
- `axios` for HTTP requests
- `react-router-dom` for routing
- `Tailwind CSS` for styling

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `POST /auth/google` - Google login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (protected)

### Protected Routes
- `GET /admin/*` - Admin-only routes
- `GET /user/*` - User-only routes

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
# Backend server fixed at port 3003
NODE_ENV=development
PORT=3003

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/course_review_db

# JWT Configuration
JWT_SECRET=course_review_jwt_secret
JWT_EXPIRES_IN=7d

# Refresh Token Configuration
REFRESH_TOKEN_SECRET=course-review-refresh-token-secret-key
REFRESH_TOKEN_EXPIRES_IN=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Create a `.env` file in the client directory with the following variables:

```env
VITE_API_URL=http://localhost:3003
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Testing
The authentication system has been tested with:
- Local email/password registration and login
- Google OAuth login
- Token refresh functionality
- Role-based access control
- Protected route access

## Deployment
To deploy this system:
1. Set up MongoDB database
2. Configure environment variables on both frontend and backend
3. Deploy frontend to Vercel
4. Deploy backend to Render
5. Test with staging Google credentials before production

## Components

### Backend
- `models/User.js` - User schema with password hashing
- `middleware/authMiddleware.js` - JWT validation and role checking
- `controllers/authController.js` - Authentication logic
- `routes/authRoutes.js` - Authentication routes
- `utils/jwtUtils.js` - JWT token generation utilities

### Frontend
- `context/AuthContext.jsx` - Authentication state management
- `utils/axiosConfig.js` - Axios interceptors for token refresh
- `components/ProtectedRoute.jsx` - Route protection component
- `components/GoogleLoginButton.jsx` - Reusable Google login button
- `components/LoginForm.jsx` - Email/password login form
- `components/RegisterForm.jsx` - User registration form
- `pages/LoginPage.jsx` - Login/registration page
- `pages/DashboardPage.jsx` - User dashboard
- `pages/AdminPage.jsx` - Admin dashboard
- `pages/ProfilePage.jsx` - User profile page
- `pages/ForgotPasswordPage.jsx` - Password reset page