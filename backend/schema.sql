CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    sector VARCHAR(100),
    service VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sectors (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sector_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector_id VARCHAR(100) REFERENCES sectors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id VARCHAR(100) REFERENCES service_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user (Password is 'admin123')
INSERT OR IGNORE INTO users (email, password_hash) 
VALUES ('admin@nexavise.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGGaOAle');

CREATE TABLE IF NOT EXISTS company_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    email VARCHAR(255),
    phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_status_created_at ON reviews(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_members_id ON team_members(id ASC);
CREATE INDEX IF NOT EXISTS idx_sector_services_sector_id ON sector_services(sector_id);
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);

CREATE TABLE IF NOT EXISTS login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    successful INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time ON login_attempts(email, attempt_time DESC);
