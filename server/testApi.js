import axios from 'axios';

const testApi = async () => {
  try {
    console.log('Testing API endpoint...');
    const response = await axios.get('http://localhost:3003/api/courses?limit=5');
    console.log('API Response Status:', response.status);
    console.log('First course data:');
    if (response.data.data && response.data.data.length > 0) {
      const firstCourse = response.data.data[0];
      console.log('  ID:', firstCourse._id);
      console.log('  Title:', firstCourse.title);
      console.log('  Type of ID:', typeof firstCourse._id);
    } else {
      console.log('No courses found in response');
    }
  } catch (error) {
    console.error('API Test Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
};

testApi();