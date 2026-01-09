const { Pool } = require("pg");
require("dotenv").config();

const resetDatabase = async () => {
  // Connect to the default postgres database
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log("🔄 Resetting database...\n");

    const dbName = process.env.DB_NAME || "portfolio_db";

    // Drop the database if it exists
    console.log(`🗑️  Dropping database: ${dbName}`);

    // Terminate existing connections
    try {
      await pool.query(
        `
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = $1 AND pid <> pg_backend_pid()
      `,
        [dbName]
      );
    } catch (error) {
      console.log("⚠️  Could not terminate connections:", error.message);
    }

    // Drop database
    try {
      await pool.query(`DROP DATABASE IF EXISTS ${dbName}`);
      console.log("✅ Database dropped");
    } catch (error) {
      console.log("⚠️  Drop database failed:", error.message);
    }

    // Recreate database
    console.log(`📦 Creating database: ${dbName}`);
    await pool.query(`CREATE DATABASE ${dbName}`);
    console.log("✅ Database created");

    await pool.end();

    console.log("\n🎉 Database reset completed!");
    console.log("👉 Run 'npm run db:setup' to set up schema");
    console.log("👉 Or 'npm run db:fresh' for complete setup");
  } catch (error) {
    console.error("❌ Reset error:", error.message);
    await pool.end();
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  resetDatabase();
}

module.exports = resetDatabase;
