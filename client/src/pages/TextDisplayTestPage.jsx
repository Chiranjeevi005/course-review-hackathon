import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';
import Navbar from '../layouts/Navbar';

const TextDisplayTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Text Display Test</h1>
        <p className="text-gray-600 mb-8 text-center">Ensuring all course names display properly from left to right</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Test 1: Short course name */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Python Basics"
                courseDescription="Learn Python programming fundamentals"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Short Course Name</h3>
              <p className="text-gray-600 text-sm">"Python Basics"</p>
            </div>
          </div>
          
          {/* Test 2: Medium course name */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Web Development Fundamentals"
                courseDescription="HTML, CSS, and JavaScript essentials"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Medium Course Name</h3>
              <p className="text-gray-600 text-sm">"Web Development Fundamentals"</p>
            </div>
          </div>
          
          {/* Test 3: Long course name */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Advanced Data Structures and Algorithms for Competitive Programming"
                courseDescription="Master complex algorithms and data structures"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Long Course Name</h3>
              <p className="text-gray-600 text-sm">"Advanced Data Structures and Algorithms for Competitive Programming"</p>
            </div>
          </div>
          
          {/* Test 4: Very long course name */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Complete Machine Learning Engineer Career Path: From Beginner to Advanced AI Specialist with Real Projects"
                courseDescription="Comprehensive ML curriculum with hands-on projects"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Very Long Course Name</h3>
              <p className="text-gray-600 text-sm">Testing text display with extremely long titles</p>
            </div>
          </div>
          
          {/* Test 5: Special characters */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="C++ Programming: Advanced Concepts & Memory Management"
                courseDescription="Master pointers, templates, and STL"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Special Characters</h3>
              <p className="text-gray-600 text-sm">Testing with C++, &, and other symbols</p>
            </div>
          </div>
          
          {/* Test 6: Multilingual text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="数据结构与算法 (Data Structures and Algorithms)"
                courseDescription="计算机科学核心概念 (Core CS Concepts)"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Multilingual Text</h3>
              <p className="text-gray-600 text-sm">Testing with non-Latin characters</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Different Container Sizes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Small container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 w-full">
                <CoursePlaceholder 
                  courseTitle="JavaScript Fundamentals"
                  courseDescription="Learn JS basics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Small Container</h3>
                <p className="text-gray-600 text-xs">32h height</p>
              </div>
            </div>
            
            {/* Medium container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-40 w-full">
                <CoursePlaceholder 
                  courseTitle="React Development"
                  courseDescription="Build modern web apps"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Medium Container</h3>
                <p className="text-gray-600 text-xs">40h height</p>
              </div>
            </div>
            
            {/* Large container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-56 w-full">
                <CoursePlaceholder 
                  courseTitle="Full Stack Web Development"
                  courseDescription="Complete curriculum for full stack engineers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">Large Container</h3>
                <p className="text-gray-600 text-xs">56h height</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDisplayTestPage;