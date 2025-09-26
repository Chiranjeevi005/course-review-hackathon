const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test categories endpoint
    console.log('\n1. Testing /api/categories endpoint:');
    const categoriesResponse = await axios.get('http://localhost:3003/api/categories');
    console.log('Categories response status:', categoriesResponse.status);
    console.log('Categories count:', categoriesResponse.data.count);
    console.log('First 3 categories:', categoriesResponse.data.data.slice(0, 3));
    
    // Test courses endpoint
    console.log('\n2. Testing /api/courses endpoint:');
    const coursesResponse = await axios.get('http://localhost:3003/api/courses');
    console.log('Courses response status:', coursesResponse.status);
    console.log('Courses count:', coursesResponse.data.count);
    console.log('First 3 courses:', coursesResponse.data.data.slice(0, 3));
    
    // Test a specific category endpoint
    if (categoriesResponse.data.data.length > 0) {
      const firstCategory = categoriesResponse.data.data[0];
      console.log('\n3. Testing /api/courses/category/:id endpoint for category:', firstCategory.name);
      const categoryCoursesResponse = await axios.get(`http://localhost:3003/api/courses/category/${firstCategory._id}`);
      console.log('Category courses response status:', categoryCoursesResponse.status);
      console.log('Category courses count:', categoryCoursesResponse.data.count);
      console.log('First 3 category courses:', categoryCoursesResponse.data.data.slice(0, 3));
    }
    
    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();