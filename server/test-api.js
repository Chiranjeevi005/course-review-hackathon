// Simple API test script to verify backend dependencies
// Run with: node test-api.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Testing Backend Dependencies...\n');

// Test 1: Environment Variables
console.log('1. Environment Variables:');
console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅ Loaded' : '❌ Not found');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not found');
console.log('   PORT:', process.env.PORT || '5000 (default)');
console.log();

// Test 2: Bcrypt
console.log('2. Bcrypt Test:');
try {
  const salt = await bcrypt.genSalt(10);
  console.log('   Salt generation: ✅ Success');
  
  const hashed = await bcrypt.hash('test', salt);
  console.log('   Hash generation: ✅ Success');
  
  const isValid = await bcrypt.compare('test', hashed);
  console.log('   Password comparison: ✅ Success', isValid ? '(Match)' : '(No match)');
} catch (error) {
  console.log('   Bcrypt test: ❌ Failed', error.message);
}
console.log();

// Test 3: JWT
console.log('3. JWT Test:');
try {
  const token = jwt.sign({ test: 'data' }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
  console.log('   Token generation: ✅ Success');
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
  console.log('   Token verification: ✅ Success', decoded);
} catch (error) {
  console.log('   JWT test: ❌ Failed', error.message);
}
console.log();

// Test 4: MongoDB Connection
console.log('4. MongoDB Test:');
console.log('   Connection URI:', process.env.MONGO_URI || 'Not set');
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { 
    serverSelectionTimeoutMS: 5000  // 5 second timeout
  })
    .then(() => {
      console.log('   Connection: ✅ Success');
      console.log('   Status:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');
      mongoose.connection.close();
    })
    .catch(error => {
      console.log('   Connection: ❌ Failed', error.message);
    });
} else {
  console.log('   Connection: ⚠️  Skipped (MONGO_URI not set)');
}
console.log();

console.log('🏁 Dependency test completed!');