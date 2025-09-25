# Authentication System Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials (for Google login)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```env
   MONGO_URI=mongodb://localhost:27017/coursefinder
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   REFRESH_TOKEN_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with the following content:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
5. Copy the Client ID and Client Secret to your `.env` files

## Testing the Authentication System

### Backend Tests
Run the authentication test script:
```bash
cd server
npm run test:auth
```

### Manual Testing
1. Open your browser and navigate to `http://localhost:5173`
2. Click the "Sign In" button in the header
3. Test registration with a new email and password
4. Test login with the registered credentials
5. Test Google login (if Google OAuth is configured)
6. Navigate to protected routes like `/dashboard` and `/profile`
7. Test admin access with `admin@coursefinder.com` and password `admin123`

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `POST /auth/google` - Google login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (protected)

## Environment Variables Explanation

### Server Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT access tokens
- `JWT_EXPIRES_IN`: Expiration time for access tokens (15 minutes)
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens
- `REFRESH_TOKEN_EXPIRES_IN`: Expiration time for refresh tokens (7 days)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `PORT`: Server port (default: 5000)

### Client Variables
- `VITE_API_URL`: Backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID (must match server)

## Security Considerations

1. Refresh tokens are stored in httpOnly cookies for security
2. Passwords are hashed using bcrypt before storage
3. JWT tokens are signed with separate secrets for access and refresh tokens
4. CORS is configured to only allow requests from the frontend domain
5. Environment variables are used for all sensitive data

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables in the Render dashboard

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the build command: `npm run build`
4. Set the output directory: `dist`
5. Add environment variables in the Vercel dashboard

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure the frontend URL is added to the CORS configuration in `server.js`

2. **Google login not working**: 
   - Verify Google OAuth credentials
   - Ensure authorized origins and redirect URIs are correct
   - Check that the Google+ API is enabled

3. **Token refresh not working**: 
   - Check that refresh tokens are being stored in cookies correctly
   - Verify cookie settings (httpOnly, secure, sameSite)

4. **MongoDB connection errors**: 
   - Verify the MONGO_URI in the server `.env` file
   - Ensure MongoDB is running and accessible

### Debugging Tips

1. Check browser developer tools Network tab for API requests
2. Check server console for error messages
3. Use the test scripts to verify individual components
4. Enable detailed logging by setting `NODE_ENV=development`

## Additional Resources

- [JWT Documentation](https://jwt.io/)
- [Google OAuth Documentation](https://developers.google.com/identity/gsi/web)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)