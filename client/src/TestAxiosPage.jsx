import React, { useState, useEffect } from 'react';
import axios from './utils/axiosConfig';

const TestAxiosPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAxios = async () => {
      try {
        setLoading(true);
        console.log('Axios base URL:', axios.defaults.baseURL);
        console.log('Axios config:', axios);
        
        const response = await axios.get('/api/categories');
        setResult(response.data);
        console.log('Axios test successful:', response.data);
      } catch (err) {
        setError(err.message);
        console.error('Axios test failed:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
        } else if (err.request) {
          console.error('Request data:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    testAxios();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-text-900 mb-4">Axios Test</h1>
        
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-4 text-text-900">Testing axios configuration...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Success</h2>
            <p className="text-green-700">Categories fetched successfully!</p>
            <p className="text-green-700 mt-2">Count: {result.count}</p>
            <div className="mt-4 max-h-60 overflow-y-auto">
              <h3 className="font-semibold text-green-800">Categories:</h3>
              <ul className="list-disc pl-5 mt-2">
                {result.data.slice(0, 5).map(category => (
                  <li key={category._id} className="text-green-700">
                    {category.name}
                  </li>
                ))}
                {result.data.length > 5 && (
                  <li className="text-green-700">... and {result.data.length - 5} more</li>
                )}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-text-900 mb-2">Debug Info</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Axios Base URL:</strong> {axios.defaults.baseURL}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Expected Base URL:</strong> http://localhost:3003
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAxiosPage;