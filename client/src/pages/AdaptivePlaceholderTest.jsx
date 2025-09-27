import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';

const AdaptivePlaceholderTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Adaptive Placeholder Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Large placeholder */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-64 w-full">
              <CoursePlaceholder 
                courseTitle="Large Course Title"
                courseDescription="This is a description for a large placeholder"
                className="w-full h-full object-cover"
                width={400}
                height={256}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Large Placeholder</h3>
              <p className="text-gray-600 text-sm">400x256 dimensions</p>
            </div>
          </div>
          
          {/* Medium placeholder */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 w-full">
              <CoursePlaceholder 
                courseTitle="Medium Course"
                courseDescription="Medium placeholder description"
                className="w-full h-full object-cover"
                width={300}
                height={192}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Medium Placeholder</h3>
              <p className="text-gray-600 text-sm">300x192 dimensions</p>
            </div>
          </div>
          
          {/* Small placeholder */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-32 w-full">
              <CoursePlaceholder 
                courseTitle="Small Course"
                courseDescription="Small placeholder description"
                className="w-full h-full object-cover"
                width={200}
                height={128}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Small Placeholder</h3>
              <p className="text-gray-600 text-sm">200x128 dimensions</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Text Length Testing</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Long title */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 w-full">
                <CoursePlaceholder 
                  courseTitle="Extremely Long Course Title That Should Demonstrate Text Adaptation and Truncation"
                  courseDescription="Short description"
                  className="w-full h-full object-cover"
                  width={300}
                  height={192}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Long Title Test</h3>
                <p className="text-gray-600 text-sm">Testing how long titles are handled</p>
              </div>
            </div>
            
            {/* Long description */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 w-full">
                <CoursePlaceholder 
                  courseTitle="Course with Long Description"
                  courseDescription="This is an extremely long description that should demonstrate how the placeholder handles text that exceeds the available space in the container, ensuring it remains readable and properly positioned"
                  className="w-full h-full object-cover"
                  width={300}
                  height={192}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Long Description Test</h3>
                <p className="text-gray-600 text-sm">Testing how long descriptions are handled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptivePlaceholderTest;