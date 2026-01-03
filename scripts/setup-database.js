const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const setupDatabase = async () => {
  const dbName = process.env.DB_NAME || "portfolio_db";
  let pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: "postgres", // Connect to default database first
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log("🔄 Starting database setup...\n");

    // 1. Check/Create database
    const checkDb = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (checkDb.rows.length === 0) {
      console.log(`📦 Creating database: ${dbName}`);
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log("✅ Database created successfully\n");
    } else {
      console.log(`✅ Database ${dbName} already exists\n`);
    }

    await pool.end();

    // 2. Connect to the database
    pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: dbName,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
    });

    // 3. Enable UUID extension
    console.log("🔧 Setting up extensions...");
    try {
      await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      console.log("✅ UUID extension enabled");
    } catch (error) {
      console.log("⚠️  Extension already exists");
    }

    // 4. Check existing tables
    console.log("\n📊 Checking existing tables...");
    const existingTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    const tableNames = existingTables.rows.map((row) => row.table_name);
    console.log(
      `Found ${tableNames.length} existing tables: ${
        tableNames.join(", ") || "None"
      }`
    );

    // 5. Execute schema only if no tables exist
    if (tableNames.length === 0) {
      console.log("\n📝 Creating database schema...");
      const schemaPath = path.join(__dirname, "../database/schema.sql");

      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, "utf8");
        // Split by semicolon and execute each statement
        const statements = schema.split(";").filter((stmt) => stmt.trim());

        for (const statement of statements) {
          if (statement.trim()) {
            try {
              await pool.query(statement + ";");
            } catch (error) {
              console.error(`Error executing statement: ${error.message}`);
            }
          }
        }
        console.log("✅ Schema created successfully");
      } else {
        console.log("⚠️  Schema file not found");
      }
    } else {
      console.log(
        "\n✅ Database already has tables, running migrations instead..."
      );
      await runMigrations(pool);
    }

    console.log("\n🎉 Database setup completed!\n");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup error:", error.message);
    if (pool) await pool.end();
    process.exit(1);
  }
};

const runMigrations = async (pool) => {
  try {
    console.log("🚀 Running migrations...");

    // Check and add missing columns to courses table
    console.log("\n📝 Checking courses table structure...");

    const coursesColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses'
    `);

    const existingColumns = coursesColumns.rows.map((row) => row.column_name);
    console.log(`Existing columns: ${existingColumns.join(", ")}`);

    // Define columns to add
    const columnsToAdd = [
      { name: "priority", type: "VARCHAR(50)" },
      { name: "personal_insight", type: "TEXT" },
      { name: "time_to_read", type: "VARCHAR(50)" },
      { name: "original_price", type: "DECIMAL(10, 2)" },
      { name: "why_recommend", type: "TEXT[]" },
      { name: "bestseller", type: "BOOLEAN DEFAULT false" },
      { name: "tags", type: "TEXT[]" },
      { name: "reviews", type: "INTEGER DEFAULT 0" },
    ];

    for (const column of columnsToAdd) {
      if (!existingColumns.includes(column.name)) {
        console.log(`➕ Adding column: ${column.name}`);
        try {
          await pool.query(
            `ALTER TABLE courses ADD COLUMN ${column.name} ${column.type}`
          );
          console.log(`✅ Added ${column.name}`);
        } catch (error) {
          console.log(`⚠️  Could not add ${column.name}: ${error.message}`);
        }
      } else {
        console.log(`✅ ${column.name} already exists`);
      }
    }

    // Check for year column (might be publication_year)
    if (
      !existingColumns.includes("year") &&
      existingColumns.includes("publication_year")
    ) {
      console.log("🔄 Using publication_year as year");
      await pool.query(`ALTER TABLE courses ADD COLUMN year INTEGER`);
      await pool.query(
        `UPDATE courses SET year = publication_year WHERE year IS NULL`
      );
    }

    // Create indexes if they don't exist
    console.log("\n🔍 Creating indexes...");
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_courses_bestseller ON courses(bestseller)",
      "CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING GIN(tags)",
      "CREATE INDEX IF NOT EXISTS idx_courses_why_recommend ON courses USING GIN(why_recommend)",
      "CREATE INDEX IF NOT EXISTS idx_courses_priority ON courses(priority)",
    ];

    for (const index of indexes) {
      try {
        await pool.query(index);
        console.log(`✅ Created index: ${index.split(" ")[5]}`);
      } catch (error) {
        console.log(`⚠️  Index error: ${error.message}`);
      }
    }

    // Set default values for new columns
    console.log("\n🔄 Setting default values...");
    await pool.query(`
      UPDATE courses 
      SET 
        priority = COALESCE(priority, 'Recommended'),
        bestseller = COALESCE(bestseller, false),
        tags = COALESCE(tags, '{}'),
        reviews = COALESCE(reviews, reviews_count, 0),
        why_recommend = COALESCE(why_recommend, '{"General"}'),
        personal_insight = COALESCE(personal_insight, description),
        time_to_read = COALESCE(time_to_read, '2-3 weeks')
      WHERE 
        priority IS NULL OR 
        tags IS NULL OR 
        why_recommend IS NULL
    `);

    console.log("✅ Migration completed!");
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    throw error;
  }
};

setupDatabase();
