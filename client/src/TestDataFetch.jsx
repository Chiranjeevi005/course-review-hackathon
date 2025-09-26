import React, { useState, useEffect } from 'react';
import axios from './utils/axiosConfig';

const TestDataFetch = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories
        console.log('Fetching categories...');
        const categoriesResponse = await axios.get('/api/categories');
        console.log('Categories response:', categoriesResponse);
        setCategories(categoriesResponse.data.data || []);
        
        // Fetch courses
        console.log('Fetching courses...');
        const coursesResponse = await axios.get('/api/courses?limit=12');
        console.log('Courses response:', coursesResponse);
        setCourses(coursesResponse.data.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Data Fetch</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories ({categories.length})</h2>
        {categories.length > 0 ? (
          <ul className="list-disc pl-5">
            {categories.slice(0, 5).map((category) => (
              <li key={category._id}>
                {category.name} ({category.courseCount} courses)
              </li>
            ))}
            {categories.length > 5 && <li>... and {categories.length - 5} more</li>}
          </ul>
        ) : (
          <p>No categories found</p>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Courses ({courses.length})</h2>
        {courses.length > 0 ? (
          <ul className="list-disc pl-5">
            {courses.slice(0, 5).map((course) => (
              <li key={course._id}>
                {course.title} - {course.categoryId?.name || 'No category'}
              </li>
            ))}
            {courses.length > 5 && <li>... and {courses.length - 5} more</li>}
          </ul>
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
};

export default TestDataFetch;