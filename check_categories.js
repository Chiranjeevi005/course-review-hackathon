const fs = require('fs');

// Read the unifiedCategories.json file
const categoriesData = fs.readFileSync('unifiedCategories.json', 'utf8');
const categories = JSON.parse(categoriesData);

// Read the unifiedCourses.json file
const coursesData = fs.readFileSync('unifiedCourses.json', 'utf8');
const courses = JSON.parse(coursesData);

// Get all category names from courses
const courseCategories = new Set(courses.map(course => course.category));

// Get all category names from categories
const categoryNames = categories.map(category => category.name);

console.log('Categories in unifiedCategories.json:');
categoryNames.forEach(category => console.log(`- ${category}`));

console.log('\nCategories with courses in unifiedCourses.json:');
Array.from(courseCategories).forEach(category => console.log(`- ${category}`));

console.log('\nCategories in unifiedCategories.json but without courses:');
const missingCategories = categoryNames.filter(category => !courseCategories.has(category));
missingCategories.forEach(category => console.log(`- ${category}`));

console.log('\nCategories with courses but not in unifiedCategories.json:');
const extraCategories = Array.from(courseCategories).filter(category => !categoryNames.includes(category));
extraCategories.forEach(category => console.log(`- ${category}`));

console.log(`\nTotal categories in unifiedCategories.json: ${categoryNames.length}`);
console.log(`Total categories with courses: ${courseCategories.size}`);
console.log(`Categories without courses: ${missingCategories.length}`);
console.log(`Extra categories with courses: ${extraCategories.length}`);