import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Category from './models/Category.js';
import User from './models/User.js';
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

// Generate slug from name
const generateSlug = (name) => {
  if (!name) return 'category-' + Date.now();
  return name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'category-' + Date.now();
};

// Define all 22 categories with proper data
const allCategories = [
  {
    name: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks to build stunning websites and web applications.',
    icon: '💻',
    filter: 'technology'
  },
  {
    name: 'Mobile App Development',
    description: 'Build mobile applications for Android and iOS using various frameworks and technologies.',
    icon: '📱',
    filter: 'mobile-development'
  },
  {
    name: 'Data Science & Analytics',
    description: 'Master data analysis, machine learning, and visualization techniques to extract insights from data.',
    icon: '📊',
    filter: 'data-science'
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    description: 'Dive into AI algorithms, neural networks, and deep learning to create intelligent systems.',
    icon: '🤖',
    filter: 'ai'
  },
  {
    name: 'Cloud Computing & DevOps',
    description: 'Learn cloud platforms, containerization, and automation tools for modern software deployment.',
    icon: '☁️',
    filter: 'cloud'
  },
  {
    name: 'Cybersecurity & Ethical Hacking',
    description: 'Protect systems and networks from digital attacks with security best practices.',
    icon: '🔒',
    filter: 'cybersecurity'
  },
  {
    name: 'Blockchain & Web3',
    description: 'Explore decentralized technologies, cryptocurrencies, and smart contracts.',
    icon: '🔗',
    filter: 'blockchain'
  },
  {
    name: 'UI/UX Design',
    description: 'Create beautiful, user-friendly interfaces with principles of design thinking and user research.',
    icon: '🎨',
    filter: 'design'
  },
  {
    name: 'Graphic Design & Multimedia',
    description: 'Master visual design tools and techniques for digital and print media.',
    icon: '🖌️',
    filter: 'graphic-design'
  },
  {
    name: 'Business & Entrepreneurship',
    description: 'Develop leadership skills and strategic thinking to drive business growth and innovation.',
    icon: '💼',
    filter: 'business'
  },
  {
    name: 'Marketing & Digital Marketing',
    description: 'Master SEO, social media marketing, and analytics to grow brands in the digital landscape.',
    icon: '📈',
    filter: 'marketing'
  },
  {
    name: 'Finance & Accounting',
    description: 'Gain financial literacy and accounting skills to manage personal wealth or business finances.',
    icon: '💰',
    filter: 'finance'
  },
  {
    name: 'Leadership & Management',
    description: 'Develop team management and project leadership skills for professional growth.',
    icon: '👥',
    filter: 'leadership'
  },
  {
    name: 'Health & Fitness',
    description: 'Improve your physical and mental wellbeing with expert-led fitness and wellness programs.',
    icon: '💪',
    filter: 'health'
  },
  {
    name: 'Language Learning',
    description: 'Become fluent in new languages with immersive courses designed for all proficiency levels.',
    icon: '🗣️',
    filter: 'language'
  },
  {
    name: 'Music & Audio',
    description: 'Learn music theory, instruments, and audio production techniques.',
    icon: '🎵',
    filter: 'music'
  },
  {
    name: 'Photography & Video',
    description: 'Master photography and videography techniques with professional editing tools.',
    icon: '📸',
    filter: 'photography'
  },
  {
    name: 'Writing & Content Creation',
    description: 'Develop writing skills and content creation strategies for various platforms.',
    icon: '✍️',
    filter: 'writing'
  },
  {
    name: 'Career Development',
    description: 'Advance your career with resume building, interview prep, and professional skills.',
    icon: '🚀',
    filter: 'career'
  },
  {
    name: 'Education & Teaching',
    description: 'Learn effective teaching methods and educational technologies for online instruction.',
    icon: '🎓',
    filter: 'education'
  },
  {
    name: 'Science & Engineering',
    description: 'Explore fundamental principles in physics, chemistry, and various engineering disciplines.',
    icon: '🔬',
    filter: 'science'
  },
  {
    name: 'Personal Development',
    description: 'Improve time management, productivity, and mindfulness for personal growth.',
    icon: '🌱',
    filter: 'personal-development'
  }
];

