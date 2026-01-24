# Courses API Documentation

This document explains how to manage books/courses through the backend API. The system supports full CRUD operations with advanced filtering, recommendations, and analytics tracking for your AI/ML book marketplace.

## 📚 Overview

The Courses API manages educational resources (primarily books) for your learning platform. Each course/book includes detailed information for display, filtering, and recommendations.

## 🗂️ Database Schema

### Courses Table Structure

| Field             | Type          | Description                                           | Required |
| ----------------- | ------------- | ----------------------------------------------------- | -------- |
| id                | UUID          | Primary key (auto-generated)                          | ✅       |
| title             | VARCHAR(200)  | Book title                                            | ✅       |
| author            | VARCHAR(100)  | Author name                                           | ✅       |
| description       | TEXT          | Full description                                      | ✅       |
| short_description | VARCHAR(500)  | Brief summary                                         | ✅       |
| cover_image       | TEXT          | Book cover image URL                                  | ✅       |
| category          | VARCHAR(50)   | Category (ML, DL, Data Science, etc.)                 | ✅       |
| level             | VARCHAR(20)   | Difficulty level (Beginner/Intermediate/Advanced)     | ✅       |
| amazon_link       | TEXT          | Amazon purchase link                                  | ✅       |
| price             | DECIMAL(10,2) | Current price                                         | ✅       |
| original_price    | DECIMAL(10,2) | Original price (for discounts)                        | ❌       |
| rating            | DECIMAL(3,2)  | Average rating (0-5)                                  | ❌       |
| reviews           | INTEGER       | Number of reviews                                     | ❌       |
| reviews_count     | INTEGER       | Alias for reviews                                     | ❌       |
| priority          | VARCHAR(50)   | Recommendation priority (Essential/Foundational/etc.) | ❌       |
| personal_insight  | TEXT          | Why you recommend this book                           | ❌       |
| time_to_read      | VARCHAR(50)   | Estimated reading time                                | ❌       |
| year              | INTEGER       | Publication year                                      | ❌       |
| pages             | INTEGER       | Number of pages                                       | ❌       |
| why_recommend     | TEXT[]        | Array of reasons (Career, Practical, etc.)            | ❌       |
| bestseller        | BOOLEAN       | Is a bestseller                                       | ❌       |
| featured          | BOOLEAN       | Featured on homepage                                  | ❌       |
| clicks_count      | INTEGER       | Amazon link click count                               | ❌       |
| tags              | TEXT[]        | Searchable tags                                       | ❌       |
| created_at        | TIMESTAMP     | Creation timestamp                                    | ✅       |
| updated_at        | TIMESTAMP     | Last update timestamp                                 | ✅       |

## 🚀 API Endpoints

### Base URL

```
https://naceur-keraani.com/api/courses
```

## Public Endpoints (No Authentication Required)

### 1. Get All Courses with Filtering

**Endpoint:** `GET /api/courses`

Returns a paginated list of courses with advanced filtering options.

**Query Parameters:**

| Parameter  | Type    | Default  | Description                |
| ---------- | ------- | -------- | -------------------------- |
| category   | string  | all      | Filter by category         |
| level      | string  | all      | Filter by difficulty level |
| priceRange | string  | all      | Price range filter         |
| sortBy     | string  | featured | Sort order                 |
| search     | string  | ''       | Search query               |
| page       | integer | 1        | Page number                |
| limit      | integer | 9        | Items per page             |

**Price Range Options:**

- `under40`: Price < $40
- `40-80`: $40 ≤ Price ≤ $80
- `80-120`: $80 ≤ Price ≤ $120
- `over120`: Price > $120

**Sort Options:**

- `featured`: Featured first, then by date
- `price-low`: Price ascending
- `price-high`: Price descending
- `rating`: Highest rating first
- `popular`: Most reviews first

**Example Request:**

```bash
GET /api/courses?category=Machine+Learning&level=Intermediate&priceRange=40-80&sortBy=rating&page=1
```

**Example Response:**

