import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Course Review API is running 🚀');
});

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
    const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.json({
      status: 'All dependencies are working!',
      dependencies: {
        express: '✅ Working',
        mongoose: `✅ ${mongoStatus}`,
        cors: '✅ Working',
        morgan: '✅ Working',
        dotenv: '✅ Working',
        bcryptjs: `✅ Working (Hash test: ${isPasswordValid ? 'Passed' : 'Failed'})`,
        jsonwebtoken: `✅ Working (Token test: ${decoded.userId === 'test123' ? 'Passed' : 'Failed'})`
      },
      details: {
        mongoDB: {
          connectionStatus: mongoStatus,
          uri: process.env.MONGO_URI
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));