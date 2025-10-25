-- ============================================
-- DATABASE SCHEMA FOR PORTFOLIO APPLICATION
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (Admin)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    cover_image TEXT,
    demo_url TEXT,
    github_url TEXT,
    category VARCHAR(50),
    technologies TEXT[], -- Array of technologies
    status VARCHAR(20) DEFAULT 'published', -- draft, published, archived
    enverment VARCHAR(50), -- web, mobile, desktop
    video TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FORMATIONS TABLE
-- ============================================
CREATE TABLE formations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    cover_image TEXT,
    category VARCHAR(50), -- web-dev, design, marketing, business
    level VARCHAR(20), -- beginner, intermediate, advanced
    price DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'TND',
    duration_hours INTEGER, -- Total duration in hours
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    schedule TEXT, -- e.g., "Lundi/Mercredi 18h-20h"
    program JSONB, -- JSON structure for modules/chapters
    prerequisites TEXT,
    learning_objectives TEXT[],
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, full, completed
    featured BOOLEAN DEFAULT false,
    instructor_name VARCHAR(100),
    instructor_bio TEXT,
    instructor_photo TEXT,
    views_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- COURSES (BOOKS) TABLE
-- ============================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100),
    description TEXT,
    short_description VARCHAR(500),
    cover_image TEXT,
    category VARCHAR(50),
    level VARCHAR(20), -- beginner, intermediate, advanced
    amazon_link TEXT,
    price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    isbn VARCHAR(20),
    publisher VARCHAR(100),
    publication_year INTEGER,
    pages INTEGER,
    language VARCHAR(20) DEFAULT 'French',
    featured BOOLEAN DEFAULT false,
    clicks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REGISTRATIONS TABLE
-- ============================================
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    amount_paid DECIMAL(10, 2),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MESSAGES (CONTACT) TABLE
-- ============================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread', -- unread, read, replied, archived
    replied_at TIMESTAMP,
    reply_message TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REVIEWS TABLE (for formations)
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
    registration_id UUID REFERENCES registrations(id),
    reviewer_name VARCHAR(100) NOT NULL,
    reviewer_email VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ANALYTICS TABLE
-- ============================================
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL, -- page_view, click, registration, etc.
    entity_type VARCHAR(50), -- project, formation, course
    entity_id UUID,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    country VARCHAR(50),
    city VARCHAR(100),
    session_id VARCHAR(100),
    metadata JSONB, -- Additional data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SETTINGS TABLE (for site configuration)
-- ============================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(20) DEFAULT 'text', -- text, number, boolean, json
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES for better performance
-- ============================================

-- Projects
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Formations
CREATE INDEX idx_formations_category ON formations(category);
CREATE INDEX idx_formations_level ON formations(level);
CREATE INDEX idx_formations_status ON formations(status);
CREATE INDEX idx_formations_start_date ON formations(start_date);
CREATE INDEX idx_formations_featured ON formations(featured);

-- Courses
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_author ON courses(author);
CREATE INDEX idx_courses_featured ON courses(featured);

-- Registrations
CREATE INDEX idx_registrations_formation_id ON registrations(formation_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_date ON registrations(registration_date DESC);

-- Messages
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);

-- Reviews
CREATE INDEX idx_reviews_formation_id ON reviews(formation_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);

-- Analytics
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_entity ON analytics(entity_type, entity_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON formations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Initial Admin User)
-- ============================================
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (username, email, password_hash, full_name, role)
VALUES (
    'admin',
    'admin@example.com',
    '$2b$10$rO5b9YhYPvPjvKvFqF9uOeKGvCJYq7qJZvXqZvXqZvXqZvXqZvXq', -- Replace with actual hash
    'Naceur Keraani',
    'admin'
);

-- ============================================
-- VIEWS for easier queries
-- ============================================

-- View for formation statistics
CREATE VIEW formation_stats AS
SELECT 
    f.id,
    f.title,
    f.category,
    f.status,
    f.current_participants,
    f.max_participants,
    ROUND((f.current_participants::DECIMAL / NULLIF(f.max_participants, 0)) * 100, 2) as fill_rate,
    COUNT(DISTINCT r.id) as total_registrations,
    COUNT(DISTINCT CASE WHEN r.status = 'confirmed' THEN r.id END) as confirmed_registrations,
    COUNT(DISTINCT rev.id) as reviews_count,
    AVG(rev.rating) as average_rating,
    SUM(CASE WHEN r.payment_status = 'paid' THEN r.amount_paid ELSE 0 END) as total_revenue
FROM formations f
LEFT JOIN registrations r ON f.id = r.formation_id
LEFT JOIN reviews rev ON f.id = rev.formation_id AND rev.is_approved = true
GROUP BY f.id;

-- View for monthly analytics
CREATE VIEW monthly_analytics AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    event_type,
    entity_type,
    COUNT(*) as event_count
FROM analytics
GROUP BY DATE_TRUNC('month', created_at), event_type, entity_type
ORDER BY month DESC;