```json
{
  "success": true,
  "count": 15,
  "totalPages": 2,
  "currentPage": 1,
  "data": [
    {
      "id": "uuid-here",
      "title": "Hands-On Machine Learning",
      "author": "Aurélien Géron",
      "description": "Comprehensive guide...",
      "short_description": "Practical ML with Scikit-Learn & TensorFlow",
      "cover_image": "https://images.unsplash.com/...",
      "category": "Machine Learning",
      "level": "Intermediate",
      "amazon_link": "https://amazon.com/...",
      "price": 59.99,
      "original_price": 79.99,
      "rating": 4.7,
      "reviews": 2834,
      "priority": "Essential",
      "personal_insight": "This book transformed...",
      "time_to_read": "3-4 weeks",
      "year": 2022,
      "pages": 850,
      "why_recommend": ["Career", "Practical", "Foundation"],
      "bestseller": true,
      "featured": true,
      "clicks_count": 150,
      "tags": ["Python", "ML", "Deep Learning", "TensorFlow"],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Get Featured Courses (Recommendations)

**Endpoint:** `GET /api/courses/featured`

Returns featured courses for recommendations section.

**Query Parameters:**

| Parameter | Type    | Default | Description               |
| --------- | ------- | ------- | ------------------------- |
| limit     | integer | 3       | Number of recommendations |

**Example Request:**

```bash
GET /api/courses/featured?limit=3
```

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "uuid-1",
      "title": "Deep Learning with Python",
      "author": "François Chollet",
      "cover_image": "...",
      "price": 49.99,
      "rating": 4.8,
      "reviews": 1923,
      "priority": "Foundational"
    }
  ]
}
```

### 3. Get Course by ID

**Endpoint:** `GET /api/courses/:id`

Returns a single course by its ID.

**Example Request:**

```bash
GET /api/courses/123e4567-e89b-12d3-a456-426614174000
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Python for Data Analysis",
    "author": "Wes McKinney",
    "description": "Data wrangling with Pandas..."
    // ... all fields
  }
}
```

### 4. Get Categories

**Endpoint:** `GET /api/courses/categories`

Returns all unique categories.

**Example Response:**

```json
{
  "success": true,
  "count": 4,
  "data": [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Python Programming"
  ]
}
```

### 5. Get Levels

**Endpoint:** `GET /api/courses/levels`

Returns all unique difficulty levels.

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "data": ["Beginner", "Intermediate", "Advanced"]
}
```

### 6. Search Courses

**Endpoint:** `GET /api/courses/search`

Advanced search across multiple fields.

**Query Parameters:**

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| q         | string | Search query       |
| category  | string | Filter by category |
| level     | string | Filter by level    |

**Example Request:**

```bash
GET /api/courses/search?q=tensorflow&category=Machine+Learning
```

### 7. Get Courses by Category

**Endpoint:** `GET /api/courses/category/:category`

Returns all courses in a specific category.

**Example Request:**

```bash
GET /api/courses/category/Machine+Learning
```

### 8. Get Course Statistics

**Endpoint:** `GET /api/courses/stats`

Returns aggregated statistics about courses.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "total": 25,
    "featured": 8,
    "bestsellers": 12,
    "total_clicks": 3450,
    "categories": 4,
    "avg_price": 52.45,
    "avg_rating": 4.6
  }
}
```

### 9. Track Amazon Link Click

**Endpoint:** `POST /api/courses/:id/click`

Increments the click counter for a course.

**Example Request:**

```bash
POST /api/courses/123e4567-e89b-12d3-a456-426614174000/click
```

**Example Response:**

```json
{
  "success": true,
  "message": "Click tracked"
}
```

## Admin Endpoints (Authentication Required)

### 10. Create New Course

**Endpoint:** `POST /api/courses`

Creates a new course/book.

**Headers:**

```http
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "New AI Book",
  "author": "Author Name",
  "description": "Complete description...",
  "short_description": "Brief summary",
  "cover_image": "https://images.unsplash.com/...",
  "category": "Machine Learning",
  "level": "Intermediate",
  "amazon_link": "https://amazon.com/...",
  "price": 59.99,
  "original_price": 79.99,
  "rating": 4.5,
  "reviews": 0,
  "priority": "Recommended",
  "personal_insight": "Why I recommend this book...",
  "time_to_read": "2-3 weeks",
  "year": 2024,
  "pages": 400,
  "why_recommend": ["Career", "Practical"],
  "bestseller": false,
  "featured": false,
  "tags": ["AI", "Machine Learning", "Python"]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "new-uuid-here"
    // ... all fields
  }
}
```

### 11. Update Course

**Endpoint:** `PUT /api/courses/:id`

Updates an existing course.

**Headers:**

```http
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:** (Partial updates allowed)

```json
{
  "price": 49.99,
  "featured": true,
  "tags": ["AI", "ML", "Updated"]
}
```

### 12. Delete Course

**Endpoint:** `DELETE /api/courses/:id`

Deletes a course.

**Headers:**

```http
Authorization: Bearer {token}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

### 13. Toggle Featured Status

**Endpoint:** `PUT /api/courses/:id/toggle-featured`

Toggles the featured status of a course.

**Headers:**

```http
Authorization: Bearer {token}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Course featured status toggled to true",
  "data": {
    "id": "...",
    "featured": true
  }
}
```

### 14. Bulk Create Courses

**Endpoint:** `POST /api/courses/bulk`

