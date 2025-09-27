import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Category from './models/Category.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
};

// Test database connection and data
const testDatabase = async () => {
  const isConnected = await connectDB();
  
  if (!isConnected) {
    console.log('Failed to connect to database');
    process.exit(1);
  }
  
  try {
    // Test categories
    const categoryCount = await Category.countDocuments();
    console.log(`Categories in database: ${categoryCount}`);
    
    // Test courses
    const courseCount = await Course.countDocuments();
    console.log(`Courses in database: ${courseCount}`);
    
    // Show sample data if exists
    if (categoryCount > 0) {
      const categories = await Category.find().limit(5);
      console.log('Sample categories:');
      categories.forEach(category => {
        console.log(`  - ${category.name} (${category.courseCount} courses)`);
      });
    }
    
    if (courseCount > 0) {
      const courses = await Course.find().populate('categoryId').limit(3);
      console.log('Sample courses:');
      courses.forEach(course => {
        console.log(`  - ${course.title} (${course.categoryId?.name || 'No category'})`);
      });
    }
    
    console.log('\nDatabase test completed successfully!');
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit();
  }
};

testDatabase();