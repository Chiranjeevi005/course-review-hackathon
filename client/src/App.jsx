import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import TestAuthPage from './pages/TestAuthPage';
import CategoriesPage from './pages/CategoriesPage';
import RecommendationPage from './pages/RecommendationPage';
import CoursesPage from './pages/CoursesPage';
import CategoryCoursesPage from './pages/CategoryCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import PlaceholderDemoPage from './pages/PlaceholderDemoPage';
import ProtectedRoute from './components/ProtectedRoute';
import TestAxiosPage from './TestAxiosPage';
import EnvTest from './EnvTest';

// Import global styles
import './App.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/category/:categoryId" element={<CategoryCoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/recommendations" element={<RecommendationPage />} />
            <Route path="/login" element={<LoginPage />} />
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
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/test-auth" 
              element={
                <ProtectedRoute>
                  <TestAuthPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/test-axios" element={<TestAxiosPage />} />
            <Route path="/env-test" element={<EnvTest />} />
            <Route path="/placeholder-demo" element={<PlaceholderDemoPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;