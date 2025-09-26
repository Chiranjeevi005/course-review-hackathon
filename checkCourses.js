import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './server/models/Course.js';

dotenv.config();

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