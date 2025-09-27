import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';
import Navbar from '../layouts/Navbar';

const CenteredPlaceholderTestPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Adaptive Course Placeholder Test</h1>
        <p className="text-gray-600 mb-8">Testing placeholders with different sizes to ensure consistency across pages</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Test 1: Default size (similar to home page) */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48">
              <CoursePlaceholder 
                courseTitle="Web Development Fundamentals"
                courseDescription="Learn HTML, CSS, and JavaScript basics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Home Page Size</h3>
              <p className="text-gray-600 text-sm">48h on larger screens</p>
            </div>
          </div>
          
          {/* Test 2: Courses page size */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-40">
              <CoursePlaceholder 
                courseTitle="Advanced Data Structures"
                courseDescription="Master complex algorithms and data structures"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Courses Page Size</h3>
              <p className="text-gray-600 text-sm">40h on larger screens</p>
            </div>
          </div>
          
          {/* Test 3: Mobile size */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-32">
              <CoursePlaceholder 
                courseTitle="Mobile Development"
                courseDescription="Build apps for iOS and Android"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Mobile Size</h3>
              <p className="text-gray-600 text-sm">32h on mobile</p>
            </div>
          </div>
          
          {/* Test 4: Recommendation page size */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-44">
              <CoursePlaceholder 
                courseTitle="Machine Learning Basics"
                courseDescription="Introduction to AI and machine learning concepts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Recommendation Page Size</h3>
              <p className="text-gray-600 text-sm">44h height</p>
            </div>
          </div>
          
          {/* Test 5: Category page size */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-36">
              <CoursePlaceholder 
                courseTitle="Data Science Essentials"
                courseDescription="Statistics, Python, and data analysis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Category Page Size</h3>
              <p className="text-gray-600 text-sm">36h height</p>
            </div>
          </div>
          
          {/* Test 6: Small placeholder */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-24">
              <CoursePlaceholder 
                courseTitle="Python Programming"
                courseDescription="Learn Python from scratch"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Small Placeholder</h3>
              <p className="text-gray-600 text-sm">24h height</p>
            </div>
          </div>
        </div>
        
        {/* Test with long texts */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Text Length Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Long title */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-40">
                <CoursePlaceholder 
                  courseTitle="Advanced Data Structures and Algorithms for Competitive Programming and Technical Interviews"
                  courseDescription="Master complex algorithms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Long Title</h3>
                <p className="text-gray-600 text-sm">Testing text adaptation with long titles</p>
              </div>
            </div>
            
            {/* Long description */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-40">
                <CoursePlaceholder 
                  courseTitle="Machine Learning"
                  courseDescription="This comprehensive course covers supervised learning, unsupervised learning, neural networks, deep learning, natural language processing, computer vision, and reinforcement learning with hands-on projects"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Long Description</h3>
                <p className="text-gray-600 text-sm">Testing text adaptation with long descriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredPlaceholderTestPage;