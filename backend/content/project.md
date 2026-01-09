# Project Management API Documentation

## 📋 Overview

This document explains how to add, manage, and interact with projects through the backend API. The system supports full CRUD operations with advanced filtering, statistics, and project management features.

## 🔧 Prerequisites

### Database Setup
Ensure PostgreSQL is running with the projects table created

### Environment Variables
Configure `.env` file with:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

## 🚀 API Endpoints

**Base URL:** `http://localhost:5000/api/projects`

### 📤 1. Adding a New Project

**Endpoint:** `POST /api/projects`

**Headers:**
```http
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body (Full Example):**
```json
{
  "title": "AI-Powered Trading Platform",
  "short_description": "Machine learning system for algorithmic trading with real-time analytics",
  "description": "A comprehensive AI-driven trading platform that uses machine learning algorithms to analyze market data, predict trends, and execute trades automatically.",
  "full_description": "This project implements a sophisticated quantitative trading system using deep learning models. It features real-time market analysis, risk management algorithms, and automated trade execution. The system processes terabytes of financial data daily and has achieved consistent returns above market benchmarks.",
  "category": "AI Finance",
  "technologies": ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "AWS"],
  "complexity": "Advanced",
  "status": "published",
  "featured": true,
  "display_order": 1,
  "cover_image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
  "demo_url": "https://trading-demo.example.com",
  "github_url": "https://github.com/username/trading-ai",
  "documentation_url": "https://docs.trading-ai.example.com",
  "article_url": "https://blog.example.com/trading-ai-case-study",
  "video": "https://youtube.com/watch?v=example123",
  "environment": "production",
  "development_time": "6 months",
  "dataset_size": "500GB",
  "team_size": "3 members",
  "duration": "6 months",
  "goals": [
    "Create profitable trading algorithms",
    "Implement real-time market analysis",
    "Build risk management system"
  ],
  "features": [
    "Real-time market analysis",
    "Automated trade execution",
    "Risk optimization models",
    "Performance dashboard"
  ],
  "challenges": [
    {
      "description": "Processing high-frequency market data in real-time",
      "solution": "Implemented Apache Kafka for stream processing and Redis for caching"
    }
  ],
  "results": [
    "Achieved 28.5% ROI in testing",
    "Reduced risk by 45%",
    "Processed 1M+ transactions daily"
  ],
  "metrics": {
    "roi": "28.5%",
    "accuracy": "94.2%",
    "risk_score": "Low",
    "performance": "A+"
  },
  "architecture": "Microservices architecture with Python backend, React frontend, and containerized deployment",
  "tags": ["ai", "trading", "finance", "machine-learning"],
  "meta_description": "AI-powered trading platform with machine learning algorithms",
  "meta_keywords": "ai, trading, machine learning, finance, algorithm",
  "live_demo_available": true,
  "source_code_available": true,
  "documentation_available": true,
  "api_available": true,
  "open_source": false,
  "views_count": 0,
  "stars": 0,
  "forks": 0,
  "contributors": 1,
  "last_updated": "2024-01-15T10:30:00Z"
}
```

**Minimum Required Fields:**
```json
{
  "title": "Project Title",
  "description": "Project description",
  "category": "Project Category",
  "technologies": ["Tech1", "Tech2"]
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 1,
    "title": "AI-Powered Trading Platform",
    "slug": "ai-powered-trading-platform",
    "status": "published",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### 🖼️ 2. Uploading Project Image

**Endpoint:** `POST /api/projects/upload-image`

**Headers:**
```http
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
```http
image: [file] (Supports: jpg, jpeg, png, webp, max 20MB)
```

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/projects/upload-image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@/path/to/project-image.jpg"
```

**Using JavaScript (React/Axios):**
```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axios.post(
    '/api/projects/upload-image',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  
  return response.data.url; // Returns Cloudinary URL
};
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/project.jpg",
  "public_id": "project_1234567890"
}
```

### 📝 3. Updating a Project

**Endpoint:** `PUT /api/projects/:id`

**Request:**
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "description": "Updated description",
    "status": "published"
  }'
```

### 🗑️ 4. Deleting a Project

**Endpoint:** `DELETE /api/projects/:id`

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 📊 5. Project Management Features

#### 5.1 Get All Projects (Public)

```bash
GET /api/projects
```

**Query Parameters:**
- `category` - Filter by category
- `complexity` - Filter by complexity level
- `status` - Filter by status
- `featured` - Get only featured projects
- `search` - Search across title, description, technologies
- `sortBy` - Sort by: featured, recent, complexity, popular, alphabetical
- `limit` - Number of results (default: 10)
- `page` - Page number (default: 1)

**Example:**
```bash
GET /api/projects?category=AI+Finance&complexity=Advanced&sortBy=recent&limit=5
```

#### 5.2 Get Project Statistics

```bash
GET /api/projects/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_projects": 15,
    "published_projects": 12,
    "featured_projects": 3,
    "open_source_projects": 8,
    "total_views": 12500,
    "total_stars": 450,
    "total_forks": 120
  }
}
```

#### 5.3 Get Categories

```bash
GET /api/projects/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "category": "AI Finance", "count": 3 },
    { "category": "Deep Learning", "count": 4 },
    { "category": "Data Science", "count": 5 }
  ]
}
```

#### 5.4 Search Projects

```bash
GET /api/projects/search?q=machine+learning
```

### 🛠️ 6. Admin Dashboard Endpoints

#### 6.1 Get All Projects (Including Drafts)

```bash
GET /api/projects/admin/all
```

**Headers:** `Authorization: Bearer <admin_jwt_token>`

#### 6.2 Update Project Status

```bash
PATCH /api/projects/:id/status
```

**Body:**
```json
{
  "status": "published" // draft, published, archived
}
```

#### 6.3 Toggle Featured Status

```bash
PATCH /api/projects/:id/featured
```

#### 6.4 Reorder Projects

```bash
PUT /api/projects/reorder
```

**Body:**
```json
{
  "projects": [
    { "id": 1, "display_order": 1 },
    { "id": 2, "display_order": 2 },
    { "id": 3, "display_order": 3 }
  ]
}
```

### 🔍 7. Advanced Features

#### 7.1 Increment Views

```bash
POST /api/projects/:id/view
```

Automatically increments view count

#### 7.2 Increment Stars

```bash
POST /api/projects/:id/star
```

#### 7.3 Increment Forks

```bash
POST /api/projects/:id/fork
```

#### 7.4 Get Related Projects

```bash
GET /api/projects/:id/related
```

## 🎯 8. Field Reference Guide

### Required Fields

- `title` - Project title (3-200 characters)
- `description` - Full description
- `category` - Project category
- `technologies` - Array of technologies used

### Status Options

- `draft` - Not publicly visible
- `published` - Publicly visible
- `archived` - Hidden but preserved

### Complexity Levels

- Beginner
- Intermediate
- Advanced
- Expert

### Sample Categories

- AI Finance
- Deep Learning
- Computer Vision
- NLP
- Web Applications
- Automation
- Data Science
- AI Security

### Common Technologies

```json
[
  "Python", "JavaScript", "React", "Node.js", "TensorFlow",
  "PyTorch", "FastAPI", "Docker", "PostgreSQL", "MongoDB",
  "AWS", "Azure", "Git", "Redis", "Kafka"
]
```

## 💻 9. Code Examples

### React Component Example

```javascript
// AddProjectForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    category: '',
    technologies: [],
    complexity: 'Intermediate',
    status: 'draft'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/projects', project, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      alert('Project created successfully!');
      console.log('Created:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => setProject({...project, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        value={project.description}
        onChange={(e) => setProject({...project, description: e.target.value})}
        required
      />
      {/* More fields... */}
      <button type="submit">Create Project</button>
    </form>
  );
};
```

### Using Postman

1. Set request method to **POST**
2. URL: `http://localhost:5000/api/projects`
3. **Headers:**
   - `Authorization: Bearer YOUR_TOKEN`
   - `Content-Type: application/json`
4. **Body (raw JSON):**

```json
{
  "title": "My New Project",
  "description": "Project description here",
  "category": "Web Development",
  "technologies": ["React", "Node.js"]
}
```

## 🚨 10. Error Handling

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| 400 | Validation Error | Check request body format |
| 401 | Unauthorized | Add valid JWT token |
| 403 | Forbidden | Admin access required |
| 404 | Project Not Found | Check project ID |
| 500 | Server Error | Check server logs |

### Validation Rules

- **Title:** 3-200 characters
- **Description:** Required
- **Category:** Must exist
- **Technologies:** Array format
- **URLs:** Must be valid URLs

## 📈 11. Testing the API

### Test Script

```bash
#!/bin/bash
# test-api.sh

# 1. Health Check
curl http://localhost:5000/api/projects/health

# 2. Get all projects
curl http://localhost:5000/api/projects

# 3. Create test project (requires token)
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "Test description",
    "category": "Test Category",
    "technologies": ["Test"]
  }'
```

## 🔧 12. Troubleshooting

### Common Issues

**"Project not found" error**
- Verify project ID exists
- Check if project status is 'published'

**Upload image fails**
- Check file size (<20MB)
- Verify file format (jpg, png, webp)
- Ensure proper authorization

**Filtering not working**
- Check query parameter spelling
- Verify category/complexity values match

**Authentication errors**
- Ensure JWT token is valid
- Check token expiration
- Verify user has admin role

## 📚 13. Additional Resources

- **Postman Collection:** Download template
- **Database Schema:** See migration SQL above
- **Sample Data:** `sample-projects.json`

## 🎉 Quick Start Summary

1. **Setup Database:** Run the SQL migration
2. **Configure .env:** Add database and JWT settings
3. **Get Admin Token:** Login to get JWT token
4. **Add First Project:**

```bash
curl -X POST /api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "First Project",
    "description": "Description",
    "category": "Web",
    "technologies": ["React", "Node.js"]
  }'
```

5. **Test API:** Use Postman or curl commands

## 📞 Support

For issues or questions:
- Check server logs for errors
- Verify database connection
- Test with Postman
- Review validation rules
- Ensure proper authorization