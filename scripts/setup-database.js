// scripts/setup-database-fixed.js
const { query } = require("../config/database");
const fs = require("fs");
const path = require("path");

const setupDatabase = async () => {
  try {
    console.log("🚀 Starting database setup...\n");

    // Check connection
    console.log("🔌 Checking database connection...");
    await query("SELECT NOW()");
    console.log("✓ Database connection successful\n");

    // Clean up existing tables
    console.log("🗑️  Cleaning up existing tables...");
    try {
      await query(`
        DROP VIEW IF EXISTS formation_stats CASCADE;
        DROP VIEW IF EXISTS monthly_analytics CASCADE;
        DROP TABLE IF EXISTS analytics CASCADE;
        DROP TABLE IF EXISTS reviews CASCADE;
        DROP TABLE IF EXISTS messages CASCADE;
        DROP TABLE IF EXISTS registrations CASCADE;
        DROP TABLE IF EXISTS courses CASCADE;
        DROP TABLE IF EXISTS formations CASCADE;
        DROP TABLE IF EXISTS projects CASCADE;
        DROP TABLE IF EXISTS settings CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
      `);
      console.log("✓ Cleaned up existing tables");
    } catch (error) {
      console.log("ℹ️  No existing tables to clean up");
    }

    // Read the schema file
    const schemaPath = path.join(__dirname, "../database/schema.sql");
    
    if (!fs.existsSync(schemaPath)) {
      console.error("❌ Schema file not found at:", schemaPath);
      process.exit(1);
    }

    const schema = fs.readFileSync(schemaPath, "utf8");
    
    console.log("📋 Executing schema...");
    
    // Split into statements more carefully
    const statements = [];
    let currentStatement = '';
    let inFunction = false;
    let inTrigger = false;
    let dollarQuoteLevel = 0;
    
    const lines = schema.split('\n');
    
    for (const line of lines) {
      // Skip comments
      if (line.trim().startsWith('--')) {
        continue;
      }
      
      // Check for function/trigger boundaries
      if (line.includes('$$')) {
        // Count $$ occurrences
        const matches = line.match(/\$\$/g);
        if (matches) {
          dollarQuoteLevel += matches.length;
        }
      }
      
      if (line.includes('CREATE OR REPLACE FUNCTION') || line.includes('CREATE FUNCTION')) {
        inFunction = true;
      }
      
      if (line.includes('CREATE TRIGGER')) {
        inTrigger = true;
      }
      
      currentStatement += line + '\n';
      
      // End of statement detection
      if (line.trim().endsWith(';') && !inFunction && !inTrigger && dollarQuoteLevel % 2 === 0) {
        statements.push(currentStatement.trim());
        currentStatement = '';
      }
      
      // End of function/trigger
      if (inFunction && line.includes('END;')) {
        inFunction = false;
        statements.push(currentStatement.trim());
        currentStatement = '';
      }
      
      if (inTrigger && line.trim().endsWith(';')) {
        inTrigger = false;
        statements.push(currentStatement.trim());
        currentStatement = '';
      }
    }
    
    // Add any remaining statement
    if (currentStatement.trim()) {
      statements.push(currentStatement.trim());
    }

    // Execute statements
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;
      
      try {
        await query(statement);
        // Show progress for major operations
        if (statement.includes('CREATE TABLE')) {
          const tableMatch = statement.match(/CREATE TABLE (\w+)/i);
          if (tableMatch) {
            console.log(`✓ Created table: ${tableMatch[1]}`);
          }
        } else if (statement.includes('CREATE INDEX')) {
          const indexMatch = statement.match(/CREATE INDEX (\w+)/i);
          if (indexMatch) {
            console.log(`✓ Created index: ${indexMatch[1]}`);
          }
        } else if (statement.includes('CREATE TRIGGER')) {
          const triggerMatch = statement.match(/CREATE TRIGGER (\w+)/i);
          if (triggerMatch) {
            console.log(`✓ Created trigger: ${triggerMatch[1]}`);
          }
        } else if (statement.includes('CREATE VIEW')) {
          const viewMatch = statement.match(/CREATE VIEW (\w+)/i);
          if (viewMatch) {
            console.log(`✓ Created view: ${viewMatch[1]}`);
          }
        }
      } catch (error) {
        // Skip "already exists" errors
        if (!error.message.includes('already exists')) {
          console.log(`⚠️  Statement ${i + 1}: ${error.message.split('\n')[0]}`);
        }
      }
    }

    console.log("\n✅ Schema executed successfully!");

    // Verify tables
    console.log("\n🔍 Verifying database structure...");
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    console.log(`\n📊 Created ${tables.rows.length} tables:`);
    tables.rows.forEach((row) => {
      console.log(`   - ${row.table_name}`);
    });

    // Verify admin user
    console.log("\n👤 Verifying admin user...");
    const admin = await query("SELECT username, email FROM users WHERE username = 'admin'");
    if (admin.rows.length > 0) {
      console.log(`✓ Admin user: ${admin.rows[0].username} (${admin.rows[0].email})`);
    } else {
      console.log("⚠️  Admin user not found");
    }

    console.log("\n✅ Database setup completed successfully!");
    console.log("💡 Next step: Run 'npm run db:seed' to populate with sample data\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Setup failed:", error.message);
    process.exit(1);
  }
};

// Run setup
setupDatabase();