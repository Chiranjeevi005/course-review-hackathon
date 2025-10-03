# Course Review & Recommendation Platform - Project Report

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Authentication System](#authentication-system)
5. [Admin Dashboard](#admin-dashboard)
6. [Real-Time Tracking](#real-time-tracking)
7. [Reviews Feature](#reviews-feature)
8. [Course Data](#course-data)
9. [Frontend Implementation](#frontend-implementation)
10. [Deployment](#deployment)
11. [Testing](#testing)
12. [Future Enhancements](#future-enhancements)

## Project Overview

The Course Review & Recommendation Platform is a comprehensive web application that allows users to discover, review, and get recommendations for online courses. The platform features a modern UI with real-time analytics, user authentication, course management, and review functionality.

### Key Features
- User authentication (email/password and Google OAuth)
- Course browsing and searching
- Course reviews with ratings and tags
- Admin dashboard with real-time analytics
- Recommendation engine
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **Authentication**: JWT + bcrypt
- **Real-time Communication**: Socket.IO
- **Caching**: Redis
- **Deployment**: Vercel (client) / Render (server)

## Project Structure

```
course-review-project/
├── client/           # React frontend
│   ├── src/
│   │   ├── assets/           # Images, icons, fonts
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Full pages
│   │   ├── layouts/          # Shared layouts (Navbar, Footer)
│   │   ├── context/          # React Context (auth, theme)
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Helper functions
│   │   ├── services/         # API calls
│   │   └── ...
│   └── ...
└── server/           # Node.js backend
    ├── controllers/  # Request handlers
    ├── models/       # Mongoose schemas
    ├── routes/       # API routes
    ├── middleware/   # Auth, logging, validation
    ├── utils/        # Helper functions
    ├── services/     # External services
    └── ...
```

## Authentication System

The authentication system implements JWT-based authentication with refresh tokens for enhanced security.

### Features
- Email/password registration and login
- JWT access tokens with 7-day expiration
- HttpOnly refresh tokens stored in cookies
- Protected routes with role-based access control
- Password hashing with bcrypt

### Key Components
1. **User Model** - User schema with password hashing
2. **Auth Middleware** - JWT validation and role checking
3. **Auth Controller** - Authentication logic
4. **Auth Routes** - Authentication endpoints
5. **JWT Utilities** - Token generation and validation
6. **Auth Context** - Frontend state management

### API Endpoints
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `POST /auth/google` - Google login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (protected)

### Security Considerations
- Refresh tokens are stored in httpOnly cookies
- Passwords are hashed using bcrypt
- JWT tokens are signed with separate secrets
- CORS configured for frontend domain only
- Environment variables for sensitive data

## Admin Dashboard

The admin dashboard provides administrators with comprehensive tools to manage the platform with real-time insights.

### Design Principles
- No sidebar navigation, using top navigation bar instead
- Minimalist UI with clean background and card-based metrics
- Professional look inspired by Vercel, Stripe, and Notion
- Responsive design for all screen sizes
- Smooth transitions and animations

### Key Sections
1. **Dashboard Overview** - Hero cards with key metrics
2. **Real-Time Insights** - Live users widget and activity stream
3. **Analytics & Charts** - Interactive data visualizations
4. **Management Panels** - CRUD operations for courses, users, and reviews
5. **Settings** - Platform configuration options

### Technical Implementation
- Recharts for data visualization
- Framer Motion for animations
- Tailwind CSS for styling
- Responsive grid layouts
- Modal dialogs for CRUD operations

## Real-Time Tracking

The real-time tracking system provides live analytics for admins and tracks user activities across the platform.

### System Architecture
- **Socket.IO Server** - Real-time communication
- **Redis Integration** - Fast storage of active user sessions
- **MongoDB Models** - Extended User model and Event model
- **User Tracking Service** - Centralized activity management

### Key Features
- WebSocket-based communication
- User online/offline status tracking
- Activity logging (course views, searches, reviews)
- Redis integration for fast session storage
- Admin dashboard with real-time analytics

### Frontend Tracking
- Automatic tracking of course views, searches, and reviews
- Heartbeat service to maintain online presence
- Manual event tracking through utility functions

## Reviews Feature

The reviews feature allows users to rate and review courses with helpfulness voting.

### Backend Implementation
- **Review Model** with userId, courseId, rating, text, tags, likes, dislikes
- **Review Controller** with functions for CRUD operations
- **Review Routes** for API endpoints
- MongoDB aggregation to calculate course ratings

### Frontend Implementation
- **ReviewCard** component for displaying individual reviews
- **ReviewForm** component for submitting new reviews
- **ReviewsPage** for the main reviews interface
- Filtering and sorting capabilities
- Upvote/downvote functionality

### API Endpoints
- `GET /api/courses/:courseId/reviews` - Get course reviews
- `POST /api/courses/:courseId/reviews` - Create a review (authenticated)
- `PATCH /api/reviews/:id/helpful` - Update review helpfulness (authenticated)
- `DELETE /api/reviews/:id` - Delete a review (authenticated)

## Course Data

The platform includes professionally structured course data across 22 universal categories.

### Categories
1. Web Development
2. Mobile Development
3. Data Science
4. Artificial Intelligence
5. Cloud Computing
6. Cybersecurity
7. Blockchain
8. Design
9. Graphic Design
10. Business
11. Marketing
12. Finance
13. Leadership
14. Health
15. Language
16. Music
17. Photography
18. Writing
19. Career
20. Education
21. Science
22. Personal Development

### Course Structure
Each course includes:
- Unique courseId
- Professional title and description
- Category and instructor
- Platform and duration
- Level and price
- Rating and enrollment count
- Language and certification info
- Prerequisites and syllabus
- Learning outcomes and tags
- Category-based placeholder images

## Frontend Implementation

The frontend is built with React and Tailwind CSS, following a component-based architecture.

### Key Pages
- HomePage with search, categories, and featured courses
- CourseDetailsPage with comprehensive course information
- ReviewsPage for course reviews
- LoginPage with authentication forms
- DashboardPage for user-specific content
- AdminDashboard for platform management

### UI Components
- Responsive navigation with mobile menu
- Search box with filtering capabilities
- Category chips for browsing
- Course cards with ratings and bookmarking
- Review forms and displays
- Interactive charts and analytics
- Loading skeletons for better UX

### Design System
- Professional dark-light hybrid theme
- Consistent color palette (indigo, green, blue, purple)
- Inter/Poppins fonts for readability
- Card-based layout with rounded corners
- Smooth animations and transitions

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Vercel dashboard

### Environment Variables
Server:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

Client:
```
VITE_API_BASE_URL=http://localhost:3003
VITE_API_URL=http://localhost:3003
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Testing

### Backend Testing
Run authentication tests:
```bash
cd server
npm run test:auth
```

Run real-time tracking tests:
```bash
cd server
npm run test:realtime
```

### Frontend Testing
- Responsive behavior across screen sizes
- Accessibility compliance
- Performance with loading states
- Cross-browser compatibility

### Manual Testing
1. Start backend server:
   ```bash
   cd server
   npm run dev
   ```
2. Start frontend:
   ```bash
   cd client
   npm run dev
   ```
3. Test authentication flows
4. Test admin dashboard functionality
5. Test course browsing and reviews
6. Test real-time tracking features

## Future Enhancements

### Authentication
- Password reset functionality
- Email verification
- Two-factor authentication
- Social login providers (Facebook, GitHub)

### Admin Dashboard
- Customizable dashboard layouts
- Export functionality for reports
- Advanced filtering and search
- Dark mode toggle
- Internationalization support

### Real-Time Tracking
- User retention metrics
- Conversion tracking
- Geographic distribution
- Enhanced dashboard widgets

### Reviews Feature
- Review moderation tools
- Review reporting functionality
- Photo/video attachments
- Review response system

### General Improvements
- Advanced search with filters
- Bookmarking and saving courses
- Personalized recommendations
- Mobile app development
- Performance optimizations