// Sample instructors for variety
const instructors = [
  'Angela Yu', 'Maximilian Schwarzmüller', 'Stephen Grider', 'Tim Buchalka', 
  'Brad Traversy', 'Andrew Mead', 'Colt Steele', 'Jonas Schmedtmann', 
  'Wes Bos', 'Kyle Simpson', 'Dan Abramov', 'Eve Porcello', 
  'Scott Moss', 'Will Sentance', 'Bianca Gandolfo', 'Yonatan Bisk',
  'Emily Xiong', 'Chris Hawkes', 'Dylan Israel', 'Mike Dane'
];

// Sample course titles for different categories
const courseTitles = {
  'Web Development': [
    'Full-Stack Web Development Bootcamp: Zero to Hero',
    'Advanced React and State Management Masterclass',
    'Vue.js 3 Complete Developer Guide',
    'Progressive Web Apps Development'
  ],
  'Mobile App Development': [
    'iOS App Development with Swift',
    'Android Kotlin Developer Masterclass',
    'Cross-Platform Mobile Development with Flutter',
    'React Native for Mobile Applications'
  ],
  'Data Science & Analytics': [
    'Python for Data Science and Machine Learning',
    'Data Analysis with Pandas and NumPy',
    'Data Visualization with D3.js',
    'Big Data Analytics with Apache Spark'
  ],
  'Artificial Intelligence & Machine Learning': [
    'Deep Learning with TensorFlow and Keras',
    'Natural Language Processing with Python',
    'Computer Vision with OpenCV',
    'Reinforcement Learning Fundamentals'
  ],
  'Cloud Computing & DevOps': [
    'AWS Certified Solutions Architect',
    'Docker and Kubernetes Mastery',
    'Azure Cloud Fundamentals',
    'CI/CD with Jenkins and GitLab'
  ],
  'Cybersecurity & Ethical Hacking': [
    'Ethical Hacking and Penetration Testing',
    'Network Security Fundamentals',
    'Web Application Security',
    'Cryptography and Encryption Techniques'
  ],
  'Blockchain & Web3': [
    'Ethereum and Smart Contract Development',
    'Blockchain Fundamentals and Use Cases',
    'Solidity Programming for Smart Contracts',
    'Decentralized Finance (DeFi) Explained'
  ],
  'UI/UX Design': [
    'Figma UI/UX Design Essentials',
    'User Research and Personas',
    'Prototyping with Adobe XD',
    'Design Systems and Component Libraries'
  ],
  'Graphic Design & Multimedia': [
    'Adobe Photoshop Masterclass',
    'Illustration with Procreate',
    'Video Editing with Premiere Pro',
    '3D Modeling with Blender'
  ],
  'Business & Entrepreneurship': [
    'Startup Business Fundamentals',
    'Business Strategy and Planning',
    'Product Management Essentials',
    'Lean Startup Methodology'
  ],
  'Marketing & Digital Marketing': [
    'Digital Marketing Strategy',
    'SEO Optimization Masterclass',
    'Social Media Marketing',
    'Google Ads and Analytics'
  ],
  'Finance & Accounting': [
    'Personal Finance Management',
    'Investment Banking Fundamentals',
    'Financial Statement Analysis',
    'Cryptocurrency and Digital Assets'
  ],
  'Leadership & Management': [
    'Leadership Skills for Managers',
    'Project Management Professional',
    'Team Building and Communication',
    'Strategic Decision Making'
  ],
  'Health & Fitness': [
    'Yoga for Beginners',
    'Nutrition and Diet Planning',
    'Strength Training Fundamentals',
    'Mental Health and Wellness'
  ],
  'Language Learning': [
    'Spanish for Beginners',
    'Business English Communication',
    'French Conversation Practice',
    'Mandarin Chinese Essentials'
  ],
  'Music & Audio': [
    'Music Theory Fundamentals',
    'Piano for Beginners',
    'Audio Production with Logic Pro',
    'Songwriting and Composition'
  ],
  'Photography & Video': [
    'Photography Basics and Composition',
    'Portrait Photography Masterclass',
    'Videography and Storytelling',
    'Lighting Techniques for Photography'
  ],
  'Writing & Content Creation': [
    'Creative Writing Workshop',
    'Technical Writing Essentials',
    'Copywriting for Marketing',
    'Blogging and Content Strategy'
  ],
  'Career Development': [
    'Resume Writing and Interview Skills',
    'Public Speaking and Presentation',
    'Networking and Relationship Building',
    'Time Management and Productivity'
  ],
  'Education & Teaching': [
    'Online Teaching Methodologies',
    'Educational Technology Tools',
    'Curriculum Design and Assessment',
    'Classroom Management Techniques'
  ],
  'Science & Engineering': [
    'Physics Fundamentals',
    'Chemistry for Beginners',
    'Electrical Engineering Basics',
    'Mechanical Engineering Principles'
  ],
  'Personal Development': [
    'Mindfulness and Meditation',
    'Goal Setting and Achievement',
    'Emotional Intelligence',
    'Critical Thinking Skills'
  ]
};

