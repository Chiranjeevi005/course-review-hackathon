import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './models/Course.js';
import Category from './models/Category.js';

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

// Check course distribution
const checkCourseDistribution = async () => {
  try {
    await connectDB();
    
    // Get all categories
    const categories = await Category.find({}, 'name _id');
    console.log(`Found ${categories.length} categories`);
    
    // Check course count for each category
    let totalCourses = 0;
    for (const category of categories) {
      const courseCount = await Course.countDocuments({ categoryId: category._id });
      console.log(`${category.name}: ${courseCount} courses`);
      totalCourses += courseCount;
    }
    
    console.log(`\nTotal courses in database: ${totalCourses}`);
    
    // Check a few sample courses to ensure they have details
    const sampleCourses = await Course.find().limit(5).populate('categoryId');
    console.log('\nSample courses with details:');
    sampleCourses.forEach(course => {
      console.log(`- ${course.title}`);
      console.log(`  Category: ${course.categoryId.name}`);
      console.log(`  Instructor: ${course.instructor.name}`);
      console.log(`  Duration: ${course.duration}`);
      console.log(`  Difficulty: ${course.difficulty}`);
      console.log(`  Rating: ${course.rating}`);
      console.log(`  Reviews: ${course.reviewsCount}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking course distribution:', error);
    process.exit(1);
  }
};

// Run the check
checkCourseDistribution();