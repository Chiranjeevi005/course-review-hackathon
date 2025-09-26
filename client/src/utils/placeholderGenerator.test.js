import { generatePlaceholderImage, getCoursePlaceholder, getCategoryPlaceholder } from './placeholderGenerator';

describe('Placeholder Generator', () => {
  test('generates placeholder image with default dimensions', () => {
    const url = generatePlaceholderImage('Test Course', 'ai');
    expect(url).toBe('https://placehold.co/300x200/4F46E5/FFFFFF?text=Test+Course');
  });

  test('generates placeholder image with custom dimensions', () => {
    const url = generatePlaceholderImage('Test Course', 'ai', 400, 300);
    expect(url).toBe('https://placehold.co/400x300/4F46E5/FFFFFF?text=Test+Course');
  });

  test('uses default color for unknown category', () => {
    const url = generatePlaceholderImage('Test Course', 'unknown-category');
    expect(url).toBe('https://placehold.co/300x200/64748B/FFFFFF?text=Test+Course');
  });

  test('truncates long text in URL', () => {
    const longTitle = 'This is a very long course title that should be truncated';
    const url = generatePlaceholderImage(longTitle, 'ai');
    expect(url).toBe('https://placehold.co/300x200/4F46E5/FFFFFF?text=This+is+a+very+long+course+title+that+shoul...');
  });

  test('gets course placeholder with existing thumbnail URL', () => {
    const course = {
      title: 'Test Course',
      thumbnail: 'https://example.com/image.jpg',
      categoryId: { slug: 'ai' }
    };
    expect(getCoursePlaceholder(course)).toBe('https://example.com/image.jpg');
  });

  test('generates course placeholder when no thumbnail', () => {
    const course = {
      title: 'Test Course',
      categoryId: { slug: 'ai' }
    };
    expect(getCoursePlaceholder(course)).toBe('https://placehold.co/300x200/4F46E5/FFFFFF?text=Test+Course');
  });

  test('gets category placeholder with existing icon URL', () => {
    const category = {
      name: 'AI',
      icon: 'https://example.com/icon.jpg',
      slug: 'ai'
    };
    expect(getCategoryPlaceholder(category)).toBe('https://example.com/icon.jpg');
  });

  test('generates category placeholder when no icon', () => {
    const category = {
      name: 'Artificial Intelligence',
      slug: 'ai'
    };
    expect(getCategoryPlaceholder(category)).toBe('https://placehold.co/200x200/4F46E5/FFFFFF?text=Artificial+Intelligence');
  });
});