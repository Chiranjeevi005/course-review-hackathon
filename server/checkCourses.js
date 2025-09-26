import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './models/Course.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Course.countDocuments();
    console.log('Total courses in database:', count);
    
    // Get a few sample courses to check their IDs
    const sampleCourses = await Course.find().limit(5);
    console.log('\nSample courses:');
    sampleCourses.forEach(course => {
      console.log(`ID: ${course._id}, Title: ${course.title}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

connectDB();