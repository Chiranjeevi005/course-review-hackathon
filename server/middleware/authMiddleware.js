import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue to next middleware for public routes
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-passwordHash');
    
    if (!user) {
      // Invalid token, continue to next middleware for public routes
      return next();
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // If token is invalid or expired, continue to next middleware for public routes
    // This allows public routes to work even when an invalid token is provided
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next();
    }
    
    console.error('Authentication error:', error);
    // For other errors, continue to next middleware
    next();
  }
};

export const isAdminMiddleware = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No user authenticated.' 
    });
  }
  
  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  
  next();
};