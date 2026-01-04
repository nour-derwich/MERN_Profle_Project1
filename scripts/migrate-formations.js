const { query } = require("../config/database");

const migrateFormationsTable = async () => {
  try {
    console.log("🔄 Starting formations table migration...\n");

    // Check if we need to migrate
    const checkColumns = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'formations'
    `);

    const existingColumns = checkColumns.rows.map((row) => row.column_name);
    console.log(`📊 Existing columns: ${existingColumns.join(", ")}\n`);

    // List of columns to add
    const columnsToAdd = [
      { name: "full_description", type: "TEXT" },
      { name: "original_price", type: "DECIMAL(10,2)" },
      { name: "installment_price", type: "DECIMAL(10,2)" },
      { name: "weeks_duration", type: "VARCHAR(50)" },
      { name: "hours_per_week", type: "VARCHAR(50)" },
      { name: "spots_left", type: "INTEGER" },
      { name: "format", type: "VARCHAR(50) DEFAULT 'Online'" },
      { name: "location", type: "VARCHAR(100) DEFAULT 'Online'" },
      { name: "live_sessions", type: "VARCHAR(100)" },
      { name: "features", type: "TEXT[]" },
      { name: "highlights", type: "TEXT[]" },
      { name: "modules", type: "JSONB" },
      { name: "testimonials", type: "JSONB" },
      { name: "instructor_title", type: "VARCHAR(100)" },
      { name: "instructor_rating", type: "DECIMAL(3,2)" },
      { name: "instructor_reviews", type: "INTEGER DEFAULT 0" },
      { name: "instructor_students", type: "INTEGER DEFAULT 0" },
      { name: "instructor_verified", type: "BOOLEAN DEFAULT false" },
      { name: "tags", type: "VARCHAR(100)[]" },
      { name: "meta_description", type: "VARCHAR(300)" },
      { name: "meta_keywords", type: "VARCHAR(200)" },
    ];

    let addedCount = 0;

    for (const column of columnsToAdd) {
      if (!existingColumns.includes(column.name)) {
        const columnDefinition = `${column.name} ${column.type}`;

        try {
          await query(`ALTER TABLE formations ADD COLUMN ${columnDefinition}`);
          console.log(`✅ Added column: ${column.name}`);
          addedCount++;
        } catch (error) {
          console.log(
            `⚠️  Column ${column.name} might already exist or error: ${error.message}`
          );
        }
      } else {
        console.log(`⏭️  Column already exists: ${column.name}`);
      }
    }

    // Update existing records to calculate spots_left
    console.log("\n🔄 Updating spots_left for existing formations...");
    await query(`
      UPDATE formations 
      SET spots_left = max_participants - current_participants
      WHERE spots_left IS NULL
    `);
    console.log("✅ Updated spots_left");

    // Create or update the trigger for spots_left
    console.log("\n⚙️ Creating spots_left trigger...");
    try {
      await query(`
        DROP TRIGGER IF EXISTS update_spots_left_trigger ON formations;
      `);
    } catch (error) {
      // Ignore if trigger doesn't exist
    }

    // Create the function
    await query(`
      CREATE OR REPLACE FUNCTION update_spots_left()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.spots_left = NEW.max_participants - NEW.current_participants;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create the trigger
    await query(`
      CREATE TRIGGER update_spots_left_trigger
      BEFORE INSERT OR UPDATE OF max_participants, current_participants ON formations
      FOR EACH ROW EXECUTE FUNCTION update_spots_left();
    `);
    console.log("✅ Created spots_left trigger");

    // Add indexes for new columns
    console.log("\n📊 Creating indexes for new columns...");
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_formations_format ON formations(format)",
      "CREATE INDEX IF NOT EXISTS idx_formations_featured ON formations(featured)",
      "CREATE INDEX IF NOT EXISTS idx_formations_start_date ON formations(start_date DESC)",
      "CREATE INDEX IF NOT EXISTS idx_formations_price ON formations(price)",
      "CREATE INDEX IF NOT EXISTS idx_formations_spots_left ON formations(spots_left)",
      "CREATE INDEX IF NOT EXISTS idx_formations_tags ON formations USING GIN(tags)",
      "CREATE INDEX IF NOT EXISTS idx_formations_features ON formations USING GIN(features)",
    ];

    for (const index of indexes) {
      try {
        await query(index);
        console.log(`✅ Created index`);
      } catch (error) {
        console.log(`⚠️  Index might already exist: ${error.message}`);
      }
    }

    // Check the final table structure
    const finalCheck = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'formations'
      ORDER BY ordinal_position
    `);

    console.log("\n📋 Final table structure:");
    console.log("====================================");
    finalCheck.rows.forEach((row, i) => {
      console.log(
        `${i + 1}. ${row.column_name} (${row.data_type}) - ${
          row.is_nullable === "YES" ? "Nullable" : "Not Null"
        }`
      );
    });
    console.log("====================================\n");

    console.log(`🎉 Migration completed! Added ${addedCount} new columns.`);
    console.log(
      "\n✅ Formations table is now ready for the frontend requirements."
    );
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  migrateFormationsTable();
}

module.exports = migrateFormationsTable;
