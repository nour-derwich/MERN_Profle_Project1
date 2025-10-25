
/*
# Portfolio Backend API

Backend API for portfolio website with formations and courses management.

## 🚀 Features

- User authentication with JWT
- Projects management
- Formations management with registrations
- Courses (Books) with Amazon affiliate links
- Contact messages system
- Analytics and reporting
- File upload (Cloudinary)
- Email notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database credentials
- JWT secret
- Email service credentials
- Cloudinary credentials

### 4. Setup PostgreSQL Database

Make sure PostgreSQL is running, then:

```bash
# Create database and run schema
npm run db:setup

# Seed database with sample data
npm run db:seed
```

### 5. Start the server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
portfolio-backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/             # Route controllers
│   ├── auth.controller.js
│   ├── project.controller.js
│   ├── formation.controller.js
│   ├── course.controller.js
│   ├── registration.controller.js
│   ├── message.controller.js
│   └── analytics.controller.js
├── middleware/              # Custom middleware
│   ├── auth.js
│   ├── asyncHandler.js
│   └── validation.js
├── models/                  # Database models
│   ├── User.js
│   ├── Project.js
│   ├── Formation.js
│   ├── Course.js
│   └── Registration.js
├── routes/                  # API routes
│   ├── auth.routes.js
│   ├── project.routes.js
│   ├── formation.routes.js
│   ├── course.routes.js
│   ├── registration.routes.js
│   ├── message.routes.js
│   └── analytics.routes.js
├── scripts/                 # Utility scripts
│   ├── setup-database.js
│   └── seed-database.js
├── utils/                   # Helper functions
│   ├── errorResponse.js
│   ├── sendEmail.js
│   └── uploadImage.js
├── database/
│   └── schema.sql           # Database schema
├── public/
│   └── uploads/             # Uploaded files
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── server.js                # Main entry point
└── README.md

```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-password` - Update password

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Formations
- `GET /api/formations` - Get all formations
- `GET /api/formations/:id` - Get formation by ID
- `POST /api/formations` - Create formation (Admin)
- `PUT /api/formations/:id` - Update formation (Admin)
- `DELETE /api/formations/:id` - Delete formation (Admin)
- `GET /api/formations/stats/overview` - Get formation statistics (Admin)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/click` - Track Amazon link click
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Registrations
- `POST /api/registrations` - Create registration
- `GET /api/registrations` - Get all registrations (Admin)
- `GET /api/registrations/:id` - Get registration by ID (Admin)
- `PATCH /api/registrations/:id/status` - Update registration status (Admin)

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get all messages (Admin)
- `GET /api/messages/:id` - Get message by ID (Admin)
- `PATCH /api/messages/:id/status` - Update message status (Admin)
- `POST /api/messages/:id/reply` - Reply to message (Admin)
- `DELETE /api/messages/:id` - Delete message (Admin)

### Analytics
- `POST /api/analytics/track` - Track event
- `GET /api/analytics/overview` - Get analytics overview (Admin)
- `GET /api/analytics/formations` - Get formation analytics (Admin)
- `GET /api/analytics/traffic` - Get traffic analytics (Admin)
- `GET /api/analytics/conversions` - Get conversion analytics (Admin)
- `GET /api/analytics/monthly` - Get monthly analytics (Admin)

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 📊 Database Schema

### Tables:
- **users** - Admin users
- **projects** - Portfolio projects
- **formations** - Training/courses
- **courses** - Books with Amazon links
- **registrations** - Formation registrations
- **messages** - Contact form messages
- **reviews** - Formation reviews
- **analytics** - Analytics events
- **settings** - Site configuration

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet.js security headers
- CORS configuration
- Input validation
- SQL injection protection

## 📧 Email Configuration

Configure email service in `.env`:

For Gmail:
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use in SMTP_PASSWORD

## 📷 Image Upload

Images are uploaded to Cloudinary. Configure:

1. Create Cloudinary account
2. Get credentials from dashboard
3. Add to `.env`:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

## 🚀 Deployment

### Deploying to Railway/Render

1. Create new project
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Deploying to VPS

1. Install Node.js and PostgreSQL
2. Clone repository
3. Install dependencies
4. Setup database
5. Configure nginx reverse proxy
6. Use PM2 for process management:

```bash
npm install -g pm2
pm2 start server.js --name portfolio-api
pm2 startup
pm2 save
```

## 🔄 Database Migrations

When making schema changes:

1. Update `database/schema.sql`
2. Run: `npm run db:migrate`

## 📈 Monitoring

- Check logs: `pm2 logs portfolio-api`
- Monitor performance: `pm2 monit`
- View health: `GET /health`

## 🐛 Troubleshooting

### Database connection issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U postgres -d portfolio_db
```

### Port already in use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

## 📞 Support

For issues and questions:
- Email: your-email@example.com
- GitHub Issues: [repository-url]/issues

## 📄 License

MIT License

## 👨‍💻 Author

Naceur Keraani

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Setup database
npm run db:setup

# Seed sample data
npm run db:seed

# Start development server
npm run dev

# Start production server
npm start
```

## 📦 Default Credentials

After seeding:
- **Email:** admin@example.com
- **Password:** admin123

⚠️ **Change these credentials in production!**

---

Made with ❤️ by Nour Derouich
*/