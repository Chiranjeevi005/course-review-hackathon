import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Category from './models/Category.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Read courses data from JSON file
const readCoursesData = () => {
  try {
    // Path to the courses.json file in client/public directory
    const coursesPath = path.join(__dirname, '..', 'client', 'public', 'courses.json');
    const data = fs.readFileSync(coursesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses data:', error);
    return [];
  }
};

// Define category mappings
const categoryMappings = {
  'Web Development': {
    name: 'Web Development',
    description: 'Learn to build modern websites and web applications',
    icon: '💻',
    filter: 'technology'
  },
  'Mobile Development': {
    name: 'Mobile Development',
    description: 'Create mobile applications for iOS and Android',
    icon: '📱',
    filter: 'mobile-development'
  },
  'Data Science': {
    name: 'Data Science',
    description: 'Analyze data and extract meaningful insights',
    icon: '📊',
    filter: 'data-science'
  },
  'Artificial Intelligence': {
    name: 'Artificial Intelligence',
    description: 'Explore machine learning and AI technologies',
    icon: '🤖',
    filter: 'ai'
  },
  'Cloud Computing': {
    name: 'Cloud Computing',
    description: 'Deploy and manage applications in the cloud',
    icon: '☁️',
    filter: 'cloud'
  },
  'Cybersecurity': {
    name: 'Cybersecurity',
    description: 'Protect systems and data from cyber threats',
    icon: '🔒',
    filter: 'cybersecurity'
  }
};

// Seed categories
const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Categories cleared');
    
    // Create categories from mappings
    const categories = Object.values(categoryMappings);
    const createdCategories = await Category.insertMany(categories);
    console.log(`Categories seeded: ${createdCategories.length}`);
    
    // Create a map of category names to IDs
    const categoryMap = {};
    createdCategories.forEach(category => {
      categoryMap[category.name] = category._id;
    });
    
    return categoryMap;
  } catch (error) {
    console.error('Error seeding categories:', error);
    return {};
  }
};

// Seed courses
const seedCourses = async (categoryMap) => {
  try {
    // Clear existing courses
    await Course.deleteMany({});
    console.log('Courses cleared');
    
    // Read courses data
    const coursesData = readCoursesData();
    console.log(`Found ${coursesData.length} courses in JSON file`);
    
    // Transform courses data to match schema
    const courses = coursesData.map(course => {
      // Find category ID
      const categoryId = categoryMap[course.category] || null;
      
      return {
        title: course.title,
        description: course.description,
        thumbnail: course.image || '/images/placeholders/default.png',
        instructor: {
          name: course.instructor,
          profileImage: ''
        },
        categoryId: categoryId,
        duration: course.duration,
        difficulty: course.level.includes('Beginner') ? 'Beginner' : 
                   course.level.includes('Intermediate') ? 'Intermediate' : 'Advanced',
        price: 0, // Free courses
        originalPrice: 0,
        rating: course.rating || 0,
        reviewsCount: Math.floor(Math.random() * 1000), // Random reviews count
        language: course.language || 'english',
        isActive: true
      };
    }).filter(course => course.categoryId); // Filter out courses with no category
    
    // Insert courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`Courses seeded: ${createdCourses.length}`);
    
    // Update category course counts
    for (const [categoryName, categoryId] of Object.entries(categoryMap)) {
      const count = createdCourses.filter(course => 
        course.categoryId.toString() === categoryId.toString()
      ).length;
      
      await Category.findByIdAndUpdate(categoryId, { courseCount: count });
    }
    
    console.log('Category course counts updated');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  await connectDB();
  
  try {
    // Seed categories first
    const categoryMap = await seedCategories();
    
    // Then seed courses
    await seedCourses(categoryMap);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit();
  }
};

// Run the seeding
seedDatabase();