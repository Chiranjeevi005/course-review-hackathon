import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const checkCourseDetails = async () => {
  try {
    await connectDB();
    
    // Get all courses
    const courses = await Course.find();
    console.log(`Total courses: ${courses.length}`);
    
    // Show details of first 5 courses
    for (let i = 0; i < Math.min(5, courses.length); i++) {
      const course = courses[i];
      console.log(`\nCourse ${i + 1}:`);
      console.log('  ID:', course._id);
      console.log('  Title:', course.title);
      console.log('  Category ID:', course.categoryId);
      console.log('  Instructor:', course.instructor.name);
      console.log('  Duration:', course.duration);
      console.log('  Difficulty:', course.difficulty);
      console.log('  Price:', course.price);
      console.log('  Rating:', course.rating);
      console.log('  Reviews:', course.reviewsCount);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking course details:', error);
    process.exit(1);
  }
};

checkCourseDetails();