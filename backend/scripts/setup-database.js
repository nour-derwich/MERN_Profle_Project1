const { query } = require("../config/database");
const bcrypt = require("bcrypt");

const simpleSetup = async () => {
  try {
    console.log("🚀 Simple Database Setup...\n");
    
    // 1. Create tables (simplified version)
    console.log("📋 Creating tables...");
    
    const tables = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        role VARCHAR(20) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Projects table (simplified)
      `CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        technologies TEXT[],
        status VARCHAR(20) DEFAULT 'draft',
        featured BOOLEAN DEFAULT false,
        cover_image TEXT,
        github_url TEXT,
        tags VARCHAR(100)[],
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Courses table (simplified)
      `CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) UNIQUE NOT NULL,
        author VARCHAR(100),
        description TEXT,
        cover_image TEXT,
        category VARCHAR(50),
        amazon_link TEXT,
        price DECIMAL(10, 2),
        rating DECIMAL(3, 2) DEFAULT 0.00,
        featured BOOLEAN DEFAULT false,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Formations table (simplified)
      `CREATE TABLE IF NOT EXISTS formations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(50),
        price DECIMAL(10, 2) DEFAULT 0.00,
        duration_hours INTEGER,
        max_participants INTEGER,
        start_date DATE,
        status VARCHAR(20) DEFAULT 'draft',
        featured BOOLEAN DEFAULT false,
        instructor_name VARCHAR(100),
        tags VARCHAR(100)[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];
    
    for (const tableSql of tables) {
      try {
        await query(tableSql);
        const tableName = tableSql.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)[1];
        console.log(`✓ Created table: ${tableName}`);
      } catch (error) {
        console.log(`ℹ️  Table may already exist: ${error.message.split('\n')[0]}`);
      }
    }
    
    // 2. Create admin user
    console.log("\n👤 Creating admin user...");
    const passwordHash = await bcrypt.hash("admin123", 10);
    
    try {
      await query(
        `INSERT INTO users (username, email, password_hash, full_name, role) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (username) DO UPDATE SET 
         password_hash = EXCLUDED.password_hash,
         full_name = EXCLUDED.full_name`,
        ["admin", "admin@portfolio.com", passwordHash, "Naceur Keraani", "admin"]
      );
      console.log("✅ Admin user created/updated");
      console.log("   📧 Email: admin@portfolio.com");
      console.log("   🔑 Password: admin123");
    } catch (error) {
      console.log(`ℹ️  Admin user: ${error.message.split('\n')[0]}`);
    }
    
    console.log("\n✅ Simple setup completed!");
    console.log("💡 You can now run 'npm run dev' to start your application\n");
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Setup failed:", error.message);
    process.exit(1);
  }
};

simpleSetup();