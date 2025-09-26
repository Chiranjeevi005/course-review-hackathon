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
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Debug course IDs
const debugCourseIds = async () => {
  try {
    const connection = await connectDB();
    
    // Get all courses and show their IDs
    const courses = await Course.find({}, '_id title categoryId');
    console.log(`Found ${courses.length} courses in database:`);
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ID: ${course._id} | Title: ${course.title} | Category ID: ${course.categoryId}`);
    });
    
    // Check if course with ID '3' exists
    console.log('\n--- Checking for course with ID "3" ---');
    const courseById = await Course.findById('3');
    console.log(`Course with ID '3': ${courseById ? 'Found' : 'Not Found'}`);
    
    // Check if there are any courses with numeric IDs
    console.log('\n--- Checking for courses with numeric IDs ---');
    const numericIdCourses = courses.filter(course => {
      // Check if the ID looks like a simple number
      return /^[0-9]+$/.test(course._id.toString());
    });
    console.log(`Courses with numeric IDs: ${numericIdCourses.length}`);
    
    await connection.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error debugging course IDs:', error);
    process.exit(1);
  }
};

// Run the debug
debugCourseIds();