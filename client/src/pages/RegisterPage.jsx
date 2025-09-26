import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form submit handler
  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Create Account
          </h1>
          <p className="opacity-90 text-sm sm:text-base">
            Join CourseFinder to discover amazing courses
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm sm:text-base">
              {error}
            </div>
          )}
          
          <RegisterForm onSubmit={handleRegister} loading={loading} />
          
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;