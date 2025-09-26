import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
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

// Function to map difficulty level (same logic as in seedNewCourses.js)
const mapDifficulty = (level) => {
  if (!level) return 'Beginner';
  
  const levelLower = level.toLowerCase();
  if (levelLower.includes('beginner')) return 'Beginner';
  if (levelLower.includes('intermediate')) return 'Intermediate';
  if (levelLower.includes('advanced')) return 'Advanced';
  return 'Beginner'; // Default
};

// Compare JSON data with database data
const compareCourseData = async () => {
  try {
    await connectDB();
    
    // Read JSON data
    const jsonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../new_courses.json'), 'utf8'));
    console.log(`Found ${jsonData.length} courses in JSON file`);
    
    // Get all courses from database
    const dbCourses = await Course.find().populate('categoryId');
    console.log(`Found ${dbCourses.length} courses in database`);
    
    // Create a map of database courses by title for easy lookup
    const dbCourseMap = {};
    dbCourses.forEach(course => {
      dbCourseMap[course.title] = course;
    });
    
    // Compare each JSON course with database course
    console.log('\nComparing course data between JSON and database:');
    let allMatch = true;
    
    for (const jsonCourse of jsonData) {
      const dbCourse = dbCourseMap[jsonCourse.title];
      
      if (!dbCourse) {
        console.log(`❌ Course "${jsonCourse.title}" not found in database`);
        allMatch = false;
        continue;
      }
      
      // Compare key fields
      const mismatches = [];
      
      // Map JSON category to database category
      const categoryMapping = {
        'Web Development': 'Web Development',
        'Mobile Development': 'Mobile App Development',
        'Data Science': 'Data Science & Analytics',
        'Artificial Intelligence': 'Artificial Intelligence & Machine Learning',
        'Cloud Computing': 'Cloud Computing & DevOps',
        'Cybersecurity': 'Cybersecurity & Ethical Hacking',
        'Blockchain': 'Blockchain & Web3',
        'Design': 'UI/UX Design',
        'Graphic Design': 'Graphic Design & Multimedia',
        'Business': 'Business & Entrepreneurship',
        'Marketing': 'Marketing & Digital Marketing',
        'Finance': 'Finance & Accounting',
        'Leadership': 'Leadership & Management',
        'Health': 'Health & Fitness',
        'Language': 'Language Learning',
        'Music': 'Music & Audio',
        'Photography': 'Photography & Video',
        'Writing': 'Writing & Content Creation',
        'Career': 'Career Development',
        'Education': 'Education & Teaching',
        'Science': 'Science & Engineering',
        'Personal Development': 'Personal Development'
      };
      
      const expectedCategory = categoryMapping[jsonCourse.category] || jsonCourse.category;
      
      if (dbCourse.categoryId.name !== expectedCategory) {
        mismatches.push(`Category: JSON="${expectedCategory}" DB="${dbCourse.categoryId.name}"`);
      }
      
      if (dbCourse.instructor.name !== jsonCourse.instructor) {
        mismatches.push(`Instructor: JSON="${jsonCourse.instructor}" DB="${dbCourse.instructor.name}"`);
      }
      
      if (dbCourse.duration !== jsonCourse.duration) {
        mismatches.push(`Duration: JSON="${jsonCourse.duration}" DB="${dbCourse.duration}"`);
      }
      
      // Use the same mapping logic for difficulty levels
      const expectedDifficulty = mapDifficulty(jsonCourse.level);
      if (dbCourse.difficulty !== expectedDifficulty) {
        mismatches.push(`Difficulty: JSON="${jsonCourse.level}" (mapped to "${expectedDifficulty}") DB="${dbCourse.difficulty}"`);
      }
      
      if (dbCourse.rating !== jsonCourse.rating) {
        mismatches.push(`Rating: JSON="${jsonCourse.rating}" DB="${dbCourse.rating}"`);
      }
      
      if (mismatches.length > 0) {
        console.log(`❌ ${jsonCourse.title}:`);
        mismatches.forEach(mismatch => console.log(`  ${mismatch}`));
        allMatch = false;
      } else {
        console.log(`✅ ${jsonCourse.title} - All details match`);
      }
    }
    
    // Final result
    console.log('\n' + '='.repeat(50));
    if (allMatch && jsonData.length === dbCourses.length) {
      console.log('✅ ALL COURSE DATA MATCHES BETWEEN JSON AND DATABASE');
      console.log(`✅ Total courses: ${jsonData.length}`);
      console.log('✅ All course details are consistent');
      console.log('✅ Difficulty level mapping is working correctly');
    } else {
      console.log('❌ COURSE DATA MISMATCH');
      console.log(`JSON courses: ${jsonData.length}, Database courses: ${dbCourses.length}`);
    }
    console.log('='.repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('Error comparing course data:', error);
    process.exit(1);
  }
};

// Run the comparison
compareCourseData();