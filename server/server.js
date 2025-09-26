import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from './models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with explicit path
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Debug: Log environment variables
console.log('Environment variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('Current directory:', __dirname);

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_ORIGIN || 'https://your-production-domain.com' 
    : 'http://localhost:5173', // Fixed frontend port
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log('✅ MongoDB Connected');
      // Ensure admin user exists
      await User.ensureAdmin();
    })
    .catch(err => console.error('❌ MongoDB Error:', err));
} else {
  console.log('⚠️  MONGO_URI not found in environment variables. Running in mock mode.');
  // Mock mode - no database connection
}

// Routes
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

app.get('/', (req, res) => {
  res.send('Course Review API is running 🚀');
});

// Auth routes
app.use('/auth', authRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);

// Course routes
app.use('/api/courses', courseRoutes);

// Review routes
app.use('/api/courses/:courseId/reviews', reviewRoutes);

// Test route to check all dependencies
app.get('/test-dependencies', async (req, res) => {
  try {
    // Test bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword', salt);
    const isPasswordValid = await bcrypt.compare('testpassword', hashedPassword);
    
    // Test JWT
    const token = jwt.sign({ userId: 'test123' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Test MongoDB connection status
    const mongoStatus = mongoose.connection && mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.json({
      status: 'All dependencies are working!',
      dependencies: {
        express: '✅ Working',
        mongoose: `✅ ${mongoStatus}`,
        cors: '✅ Working',
        morgan: '✅ Working',
        dotenv: process.env.MONGO_URI ? '✅ Working' : '⚠️  MONGO_URI not found',
        bcryptjs: `✅ Working (Hash test: ${isPasswordValid ? 'Passed' : 'Failed'})`,
        jsonwebtoken: `✅ Working (Token test: ${decoded.userId === 'test123' ? 'Passed' : 'Failed'})`
      },
      details: {
        mongoDB: {
          connectionStatus: mongoStatus,
          uri: process.env.MONGO_URI || 'Not provided'
        },
        jwt: {
          tokenGenerated: token ? 'Yes' : 'No',
          decodedUserId: decoded.userId
        },
        bcrypt: {
          saltGenerated: salt ? 'Yes' : 'No',
          hashGenerated: hashedPassword ? 'Yes' : 'No',
          comparisonResult: isPasswordValid
        }
      }
    });
  } catch (error) {
    console.error('Dependency test failed:', error);
    res.status(500).json({
      status: 'Error testing dependencies',
      error: error.message
    });
  }
});

const PORT = 3003; // Fixed port for backend
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));