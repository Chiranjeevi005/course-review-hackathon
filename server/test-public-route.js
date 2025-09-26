// Test script to check if public routes work with Authorization header
import axios from 'axios';

// Test the category courses route with and without authorization header
const testPublicRoutes = async () => {
  try {
    console.log('Testing public routes...');
    
    // Test without authorization header (should work)
    console.log('\n1. Testing without authorization header:');
    try {
      const response1 = await axios.get('http://localhost:3003/api/courses/category/664f8c78f7d3f8a9e8b4a123');
      console.log('Success:', response1.data.success, 'Count:', response1.data.count);
    } catch (error) {
      console.log('Error without auth:', error.response?.data || error.message);
    }
    
    // Test with invalid authorization header (should still work as public route)
    console.log('\n2. Testing with invalid authorization header:');
    try {
      const response2 = await axios.get('http://localhost:3003/api/courses/category/664f8c78f7d3f8a9e8b4a123', {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('Success:', response2.data.success, 'Count:', response2.data.count);
    } catch (error) {
      console.log('Error with invalid auth:', error.response?.data || error.message);
    }
    
    console.log('\nTest completed.');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testPublicRoutes();