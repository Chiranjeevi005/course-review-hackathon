# How to Fix Database Connection Issues

Based on the error you're seeing, your backend is not properly connected to the MongoDB database. Here's how to fix it:

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (M0 free tier is fine)
4. Once your cluster is created, click "Connect"
5. Choose "Connect your application"
6. Copy the connection string

## Step 2: Configure Environment Variables in Render

In your Render dashboard:
1. Go to your service settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/course-review-db?retryWrites=true&w=majority
JWT_SECRET=your-very-secure-jwt-secret-key
REFRESH_TOKEN_SECRET=your-very-secure-refresh-token-secret-key
CLIENT_ORIGIN=https://your-vercel-frontend-url.vercel.app
```

Replace the values with your actual:
- MongoDB connection string (replace username, password, and cluster details)
- Strong secret keys for JWT and refresh tokens
- Your actual Vercel frontend URL

## Step 3: Update Your MongoDB Connection String

In your MongoDB Atlas connection string:
1. Replace `username` with your MongoDB username
2. Replace `password` with your MongoDB password
3. Replace `cluster0.example.mongodb.net` with your actual cluster address

Example:
```
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/course-review-db?retryWrites=true&w=majority
```

## Step 4: Create a Database User in MongoDB Atlas

1. In MongoDB Atlas, go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" as the authentication method
4. Enter a username and password
5. Select "Read and write to any database"
6. Click "Add User"

## Step 5: Configure Network Access in MongoDB Atlas

1. In MongoDB Atlas, go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

For production, you should restrict this to Render's IP addresses.

## Step 6: Test Your Connection

After setting up the environment variables in Render:
1. Trigger a new deployment
2. Once deployed, visit your backend URL with `/health` appended:
   ```
   https://your-render-app.onrender.com/health
   ```
3. You should see a response indicating the database is connected

## Step 7: Seed Your Database

After confirming the database connection is working:
1. You'll need to seed your database with initial data
2. This can be done by adding a post-deploy script or manually running the seed script

## Step 8: Verify Everything is Working

1. Visit the health endpoint:
   ```
   https://your-render-app.onrender.com/health
   ```
   
2. Visit the database status endpoint:
   ```
   https://your-render-app.onrender.com/db-status
   ```

Both should show that the database is connected.

## Common Issues and Solutions

### Issue: "MONGO_URI not found"
**Solution**: Make sure you've set the MONGO_URI environment variable in Render.

### Issue: "Authentication failed"
**Solution**: 
1. Double-check your MongoDB username and password
2. Make sure the database user exists in MongoDB Atlas
3. Ensure the user has proper permissions

### Issue: "Network connection error"
**Solution**:
1. Check your Network Access settings in MongoDB Atlas
2. Make sure IP whitelisting is configured correctly

## Security Notes

1. Never commit actual credentials to your repository
2. Use strong, unique secrets for JWT_SECRET and REFRESH_TOKEN_SECRET
3. In production, restrict Network Access to specific IP addresses
4. Regularly rotate your database passwords

## Next Steps

After fixing the database connection:
1. Redeploy your backend on Render
2. Test the login functionality
3. Seed your database with course data
4. Verify that all API endpoints are working correctly