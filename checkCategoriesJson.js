const fs = require('fs');
const path = require('path');

// Read new courses data from JSON file
const newCoursesPath = path.resolve(__dirname, 'new_courses.json');
const newCoursesData = JSON.parse(fs.readFileSync(newCoursesPath, 'utf8'));

// Get unique categories
const categories = [...new Set(newCoursesData.map(course => course.category))];
console.log('Categories in new_courses.json:');
categories.forEach(category => console.log(`  ${category}`));

console.log(`\nTotal unique categories: ${categories.length}`);