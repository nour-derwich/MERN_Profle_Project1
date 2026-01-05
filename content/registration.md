# Registration Management API Documentation

## Overview

The Registration Management API provides endpoints for handling course/formation registrations, including user registration, payment processing, email verification, and admin management.

## Base URL

```
http://localhost:5000/api/registrations
```

## Authentication

- **Public endpoints:** No authentication required
- **Admin endpoints:** JWT token required with admin role
- **Token format:** `Bearer <token>`

## Endpoints

### 1. Create Registration

**Endpoint:** `POST /`

Create a new registration for a formation.

**Request Body:**

```json
{
  "formation_id": "uuid-string",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+21612345678",
  "role": "student",
  "current_role": "Developer",
  "message": "Optional message",
  "terms": true,
  "payment_method": "credit",
  "amount_paid": 599.99
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration successful. Please check your email for confirmation.",
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "formation_title": "Full Stack Development",
    "requires_verification": true,
    "verification_sent": true
  }
}
```

### 2. Verify Email

**Endpoint:** `GET /verify/:token`

Verify user's email using the verification token sent to their email.

**Parameters:**
- `token`: Verification token (from email link)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Email verified successfully! Welcome email has been sent.",
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "status": "confirmed",
    "formation_title": "Full Stack Development"
  }
}
```

### 3. Resend Verification Email

**Endpoint:** `POST /resend-verification`

Resend verification email to user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "formation_id": "uuid-string"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Verification email resent successfully"
}
```

### 4. Cancel Registration

**Endpoint:** `POST /:id/cancel`

Cancel a registration (user-initiated with email verification).

**Parameters:**
- `id`: Registration ID

**Request Body:**

```json
{
  "email": "john@example.com",
  "reason": "Change of schedule"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Registration cancelled successfully",
  "data": {
    "id": "uuid",
    "status": "cancelled",
    "payment_status": "refunded"
  }
}
```

## Admin Endpoints (Requires Admin Authentication)

### 5. Get All Registrations

**Endpoint:** `GET /`

Get all registrations with optional filters.

**Query Parameters:**
- `formation_id` (optional): Filter by formation
- `status` (optional): Filter by status
- `payment_status` (optional): Filter by payment status
- `email` (optional): Filter by email

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "uuid",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+21612345678",
      "status": "confirmed",
      "payment_status": "paid",
      "amount_paid": 599.99,
      "registration_date": "2024-01-15T10:30:00.000Z",
      "formation_title": "Full Stack Development",
      "formation_price": 599.99,
      "formation_currency": "USD"
    }
  ]
}
```

### 6. Get Registration by ID

**Endpoint:** `GET /:id`

Get detailed information about a specific registration.

**Parameters:**
- `id`: Registration ID

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+21612345678",
    "role": "student",
    "current_role": "Developer",
    "status": "confirmed",
    "payment_status": "paid",
    "payment_method": "credit",
    "amount_paid": 599.99,
    "currency": "USD",
    "is_verified": true,
    "registration_date": "2024-01-15T10:30:00.000Z",
    "confirmed_at": "2024-01-15T11:00:00.000Z",
    "formation_title": "Full Stack Development",
    "formation_description": "Complete full stack course...",
    "formation_start_date": "2024-02-01",
    "formation_end_date": "2024-03-31",
    "formation_price": 599.99
  }
}
```

### 7. Get Registration Statistics

**Endpoint:** `GET /stats`

Get comprehensive registration statistics.

**Query Parameters:**
- `formation_id` (optional): Filter by formation
- `start_date` (optional): Start date for range
- `end_date` (optional): End date for range

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "summary": {
      "total_registrations": 150,
      "confirmed": 120,
      "pending": 20,
      "cancelled": 10,
      "paid": 110,
      "payment_pending": 40,
      "verified": 115,
      "total_revenue": 65898.9,
      "average_payment": 599.08,
      "unique_formations": 5
    },
    "monthly": [
      {
        "month": "2024-01-01T00:00:00.000Z",
        "registrations": 25,
        "revenue": 14975
      }
    ]
  }
}
```

### 8. Get Registrations by Formation

**Endpoint:** `GET /formation/:formationId`

Get all registrations for a specific formation.

**Parameters:**
- `formationId`: Formation ID

**Response (200 OK):**

```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": "uuid",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+21612345678",
      "status": "confirmed",
      "payment_status": "paid",
      "registration_date": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 9. Export Registrations to CSV

**Endpoint:** `GET /export`

Export registrations to CSV format.

**Query Parameters:**
- `formation_id` (optional): Filter by formation
- `status` (optional): Filter by status

**Headers:**

```
Content-Type: text/csv
Content-Disposition: attachment; filename="registrations.csv"
```

**Response (200 OK):**

```
"ID","Full Name","Email","Phone","Status","Payment Status","Amount Paid","Registration Date","Formation Title"
"550e8400-e29b-41d4-a716-446655440000","John Doe","john@example.com","+21612345678","confirmed","paid","599.99","2024-01-15T10:30:00.000Z","Full Stack Development"
```

### 10. Update Registration Status

**Endpoint:** `PATCH /:id/status`

Update registration status.

**Parameters:**
- `id`: Registration ID

**Request Body:**

```json
{
  "status": "confirmed"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Registration status updated",
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "updated_at": "2024-01-15T12:00:00.000Z"
  }
}
```

**Available Statuses:**
- `pending` - Registration pending verification
- `confirmed` - Registration confirmed
- `cancelled` - Registration cancelled
- `completed` - Formation completed

### 11. Update Payment Status

**Endpoint:** `PATCH /:id/payment`

Update payment status and optionally notify user.

**Parameters:**
- `id`: Registration ID

**Request Body:**

```json
{
  "payment_status": "paid",
  "payment_reference": "PAY-123456",
  "notify_user": true
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Payment status updated and user notified",
  "data": {
    "id": "uuid",
    "payment_status": "paid",
    "payment_reference": "PAY-123456"
  }
}
```

**Available Payment Statuses:**
- `pending` - Payment pending
- `paid` - Payment received
- `refunded` - Payment refunded
- `failed` - Payment failed

### 12. Update Registration Details

**Endpoint:** `PUT /:id`

Update registration details.

**Parameters:**
- `id`: Registration ID

**Request Body:**

```json
{
  "full_name": "John Updated",
  "phone": "+21698765432",
  "current_role": "Senior Developer"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Registration updated successfully",
  "data": {
    "id": "uuid",
    "full_name": "John Updated",
    "phone": "+21698765432",
    "current_role": "Senior Developer"
  }
}
```

### 13. Delete Registration

**Endpoint:** `DELETE /:id`

Delete a registration.

**Parameters:**
- `id`: Registration ID

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Registration deleted successfully",
  "data": {}
}
```

### 14. Send Welcome Email

**Endpoint:** `POST /:id/send-welcome`

Manually send welcome email to verified registration.

**Parameters:**
- `id`: Registration ID

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Welcome email sent successfully"
}
```

### 15. Send Custom Notification

**Endpoint:** `POST /:id/notify`

Send custom notification/email to registrant.

**Parameters:**
- `id`: Registration ID

**Request Body:**

```json
{
  "subject": "Important Update",
  "message": "The course start date has been changed to February 15th."
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Notification sent successfully"
}
```

### 16. Bulk Actions

**Endpoint:** `POST /bulk-action`

Perform bulk actions on multiple registrations.

**Request Body:**

```json
{
  "action": "confirm",
  "registration_ids": ["uuid1", "uuid2", "uuid3"]
}
```

**Available Actions:**
- `confirm` - Confirm multiple registrations
- `cancel` - Cancel multiple registrations
- `delete` - Delete multiple registrations
- `export` - Export selected registrations

**Response (200 OK):**

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

## Email Templates Sent

### 1. Registration Confirmation Email

**Sent to:** User after registration  
**Subject:** [Formation Title] Confirmation d'inscription

**Contents:**
- Welcome message
- Registration details
- Verification link (24-hour expiry)
- Formation information

### 2. Admin Notification Email

**Sent to:** Admin email  
**Subject:** 🚨 Nouvelle inscription : [Name] - [Formation Title]

**Contents:**
- Student information
- Formation details
- Statistics (participants, revenue)
- Admin dashboard link

### 3. Payment Confirmation Email

**Sent to:** User after successful payment  
**Subject:** ✅ Confirmation de paiement - [Formation Title]

**Contents:**
- Payment receipt
- Formation details
- Next steps

### 4. Welcome Email

**Sent to:** User after email verification  
**Subject:** 🎓 Bienvenue dans [Formation Title] !

**Contents:**
- Welcome message
- Available resources
- Calendar information
- Support contact

## Error Responses

### Common Error Codes

**400 Bad Request**

```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized**

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

**403 Forbidden**

```json
{
  "success": false,
  "message": "Admin access required"
}
```

**404 Not Found**

```json
{
  "success": false,
  "message": "Registration not found"
}
```

**409 Conflict**

```json
{
  "success": false,
  "message": "You are already registered for this formation"
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Validation Rules

### Registration Fields

- `formation_id`: Required, valid UUID
- `full_name`: Required, 2-100 characters
- `email`: Required, valid email format
- `phone`: Required, valid phone number format
- `role`: Optional, must be one of: student, developer, data-scientist, ml-engineer, manager, other
- `current_role`: Optional, max 100 characters
- `terms`: Required, must be true
- `payment_method`: Optional, must be one of: credit, paypal, bank, cash
- `amount_paid`: Optional, positive number

## Webhook Events (Optional)

If you implement webhooks, here are the events:

### registration.created
Triggered when a new registration is created.

### registration.verified
Triggered when email is verified.

### registration.confirmed
Triggered when registration is confirmed.

### payment.received
Triggered when payment is received.

### registration.cancelled
Triggered when registration is cancelled.

## Rate Limiting

- **Public endpoints:** 100 requests per 15 minutes per IP
- **Admin endpoints:** 1000 requests per 15 minutes per token

## Testing

### Using cURL

```bash
# Create registration
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "formation_id": "uuid",
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+21612345678",
    "terms": true
  }'

# Get registrations (admin)
curl -X GET http://localhost:5000/api/registrations \
  -H "Authorization: Bearer admin_token"
```

### Using Postman

Import the following collection:

```json
{
  "info": {
    "name": "Registration API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Registration",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/registrations",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"formation_id\": \"\",\n  \"full_name\": \"\",\n  \"email\": \"\",\n  \"phone\": \"\",\n  \"terms\": true\n}"
        }
      }
    }
  ]
}
```

## Database Schema

### Registrations Table

```sql
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    role VARCHAR(100),
    current_role VARCHAR(100),
    terms_accepted BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    amount_paid DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'TND',
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

## Environment Variables

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Portfolio Name

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_NAME=Admin Name

# Support Contact
SUPPORT_EMAIL=support@yourdomain.com
SUPPORT_PHONE=+216 XX XXX XXX

# URLs
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin
API_URL=http://localhost:5000
```

## Troubleshooting

### Common Issues

**Email not sending**
- Check SMTP credentials
- Verify email service is active
- Check spam folder

**Verification token expired**
- Use resend verification endpoint
- Tokens expire after 24 hours

**Formation full**
- Check formation capacity
- Wait for spots to open

**Payment issues**
- Verify payment gateway integration
- Check payment reference