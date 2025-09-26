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

const testCategories = async () => {
  try {
    await connectDB();
    
    // Get all categories
    const categories = await Category.find({}, 'name slug _id');
    console.log('Categories:');
    categories.forEach(cat => {
      console.log(`  ${cat.name}: slug=${cat.slug || 'N/A'}, id=${cat._id}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing categories:', error);
    process.exit(1);
  }
};

testCategories();