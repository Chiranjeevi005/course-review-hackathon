import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
  try {
    // Get user from auth middleware (assumes authMiddleware runs first)
    const userId = req.user.id;
    
    // Find user in database
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    
    // Attach user to request object
    req.admin = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default adminMiddleware;