Creates multiple courses at once (for seeding).

**Headers:**

```http
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "courses": [
    {
      "title": "Book 1",
      "author": "Author 1"
      // ... other fields
    },
    {
      "title": "Book 2",
      "author": "Author 2"
      // ... other fields
    }
  ]
}
```

## 🔍 Frontend Integration Examples

### 1. Fetching All Books with Filters

```javascript
// Using axios
const fetchBooks = async () => {
  try {
    const response = await axios.get("/api/courses", {
      params: {
        category: selectedCategory,
        level: selectedLevel,
        priceRange,
        sortBy,
        search: searchQuery,
        page: currentPage,
        limit: 9,
      },
    });

    setBooks(response.data.data);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};
```

### 2. Fetching Recommendations

```javascript
const fetchRecommendations = async () => {
  try {
    const response = await axios.get("/api/courses/featured", {
      params: { limit: 3 },
    });
    setRecommendations(response.data.data);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};
```

### 3. Tracking Amazon Clicks

```javascript
const handleAmazonClick = async (bookId) => {
  try {
    await axios.post(`/api/courses/${bookId}/click`);
    // Open Amazon link in new tab
    window.open(amazonLink, "_blank");
  } catch (error) {
    console.error("Error tracking click:", error);
    // Still open the link even if tracking fails
    window.open(amazonLink, "_blank");
  }
};
```

### 4. Creating a New Book (Admin)

```javascript
const createBook = async (bookData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("/api/courses", bookData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};
```

## 📊 Database Seeding

### Sample Book Data Structure

```javascript
const sampleBook = {
  title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
  author: "Aurélien Géron",
  description: "Comprehensive guide to building intelligent systems...",
  short_description: "Practical ML with Scikit-Learn & TensorFlow",
  cover_image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
  category: "Machine Learning",
  level: "Intermediate",
  amazon_link: "https://amazon.com/dp/1492032646",
  price: 59.99,
  original_price: 79.99,
  rating: 4.7,
  reviews: 2834,
  priority: "Essential",
  personal_insight:
    "This book completely changed how I approach machine learning projects...",
  time_to_read: "3-4 weeks",
  year: 2022,
  pages: 850,
  why_recommend: ["Career", "Practical", "Foundation", "Reference"],
  bestseller: true,
  featured: true,
  tags: [
    "Python",
    "Machine Learning",
    "Scikit-Learn",
    "TensorFlow",
    "Keras",
    "Deep Learning",
  ],
  clicks_count: 0,
};
```

### Running the Seeder

```bash
# Development
npm run seed

# Production (be careful!)
NODE_ENV=production npm run seed
```

## 🔧 Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🛠️ Error Handling

### Common HTTP Status Codes

| Code | Meaning               | Description                   |
| ---- | --------------------- | ----------------------------- |
| 200  | OK                    | Request successful            |
| 201  | Created               | Resource created successfully |
| 400  | Bad Request           | Invalid request data          |
| 401  | Unauthorized          | Authentication required       |
| 403  | Forbidden             | Insufficient permissions      |
| 404  | Not Found             | Resource not found            |
| 500  | Internal Server Error | Server error                  |

### Error Response Format

```json
{
  "success": false,
  "error": "Error message here",
  "code": 404,
  "message": "Course not found"
}
```

## 📈 Best Practices

### 1. Pagination

Always use pagination for large datasets:

- Default limit: 9 items per page
- Include page and limit parameters
- Return totalPages and currentPage in response

### 2. Filtering

- Use query parameters for filters
- Support multiple filter combinations
- Implement efficient database indexes

### 3. Search

- Search across title, author, description, and tags
- Use PostgreSQL full-text search for better performance
- Implement relevance scoring

### 4. Image Handling

- Store images as URLs (use Unsplash or S3)
- Optimize image sizes for web
- Include alt text for accessibility

### 5. Security

- Validate all input data
- Sanitize user inputs
- Use HTTPS in production
- Implement rate limiting

## 🚀 Deployment Checklist

- ✅ Update database schema with migrations
- ✅ Set environment variables in production
- ✅ Configure CORS for your frontend domain
- ✅ Enable HTTPS (SSL certificate)
- ✅ Set up database backups
- ✅ Configure logging and monitoring
- ✅ Test all API endpoints
- ✅ Set up rate limiting
- ✅ Configure image optimization CDN
- ✅ Update frontend API base URL

## 🔗 Related Resources

- PostgreSQL Documentation
- Express.js Best Practices
- REST API Design Guide
- JWT Authentication

## 🆘 Support

For issues or questions:

- Check the error logs
- Verify database connection
- Test API endpoints with Postman
- Check environment variables
- Review the database schema
