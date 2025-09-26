const fs = require('fs');

// This script is deprecated. Please use the database to analyze courses.
console.log('This script is deprecated. Please use the database to analyze courses.');
console.log('Run the server and use the API endpoints to get course data.');
console.log('Or use the new unified data files: unifiedCategories.json and unifiedCourses.json');

// Check if unified data files exist
try {
  if (fs.existsSync('./unifiedCourses.json')) {
    const unifiedCourses = JSON.parse(fs.readFileSync('./unifiedCourses.json', 'utf8'));
    console.log('\\nUnified Courses Data Analysis:');
    console.log('Total courses:', unifiedCourses.length);
    
    // Count courses per category
    const categoryCount = {};
    unifiedCourses.forEach(course => {
      const category = course.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    console.log('Courses per category:');
    Object.keys(categoryCount).forEach(category => {
      console.log(`  ${category}: ${categoryCount[category]} courses`);
    });
    
    // Get unique categories
    const uniqueCategories = Object.keys(categoryCount);
    console.log(`\\nTotal unique categories with courses: ${uniqueCategories.length}`);
    
    // Check if all categories have exactly 4 courses
    const categoriesWith4Courses = uniqueCategories.filter(cat => categoryCount[cat] === 4);
    console.log(`\\nCategories with exactly 4 courses: ${categoriesWith4Courses.length}`);
    
    if (categoriesWith4Courses.length === uniqueCategories.length) {
      console.log('✅ All categories have exactly 4 courses');
    } else {
      console.log('❌ Not all categories have exactly 4 courses');
      uniqueCategories.forEach(cat => {
        if (categoryCount[cat] !== 4) {
          console.log(`  Category ${cat} has ${categoryCount[cat]} courses`);
        }
      });
    }
  } else {
    console.log('Unified courses data file not found.');
  }
} catch (error) {
  console.error('Error reading unified data:', error.message);
}

console.log('\\nFor database analysis, please run the server and use the API endpoints.');