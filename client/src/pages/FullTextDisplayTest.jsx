import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';
import Navbar from '../layouts/Navbar';

const FullTextDisplayTest = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Full Text Display Test</h1>
        <p className="text-gray-600 mb-8 text-center">Ensuring all course names and descriptions are fully visible</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Test 1: Short text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Python"
                courseDescription="Programming basics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Short Text</h3>
              <p className="text-gray-600 text-sm">Title: "Python" | Description: "Programming basics"</p>
            </div>
          </div>
          
          {/* Test 2: Medium text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Web Development Fundamentals"
                courseDescription="HTML, CSS, and JavaScript essentials for beginners"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Medium Text</h3>
              <p className="text-gray-600 text-sm">Standard length course title and description</p>
            </div>
          </div>
          
          {/* Test 3: Long title */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Advanced Data Structures and Algorithms for Competitive Programming and Technical Interviews"
                courseDescription="Master complex algorithms"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Long Title</h3>
              <p className="text-gray-600 text-sm">Very long course title with short description</p>
            </div>
          </div>
          
          {/* Test 4: Long description */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Machine Learning"
                courseDescription="This comprehensive course covers supervised learning, unsupervised learning, neural networks, deep learning, natural language processing, computer vision, and reinforcement learning with hands-on projects and real-world applications"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Long Description</h3>
              <p className="text-gray-600 text-sm">Short title with very long description</p>
            </div>
          </div>
          
          {/* Test 5: Both long */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Complete Machine Learning Engineer Career Path: From Beginner to Advanced AI Specialist"
                courseDescription="Comprehensive curriculum covering all aspects of machine learning engineering with practical projects and portfolio development for job readiness"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Both Long Texts</h3>
              <p className="text-gray-600 text-sm">Long title and long description</p>
            </div>
          </div>
          
          {/* Test 6: Special characters and symbols */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="C++ Programming: Advanced Concepts & Memory Management"
                courseDescription="Master pointers, templates, STL, and object-oriented programming"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Special Characters</h3>
              <p className="text-gray-600 text-sm">Testing with symbols: &, +, :, etc.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Different Container Sizes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Extra small container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-24 w-full">
                <CoursePlaceholder 
                  courseTitle="JavaScript"
                  courseDescription="Learn JS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 text-xs">XS Container</h3>
                <p className="text-gray-600 text-xs">24h height</p>
              </div>
            </div>
            
            {/* Small container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-32 w-full">
                <CoursePlaceholder 
                  courseTitle="React Basics"
                  courseDescription="Intro to React"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 text-xs">Small Container</h3>
                <p className="text-gray-600 text-xs">32h height</p>
              </div>
            </div>
            
            {/* Medium container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full">
                <CoursePlaceholder 
                  courseTitle="Full Stack Development"
                  courseDescription="Complete web development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 text-xs">Medium Container</h3>
                <p className="text-gray-600 text-xs">40h height</p>
              </div>
            </div>
            
            {/* Large container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-56 w-full">
                <CoursePlaceholder 
                  courseTitle="Advanced Software Engineering"
                  courseDescription="Complete curriculum for senior developers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 text-xs">Large Container</h3>
                <p className="text-gray-600 text-xs">56h height</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edge Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Empty title */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full">
                <CoursePlaceholder 
                  courseTitle=""
                  courseDescription="Course with no title"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Empty Title</h3>
                <p className="text-gray-600 text-xs">Testing fallback text</p>
              </div>
            </div>
            
            {/* Empty description */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full">
                <CoursePlaceholder 
                  courseTitle="Course Without Description"
                  courseDescription=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Empty Description</h3>
                <p className="text-gray-600 text-xs">Testing fallback text</p>
              </div>
            </div>
            
            {/* Both empty */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full">
                <CoursePlaceholder 
                  courseTitle=""
                  courseDescription=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Both Empty</h3>
                <p className="text-gray-600 text-xs">Testing both fallbacks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullTextDisplayTest;