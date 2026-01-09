# Registration Management API Documentation

## 📋 Overview

This API manages registrations for formations (courses). The system is completely FREE and uses email verification for registration confirmation.

## 🔐 Authentication & Authorization

### 🔷 Admin Routes
- **Authentication:** JWT Token required
- **Authorization:** admin role required
- **Header:** `Authorization: Bearer <token>`

### 🔶 Public Routes
- No authentication required
- Rate limiting applied

## 📊 API Endpoints

## 1. 📝 Registration Endpoints

### 🔹 1.1 Create Registration

Create a new registration for a formation

**URL:** `POST /api/registrations`

**Access:** Public

**Description:** Register for a formation (completely free)

**Request Body:**

```json
{
  "formation_id": "uuid-string",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+21612345678",
  "message": "I'm interested in this formation",
  "role": "student",
  "current_role": "Computer Science Student",
  "terms": true
}
```

**Validation Rules:**

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| formation_id | UUID | ✅ | Valid UUID | Formation ID |
| full_name | String | ✅ | 2-100 chars | Full name |
| email | String | ✅ | Valid email | Email address |
| phone | String | ✅ | Phone regex | Phone number |
| role | String | ❌ | Enum | student/developer/data-scientist/ml-engineer/manager/other |
| current_role | String | ❌ | Max 100 chars | Current job/role |
| terms | Boolean | ✅ | Must be true | Terms acceptance |

**Success Response:**

```json
{
  "success": true,
  "message": "Registration successful. Please check your email for confirmation.",
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "formation_title": "Web Development Bootcamp",
    "requires_verification": true,
    "verification_sent": true
  }
}
```

**Error Responses:**

| Code | Condition |
|------|-----------|
| 400 | Formation not found or full |
| 400 | Already registered for this formation |
| 400 | Validation errors |
| 500 | Server error |

### 🔹 1.2 Verify Email

Verify registration email

**URL:** `GET /api/registrations/verify/:token`

**Access:** Public

**Description:** Verify email using token sent in confirmation email

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| token | String | ✅ | Verification token |

**Success Response:**

```json
{
  "success": true,
  "message": "Email verified successfully! Welcome email has been sent.",
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "status": "confirmed",
    "is_verified": true,
    "formation_title": "Web Development Bootcamp"
  }
}
```

**Error Responses:**

| Code | Condition |
|------|-----------|
| 400 | Invalid or expired token |
| 400 | Already verified |
| 500 | Server error |

### 🔹 1.3 Resend Verification Email

Resend verification email

**URL:** `POST /api/registrations/resend-verification`

**Access:** Public

**Description:** Resend verification email for pending registration

**Request Body:**

```json
{
  "email": "john@example.com",
  "formation_id": "uuid-string"
}
```

**Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | String | ✅ | Valid email |
| formation_id | String | ✅ | Valid UUID |

**Success Response:**

```json
{
  "success": true,
  "message": "Verification email resent successfully"
}
```

**Error Responses:**

| Code | Condition |
|------|-----------|
| 400 | No pending verification found |
| 400 | Token expired |
| 500 | Server error |

### 🔹 1.4 Cancel Registration

Cancel a registration

**URL:** `POST /api/registrations/:id/cancel`

**Access:** Public (with email verification)

**Description:** Cancel registration by user

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✅ | Registration ID |

**Request Body:**

```json
{
  "email": "john@example.com",
  "reason": "Schedule conflict"
}
```

**Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | String | ✅ | Valid email |
| reason | String | ✅ | Not empty |

**Success Response:**

```json
{
  "success": true,
  "message": "Registration cancelled successfully",
  "data": {
    "id": "uuid",
    "status": "cancelled",
    "cancelled_at": "2024-01-15T10:30:00.000Z",
    "cancellation_reason": "Schedule conflict"
  }
}
```

**Error Responses:**

| Code | Condition |
|------|-----------|
| 404 | Registration not found |
| 401 | Email doesn't match |
| 400 | Already cancelled |
| 500 | Server error |

## 2. 👑 Admin Management Endpoints

### 🔹 2.1 Get All Registrations

Get all registrations with filters

**URL:** `GET /api/registrations`

**Access:** Admin

**Query Parameters:**
- `formation_id` (UUID) - Filter by formation
- `status` (String) - Filter by status
- `email` (String) - Filter by email
- `page` (Number) - Page number
- `limit` (Number) - Items per page

**Success Response:**

```json
{
  "success": true,
  "count": 150,
  "page": 1,
  "totalPages": 15,
  "data": [
    {
      "id": "uuid",
      "formation_id": "uuid",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+21612345678",
      "status": "confirmed",
      "is_verified": true,
      "registration_date": "2024-01-15T10:30:00.000Z",
      "formation_title": "Web Development Bootcamp",
      "formation_start_date": "2024-02-01"
    }
  ]
}
```

### 🔹 2.2 Get Registration by ID

Get single registration details

**URL:** `GET /api/registrations/:id`

**Access:** Admin

**Success Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "formation_id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+21612345678",
    "role": "student",
    "current_role": "Computer Science Student",
    "status": "confirmed",
    "is_verified": true,
    "registration_date": "2024-01-15T10:30:00.000Z",
    "confirmed_at": "2024-01-15T11:00:00.000Z",
    "formation_title": "Web Development Bootcamp",
    "formation_description": "Learn web development...",
    "formation_start_date": "2024-02-01",
    "formation_end_date": "2024-04-01"
  }
}
```

### 🔹 2.3 Update Registration Status

Update registration status

**URL:** `PATCH /api/registrations/:id/status`

**Access:** Admin

**Request Body:**

```json
{
  "status": "confirmed"
}
```

**Allowed Status Values:**
- `pending` - Initial status
- `confirmed` - Registration confirmed
- `cancelled` - Registration cancelled
- `completed` - Formation completed

**Success Response:**

```json
{
  "success": true,
  "message": "Registration status updated",
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "updated_at": "2024-01-15T11:00:00.000Z"
  }
}
```

### 🔹 2.4 Update Registration Details

Update registration information

**URL:** `PUT /api/registrations/:id`

**Access:** Admin

**Request Body:**

```json
{
  "full_name": "John Updated",
  "phone": "+21698765432",
  "role": "developer"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Registration updated successfully",
  "data": {
    "id": "uuid",
    "full_name": "John Updated",
    "phone": "+21698765432",
    "role": "developer",
    "updated_at": "2024-01-15T11:30:00.000Z"
  }
}
```

### 🔹 2.5 Delete Registration

Delete a registration

**URL:** `DELETE /api/registrations/:id`

**Access:** Admin

**Success Response:**

```json
{
  "success": true,
  "message": "Registration deleted successfully",
  "data": {}
}
```

### 🔹 2.6 Send Welcome Email

Manually send welcome email

**URL:** `POST /api/registrations/:id/send-welcome`

**Access:** Admin

**Description:** Send welcome email to verified registration

**Success Response:**

```json
{
  "success": true,
  "message": "Welcome email sent successfully"
}
```

**Error Responses:**

| Code | Condition |
|------|-----------|
| 400 | Registration not verified |
| 500 | Email sending failed |

### 🔹 2.7 Send Custom Notification

Send custom email to registrant

**URL:** `POST /api/registrations/:id/notify`

**Access:** Admin

**Request Body:**

```json
{
  "subject": "Important Update",
  "message": "The formation schedule has been updated..."
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Notification sent successfully"
}
```

## 3. 📈 Statistics & Reporting

### 🔹 3.1 Get Registration Statistics

Get registration statistics and analytics

**URL:** `GET /api/registrations/stats`

**Access:** Admin

**Query Parameters:**
- `formation_id` (UUID) - Filter by formation
- `start_date` (Date) - Start date filter
- `end_date` (Date) - End date filter

**Success Response:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "total_registrations": 150,
      "confirmed": 120,
      "pending": 20,
      "cancelled": 10,
      "verified": 115,
      "unique_formations": 5
    },
    "monthly": [
      {
        "month": "2024-01-01",
        "registrations": 45
      },
      {
        "month": "2023-12-01",
        "registrations": 38
      }
    ]
  }
}
```

### 🔹 3.2 Get Registrations by Formation

Get registrations for specific formation

**URL:** `GET /api/registrations/formation/:formationId`

**Access:** Admin

**Success Response:**

```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "uuid",
      "full_name": "John Doe",
      "email": "john@example.com",
      "status": "confirmed",
      "is_verified": true,
      "registration_date": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 🔹 3.3 Export Registrations to CSV

Export registrations data to CSV

**URL:** `GET /api/registrations/export`

**Access:** Admin

**Query Parameters:**
- `formation_id` (UUID) - Filter by formation
- `status` (String) - Filter by status
- `format` (String) - Export format (csv/json, default: csv)

**Response Headers:**

```
Content-Type: text/csv
Content-Disposition: attachment; filename="registrations.csv"
```

**CSV Format:**

```
ID,Full Name,Email,Phone,Status,Registration Date,Formation Title
uuid1,John Doe,john@example.com,+21612345678,confirmed,2024-01-15,Web Development
```

## 4. 🚀 Bulk Operations

### 🔹 4.1 Bulk Actions

Perform bulk operations on registrations

**URL:** `POST /api/registrations/bulk-action`

**Access:** Admin

**Request Body:**

```json
{
  "action": "confirm",
  "registration_ids": ["uuid1", "uuid2", "uuid3"]
}
```

**Available Actions:**

| Action | Description |
|--------|-------------|
| confirm | Confirm selected registrations |
| cancel | Cancel selected registrations |
| delete | Delete selected registrations |
| export | Export selected registrations |

**Success Response:**

```json
{
  "success": true,
  "message": "Bulk action 'confirm' completed successfully",
  "affected": 3,
  "data": [
    {
      "id": "uuid1",
      "status": "confirmed"
    }
  ]
}
```

## 5. 📱 Email System

### Email Templates:

**1. Registration Confirmation Email:**
- **To:** Registrant
- **Subject:** Confirm Your Registration for [Formation Title]
- **Content:** Welcome message + verification link

**2. Welcome Email:**
- **To:** Verified registrant
- **Subject:** Welcome to [Formation Title]!
- **Content:** Formation details, schedule, next steps

**3. Admin Notification:**
- **To:** Admin email
- **Subject:** New Registration: [Formation Title]
- **Content:** Registration details for admin review

**4. Custom Notification:**
- **To:** Registrant
- **Subject:** [Formation Title] - [Custom Subject]
- **Content:** Custom message from admin

## 6. 🔍 Verification System Flow

```
1. User Registration
   ↓
2. Send Confirmation Email
   ↓
3. User Clicks Verification Link
   ↓
4. Verify Token & Update Status
   ↓
5. Send Welcome Email
   ↓
6. Registration Complete ✅
```

## 7. 🗄️ Database Schema

### Registrations Table:

```sql
CREATE TABLE registrations (
    id UUID PRIMARY KEY,
    formation_id UUID REFERENCES formations(id),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    role VARCHAR(100),
    current_role VARCHAR(100),
    terms_accepted BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending',
    verification_token VARCHAR(100),
    verification_token_expires TIMESTAMP,
    is_verified BOOLEAN DEFAULT false,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes:
- `idx_registrations_email_formation` - Fast lookup by email & formation
- `idx_registrations_verification_token` - Fast token lookup
- `idx_registrations_status_verified` - Status queries

## 8. ⚙️ Configuration

### Environment Variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
FROM_EMAIL=noreply@example.com
FROM_NAME=Your Platform Name

# Admin
ADMIN_EMAIL=admin@example.com
SUPPORT_EMAIL=support@example.com

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

## 9. 🚨 Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Invalid formation ID | UUID format invalid |
| 400 | Formation not found | Formation doesn't exist |
| 400 | Formation is full | No available slots |
| 400 | Already registered | User already registered |
| 400 | Invalid verification token | Token invalid or expired |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Registration not found | Registration ID invalid |
| 409 | Already verified | Email already verified |
| 422 | Validation error | Request data invalid |
| 429 | Too many requests | Rate limit exceeded |
| 500 | Internal server error | Server error |

## 10. 📋 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Registration | 5/hour | Per IP |
| Verification | 3/hour | Per email |
| API | 100/hour | Per token |

## 11. 🔄 Webhooks (Optional)

### Registration Events:
- `registration.created`
- `registration.verified`
- `registration.confirmed`
- `registration.cancelled`

**Webhook Payload:**

```json
{
  "event": "registration.verified",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "formation_id": "uuid",
    "timestamp": "2024-01-15T11:00:00.000Z"
  }
}
```

## 12. 🧪 Testing

### Test Registration:

```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "formation_id": "550e8400-e29b-41d4-a716-446655440001",
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+21612345678",
    "terms": true
  }'
```

### Test Admin Access:

```bash
curl -X GET http://localhost:5000/api/registrations \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## 📚 Additional Notes

- **No Payment Processing:** System is completely free
- **Email Verification Required:** All registrations require email confirmation
- **Auto-increment Participants:** Formation participant count updates automatically
- **Cascading Deletes:** Deleting a formation deletes its registrations