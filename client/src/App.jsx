import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';

import CategoriesPage from './pages/CategoriesPage';
import RecommendationPage from './pages/RecommendationPage';
import CoursesPage from './pages/CoursesPage';
import CategoryCoursesPage from './pages/CategoryCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ReviewsPage from './pages/ReviewsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './layouts/Footer';
import heartbeatService from './utils/heartbeatService';

// Import global styles
import './App.css';
import './index.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent({ socket }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user && socket) {
      // Initialize heartbeat service when user logs in
      heartbeatService.init(socket, user._id, user.name, null);
      
      // Emit user online event
      socket.emit('user_online', {
        userId: user._id,
        userName: user.name,
        ipAddress: null
      });

      // Listen for user status changes
      socket.on('user_status_change', (data) => {
        console.log('User status change:', data);
      });
    }

    // Clean up on unmount
    return () => {
      if (user && socket) {
        // Emit user offline event
        socket.emit('user_offline', {
          userId: user._id,
          userName: user.name
        });
        
        // Stop heartbeat
        heartbeatService.stopHeartbeat();
      }
      
      // Remove event listeners
      if (socket) {
        socket.off('user_status_change');
      }
    };
  }, [user, socket]);

  return (
    <div className="App min-h-screen flex flex-col w-full">
      <ScrollToTop />
      <div className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/category/:categoryId" element={<CategoryCoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="/courses/:courseId/reviews" element={<ReviewsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage socket={socket} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard socket={socket} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
function App({ socket }) {
  return (
    <AuthProvider>
      <Router>
        <AppContent socket={socket} />
      </Router>
    </AuthProvider>
  );
}

export default App;