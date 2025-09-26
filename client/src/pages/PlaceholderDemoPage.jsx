import React from 'react';
import CoursePlaceholder from '../components/CoursePlaceholder';
import Navbar from '../components/Navbar';

const PlaceholderDemoPage = () => {
  // Sample course data with titles and categories
  const sampleCourses = [
    { title: 'Complete Web Development Bootcamp', category: 'Web Development' },
    { title: 'Advanced React and Redux Masterclass', category: 'Web Development' },
    { title: 'iOS App Development with Swift', category: 'Mobile App Development' },
    { title: 'Data Science Professional Certificate', category: 'Data Science & Analytics' },
    { title: 'Machine Learning A-Z Course', category: 'Artificial Intelligence & Machine Learning' },
    { title: 'AWS Cloud Practitioner Certification', category: 'Cloud Computing & DevOps' },
    { title: 'Ethical Hacking Essentials', category: 'Cybersecurity & Ethical Hacking' },
    { title: 'Blockchain Fundamentals', category: 'Blockchain & Web3' },
    { title: 'UI/UX Design Principles', category: 'UI/UX Design' },
    { title: 'Adobe Photoshop Masterclass', category: 'Graphic Design & Multimedia' },
    { title: 'Business Strategy Fundamentals', category: 'Business & Entrepreneurship' },
    { title: 'Digital Marketing Strategy', category: 'Marketing & Digital Marketing' },
    { title: 'Financial Planning Certification', category: 'Finance & Accounting' },
    { title: 'Leadership and Team Management', category: 'Leadership & Management' },
    { title: 'Yoga and Meditation Course', category: 'Health & Fitness' },
    { title: 'Spanish for Beginners', category: 'Language Learning' },
    { title: 'Music Production Masterclass', category: 'Music & Audio' },
    { title: 'Photography Composition', category: 'Photography & Video' },
    { title: 'Creative Writing Workshop', category: 'Writing & Content Creation' },
    { title: 'Career Transition Strategies', category: 'Career Development' },
    { title: 'Online Teaching Certification', category: 'Education & Teaching' },
    { title: 'Engineering Mathematics', category: 'Science & Engineering' },
    { title: 'Time Management Mastery', category: 'Personal Development' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-900 mb-2">Enhanced Course Placeholder System</h1>
        <p className="text-muted-500 mb-8">Professional placeholders with course titles and category-specific icons</p>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-6">Sample Course Placeholders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.slice(0, 6).map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <CoursePlaceholder 
                  category={course.category} 
                  courseTitle={course.title}
                  className="w-full" 
                  size={300}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-text-900">{course.title}</h3>
                  <p className="text-sm text-muted-500">{course.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-6">Category Icons Only (No Titles)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from(new Set(sampleCourses.map(course => course.category))).map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="mb-3">
                  <CoursePlaceholder 
                    category={category} 
                    showTitle={false}
                    className="w-full" 
                    size={150}
                  />
                </div>
                <h3 className="text-sm font-semibold text-text-900 text-center truncate">{category}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-6">Different Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-text-900 mb-3">Large (400px)</h3>
              <CoursePlaceholder 
                category="Web Development" 
                courseTitle="Complete Web Development Bootcamp"
                size={400} 
                className="w-full" 
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-text-900 mb-3">Medium (250px)</h3>
              <CoursePlaceholder 
                category="Data Science & Analytics" 
                courseTitle="Data Science Professional Certificate"
                size={250} 
                className="w-full" 
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-text-900 mb-3">Small (150px)</h3>
              <CoursePlaceholder 
                category="UI/UX Design" 
                courseTitle="UI/UX Design Principles"
                size={150} 
                className="w-full" 
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-text-900 mb-6">Course Initials Feature</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-text-900 mb-4">
              Each placeholder now displays the course initials in the top-left corner for quick identification.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CoursePlaceholder 
                category="Web Development" 
                courseTitle="Complete Web Development Bootcamp"
                size={150} 
                className="w-full" 
              />
              <CoursePlaceholder 
                category="Mobile App Development" 
                courseTitle="iOS App Development with Swift"
                size={150} 
                className="w-full" 
              />
              <CoursePlaceholder 
                category="Data Science & Analytics" 
                courseTitle="Data Science Professional Certificate"
                size={150} 
                className="w-full" 
              />
              <CoursePlaceholder 
                category="Artificial Intelligence & Machine Learning" 
                courseTitle="Machine Learning A-Z Course"
                size={150} 
                className="w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderDemoPage;