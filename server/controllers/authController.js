import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Check if trying to register as admin
    if (email === 'admin@coursefinder.com') {
      return res.status(400).json({
        success: false,
        message: 'Cannot register as admin. Admin user is predefined.'
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      passwordHash: password,
      provider: 'local'
    });
    
    await user.save();
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Return user data (without password) and access token
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider
    };
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Special handling for admin user to ensure it exists
      if (email === 'admin@coursefinder.com') {
        // Try to ensure admin exists
        await User.ensureAdmin();
        // Try to find again
        const adminUser = await User.findOne({ email });
        if (!adminUser) {
          return res.status(401).json({
            success: false,
            message: 'Admin user could not be created. Please check server logs.'
          });
        }
        // Continue with login process
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    }
    
    // Check if user registered with Google (should not happen now, but keep for safety)
    if (user.provider !== 'local') {
      return res.status(400).json({
        success: false,
        message: 'Please use the standard login for this account'
      });
    }
    
    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate tokens
    let accessToken, refreshToken;
    try {
      accessToken = generateAccessToken(user._id);
      refreshToken = generateRefreshToken(user._id);
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during token generation: ' + tokenError.message
      });
    }
    
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Return user data and access token
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider
    };
    
    res.json({
      success: true,
      message: 'Login successful',
      accessToken,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    // Provide more specific error information
    if (error.name === 'JsonWebTokenError') {
      res.status(500).json({
        success: false,
        message: 'JWT configuration error. Please check server environment variables.'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error during login: ' + error.message
      });
    }
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided'
      });
    }
    
    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (verifyError) {
      console.error('Token verification error:', verifyError);
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token: ' + verifyError.message
      });
    }
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token: User not found'
      });
    }
    
    // Generate new tokens
    let accessToken, newRefreshToken;
    try {
      accessToken = generateAccessToken(user._id);
      newRefreshToken = generateRefreshToken(user._id);
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during token generation: ' + tokenError.message
      });
    }
    
    // Set new refresh token as httpOnly cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    // Provide more specific error information
    if (error.name === 'JsonWebTokenError') {
      res.status(500).json({
        success: false,
        message: 'JWT configuration error. Please check server environment variables.'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error during token refresh: ' + error.message
      });
    }
  }
};

export const logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // req.user is attached by authMiddleware
    const user = await User.findById(req.user._id).select('-passwordHash');
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching profile'
    });
  }
};