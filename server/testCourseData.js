import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

import Course from './models/Course.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const testCourseData = async () => {
  try {
    const connection = await connectDB();
    
    // Get a few sample courses
    const courses = await Course.find({}, '_id title categoryId').limit(5);
    console.log('Sample courses from database:');
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ID: ${course._id} (type: ${typeof course._id}) | Title: ${course.title}`);
    });
    
    await connection.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error testing course data:', error);
    process.exit(1);
  }
};

testCourseData();