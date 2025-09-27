import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';
import Navbar from '../layouts/Navbar';

const PlaceholderTestPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Placeholder Test</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test 1: Default placeholder */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle="Introduction to Web Development"
              courseDescription="Learn the fundamentals of HTML, CSS, and JavaScript"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Default Placeholder</h3>
              <p className="text-gray-600 text-sm">Basic course with title and description</p>
            </div>
          </div>
          
          {/* Test 2: Long title */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle="Advanced Data Structures and Algorithms for Competitive Programming and Technical Interviews"
              courseDescription="Master complex algorithms and data structures"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Long Title</h3>
              <p className="text-gray-600 text-sm">Testing text truncation</p>
            </div>
          </div>
          
          {/* Test 3: Long description */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle="Machine Learning Fundamentals"
              courseDescription="This comprehensive course covers supervised learning, unsupervised learning, neural networks, deep learning, natural language processing, computer vision, and reinforcement learning with hands-on projects"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Long Description</h3>
              <p className="text-gray-600 text-sm">Testing description truncation</p>
            </div>
          </div>
          
          {/* Test 4: Empty title */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle=""
              courseDescription="Course description without title"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Empty Title</h3>
              <p className="text-gray-600 text-sm">Placeholder with empty title</p>
            </div>
          </div>
          
          {/* Test 5: Empty description */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle="Course with No Description"
              courseDescription=""
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Empty Description</h3>
              <p className="text-gray-600 text-sm">Placeholder with empty description</p>
            </div>
          </div>
          
          {/* Test 6: Both empty */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <CoursePlaceholder 
              courseTitle=""
              courseDescription=""
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Both Empty</h3>
              <p className="text-gray-600 text-sm">Placeholder with no title or description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderTestPage;