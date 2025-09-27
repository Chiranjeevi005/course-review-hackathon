# 📚 Course Review & Recommendation Platform

A comprehensive web application that allows users to discover, review, and get recommendations for online courses. Built with modern web technologies, this platform features a responsive UI with real-time analytics, user authentication, course management, and review functionality.

## 🚀 Key Features

- **User Authentication**: Secure email/password registration and login with JWT tokens
- **Course Discovery**: Browse and search courses across 22 categories
- **Course Reviews**: Rate and review courses with detailed feedback
- **Admin Dashboard**: Real-time analytics and content management
- **Recommendation Engine**: Personalized course suggestions
- **Real-time Tracking**: Live user activity monitoring
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **Authentication**: JWT + bcrypt
- **Real-time Communication**: Socket.IO
- **Caching**: Redis (with mock fallback for production)
- **Deployment**: Vercel (client) / Render (server)

## 📁 Project Structure

```
course-review-project/
├── client/                    # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, fonts
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Full pages
│   │   ├── layouts/           # Shared layouts (Navbar, Footer)
│   │   ├── context/           # React Context (auth, theme)
│   │   ├── utils/             # Helper functions
│   │   ├── services/          # API calls
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── ...
│   └── ...
└── server/                    # Node.js backend
    ├── controllers/           # Request handlers
    ├── models/                # Mongoose schemas
    ├── routes/                # API routes
    ├── middleware/            # Auth, logging, validation
    ├── utils/                 # Helper functions
    ├── services/              # External services
    ├── server.js              # Main server file
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Redis Server (for real-time features - optional in development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd course-review-project
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend (.env in server directory)
```env
# Server Configuration
NODE_ENV=development
PORT=3003

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/course_review_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Refresh Token Configuration
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRES_IN=7d

# Redis Configuration
# For local development:
REDIS_HOST=localhost
REDIS_PORT=6379
# For production (to disable Redis and use mock client):
# REDIS_HOST=
# REDIS_PORT=
```

#### Frontend (.env in client directory)
```env
# Client Configuration
VITE_API_BASE_URL=http://localhost:3003
VITE_API_URL=http://localhost:3003
```

### Running the Application

1. Start MongoDB on your system

2. Start Redis server (optional for development)

3. Run the backend server:
   ```bash
   cd server
   npm run dev
   ```

4. Run the frontend in another terminal:
   ```bash
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication

The platform supports traditional email/password authentication:

1. **Email/Password**: Registration and login with email and password

### Default Admin Account
- Email: admin@coursefinder.com
- Password: admin123

## 📊 Admin Dashboard

Access the admin dashboard at `/admin-dashboard` after logging in as an admin user. Features include:

- Real-time statistics and analytics
- User management (view, edit, deactivate)
- Course management (create, update, delete)
- Review moderation
- Platform settings configuration

## 🧪 Testing

### Backend Tests

Test authentication:
```bash
cd server
npm run test:auth
```

Test real-time tracking:
```bash
cd server
npm run test:realtime
```

### Frontend Testing

- Responsive behavior across screen sizes
- Accessibility compliance
- Performance with loading states
- Cross-browser compatibility

## 📱 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `GET /api/categories` - Get all categories

### Reviews
- `GET /api/courses/:courseId/reviews` - Get course reviews
- `POST /api/courses/:courseId/reviews` - Create a review (authenticated)
- `PATCH /api/reviews/:id/helpful` - Update review helpfulness (authenticated)
- `DELETE /api/reviews/:id` - Delete a review (authenticated)

### Admin
- `GET /api/admin/stats` - Get real-time statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user/:id/role` - Update user role
- `POST /api/admin/course` - Create a new course

## 🛡 Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens with refresh token rotation
- HttpOnly cookies for secure token storage
- CORS configured for frontend domain only
- Input validation and sanitization
- Role-based access control
- Comprehensive `.gitignore` configuration to prevent sensitive files from being committed
- Environment variables for all sensitive configuration
- Security check scripts to verify no sensitive files are committed
- See our [Security Guide](SECURITY_GUIDE.md) for detailed security practices

## 🚀 Deployment

For detailed deployment instructions, please refer to our [Deployment Guide](DEPLOYMENT_GUIDE.md) and [Deployment Instructions](DEPLOYMENT_INSTRUCTIONS.md).

### Quick Deployment Overview

#### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. The root directory will be automatically set to `/server` via render.yaml
6. Add environment variables in the Render dashboard:
   - `NODE_ENV`: production
   - `PORT`: 3003
   - `MONGO_URI`: your MongoDB connection string
   - `JWT_SECRET`: your JWT secret key
   - `CLIENT_ORIGIN`: your Vercel frontend URL

#### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to `/client`
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variables in the Vercel dashboard:
   - `VITE_API_URL`: your Render backend URL
   - `VITE_CLIENT_ORIGIN`: your Vercel frontend URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email chiranjeevi8050@gmail.com or open an issue in the repository.