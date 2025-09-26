import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './models/Course.js';
import Category from './models/Category.js';
import fs from 'fs';

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
const convertPrice = (price) => {
  if (price === 'Free') return 0;
  // If it's already a number, return it
  if (typeof price === 'number') return price;
  // If it's a string that can be converted to a number
  const num = parseFloat(price);
  return isNaN(num) ? 0 : num;
};

// Function to map difficulty level
const mapDifficulty = (level) => {
  if (!level) return 'Beginner';
  
  const levelLower = level.toLowerCase();
  if (levelLower.includes('beginner')) return 'Beginner';
  if (levelLower.includes('intermediate')) return 'Intermediate';
  if (levelLower.includes('advanced')) return 'Advanced';
  return 'Beginner'; // Default
};

// Function to find matching category
const findMatchingCategory = (categoryName, categoryMap) => {
  // Exact match first
  if (categoryMap[categoryName]) {
    return categoryMap[categoryName];
  }
  
  // Try partial matches
  const categoryKeys = Object.keys(categoryMap);
  
  // Direct mapping for common categories
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
  
  // Check if we have a direct mapping
  if (categoryMapping[categoryName]) {
    const mappedName = categoryMapping[categoryName];
    if (categoryMap[mappedName]) {
      console.log(`Mapped ${categoryName} to ${mappedName}`);
      return categoryMap[mappedName];
    }
  }
  
  // Try fuzzy matching as fallback
  const matchedCategory = categoryKeys.find(key => 
    key.toLowerCase().includes(categoryName.toLowerCase()) || 
    categoryName.toLowerCase().includes(key.toLowerCase())
  );
  
  if (matchedCategory) {
    console.log(`Fuzzy mapped ${categoryName} to ${matchedCategory}`);
    return categoryMap[matchedCategory];
  }
  
  return null;
};

// Function to generate learning outcomes based on course title and category
const generateLearningOutcomes = (title, category) => {
  const outcomes = [
    `Understand core concepts of ${category}`,
    'Apply knowledge through practical exercises',
    'Complete hands-on projects',
    'Demonstrate proficiency in the subject area'
  ];
  
  // Customize based on category
  if (category.includes('Development')) {
    outcomes[0] = `Master ${category} fundamentals and best practices`;
    outcomes[1] = 'Build real-world applications';
    outcomes[2] = 'Debug and optimize code';
    outcomes[3] = 'Deploy applications to production';
  } else if (category.includes('Data')) {
    outcomes[0] = 'Analyze and visualize data effectively';
    outcomes[1] = 'Apply statistical methods to solve problems';
    outcomes[2] = 'Build predictive models';
    outcomes[3] = 'Communicate insights through data storytelling';
  } else if (category.includes('AI') || category.includes('Artificial')) {
    outcomes[0] = 'Implement machine learning algorithms';
    outcomes[1] = 'Build intelligent systems';
    outcomes[2] = 'Process and analyze large datasets';
    outcomes[3] = 'Evaluate model performance';
  }
  
  return outcomes;
};

// Function to generate syllabus based on course title and category
const generateSyllabus = (title, category) => {
  const syllabus = [
    'Introduction to the course',
    'Core concepts and fundamentals',
    'Practical applications and exercises',
    'Final project and assessment'
  ];
  
  // Customize based on category
  if (category.includes('Development')) {
    syllabus[0] = 'Introduction to development tools and environment setup';
    syllabus[1] = 'Core programming concepts and syntax';
    syllabus[2] = 'Building and testing applications';
    syllabus[3] = 'Deployment and best practices';
  } else if (category.includes('Data')) {
    syllabus[0] = 'Data collection and preprocessing';
    syllabus[1] = 'Statistical analysis and visualization';
    syllabus[2] = 'Machine learning fundamentals';
    syllabus[3] = 'Advanced analytics and reporting';
  } else if (category.includes('AI') || category.includes('Artificial')) {
    syllabus[0] = 'Introduction to artificial intelligence';
    syllabus[1] = 'Machine learning algorithms';
    syllabus[2] = 'Deep learning and neural networks';
    syllabus[3] = 'Real-world AI applications';
  }
  
  return syllabus;
};

// Function to generate tags based on course title and category
const generateTags = (title, category) => {
  const tags = [category];
  
  // Extract keywords from title
  const titleWords = title.toLowerCase().split(' ');
  const importantWords = titleWords.filter(word => 
    word.length > 4 && 
    !['with', 'from', 'into', 'using', 'through', 'course', 'bootcamp', 'masterclass'].includes(word)
  );
  
  tags.push(...importantWords);
  
  return [...new Set(tags)]; // Remove duplicates
};

// Function to seed new courses
const seedNewCourses = async () => {
  try {
    await connectDB();
    
    // Read new courses data from JSON file
    const newCoursesPath = path.resolve(__dirname, '../new_courses.json');
    const newCoursesData = JSON.parse(fs.readFileSync(newCoursesPath, 'utf8'));
    const newCourses = newCoursesData;
    
    // Get all categories to map category names to IDs
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name] = category._id;
    });
    
    console.log(`Found ${categories.length} categories in database`);
    
    // Clear existing courses
    await Course.deleteMany();
    console.log('Cleared existing courses');
    
    // Process new courses data to match the schema
    const processedCourses = newCourses.map(course => {
      // Map category name to ID
      let categoryId = findMatchingCategory(course.category, categoryMap);
      
      if (!categoryId) {
        console.warn(`Category not found for course: ${course.title}, category: ${course.category}`);
        // Use the first category as fallback
        categoryId = Object.values(categoryMap)[0];
        console.log(`Using fallback category for ${course.title}`);
      }
      
      // Create instructor object
      const instructor = {
        name: course.instructor || 'Unknown Instructor',
        profileImage: '' // We don't have profile images in the new data
      };
      
      return {
        title: course.title,
        description: course.description,
        thumbnail: course.image || `/images/placeholders/${course.category.toLowerCase().replace(/\s+/g, '-')}.png`,
        instructor: instructor,
        categoryId: categoryId,
        duration: course.duration,
        difficulty: mapDifficulty(course.level),
        price: convertPrice(course.price),
        originalPrice: convertPrice(course.originalPrice) || convertPrice(course.price),
        rating: course.rating || 0,
        reviewsCount: course.enrollmentCount || 0,
        isActive: true,
        // Additional fields for better course details
        language: course.language || 'English',
        certification: course.certification || 'Yes - Certificate of Completion',
        prerequisites: course.prerequisites || 'No prerequisites specified',
        syllabus: generateSyllabus(course.title, course.category),
        learningOutcomes: generateLearningOutcomes(course.title, course.category),
        tags: generateTags(course.title, course.category)
      };
    });
    
    // Insert new courses
    const createdCourses = await Course.insertMany(processedCourses);
    console.log(`Seeded ${createdCourses.length} courses`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding new courses:', error);
    process.exit(1);
  }
};

// Run the seed function
seedNewCourses();