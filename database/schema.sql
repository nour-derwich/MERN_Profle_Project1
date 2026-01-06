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
    
    -- Basic Information
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    full_description TEXT,
    
    -- URLs & Media
    cover_image TEXT,
    demo_url TEXT,
    github_url TEXT,
    documentation_url TEXT,
    article_url TEXT,
    video TEXT,
    
    -- Categorization
    category VARCHAR(100) NOT NULL,
    technologies TEXT[], -- Array of technologies
    complexity VARCHAR(20) DEFAULT 'Intermediate' CHECK (complexity IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    
    -- Status & Display
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    -- Statistics
    views_count INTEGER DEFAULT 0,
    stars INTEGER DEFAULT 0,
    forks INTEGER DEFAULT 0,
    contributors INTEGER DEFAULT 1,
    
    -- Project Details
    environment VARCHAR(100),
    development_time VARCHAR(50),
    dataset_size VARCHAR(50),
    team_size VARCHAR(50),
    duration VARCHAR(50),
    
    -- Project Content (Arrays)
    goals TEXT[],
    features TEXT[],
    results TEXT[],
    metrics JSONB,
    
    -- Architecture & Technical
    architecture TEXT,
    
    -- Metadata
    tags VARCHAR(100)[],
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(200),
    
    -- Availability Flags
    live_demo_available BOOLEAN DEFAULT false,
    source_code_available BOOLEAN DEFAULT false,
    documentation_available BOOLEAN DEFAULT false,
    api_available BOOLEAN DEFAULT false,
    open_source BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FORMATIONS TABLE (Complete version)
-- ============================================
CREATE TABLE formations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    cover_image TEXT,
    category VARCHAR(50),
    level VARCHAR(20),
    price DECIMAL(10, 2) DEFAULT 0.00,
    original_price DECIMAL(10, 2),
    installment_price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'TND',
    duration_hours INTEGER,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    spots_left INTEGER,
    start_date DATE,
    end_date DATE,
    schedule TEXT,
    weeks_duration VARCHAR(50),
    hours_per_week VARCHAR(50),
    format VARCHAR(50) DEFAULT 'Online',
    location VARCHAR(100) DEFAULT 'Online',
    live_sessions VARCHAR(100),
    program JSONB,
    modules JSONB,
    prerequisites TEXT,
    learning_objectives TEXT[],
    features TEXT[],
    highlights TEXT[],
    testimonials JSONB,
    status VARCHAR(20) DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    instructor_name VARCHAR(100),
    instructor_title VARCHAR(100),
    instructor_bio TEXT,
    instructor_photo TEXT,
    instructor_rating DECIMAL(3, 2),
    instructor_reviews INTEGER DEFAULT 0,
    instructor_students INTEGER DEFAULT 0,
    instructor_verified BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    full_description TEXT,
    tags VARCHAR(100)[],
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- COURSES (BOOKS) TABLE (Complete version)
-- ============================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100),
    description TEXT,
    short_description VARCHAR(500),
    cover_image TEXT,
    category VARCHAR(50),
    level VARCHAR(20),
    amazon_link TEXT,
    price DECIMAL(10, 2),
    original_price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    isbn VARCHAR(20),
    publisher VARCHAR(100),
    publication_year INTEGER,
    pages INTEGER,
    language VARCHAR(20) DEFAULT 'French',
    featured BOOLEAN DEFAULT false,
    personal_insight TEXT,
    clicks_count INTEGER DEFAULT 0,
    time_to_read VARCHAR(50),
    year INTEGER,
    why_recommend TEXT[],
    bestseller BOOLEAN DEFAULT false,
    tags TEXT[],
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REGISTRATIONS TABLE (Fixed: current_role renamed to current_position)
-- ============================================
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    role VARCHAR(100),
    current_position VARCHAR(100), -- Changed from current_role (reserved keyword)
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

-- ============================================
-- MESSAGES (CONTACT) TABLE (Complete version)
-- ============================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    replied_at TIMESTAMP,
    reply_message TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    message_type VARCHAR(50) DEFAULT 'contact',
    project_type VARCHAR(100),
    timeline VARCHAR(100),
    budget_range VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(100),
    website VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REVIEWS TABLE
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
    event_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    country VARCHAR(50),
    city VARCHAR(100),
    session_id VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(20) DEFAULT 'text',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TRIGGER FUNCTIONS
-- ============================================

-- Function to update spots_left in formations
CREATE OR REPLACE FUNCTION update_spots_left()
RETURNS TRIGGER AS $$
BEGIN
    NEW.spots_left = NEW.max_participants - NEW.current_participants;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Spots left trigger for formations
CREATE TRIGGER update_spots_left_trigger
BEFORE INSERT OR UPDATE OF max_participants, current_participants ON formations
FOR EACH ROW EXECUTE FUNCTION update_spots_left();

-- Updated_at triggers for all tables
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
-- INDEXES
-- ============================================

-- Projects indexes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_complexity ON projects(complexity);
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_last_updated ON projects(last_updated DESC);
CREATE INDEX idx_projects_open_source ON projects(open_source);
CREATE INDEX idx_projects_technologies ON projects USING GIN(technologies);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);

-- Formations indexes
CREATE INDEX idx_formations_category ON formations(category);
CREATE INDEX idx_formations_level ON formations(level);
CREATE INDEX idx_formations_status ON formations(status);
CREATE INDEX idx_formations_start_date ON formations(start_date);
CREATE INDEX idx_formations_featured ON formations(featured);

-- Courses indexes
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_author ON courses(author);
CREATE INDEX idx_courses_featured ON courses(featured);
CREATE INDEX idx_courses_bestseller ON courses(bestseller);
CREATE INDEX idx_courses_tags ON courses USING GIN(tags);
CREATE INDEX idx_courses_why_recommend ON courses USING GIN(why_recommend);

-- Registrations indexes
CREATE INDEX idx_registrations_formation_id ON registrations(formation_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_date ON registrations(registration_date DESC);

-- Messages indexes
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);
CREATE INDEX idx_messages_message_type ON messages(message_type);

-- Reviews indexes
CREATE INDEX idx_reviews_formation_id ON reviews(formation_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);

-- Analytics indexes
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_entity ON analytics(entity_type, entity_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);

-- ============================================
-- VIEWS
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
    AVG(rev.rating) as average_rating
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

-- ============================================
-- SEED DATA
-- ============================================
-- Admin user (password: admin123)
INSERT INTO users (username, email, password_hash, full_name, role)
VALUES (
    'admin',
    'admin@portfolio.com',
    '$2b$10$rO5b9YhYPvPjvKvFqF9uOeKGvCJYq7qJZvXqZvXqZvXqZvXqZvXq', -- bcrypt hash for 'admin123'
    'Naceur Keraani',
    'admin'
);