import axios from './utils/axiosConfig';

const testAxios = async () => {
  try {
    console.log('Testing axios configuration...');
    console.log('Base URL:', axios.defaults.baseURL);
    
    const response = await axios.get('/api/categories');
    console.log('Categories API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Axios test failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export default testAxios;