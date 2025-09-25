import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Function to generate slug
const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
};

// Categories data
const categories = [
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

// Add slugs to categories
categories.forEach(category => {
  category.slug = generateSlug(category.name);
});

// Seed categories
const seedCategories = async () => {
  try {
    await connectDB();
    
    // Clear existing categories
    await Category.deleteMany();
    console.log('Cleared existing categories');
    
    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Seeded ${createdCategories.length} categories`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCategories();