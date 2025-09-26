// Simple test script to verify review endpoints
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003';

// Test course ID (replace with an actual course ID from your database)
const TEST_COURSE_ID = '60f1b2b3c4d5e6f7g8h9i0j1'; // Replace with actual course ID

async function testReviewEndpoints() {
  try {
    console.log('Testing review endpoints...\n');
    
    // Test 1: Get reviews for a course
    console.log('1. Testing GET /api/courses/:id/reviews');
    try {
      const reviewsResponse = await axios.get(`${API_BASE_URL}/api/courses/${TEST_COURSE_ID}/reviews`);
      console.log('✅ GET reviews successful');
      console.log('Response:', reviewsResponse.data);
    } catch (error) {
      console.log('❌ GET reviews failed:', error.response?.data || error.message);
    }
    
    console.log('\n--- Test completed ---\n');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testReviewEndpoints();