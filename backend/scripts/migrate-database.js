const { query } = require("../config/database");

const migrateDatabase = async () => {
  try {
    console.log("🚀 Starting database migration...\n");

    // 1. Add missing columns to courses table
    console.log("📝 Adding missing columns to courses table...");

    const alterColumns = [
      `ADD COLUMN IF NOT EXISTS priority VARCHAR(50)`,
      `ADD COLUMN IF NOT EXISTS personal_insight TEXT`,
      `ADD COLUMN IF NOT EXISTS time_to_read VARCHAR(50)`,
      `ADD COLUMN IF NOT EXISTS year INTEGER`,
      `ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2)`,
      `ADD COLUMN IF NOT EXISTS why_recommend TEXT[]`,
      `ADD COLUMN IF NOT EXISTS bestseller BOOLEAN DEFAULT false`,
      `ADD COLUMN IF NOT EXISTS tags TEXT[]`,
      `ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0`,
    ];

    // Execute ALTER TABLE statements
    for (const column of alterColumns) {
      try {
        await query(`ALTER TABLE courses ${column}`);
        console.log(`✅ Added column: ${column.split(" ")[3]}`);
      } catch (error) {
        console.log(`⚠️  Column might already exist: ${column.split(" ")[3]}`);
      }
    }

    // 2. Update existing columns if needed (pages already exists, don't add again)
    console.log("\n📊 Checking column conflicts...");

    // Fix duplicate 'pages' column issue
    // If pages column exists from both CREATE TABLE and ALTER TABLE, handle it
    const columnsCheck = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' 
      AND column_name = 'pages'
    `);

    if (columnsCheck.rows.length > 0) {
      console.log("✅ 'pages' column already exists");
    }

    // 3. Create indexes for new columns
    console.log("\n🔍 Creating indexes for new columns...");

    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_courses_bestseller ON courses(bestseller)",
      "CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING GIN(tags)",
      "CREATE INDEX IF NOT EXISTS idx_courses_why_recommend ON courses USING GIN(why_recommend)",
      "CREATE INDEX IF NOT EXISTS idx_courses_priority ON courses(priority)",
      "CREATE INDEX IF NOT EXISTS idx_courses_year ON courses(year DESC)",
    ];

    for (const index of indexes) {
      try {
        await query(index);
        console.log(`✅ Created index: ${index.split(" ")[5]}`);
      } catch (error) {
        console.log(
          `⚠️  Index might already exist: ${error.message.split(" ")[0]}`
        );
      }
    }

    // 4. Update existing courses to have default values for new columns
    console.log("\n🔄 Updating existing records with default values...");

    await query(`
      UPDATE courses 
      SET 
        priority = COALESCE(priority, 'Recommended'),
        bestseller = COALESCE(bestseller, false),
        tags = COALESCE(tags, '{}'),
        reviews = COALESCE(reviews, reviews_count, 0),
        why_recommend = COALESCE(why_recommend, '{"General"}'),
        personal_insight = COALESCE(personal_insight, description),
        time_to_read = COALESCE(time_to_read, '2-3 weeks'),
        year = COALESCE(year, publication_year, EXTRACT(YEAR FROM created_at)::INTEGER)
      WHERE 
        priority IS NULL OR 
        tags IS NULL OR 
        why_recommend IS NULL
    `);

    console.log(`✅ Updated existing records`);

    console.log("\n🎉 Database migration completed successfully!");

    // Show updated schema
    const schemaCheck = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'courses'
      ORDER BY ordinal_position
    `);

    console.log("\n📋 Updated courses table schema:");
    console.log("=".repeat(50));
    schemaCheck.rows.forEach((row, index) => {
      console.log(
        `${index + 1}. ${row.column_name.padEnd(20)} ${row.data_type.padEnd(
          15
        )} ${row.is_nullable === "YES" ? "NULLABLE" : "NOT NULL"}`
      );
    });
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  migrateDatabase().then(() => {
    console.log("\n✅ Migration complete. You can now run the seeder.");
    process.exit(0);
  });
}

module.exports = migrateDatabase;
