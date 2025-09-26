// Test script for authentication routes
import axios from 'axios';

// Fixed backend port
const API_BASE_URL = 'http://localhost:3003';

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Admin user data
const adminUser = {
  email: 'admin@coursefinder.com',
  password: 'admin123'
};

async function testAuthRoutes() {
  console.log('Testing Authentication Routes...\n');
  
  try {
    // Test registration
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
    console.log('   Registration response:', registerResponse.data);
    
    // Test login
    console.log('\n2. Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('   Login response:', loginResponse.data);
    
    // Extract tokens
    const accessToken = loginResponse.data.accessToken;
    
    // Test profile access
    console.log('\n3. Testing profile access...');
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('   Profile response:', profileResponse.data);
    
    // Test admin login
    console.log('\n4. Testing admin login...');
    const adminLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: adminUser.email,
      password: adminUser.password
    });
    console.log('   Admin login response:', adminLoginResponse.data);
    
    // Test refresh token
    console.log('\n5. Testing token refresh...');
    const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`);
    console.log('   Refresh response:', refreshResponse.data);
    
    // Test logout
    console.log('\n6. Testing logout...');
    const logoutResponse = await axios.post(`${API_BASE_URL}/auth/logout`);
    console.log('   Logout response:', logoutResponse.data);
    
    console.log('\n✅ All authentication tests passed!');
    console.log('ℹ️  JWT tokens now expire in 7 days');
  } catch (error) {
    console.error('❌ Authentication test failed:', error.response?.data || error.message);
  }
}

// Run the tests
testAuthRoutes();