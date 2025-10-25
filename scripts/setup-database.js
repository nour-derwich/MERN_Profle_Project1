const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const setupDatabase = async () => {
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: "postgres", // Connect to default database first
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log("🔄 Starting database setup...\n");

    // Check if database exists
    const dbName = process.env.DB_NAME || "portfolio_db";
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

    // Connect to the new database
    const appPool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: dbName,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
    });

    // Read and execute schema SQL
    console.log("📝 Executing schema...");
    const schemaPath = path.join(__dirname, "../database/schema.sql");

    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, "utf8");
      await appPool.query(schema);
      console.log("✅ Schema executed successfully\n");
    } else {
      console.log("⚠️  Schema file not found, skipping...\n");
    }

    console.log("🎉 Database setup completed!\n");

    await appPool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup error:", error.message);
    await pool.end();
    process.exit(1);
  }
};

setupDatabase();
