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

// Function to convert price string to number
const convertPrice = (priceStr) => {
  if (priceStr === 'Free') return 0;
  if (priceStr === 'Paid') return Math.floor(Math.random() * 200) + 50; // Random price between 50-250
  return 0;
};

// Function to seed courses
const seedCourses = async () => {
  try {
    await connectDB();
    
    // Import unified data
    const { unifiedCourses } = await import('../unifiedData.js');
    
    // Get all categories to map category names to IDs
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name] = category._id;
    });
    
    // Clear existing courses
    await Course.deleteMany();
    console.log('Cleared existing courses');
    
    // Process courses data to match the schema
    const processedCourses = unifiedCourses.map(course => {
      // Map category name to ID
      let categoryId = null;
      if (categoryMap[course.categoryId]) {
        categoryId = categoryMap[course.categoryId];
      } else {
        console.warn(`Category not found for course: ${course.title}, category: ${course.categoryId}`);
        // Try to find a close match
        const categoryKeys = Object.keys(categoryMap);
        const matchedCategory = categoryKeys.find(key => 
          key.toLowerCase().includes(course.categoryId.toLowerCase()) || 
          course.categoryId.toLowerCase().includes(key.toLowerCase())
        );
        if (matchedCategory) {
          categoryId = categoryMap[matchedCategory];
          console.log(`Mapped ${course.categoryId} to ${matchedCategory}`);
        }
      }
      
      return {
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructor: {
          name: course.instructor.name,
          profileImage: course.instructor.profileImage
        },
        categoryId: categoryId,
        duration: course.duration,
        difficulty: course.difficulty,
        price: convertPrice(course.price),
        rating: course.rating,
        reviewsCount: course.reviewsCount,
        isActive: true
      };
    });
    
    // Insert new courses
    const createdCourses = await Course.insertMany(processedCourses);
    console.log(`Seeded ${createdCourses.length} courses`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCourses();