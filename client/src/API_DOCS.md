# CourseFinder API Documentation

## Base URL
`https://api.coursefinder.example.com/v1`

## Endpoints

### 1. Search Courses
**GET** `/search`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query (course title, topic, instructor) |
| category | string | No | Filter by category |
| level | string | No | Filter by difficulty level (beginner, intermediate, advanced) |
| price_min | number | No | Minimum price filter |
| price_max | number | No | Maximum price filter |
| language | string | No | Filter by language |
| sort | string | No | Sort order (relevance, rating, price, duration) |
| page | number | No | Page number for pagination (default: 1) |
| limit | number | No | Results per page (default: 12, max: 50) |

#### Response
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": 1,
        "title": "Complete React Developer Course",
        "provider": "Udemy",
        "rating": 4.8,
        "rating_count": 12400,
        "price": 89.99,
        "original_price": 129.99,
        "duration": "24 hours",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "category": "Web Development",
        "level": "Intermediate",
        "language": "English"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 10,
      "total_results": 120,
      "per_page": 12
    }
  }
}
```

### 2. Get Categories
**GET** `/categories`

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Web Development",
      "course_count": 120,
      "icon": "💻"
    },
    {
      "id": 2,
      "name": "Data Science",
      "course_count": 85,
      "icon": "📊"
    }
  ]
}
```

### 3. Get Top Rated Courses
**GET** `/courses/top-rated`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | number | No | Number of courses to return (default: 6, max: 20) |

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete React Developer Course",
      "provider": "Udemy",
      "rating": 4.8,
      "rating_count": 12400,
      "price": 89.99,
      "original_price": 129.99,
      "duration": "24 hours",
      "thumbnail": "https://example.com/thumbnail.jpg"
    }
  ]
}
```

### 4. Get Recommended Courses
**GET** `/courses/recommended`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | string | Yes (if authenticated) | User ID for personalized recommendations |
| limit | number | No | Number of courses to return (default: 6, max: 20) |

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete React Developer Course",
      "provider": "Udemy",
      "rating": 4.8,
      "rating_count": 12400,
      "price": 89.99,
      "original_price": 129.99,
      "duration": "24 hours",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "reason": "Based on your interest in frontend development"
    }
  ]
}
```

### 5. Get Recent Reviews
**GET** `/reviews/recent`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | number | No | Number of reviews to return (default: 5, max: 20) |

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_name": "Alex Johnson",
      "course_title": "Advanced JavaScript Concepts",
      "rating": 5,
      "comment": "This course completely transformed my understanding of JavaScript.",
      "upvotes": 24,
      "date": "2025-09-20T10:30:00Z"
    }
  ]
}
```

### 6. Subscribe to Newsletter
**POST** `/newsletter/subscribe`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | Email address to subscribe |
| consent | boolean | Yes | User consent for marketing emails |

#### Response
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```