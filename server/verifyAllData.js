import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Category from './models/Category.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use the MongoDB Atlas URI from environment variables or fallback to localhost
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/course-review-db';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
};

const verifyAllData = async () => {
  const isConnected = await connectDB();
  
  if (!isConnected) {
    console.log('Failed to connect to database');
    process.exit(1);
  }
  
  try {
    // Count categories
    const categoryCount = await Category.countDocuments();
    console.log(`Total Categories: ${categoryCount}`);
    
    // Count courses
    const courseCount = await Course.countDocuments();
    console.log(`Total Courses: ${courseCount}`);
    
    // Count users
    const userCount = await User.countDocuments();
    console.log(`Total Users: ${userCount}`);
    
    // Check for admin user
    const adminUser = await User.findOne({ email: 'admin@coursefinder.com' });
    if (adminUser) {
      console.log(`Admin User: ${adminUser.name} (${adminUser.email}) - Role: ${adminUser.role}`);
    } else {
      console.log('❌ No admin user found');
    }
    
    // Show sample categories
    const sampleCategories = await Category.find().limit(5);
    console.log('\nSample Categories:');
    sampleCategories.forEach(category => {
      console.log(`- ${category.name} (${category.courseCount} courses)`);
    });
    
    // Show sample courses
    const sampleCourses = await Course.find().populate('categoryId').limit(5);
    console.log('\nSample Courses:');
    sampleCourses.forEach(course => {
      console.log(`- ${course.title} (${course.categoryId?.name || 'No Category'})`);
    });
    
    console.log('\n✅ Verification completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${categoryCount}/22`);
    console.log(`   Courses: ${courseCount}/88`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Admin User: ${adminUser ? '✅ Present' : '❌ Missing'}`);
    
    if (categoryCount === 22 && courseCount === 88 && adminUser) {
      console.log('\n🎉 All data has been successfully seeded!');
      console.log('   You can now access your deployed application with realistic data.');
      console.log('   Admin credentials:');
      console.log('   - Email: admin@coursefinder.com');
      console.log('   - Password: admin123');
    } else {
      console.log('\n⚠️  Some data may be missing. Please check the counts above.');
    }
    
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit();
  }
};

verifyAllData();