# CourseFinder Design System

## Color Tokens

| Token Name | Value | Tailwind Class | Usage |
|------------|-------|----------------|-------|
| Primary | #2563EB | `text-blue-600`, `bg-blue-600` | Primary buttons, links, accents |
| Accent / CTA | #F59E0B | `text-amber-400`, `bg-amber-400` | Secondary buttons, highlights |
| Neutral Background | #F8FAFC | `bg-gray-50` | Page backgrounds |
| Card Background | #FFFFFF | `bg-white` | Card backgrounds |
| Text Primary | #111827 | `text-gray-900` | Headings, primary text |
| Text Muted | #6B7280 | `text-gray-500` | Secondary text, placeholders |
| Success | #10B981 | `text-green-500`, `bg-green-500` | Success badges, positive indicators |

## Typography Tokens

| Element | Size | Weight | Tailwind Classes | Example |
|---------|------|--------|------------------|---------|
| H1 | 40px | 700 | `text-4xl font-bold` | Find the best online course for your career — fast. |
| H2 | 28px | 700 | `text-3xl font-bold` | Trending Categories |
| H3 | 20px | 600 | `text-xl font-semibold` | Search |
| Body | 16px | 400 | `text-base font-normal` | Regular paragraph text |
| Small | 14px | 400 | `text-sm font-normal` | Metadata, captions |

## Spacing Scale (8px baseline modular scale)

| Token | Value | Tailwind Classes | Usage |
|-------|-------|------------------|-------|
| XXS | 4px | `p-1`, `m-1` | Micro spacing |
| XS | 8px | `p-2`, `m-2` | Small elements |
| S | 16px | `p-4`, `m-4` | Card padding |
| M | 24px | `p-6`, `m-6` | Section padding |
| L | 32px | `p-8`, `m-8` | Large sections |
| XL | 48px | `p-12`, `m-12` | Hero sections |
| XXL | 64px | `p-16`, `m-16` | Extra large sections |

## Components

### SearchBox

```jsx
<SearchBox />
```

**Tailwind Classes Used:**
- Container: `relative max-w-3xl mx-auto`
- Input: `flex-grow px-6 py-4 text-gray-900 focus:outline-none`
- Button: `bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 transition-colors flex items-center`
- Filters Button: `absolute right-32 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm`
- Suggestions Dropdown: `absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10`

**Accessibility Features:**
- `role="search"` on form
- `aria-label="Search courses"` on input
- Keyboard navigation support
- Focus states with 3px outline

### CategoryChip

```jsx
<CategoryChip category={category} />
```

**Tailwind Classes Used:**
- Container: `flex items-center bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-200 whitespace-nowrap`
- Icon: `text-lg mr-2`
- Text: `font-medium text-gray-900`
- Count: `ml-2 text-sm text-gray-500`

### CourseCard

```jsx
<CourseCard course={course} />
```

**Tailwind Classes Used:**
- Container: `bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group`
- Thumbnail: `w-full h-48 object-cover`
- Bookmark Button: `absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors`
- Title: `text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors`
- Provider: `text-gray-600 mb-3`
- Rating Stars: `flex text-amber-400`
- Rating Text: `ml-2 text-gray-600 text-sm`
- Price: `text-lg font-bold text-gray-900`
- Original Price: `ml-2 text-sm text-gray-500 line-through`
- Duration: `text-sm text-gray-500`
- Action Button: `w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium`

### Hero Section

**Tailwind Classes Used:**
- Container: `bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 md:py-24`
- Heading: `text-4xl md:text-5xl font-bold mb-4`
- Subheading: `text-xl mb-8 max-w-2xl mx-auto`

## Responsive Breakpoints

| Breakpoint | Prefix | Width |
|------------|--------|-------|
| Small | `sm:` | 640px |
| Medium | `md:` | 768px |
| Large | `lg:` | 1024px |
| Extra Large | `xl:` | 1280px |
| 2X Large | `2xl:` | 1536px |

## Grid System

- 12-column grid
- Max content width: 1280px
- Gutter: 24px (desktop)
- Mobile: Full width with 16px padding

## Icons

All icons are from Heroicons (https://heroicons.com/) and used as inline SVGs with appropriate sizing and coloring.

## Accessibility

### Contrast Ratios
- All text meets WCAG AA standards (>=4.5:1 for body text, >=3:1 for large text)
- Hero text over gradient background has been checked for contrast

### Semantic HTML
- Proper heading hierarchy (H1, H2, H3)
- Form elements with appropriate labels
- ARIA roles where needed

### Keyboard Navigation
- Focus states visible with 3px outline
- Interactive elements are focusable
- Logical tab order

### Screen Reader Support
- ARIA labels for icons
- Proper alt text for images
- Semantic structure for content