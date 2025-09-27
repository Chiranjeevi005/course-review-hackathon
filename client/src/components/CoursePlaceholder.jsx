import React from 'react';

// Function to break text into multiple lines
const breakTextIntoLines = (text, maxCharsPerLine) => {
  if (!text) return [];
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
};

// Function to generate enhanced placeholder SVG with full text visibility
const generatePlaceholderSVG = (courseTitle, courseDescription, width = 300, height = 200) => {
  // Handle undefined or null course information with fallbacks
  const safeCourseTitle = courseTitle && typeof courseTitle === 'string' ? courseTitle : 'Course Title';
  const safeCourseDescription = courseDescription && typeof courseDescription === 'string' ? courseDescription : 'Course Description';
  
  // Calculate adaptive font sizes based on container dimensions
  const titleFontSize = Math.max(12, Math.min(20, width / Math.max(8, safeCourseTitle.length * 0.6)));
  const descriptionFontSize = Math.max(10, Math.min(14, width / Math.max(8, safeCourseDescription.length * 0.7)));
  
  // Break text into lines if too long
  const maxTitleChars = Math.floor(width / (titleFontSize * 0.6));
  const maxDescriptionChars = Math.floor(width / (descriptionFontSize * 0.6));
  
  const titleLines = breakTextIntoLines(safeCourseTitle, maxTitleChars);
  const descriptionLines = breakTextIntoLines(safeCourseDescription, maxDescriptionChars);
  
  // More robust encoding for SVG to handle special characters
  const encodeSVGText = (text) => {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
  };
  
  const titleStartY = 35; 
  const descriptionStartY = 65; 
  let titleElements = '';
  titleLines.forEach((line, index) => {
    const yPosition = titleStartY + (index * (titleFontSize));
    const encodedLine = encodeURIComponent(encodeSVGText(line));
    titleElements += `%3Ctext x='50%25' y='${yPosition}%25' font-family='system-ui, -apple-system, BlinkMacSystemFont, sans-serif' font-size='${titleFontSize}' font-weight='600' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodedLine}%3C/text%3E`;
  });
  
  let descriptionElements = '';
  descriptionLines.forEach((line, index) => {
    const yPosition = descriptionStartY + (index * (descriptionFontSize));
    const encodedLine = encodeURIComponent(encodeSVGText(line));
    descriptionElements += `%3Ctext x='50%25' y='${yPosition}%25' font-family='system-ui, -apple-system, BlinkMacSystemFont, sans-serif' font-size='${descriptionFontSize}' fill='%23e0e0e0' text-anchor='middle' dominant-baseline='middle'%3E${encodedLine}%3C/text%3E`;
  });
  
  // Create a sophisticated SVG with gradient background and fully visible text
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' preserveAspectRatio='xMidYMid meet'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230f4c81;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231a5c91;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)' rx='8'/%3E${titleElements}${descriptionElements}%3C/svg%3E`;
};

const CoursePlaceholder = ({ courseTitle, courseDescription, className = "", width = 300, height = 200 }) => {
  const svgData = generatePlaceholderSVG(courseTitle, courseDescription, width, height);
  
  return (
    <img 
      src={svgData} 
      alt="Course placeholder" 
      className={className}
      width={width}
      height={height}
    />
  );
};

export default CoursePlaceholder;