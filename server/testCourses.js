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

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const testCourses = async () => {
  try {
    await connectDB();
    
    // Test with Web Development category ID
    const categoryId = '68d6062a6477bdf3ca02082f';
    console.log('Testing courses for category ID:', categoryId);
    
    // Get courses for this category
    const courses = await Course.find({ categoryId: categoryId, isActive: true });
    console.log('Courses found:', courses.length);
    
    if (courses.length > 0) {
      console.log('First course:', {
        title: courses[0].title,
        categoryId: courses[0].categoryId,
        difficulty: courses[0].difficulty,
        price: courses[0].price
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing courses:', error);
    process.exit(1);
  }
};

testCourses();