import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
  // Check if required environment variables are set
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT_EXPIRES_IN is not defined in environment variables');
  }
  
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const generateRefreshToken = (userId) => {
  // Check if required environment variables are set
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
  }
  
  if (!process.env.REFRESH_TOKEN_EXPIRES_IN) {
    throw new Error('REFRESH_TOKEN_EXPIRES_IN is not defined in environment variables');
  }
  
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};