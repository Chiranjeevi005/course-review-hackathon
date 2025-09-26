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

// Verify course details and category associations
const verifyCourseDetails = async () => {
  try {
    await connectDB();
    
    // Get all categories
    const categories = await Category.find({}, 'name _id');
    console.log(`Found ${categories.length} categories`);
    
    // Create a map of category names to IDs for easy lookup
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name] = category._id;
    });
    
    // Get all courses and populate category information
    const courses = await Course.find().populate('categoryId');
    console.log(`\nFound ${courses.length} courses in database`);
    
    // Verify each course has proper category association
    const courseTitles = new Set();
    let verificationPassed = true;
    
    console.log('\nVerifying course details and category associations:');
    
    for (const course of courses) {
      // Check for duplicate course titles
      if (courseTitles.has(course.title)) {
        console.log(`❌ Duplicate course title found: ${course.title}`);
        verificationPassed = false;
      } else {
        courseTitles.add(course.title);
      }
      
      // Check if course has a valid category association
      if (!course.categoryId) {
        console.log(`❌ Course "${course.title}" has no category association`);
        verificationPassed = false;
      } else {
        // Verify the category association is correct
        console.log(`✅ ${course.title} -> ${course.categoryId.name}`);
      }
      
      // Check if course has all required details
      if (!course.title || !course.description || !course.thumbnail || 
          !course.instructor.name || !course.duration || !course.difficulty || 
          course.price === undefined) {
        console.log(`❌ Course "${course.title}" is missing required details`);
        verificationPassed = false;
      }
    }
    
    // Count courses per category to ensure exactly 4 per category
    console.log('\nVerifying course distribution per category:');
    const categoryCount = {};
    courses.forEach(course => {
      if (course.categoryId) {
        const categoryName = course.categoryId.name;
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      }
    });
    
    let distributionCorrect = true;
    for (const [categoryName, count] of Object.entries(categoryCount)) {
      if (count !== 4) {
        console.log(`❌ ${categoryName}: ${count} courses (should be 4)`);
        distributionCorrect = false;
      } else {
        console.log(`✅ ${categoryName}: ${count} courses`);
      }
    }
    
    // Check if all categories have courses
    const categoriesWithoutCourses = categories.filter(category => 
      !categoryCount[category.name] || categoryCount[category.name] === 0
    );
    
    if (categoriesWithoutCourses.length > 0) {
      console.log('\n❌ Categories without courses:');
      categoriesWithoutCourses.forEach(category => {
        console.log(`  - ${category.name}`);
      });
      distributionCorrect = false;
    }
    
    // Final verification result
    console.log('\n' + '='.repeat(50));
    if (verificationPassed && distributionCorrect && courses.length === 88) {
      console.log('✅ ALL VERIFICATIONS PASSED');
      console.log(`✅ Total courses: ${courses.length}/88`);
      console.log(`✅ All categories have exactly 4 courses`);
      console.log(`✅ No duplicate course titles`);
      console.log(`✅ All courses properly associated with categories`);
      console.log(`✅ All courses have complete details`);
    } else {
      console.log('❌ VERIFICATION FAILED');
      console.log(`Courses in database: ${courses.length}/88`);
      if (!verificationPassed) console.log('❌ Course verification failed');
      if (!distributionCorrect) console.log('❌ Distribution verification failed');
    }
    console.log('='.repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('Error verifying course details:', error);
    process.exit(1);
  }
};

// Run the verification
verifyCourseDetails();