import express from 'express';
import { register, login, googleLogin, refresh, logout, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/refresh', refresh);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

export default router;