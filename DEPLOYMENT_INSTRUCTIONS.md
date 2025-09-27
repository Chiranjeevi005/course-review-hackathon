# Deployment Instructions

## Prerequisites
1. Create accounts on:
   - [Vercel](https://vercel.com/) for frontend deployment
   - [Render](https://render.com/) for backend deployment
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database

## Step 1: Configure MongoDB
1. Create a MongoDB cluster on MongoDB Atlas
2. Get your connection string from MongoDB Atlas
3. Update the MONGO_URI in both:
   - [server/.env.production](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/server/.env.production)
   - [server/.env](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/server/.env)

## Step 2: Configure Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create credentials for OAuth 2.0
3. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in:
   - [server/.env.production](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/server/.env.production)
   - [server/.env](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/server/.env)

## Step 3: Deploy Backend to Render
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. After deployment, copy the Render app URL (looks like: https://your-app-name.onrender.com)
4. Update the VITE_API_URL in [client/.env.production](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/client/.env.production) with this URL

## Step 4: Deploy Frontend to Vercel
1. Push your code to GitHub (if not already done)
2. Connect your GitHub repository to Vercel
3. After deployment, copy the Vercel app URL (looks like: https://your-app-name.vercel.app)
4. Update the CLIENT_ORIGIN in [server/.env.production](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/server/.env.production) with this URL
5. Update the VITE_CLIENT_ORIGIN in [client/.env.production](file:///C:/Users/Chiranjeevi%20PK/Desktop/course-review-project/client/.env.production) with this URL

## Step 5: Update Environment Variables
### In Render (Backend):
1. Go to your Render dashboard
2. Click on your service
3. Go to "Environment" tab
4. Add these environment variables:
   - MONGO_URI: your MongoDB connection string
   - JWT_SECRET: a strong secret key
   - REFRESH_TOKEN_SECRET: a strong secret key
   - GOOGLE_CLIENT_ID: your Google OAuth client ID
   - GOOGLE_CLIENT_SECRET: your Google OAuth client secret
   - CLIENT_ORIGIN: your Vercel frontend URL

### In Vercel (Frontend):
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Environment Variables"
4. Add these environment variables:
   - VITE_API_BASE_URL: your Render backend URL
   - VITE_API_URL: your Render backend URL
   - VITE_CLIENT_ORIGIN: your Vercel frontend URL

## Step 6: Redeploy
1. Redeploy your backend on Render
2. Redeploy your frontend on Vercel

## Troubleshooting
1. If you see 404 errors, check that URLs in environment variables are correct
2. If you see CORS errors, make sure CLIENT_ORIGIN matches your frontend URL exactly
3. If authentication fails, check your Google OAuth credentials
4. For database connection issues, verify your MONGO_URI
5. If you see "Connection Refused" errors, it means your frontend is trying to connect to localhost instead of your deployed backend

## Important Notes
- Never commit actual credentials to your repository
- Use strong, unique secrets for JWT_SECRET and REFRESH_TOKEN_SECRET
- The REDIS_HOST is intentionally left empty in render.yaml to disable Redis in production
- Make sure to redeploy both frontend and backend after updating environment variables

## Current Issue Resolution
Based on the error messages you're seeing, your frontend is trying to connect to `http://localhost:3003` instead of your deployed backend. This means:

1. Your Vercel environment variables are not properly configured
2. You need to set VITE_API_BASE_URL and VITE_API_URL to your Render backend URL
3. You need to redeploy your frontend on Vercel after setting these variables

Follow these steps:
1. Deploy your backend to Render first
2. Copy the Render URL
3. Add VITE_API_BASE_URL and VITE_API_URL environment variables in Vercel with your Render URL
4. Redeploy your frontend on Vercel