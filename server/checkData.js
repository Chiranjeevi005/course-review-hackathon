import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from './models/Category.js';
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

const checkData = async () => {
  try {
    await connectDB();
    
    // Get all categories
    const categories = await Category.find({}, '_id name slug');
    console.log('Categories:');
    categories.forEach(cat => {
      console.log(`  ${cat.name}: ${cat._id} (slug: ${cat.slug})`);
    });
    
    // Get sample courses
    const courses = await Course.find({}, 'title categoryId').limit(10);
    console.log('\nSample Courses:');
    courses.forEach(course => {
      console.log(`  ${course.title}: categoryId=${course.categoryId}`);
    });
    
    // Check if courses are associated with existing categories
    console.log('\nCourse-Category Association Check:');
    for (let course of courses) {
      const category = categories.find(cat => cat._id.toString() === course.categoryId.toString());
      if (category) {
        console.log(`  ✓ ${course.title} -> ${category.name}`);
      } else {
        console.log(`  ✗ ${course.title} -> Category ID ${course.categoryId} not found`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking data:', error);
    process.exit(1);
  }
};

checkData();