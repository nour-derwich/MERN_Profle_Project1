// scripts/migrate-projects.js
const { query } = require("../config/database");

const migrateProjectsTable = async () => {
  try {
    console.log("🔄 Migrating projects table...");

    // 1. Add new columns if they don't exist
    const newColumns = [
      { name: "full_description", type: "TEXT" },
      { name: "documentation_url", type: "VARCHAR(500)" },
      { name: "article_url", type: "VARCHAR(500)" },
      { name: "complexity", type: "VARCHAR(20)" },
      { name: "display_order", type: "INTEGER DEFAULT 0" },
      { name: "views_count", type: "INTEGER DEFAULT 0" },
      { name: "stars", type: "INTEGER DEFAULT 0" },
      { name: "forks", type: "INTEGER DEFAULT 0" },
      { name: "contributors", type: "INTEGER DEFAULT 1" },
      { name: "development_time", type: "VARCHAR(50)" },
      { name: "dataset_size", type: "VARCHAR(50)" },
      { name: "team_size", type: "VARCHAR(50)" },
      { name: "duration", type: "VARCHAR(50)" },
      { name: "goals", type: "TEXT[]" },
      { name: "features", type: "TEXT[]" },
      { name: "challenges", type: "JSONB[]" },
      { name: "results", type: "TEXT[]" },
      { name: "metrics", type: "JSONB" },
      { name: "architecture", type: "TEXT" },
      { name: "tags", type: "VARCHAR(100)[]" },
      { name: "meta_description", type: "VARCHAR(300)" },
      { name: "meta_keywords", type: "VARCHAR(200)" },
      { name: "live_demo_available", type: "BOOLEAN DEFAULT FALSE" },
      { name: "source_code_available", type: "BOOLEAN DEFAULT FALSE" },
      { name: "documentation_available", type: "BOOLEAN DEFAULT FALSE" },
      { name: "api_available", type: "BOOLEAN DEFAULT FALSE" },
      { name: "open_source", type: "BOOLEAN DEFAULT FALSE" },
      { name: "last_updated", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
    ];

    for (const column of newColumns) {
      try {
        await query(`
          ALTER TABLE projects 
          ADD COLUMN IF NOT EXISTS ${column.name} ${column.type}
        `);
        console.log(`✅ Added column: ${column.name}`);
      } catch (error) {
        console.log(
          `⚠️  Column ${column.name} already exists or error: ${error.message}`
        );
      }
    }

    // 2. Rename 'enverment' to 'environment' if it exists
    try {
      await query(`
        ALTER TABLE projects 
        RENAME COLUMN enverment TO environment
      `);
      console.log("✅ Renamed 'enverment' to 'environment'");
    } catch (error) {
      console.log("⚠️  Column rename failed or already done");
    }

    // 3. Add slug column and generate slugs
    try {
      await query(`
        UPDATE projects 
        SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
        WHERE slug IS NULL
      `);
      console.log("✅ Generated slugs for existing projects");
    } catch (error) {
      console.log("⚠️  Slug generation error:", error.message);
    }

    console.log("🎉 Projects table migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
};

// Run migration
if (require.main === module) {
  migrateProjectsTable()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = migrateProjectsTable;
    