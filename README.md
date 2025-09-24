# 📚 Course Review & Recommendation Engine

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js + MongoDB
- Auth: JWT + bcrypt
- Deployment: Vercel (client) / Render (server)

## Development
### Run frontend
```bash
cd client
npm run dev
```

### Run backend
```bash
cd server
npm run dev
```

## Testing Dependencies
To check if all dependencies are working properly:

1. Start MongoDB on your system
2. Run the backend server:
   ```bash
   cd server
   npm run dev
   ```
3. Run the frontend:
   ```bash
   cd client
   npm run dev
   ```
4. Open your browser and navigate to the frontend URL (usually http://localhost:5173)
5. On the test page:
   - Verify React is working by using the counter button
   - Check if Tailwind CSS is working by looking for styled elements (colored circles, gradient background, etc.)
   - Test backend dependencies by clicking the "Test Backend" button

### Troubleshooting Tailwind CSS
If Tailwind CSS is not working:

1. Make sure the development server is running
2. Check that the [postcss.config.js](file:///c%3A/Users/Chiranjeevi%20PK/Desktop/course-review-project/client/postcss.config.js) file contains:
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     }
   }
   ```
3. Verify that [tailwind.config.js](file:///c%3A/Users/Chiranjeevi%20PK/Desktop/course-review-project/client/tailwind.config.js) has the correct content paths:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
4. Ensure [src/index.css](file:///c%3A/Users/Chiranjeevi%20PK/Desktop/course-review-project/client/src/index.css) includes the Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
5. If you're still having issues, try clearing the cache and reinstalling dependencies:
   ```bash
   # In the client directory
   rm -rf node_modules
   npm install
   npm run dev
   ```

### Alternative: Command Line Test
You can also test backend dependencies from the command line:
```bash
cd server
npm run test:api
```

## Project Structure
```
course-review-project/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
└── server/           # Node.js backend
    ├── models/
    ├── routes/
    ├── controllers/
    └── ...
```