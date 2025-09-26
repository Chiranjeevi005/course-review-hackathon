import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './models/Course.js';
import Category from './models/Category.js';
import { unifiedCategories, unifiedCourses } from '../unifiedData.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

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

// Function to convert price string to number
const convertPrice = (priceStr) => {
  if (priceStr === 'Free') return 0;
  if (priceStr === 'Paid') return Math.floor(Math.random() * 200) + 50; // Random price between 50-250
  return 0;
};

// Function to generate slug
const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'category-' + Date.now();
};

// Function to seed unified data
const seedUnifiedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Category.deleteMany();
    await Course.deleteMany();
    console.log('Cleared existing categories and courses');
    
    // Add slugs to categories
    const categoriesWithSlugs = unifiedCategories.map(category => ({
      ...category,
      slug: generateSlug(category.name)
    }));
    
    // Seed categories
    const createdCategories = await Category.insertMany(categoriesWithSlugs);
    console.log(`Seeded ${createdCategories.length} categories`);
    
    // Create a map of category names to IDs
    const categoryMap = {};
    createdCategories.forEach(category => {
      categoryMap[category.name] = category._id;
    });
    
    // Process courses data to match the schema
    const processedCourses = unifiedCourses.map(course => {
      // Map category name to ID
      let categoryId = null;
      const categoryName = course.categoryId;
      
      // Find matching category
      const matchedCategory = Object.keys(categoryMap).find(key => 
        key.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') === categoryName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')
      );
      
      if (matchedCategory) {
        categoryId = categoryMap[matchedCategory];
      } else {
        console.warn(`Category not found for course: ${course.title}, category: ${categoryName}`);
        // Try to find a close match
        const categoryKeys = Object.keys(categoryMap);
        const similarCategory = categoryKeys.find(key => 
          key.toLowerCase().includes(categoryName.toLowerCase()) || 
          categoryName.toLowerCase().includes(key.toLowerCase())
        );
        if (similarCategory) {
          categoryId = categoryMap[similarCategory];
          console.log(`Mapped ${categoryName} to ${similarCategory}`);
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
    
    // Insert courses
    const createdCourses = await Course.insertMany(processedCourses);
    console.log(`Seeded ${createdCourses.length} courses`);
    
    // Update category course counts
    for (const category of createdCategories) {
      const courseCount = await Course.countDocuments({ categoryId: category._id });
      await Category.findByIdAndUpdate(category._id, { courseCount });
    }
    
    console.log('Updated category course counts');
    console.log('Unified data seeding completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding unified data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUnifiedData();