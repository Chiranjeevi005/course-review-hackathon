import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

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

const checkCategories = async () => {
  try {
    await connectDB();
    
    // Get all categories
    const categories = await Category.find();
    console.log(`Total categories: ${categories.length}`);
    
    categories.forEach(category => {
      console.log(`${category._id}: ${category.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking categories:', error);
    process.exit(1);
  }
};

checkCategories();