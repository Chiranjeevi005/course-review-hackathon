// Simple test to check if the reviews endpoint is working
import axios from 'axios';

async function testReviewsEndpoint() {
  try {
    console.log('Testing reviews endpoint...');
    
    // Test with a valid course ID (replace with an actual course ID from your database)
    const courseId = '68d664d44de3458ec656e1a6';
    
    console.log(`Fetching reviews for course: ${courseId}`);
    
    const response = await axios.get(`http://localhost:3003/api/courses/${courseId}/reviews`);
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    console.error('Response headers:', error.response?.headers);
  }
}

testReviewsEndpoint();