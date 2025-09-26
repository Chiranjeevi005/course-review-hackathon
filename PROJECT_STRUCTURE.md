# Project Structure

## Backend (server/)

```
server/
├── controllers/
│   └── authController.js          # Authentication logic
├── middleware/
│   └── authMiddleware.js          # JWT validation and role checking
├── models/
│   └── User.js                    # User schema with password hashing
├── routes/
│   └── authRoutes.js              # Authentication routes
├── utils/
│   └── jwtUtils.js                # JWT token generation utilities
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
├── server.js                      # Main server file
└── test-auth.js                   # Authentication test script
```

## Frontend (client/)

```
client/
├── src/
│   ├── components/
│   │   ├── GoogleLoginButton.jsx  # Reusable Google login button
│   │   ├── LoginForm.jsx          # Email/password login form
│   │   ├── ProtectedRoute.jsx     # Route protection component
│   │   ├── RegisterForm.jsx       # User registration form
│   │   └── ...                    # Other existing components
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication state management
│   ├── pages/
│   │   ├── AdminPage.jsx          # Admin dashboard
│   │   ├── DashboardPage.jsx      # User dashboard
│   │   ├── ForgotPasswordPage.jsx # Password reset page
│   │   ├── LoginPage.jsx          # Login/registration page
│   │   ├── ProfilePage.jsx        # User profile page
│   │   ├── TestAuthPage.jsx       # Authentication test page
│   │   └── ...                    # Other existing pages
│   ├── utils/
│   │   └── axiosConfig.js         # Axios interceptors for token refresh
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # Entry point with Google OAuth provider
│   └── ...
├── .env                           # Environment variables
└── package.json                   # Dependencies and scripts
```

## Key Authentication Files

### Backend Files
1. **server/models/User.js** - User schema with password hashing
2. **server/middleware/authMiddleware.js** - JWT validation and role checking
3. **server/controllers/authController.js** - Authentication logic
4. **server/routes/authRoutes.js** - Authentication routes
5. **server/utils/jwtUtils.js** - JWT token generation utilities
6. **server/server.js** - Main server file with auth routes integration

### Frontend Files
1. **client/src/context/AuthContext.jsx** - Authentication state management
2. **client/src/utils/axiosConfig.js** - Axios interceptors for token refresh
3. **client/src/components/ProtectedRoute.jsx** - Route protection component
4. **client/src/components/GoogleLoginButton.jsx** - Reusable Google login button
5. **client/src/components/LoginForm.jsx** - Email/password login form
6. **client/src/components/RegisterForm.jsx** - User registration form
7. **client/src/pages/LoginPage.jsx** - Login/registration page
8. **client/src/pages/DashboardPage.jsx** - User dashboard
9. **client/src/pages/AdminPage.jsx** - Admin dashboard
10. **client/src/pages/ProfilePage.jsx** - User profile page
11. **client/src/pages/ForgotPasswordPage.jsx** - Password reset page
12. **client/src/App.jsx** - Main app component with routing
13. **client/src/main.jsx** - Entry point with Google OAuth provider

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

4. Update the `.env` file in the client directory:

```env
# Client Configuration
# Frontend server fixed at port 5173
VITE_API_BASE_URL=http://localhost:3003
VITE_API_URL=http://localhost:3003
NODE_ENV=development
```

