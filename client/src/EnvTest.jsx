import React from 'react';

const EnvTest = () => {
  // Log environment variables for debugging
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('All env vars:', import.meta.env);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-text-900 mb-4">Environment Variables Test</h1>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">VITE_API_URL</h2>
            <p className="text-blue-700 font-mono">{import.meta.env.VITE_API_URL || 'Not set'}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Expected Value</h2>
            <p className="text-green-700 font-mono">http://localhost:3003</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">All Environment Variables</h2>
            <pre className="text-yellow-700 text-sm overflow-x-auto">
              {JSON.stringify(import.meta.env, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvTest;