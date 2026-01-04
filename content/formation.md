# Formation Management API Documentation

## Overview

This API provides endpoints for managing formations (training courses) in the portfolio application. The system supports comprehensive formation management including CRUD operations, filtering, statistics, and registration tracking.

## Base URL

```
http://localhost:5000/api/formations
```

## Authentication

| Method | Header | Required For |
|--------|--------|--------------|
| Bearer Token | `Authorization: Bearer <token>` | Admin operations |

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "count": 0,
  "message": "Optional message",
  "data": {}
}
```

## Formations Schema

### Formation Object

```javascript
{
  "id": "uuid",
  "title": "string",
  "description": "text",
  "short_description": "string(500)",
  "full_description": "text",
  "cover_image": "url",
  "category": "string", // Machine Learning, Deep Learning, Data Science, AI Engineering, Web Development
  "level": "string", // beginner, intermediate, advanced, expert
  "price": "decimal",
  "original_price": "decimal",
  "installment_price": "decimal",
  "currency": "string", // USD, EUR, TND
  "duration_hours": "integer",
  "weeks_duration": "string",
  "hours_per_week": "string",
  "max_participants": "integer",
  "current_participants": "integer",
  "spots_left": "integer",
  "start_date": "date",
  "end_date": "date",
  "schedule": "string",
  "format": "string", // Online, Hybrid, In-person
  "location": "string",
  "live_sessions": "string",
  "instructor_name": "string",
  "instructor_title": "string",
  "instructor_bio": "text",
  "instructor_photo": "url",
  "instructor_rating": "decimal",
  "instructor_reviews": "integer",
  "instructor_students": "integer",
  "instructor_verified": "boolean",
  "rating": "decimal",
  "reviews_count": "integer",
  "views_count": "integer",
  "status": "string", // draft, published, enrolling, upcoming, full, completed
  "featured": "boolean",
  "prerequisites": "text",
  "learning_objectives": "string[]",
  "features": "string[]",
  "highlights": "string[]",
  "modules": "json[]",
  "testimonials": "json[]",
  "tags": "string[]",
  "meta_description": "string",
  "meta_keywords": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Module Schema

```javascript
{
  "title": "string",
  "duration": "string",
  "topics": "string[]"
}
```

### Testimonial Schema

```javascript
{
  "name": "string",
  "role": "string",
  "text": "string",
  "rating": "integer"
}
```

## Endpoints

### 1. Get All Formations

Retrieve a list of formations with optional filtering and pagination.

**URL:** `GET /api/formations`

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| category | string | Filter by category | all |
| level | string | Filter by level | all |
| status | string | Filter by status | published |
| featured | boolean | Get featured formations only | false |
| searchQuery | string | Search in title, description, category | - |
| priceRange | string | Price range filter (under600, 600-900, 900-1200, over1200) | all |
| selectedStatus | string | Status filter | all |
| sortBy | string | Sort by (featured, popular, rating, recent, price-low, price-high) | featured |
| limit | integer | Number of records per page | 10 |
| offset | integer | Pagination offset | 0 |
| admin | boolean | Include draft formations (admin only) | false |

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    { /* formation object */ },
    { /* formation object */ }
  ]
}
```

**Example:**

```bash
GET /api/formations?category=Machine+Learning&level=advanced&featured=true&limit=5
```

### 2. Get Single Formation

Retrieve detailed information about a specific formation.

**URL:** `GET /api/formations/:id`

**Parameters:**
- `id` (path) - Formation UUID

**Response:**

```json
{
  "success": true,
  "data": { /* formation object with full details */ }
}
```

**Example:**

```bash
GET /api/formations/123e4567-e89b-12d3-a456-426614174000
```

### 3. Create Formation

Create a new formation (Admin only).

**URL:** `POST /api/formations`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Body:**

```json
{
  "title": "Machine Learning Mastery Bootcamp",
  "description": "Comprehensive ML training...",
  "short_description": "Master ML from fundamentals to advanced",
  "category": "Machine Learning",
  "level": "advanced",
  "price": 899.00,
  "duration_hours": 96,
  "max_participants": 15,
  "start_date": "2025-03-15",
  "end_date": "2025-05-10",
  "schedule": "Mon, Wed, Fri - 6:00 PM - 9:00 PM",
  "instructor_name": "Naceur Keraani",
  "status": "draft",
  "features": ["Live Sessions", "Certificate", "Projects"],
  "learning_objectives": ["Build models", "Deploy solutions"],
  "modules": [
    {
      "title": "ML Fundamentals",
      "duration": "24 hours",
      "topics": ["Linear Regression", "Model Evaluation"]
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Formation created successfully",
  "data": { /* created formation */ }
}
```

### 4. Update Formation

Update an existing formation (Admin only).

**URL:** `PUT /api/formations/:id`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Parameters:**
- `id` (path) - Formation UUID

**Body:**

```json
{
  "title": "Updated Title",
  "status": "published",
  "price": 799.00
}
```

**Response:**

```json
{
  "success": true,
  "message": "Formation updated successfully",
  "data": { /* updated formation */ }
}
```

### 5. Delete Formation

Delete a formation (Admin only).

**URL:** `DELETE /api/formations/:id`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Parameters:**
- `id` (path) - Formation UUID

**Response:**

```json
{
  "success": true,
  "message": "Formation deleted successfully"
}
```

### 6. Get Formation Categories

Get all available formation categories with counts.

**URL:** `GET /api/formations/categories`

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "category": "Machine Learning",
      "count": 3
    },
    {
      "category": "Data Science",
      "count": 2
    }
  ]
}
```

### 7. Get Formation Levels

Get all available formation levels with counts.

**URL:** `GET /api/formations/levels`

**Response:**

```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "level": "beginner",
      "count": 5
    },
    {
      "level": "intermediate",
      "count": 3
    }
  ]
}
```

### 8. Get Formation Statuses

Get all formation statuses with counts (Admin only).

**URL:** `GET /api/formations/statuses`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Response:**

```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "status": "published",
      "count": 8
    },
    {
      "status": "draft",
      "count": 2
    }
  ]
}
```

### 9. Get Formation Statistics

Get comprehensive formation statistics (Admin only).

**URL:** `GET /api/formations/stats/overview`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "total_formations": 10,
    "published_formations": 8,
    "draft_formations": 2,
    "featured_formations": 3,
    "total_participants": 156,
    "total_capacity": 200,
    "average_price": 649.50,
    "total_views": 12500
  }
}
```

### 10. Update Formation Participants

Update participant count for a formation (Admin only).

**URL:** `PUT /api/formations/:id/participants`

**Headers:**
- `Authorization: Bearer <admin_token>`

**Parameters:**
- `id` (path) - Formation UUID

**Body:**

```json
{
  "count": 2
}
```

**Response:**

```json
{
  "success": true,
  "message": "Participants updated successfully",
  "data": { /* updated formation */ }
}
```

## Filter Examples

### 1. Search with Filters

```bash
GET /api/formations?searchQuery=machine&category=Machine+Learning&level=advanced&priceRange=600-900&sortBy=rating&limit=10&offset=0
```

### 2. Featured Formations

```bash
GET /api/formations?featured=true&status=published&sortBy=featured
```

### 3. Upcoming Formations

```bash
GET /api/formations?selectedStatus=upcoming&sortBy=recent
```

### 4. Admin View (includes drafts)

```bash
GET /api/formations?admin=true&sortBy=created_at
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Formation not found"
}
```

### 500 Server Error

```json
{
  "success": false,
  "error": "Server error message"
}
```

## Frontend Integration Examples

### React Component Example

```javascript
import React, { useState, useEffect } from 'react';

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    priceRange: 'all',
    sortBy: 'featured'
  });

  const fetchFormations = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/formations?${queryParams}`);
    const data = await response.json();
    
    if (data.success) {
      setFormations(data.data);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, [filters]);

  return (
    // Your component JSX
  );
};
```

### Axios Example

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Set auth token for admin requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get formations with filters
const getFormations = async (filters = {}) => {
  const response = await API.get('/formations', { params: filters });
  return response.data;
};

// Create formation (admin)
const createFormation = async (formationData) => {
  const response = await API.post('/formations', formationData);
  return response.data;
};
```

## Database Schema

### Formations Table

```sql
CREATE TABLE formations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    full_description TEXT,
    cover_image TEXT,
    category VARCHAR(50),
    level VARCHAR(20),
    price DECIMAL(10, 2) DEFAULT 0.00,
    original_price DECIMAL(10, 2),
    installment_price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    duration_hours INTEGER,
    weeks_duration VARCHAR(50),
    hours_per_week VARCHAR(50),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    spots_left INTEGER,
    start_date DATE,
    end_date DATE,
    schedule TEXT,
    format VARCHAR(50) DEFAULT 'Online',
    location VARCHAR(100) DEFAULT 'Online',
    live_sessions VARCHAR(100),
    instructor_name VARCHAR(100),
    instructor_title VARCHAR(100),
    instructor_bio TEXT,
    instructor_photo TEXT,
    instructor_rating DECIMAL(3, 2),
    instructor_reviews INTEGER DEFAULT 0,
    instructor_students INTEGER DEFAULT 0,
    instructor_verified BOOLEAN DEFAULT false,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    prerequisites TEXT,
    learning_objectives TEXT[],
    features TEXT[],
    highlights TEXT[],
    modules JSONB,
    testimonials JSONB,
    tags VARCHAR(100)[],
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Sample Data

### Example Formation JSON

```json
{
  "title": "Machine Learning Mastery Bootcamp",
  "description": "Comprehensive hands-on training in machine learning algorithms...",
  "short_description": "Master ML from fundamentals to advanced",
  "category": "Machine Learning",
  "level": "advanced",
  "price": 899.00,
  "original_price": 1199.00,
  "duration_hours": 96,
  "max_participants": 15,
  "current_participants": 10,
  "start_date": "2025-03-15",
  "end_date": "2025-05-10",
  "schedule": "Mon, Wed, Fri - 6:00 PM - 9:00 PM",
  "format": "Online + Live Sessions",
  "instructor_name": "Naceur Keraani",
  "instructor_title": "Senior ML Engineer",
  "status": "enrolling",
  "featured": true,
  "features": ["Live Sessions", "Certificate", "Real Projects"],
  "learning_objectives": ["Build ML models", "Deploy to production"],
  "modules": [
    {
      "title": "ML Fundamentals",
      "duration": "24 hours",
      "topics": ["Linear Regression", "Decision Trees", "Model Evaluation"]
    }
  ],
  "tags": ["Machine Learning", "AI", "Python", "MLOps"]
}
```

## Rate Limiting

- **Public endpoints:** 100 requests per 15 minutes
- **Admin endpoints:** 50 requests per 15 minutes

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-15 | Initial release with full CRUD operations |
| 1.1.0 | 2024-01-15 | Added comprehensive filtering and statistics |