// Sample descriptions for courses
const sampleDescriptions = [
  'Learn modern development by building real projects with cutting-edge technologies. Perfect for beginners aiming for a tech career.',
  'Master advanced concepts including state management, performance optimization, and testing for building scalable applications.',
  'From fundamentals to advanced concepts, learn to build real-world applications with industry best practices.',
  'Explore the latest techniques and tools to create professional-quality applications and solve real-world problems.',
  'Become proficient in industry-standard tools and frameworks through hands-on projects and practical exercises.'
];

// Sample durations
const sampleDurations = [
  '8 weeks (Self-paced)',
  '10 weeks (Self-paced)',
  '12 weeks (Self-paced)',
  '14 weeks (Self-paced)',
  '16 weeks (Self-paced)'
];

// Sample difficulty levels (must match Course model enum)
const sampleLevels = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

// Simple language values to avoid MongoDB issues
const sampleLanguages = [
  'english'
];

// Generate realistic course data
const generateCourseData = (categoryName, index) => {
  const titles = courseTitles[categoryName] || [`Advanced ${categoryName} Course ${index + 1}`];
  const title = index < titles.length ? titles[index] : `${categoryName} Mastery Program ${index + 1}`;
  
  return {
    title: title,
    description: sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)],
    thumbnail: `/images/placeholders/${categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`,
    instructor: {
      name: instructors[Math.floor(Math.random() * instructors.length)],
      profileImage: ''
    },
    duration: sampleDurations[Math.floor(Math.random() * sampleDurations.length)],
    difficulty: sampleLevels[Math.floor(Math.random() * sampleLevels.length)],
    price: 0, // Free courses
    originalPrice: 0,
    rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
    reviewsCount: Math.floor(Math.random() * 5000) + 100, // Between 100 and 5000 reviews
    language: sampleLanguages[0], // Always use 'english' to avoid issues
    isActive: true
  };
};

// Seed categories
const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Categories cleared');
    
    // Add slugs to categories
    const categoriesWithSlugs = allCategories.map(category => ({
      ...category,
      slug: generateSlug(category.name)
    }));
    
    // Create categories
    const createdCategories = await Category.insertMany(categoriesWithSlugs);
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
    
    // Generate courses for each category
    const allCourses = [];
    
    for (const [categoryName, categoryId] of Object.entries(categoryMap)) {
      for (let i = 0; i < 4; i++) {
        const courseData = generateCourseData(categoryName, i);
        allCourses.push({
          ...courseData,
          categoryId: categoryId
        });
      }
    }
    
    // Insert courses
    const createdCourses = await Course.insertMany(allCourses);
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

// Ensure admin user exists
const ensureAdminUser = async () => {
  try {
    await User.ensureAdmin();
    console.log('Admin user ensured');
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  }
};

// Main seeding function
const seedAllData = async () => {
  const isConnected = await connectDB();
  
  if (!isConnected) {
    console.log('Failed to connect to database');
    process.exit(1);
  }
  
  try {
    // Ensure admin user exists
    await ensureAdminUser();
    
    // Seed categories first
    const categoryMap = await seedCategories();
    
    // Then seed courses
    await seedCourses(categoryMap);
    
    console.log('All data seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit();
  }
};

// Run the seeding
seedAllData();