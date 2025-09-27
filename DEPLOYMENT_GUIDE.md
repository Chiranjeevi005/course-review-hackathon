# 🚀 Deployment Guide

This guide provides detailed instructions for deploying the Course Review & Recommendation Platform to production using Vercel for the frontend and Render for the backend.

## 📋 Prerequisites

Before deploying, ensure you have:

1. A GitHub account with the repository cloned
2. A Render account for backend deployment
3. A Vercel account for frontend deployment
4. A MongoDB database (MongoDB Atlas recommended)
5. A domain name (optional but recommended)

## 🗄 Backend Deployment (Render)

### 1. Prepare Environment Variables

Create the following environment variables in your Render dashboard:

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3003` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret for JWT tokens | `your-super-secret-jwt-key` |
| `CLIENT_ORIGIN` | Frontend URL | `https://your-app.vercel.app` |

### 2. Render Configuration

The `render.yaml` file is already included in the `/server` directory:

```yaml
services:
  - type: web
    name: course-review-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3003
```

### 3. Deploy Steps

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set the following configuration:
   - Name: `course-review-api`
   - Root Directory: Leave empty (will use rootDir from render.yaml)
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add the environment variables from step 1
6. Click "Create Web Service"

**Note**: The `render.yaml` file in the root directory will automatically configure the correct settings including the root directory.

### 4. Post-Deployment

After deployment, note the Render URL which will be in the format:
`https://course-review-api.onrender.com`

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Environment Variables

Create the following environment variables in your Vercel dashboard:

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `VITE_API_URL` | Backend API URL | `https://course-review-api.onrender.com` |
| `VITE_CLIENT_ORIGIN` | Frontend URL | `https://your-app.vercel.app` |

### 2. Vercel Configuration

The `vercel.json` file is already included in the `/client` directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "http://localhost:3003/api/$1"
    },
    {
      "src": "/auth/(.*)",
      "dest": "http://localhost:3003/auth/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 3. Deploy Steps

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following configuration:
   - Project Name: `course-review-app`
   - Root Directory: `/client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add the environment variables from step 1
6. Click "Deploy"

### 4. Post-Deployment

After deployment, note the Vercel URL which will be in the format:
`https://your-app.vercel.app`

## 🔁 Update Environment Variables

After both deployments are complete, you'll need to update the environment variables:

1. In Render dashboard, update `CLIENT_ORIGIN` with your actual Vercel URL
2. In Vercel dashboard, ensure `VITE_API_URL` points to your actual Render URL

## 🔄 CI/CD Setup

Both platforms support automatic deployments:

- **Vercel**: Automatically deploys on every push to the main branch
- **Render**: Automatically deploys on every push to the main branch

To set up custom deployment branches:
1. In Vercel: Project Settings → Git → Production Branch
2. In Render: Manual Deploy → Enable Automatic Deploys

## 🔐 Security Considerations

1. Always use strong, unique secrets for `JWT_SECRET`
2. Restrict CORS origins to only your frontend domain
3. Use HTTPS in production (both platforms provide this by default)
4. Keep sensitive environment variables secret
5. Regularly rotate your secrets

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Ensure `CLIENT_ORIGIN` in Render matches your Vercel URL exactly
   - Check that there are no trailing slashes

2. **API Not Connecting**:
   - Verify `VITE_API_URL` in Vercel points to your Render backend
   - Check that both services are running

3. **Build Failures**:
   - Check the build logs in each platform's dashboard
   - Ensure all dependencies are correctly listed in package.json

4. **Environment Variables Not Loading**:
   - In Vercel, ensure variables are not prefixed with `REACT_APP_` (this is Vite, not Create React App)
   - In Render, check that variables are not set as "Preview" instead of "Production"

### Useful Commands for Debugging

```bash
# Test backend locally
cd server
npm run dev

# Test frontend locally
cd client
npm run dev

# Build frontend for production
cd client
npm run build
```

## 📊 Monitoring

### Render Monitoring
- View logs in the Render dashboard
- Set up health checks
- Monitor resource usage

### Vercel Monitoring
- Check performance metrics
- View function execution logs
- Monitor edge network performance

## 🔄 Updating Your Application

To update your deployed application:

1. Push changes to your main branch
2. Wait for automatic deployment (or trigger manual deployment)
3. Monitor the deployment logs for any errors
4. Test the application after deployment

## 📞 Support

For deployment issues:
1. Check the platform-specific documentation
2. Review deployment logs
3. Contact platform support if needed
4. Open an issue in the repository for code-related deployment problems