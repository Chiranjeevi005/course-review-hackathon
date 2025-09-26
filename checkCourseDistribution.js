const fs = require('fs');

// Read new courses data from JSON file
const newCoursesData = JSON.parse(fs.readFileSync('new_courses.json', 'utf8'));

console.log('Total courses in JSON:', newCoursesData.length);

const categories = {};
newCoursesData.forEach(course => {
  categories[course.category] = (categories[course.category] || 0) + 1;
});

console.log('Courses per category:');
Object.entries(categories).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});