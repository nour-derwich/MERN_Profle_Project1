const { query } = require("../config/database");

const migrate = async () => {
  try {
    console.log("🚀 Running database migrations...\n");

    // 1. Check existing courses columns
    console.log("🔍 Checking courses table structure...");
    const coursesColumns = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses'
      ORDER BY ordinal_position
    `);

    const existingColumns = coursesColumns.rows.map((row) => row.column_name);
    console.log(`Found ${existingColumns.length} columns in courses table`);

    // 2. Add missing columns
    const columnsToAdd = [
      {
        name: "priority",
        sql: "ADD COLUMN IF NOT EXISTS priority VARCHAR(50)",
      },
      {
        name: "personal_insight",
        sql: "ADD COLUMN IF NOT EXISTS personal_insight TEXT",
      },
      {
        name: "time_to_read",
        sql: "ADD COLUMN IF NOT EXISTS time_to_read VARCHAR(50)",
      },
      {
        name: "original_price",
        sql: "ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2)",
      },
      {
        name: "why_recommend",
        sql: "ADD COLUMN IF NOT EXISTS why_recommend TEXT[]",
      },
      {
        name: "bestseller",
        sql: "ADD COLUMN IF NOT EXISTS bestseller BOOLEAN DEFAULT false",
      },
      { name: "tags", sql: "ADD COLUMN IF NOT EXISTS tags TEXT[]" },
      {
        name: "reviews",
        sql: "ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0",
      },
    ];

    console.log("\n📝 Adding missing columns...");
    for (const column of columnsToAdd) {
      if (!existingColumns.includes(column.name)) {
        console.log(`  ➕ Adding: ${column.name}`);
        try {
          await query(`ALTER TABLE courses ${column.sql}`);
        } catch (error) {
          console.log(`  ⚠️  Error adding ${column.name}: ${error.message}`);
        }
      } else {
        console.log(`  ✅ Already exists: ${column.name}`);
      }
    }

    // 3. Handle year column (check for publication_year)
    if (
      !existingColumns.includes("year") &&
      existingColumns.includes("publication_year")
    ) {
      console.log("\n🔄 Adding year column from publication_year...");
      await query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS year INTEGER`);
      await query(
        `UPDATE courses SET year = publication_year WHERE year IS NULL`
      );
    }

    // 4. Create indexes
    console.log("\n🔍 Creating indexes...");
    const indexes = [
      {
        name: "bestseller",
        sql: "CREATE INDEX IF NOT EXISTS idx_courses_bestseller ON courses(bestseller)",
      },
      {
        name: "tags",
        sql: "CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING GIN(tags)",
      },
      {
        name: "why_recommend",
        sql: "CREATE INDEX IF NOT EXISTS idx_courses_why_recommend ON courses USING GIN(why_recommend)",
      },
      {
        name: "priority",
        sql: "CREATE INDEX IF NOT EXISTS idx_courses_priority ON courses(priority)",
      },
    ];

    for (const index of indexes) {
      try {
        await query(index.sql);
        console.log(`  ✅ Created index: ${index.name}`);
      } catch (error) {
        console.log(
          `  ⚠️  Error creating index ${index.name}: ${error.message}`
        );
      }
    }

    // 5. Set default values
    console.log("\n🔄 Setting default values...");
    await query(`
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

    console.log("\n✅ Migration completed successfully!");

    // Show updated schema
    const updatedColumns = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'courses'
      ORDER BY ordinal_position
    `);

    console.log("\n📋 Updated courses table structure:");
    console.log("=".repeat(60));
    updatedColumns.rows.forEach((row, index) => {
      console.log(
        `${(index + 1).toString().padStart(2)}. ${row.column_name.padEnd(
          25
        )} ${row.data_type.padEnd(20)} ${
          row.is_nullable === "YES" ? "NULLABLE" : "NOT NULL"
        }`
      );
    });
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  migrate();
}

module.exports = migrate;
