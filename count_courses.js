const fs = require('fs');

// Read the unifiedCourses.json file
const coursesData = fs.readFileSync('unifiedCourses.json', 'utf8');
const courses = JSON.parse(coursesData);

// Count courses per category
const categoryCount = {};
courses.forEach(course => {
  if (categoryCount[course.category]) {
    categoryCount[course.category]++;
  } else {
    categoryCount[course.category] = 1;
  }
});

// Print the results
console.log('Courses per category:');
Object.keys(categoryCount).sort().forEach(category => {
  console.log(`${category}: ${categoryCount[category]} courses`);
});

// Check if all categories have exactly 4 courses
console.log('\nCategories with exactly 4 courses:');
let allHaveFour = true;
Object.keys(categoryCount).sort().forEach(category => {
  if (categoryCount[category] === 4) {
    console.log(`✓ ${category}`);
  } else {
    console.log(`✗ ${category}: ${categoryCount[category]} courses`);
    allHaveFour = false;
  }
});

if (allHaveFour) {
  console.log('\nAll categories have exactly 4 courses!');
} else {
  console.log('\nSome categories do not have exactly 4 courses.');
}