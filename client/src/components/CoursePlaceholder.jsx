import React from 'react';

// Function to generate category-specific gradient colors
const getCategoryColors = (category) => {
  const colors = {
    "Web Development": { bg: "from-blue-500 to-indigo-600", text: "text-white" },
    "Mobile Development": { bg: "from-emerald-500 to-teal-600", text: "text-white" },
    "Data Science": { bg: "from-violet-500 to-purple-600", text: "text-white" },
    "Artificial Intelligence": { bg: "from-orange-500 to-amber-600", text: "text-white" },
    "Cloud Computing": { bg: "from-sky-500 to-cyan-600", text: "text-white" },
    "Cybersecurity": { bg: "from-rose-500 to-red-600", text: "text-white" },
    "Blockchain": { bg: "from-amber-500 to-yellow-600", text: "text-white" },
    "Design": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Graphic Design": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Business": { bg: "from-cyan-500 to-sky-600", text: "text-white" },
    "Marketing": { bg: "from-violet-500 to-purple-600", text: "text-white" },
    "Finance": { bg: "from-teal-600 to-emerald-700", text: "text-white" },
    "Leadership": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Health": { bg: "from-green-500 to-emerald-600", text: "text-white" },
    "Language": { bg: "from-amber-500 to-yellow-600", text: "text-white" },
    "Music": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Photography": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Writing": { bg: "from-sky-500 to-cyan-600", text: "text-white" },
    "Career": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Education": { bg: "from-emerald-500 to-teal-600", text: "text-white" },
    "Science": { bg: "from-orange-500 to-amber-600", text: "text-white" },
    "Personal Development": { bg: "from-violet-500 to-purple-600", text: "text-white" }
  };
  return colors[category] || { bg: "from-blue-700 to-indigo-800", text: "text-white" }; // Using primary-700 colors as default
};

// Function to break text into lines with better handling
const breakTextIntoLines = (text, maxLineLength, maxLines) => {
  // Handle undefined, null, or empty text
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine === '' ? word : `${currentLine} ${word}`;
    
    if (testLine.length <= maxLineLength) {
      currentLine = testLine;
    } else {
      if (currentLine !== '') {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Handle words longer than maxLineLength
        lines.push(word.substring(0, maxLineLength));
        currentLine = word.substring(maxLineLength);
      }
    }
    
    // Limit the number of lines
    if (lines.length >= maxLines) {
      if (currentLine !== '' && lines.length < maxLines) {
        lines.push(currentLine);
      }
      break;
    }
  }
  
  if (currentLine !== '' && lines.length < maxLines) {
    lines.push(currentLine);
  }
  
  return lines;
};

// Function to generate enhanced placeholder SVG with improved text display
const generatePlaceholderSVG = (category, courseTitle, courseDescription, width = 300, height = 200) => {
  // Extract a clean category name
  const categoryName = category || 'Course';
  const colors = getCategoryColors(categoryName);
  
  // Handle undefined or null course information with fallbacks
  const safeCourseTitle = courseTitle && typeof courseTitle === 'string' ? courseTitle : 'Course Title';
  const safeCourseDescription = courseDescription && typeof courseDescription === 'string' ? courseDescription : 'Course Description';
  
  // Break text into lines (limit title to 2 lines, description to 3 lines)
  const titleLines = breakTextIntoLines(safeCourseTitle, 28, 2);
  const descriptionLines = breakTextIntoLines(safeCourseDescription, 32, 3);
  
  // Ensure we have at least one line for title and description
  if (titleLines.length === 0) titleLines.push('Course Title');
  if (descriptionLines.length === 0) descriptionLines.push('Course Description');
  
  // Encode text for SVG
  const encodedCategory = encodeURIComponent(categoryName);
  
  // Create title text elements with enhanced readability
  let titleElements = '';
  titleLines.forEach((line, index) => {
    const yPosition = 35 + (index * 16);
    const encodedLine = encodeURIComponent(line);
    titleElements += `<text x='15' y='${yPosition}' font-family='system-ui, -apple-system, BlinkMacSystemFont, sans-serif' font-size='14' font-weight='600' fill='white'>${encodedLine}</text>`;
  });
  
  // Create description text elements with enhanced readability
  let descriptionElements = '';
  descriptionLines.forEach((line, index) => {
    const yPosition = 80 + (index * 15);
    const encodedLine = encodeURIComponent(line);
    descriptionElements += `<text x='15' y='${yPosition}' font-family='system-ui, -apple-system, BlinkMacSystemFont, sans-serif' font-size='12' fill='rgba(255,255,255,0.95)'>${encodedLine}</text>`;
  });
  
  // Create a sophisticated SVG with gradient background, course title, and description
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230f4c81;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231e429f;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ccircle cx='${width/6}' cy='${height/5}' r='20' fill='rgba(255,255,255,0.15)'/%3E%3Ccircle cx='${5*width/6}' cy='${4*height/5}' r='30' fill='rgba(255,255,255,0.1)'/%3E%3Crect x='12' y='20' width='${width-24}' height='${Math.max(30, titleLines.length * 18)}' rx='5' fill='rgba(255,255,255,0.25)'/%3E${titleElements}%3Crect x='12' y='70' width='${width-24}' height='${Math.max(40, descriptionLines.length * 17)}' rx='5' fill='rgba(255,255,255,0.15)'/%3E${descriptionElements}%3Ctext x='${width-15}' y='${height-12}' font-family='system-ui, -apple-system, BlinkMacSystemFont, sans-serif' font-size='11' fill='rgba(255,255,255,0.85)' text-anchor='end'%3E${encodedCategory}%3C/text%3E%3C/svg%3E`;
};

const CoursePlaceholder = ({ category, courseTitle, courseDescription, className = "", width = 300, height = 200 }) => {
  const svgData = generatePlaceholderSVG(category, courseTitle, courseDescription, width, height);
  
  return (
    <img 
      src={svgData} 
      alt={`${category || 'Course'} placeholder`} 
      className={className}
      width={width}
      height={height}
    />
  );
};

export default CoursePlaceholder;