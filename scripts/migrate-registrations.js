const { query } = require("../config/database");

const migrateMessagesTable = async () => {
  try {
    console.log("🔄 Starting messages table migration...\n");

    // Check if messages table exists
    const tableExists = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'messages'
      )
    `);

    if (!tableExists.rows[0].exists) {
      console.log("📭 Creating messages table...");

      await query(`
        CREATE TABLE messages (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          
          -- Basic contact information
          full_name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          subject VARCHAR(500),
          message TEXT NOT NULL,
          
          -- Message type and categorization
          message_type VARCHAR(50) DEFAULT 'contact',
          project_type VARCHAR(100),
          timeline VARCHAR(100),
          budget_range VARCHAR(100),
          
          -- Additional contact info
          phone VARCHAR(20),
          company VARCHAR(100),
          website VARCHAR(200),
          
          -- Status and tracking
          status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
          replied_at TIMESTAMP,
          reply_message TEXT,
          
          -- Technical info
          ip_address VARCHAR(45),
          user_agent TEXT,
          
          -- Timestamps
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log("✅ Created messages table");
    } else {
      console.log("📭 Messages table already exists");
    }

    // Check existing columns
    const checkColumns = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'messages'
      ORDER BY ordinal_position
    `);

    const existingColumns = checkColumns.rows.map((row) => row.column_name);
    console.log(`\n📊 Existing columns: ${existingColumns.join(", ")}\n`);

    // List of columns to add (for backward compatibility)
    const columnsToAdd = [
      { name: "message_type", type: "VARCHAR(50) DEFAULT 'contact'" },
      { name: "project_type", type: "VARCHAR(100)" },
      { name: "timeline", type: "VARCHAR(100)" },
      { name: "budget_range", type: "VARCHAR(100)" },
      { name: "phone", type: "VARCHAR(20)" },
      { name: "company", type: "VARCHAR(100)" },
      { name: "website", type: "VARCHAR(200)" },
      { name: "replied_at", type: "TIMESTAMP" },
      { name: "reply_message", type: "TEXT" },
      { name: "ip_address", type: "VARCHAR(45)" },
      { name: "user_agent", type: "TEXT" },
    ];

    let addedCount = 0;

    for (const column of columnsToAdd) {
      if (!existingColumns.includes(column.name)) {
        const columnDefinition = `${column.name} ${column.type}`;

        try {
          await query(`ALTER TABLE messages ADD COLUMN ${columnDefinition}`);
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

    // Create or update the trigger for updated_at
    console.log("\n⚙️ Creating updated_at trigger...");
    try {
      await query(`
        DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
      `);
    } catch (error) {
      // Ignore if trigger doesn't exist
    }

    // Create the function
    await query(`
      CREATE OR REPLACE FUNCTION update_messages_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create the trigger
    await query(`
      CREATE TRIGGER update_messages_updated_at
      BEFORE UPDATE ON messages
      FOR EACH ROW EXECUTE FUNCTION update_messages_updated_at();
    `);
    console.log("✅ Created updated_at trigger");

    // Add indexes for better performance
    console.log("\n📊 Creating indexes...");
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status)",
      "CREATE INDEX IF NOT EXISTS idx_messages_message_type ON messages(message_type)",
      "CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email)",
      "CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)",
      "CREATE INDEX IF NOT EXISTS idx_messages_project_type ON messages(project_type)",
      "CREATE INDEX IF NOT EXISTS idx_messages_type_status ON messages(message_type, status)",
    ];

    let indexCount = 0;
    for (const index of indexes) {
      try {
        await query(index);
        console.log(`✅ Created index: ${index.split(" ")[5]}`);
        indexCount++;
      } catch (error) {
        console.log(`⚠️  Index might already exist: ${error.message}`);
      }
    }

    // Check the final table structure
    const finalCheck = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'messages'
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

    // Create statistics view
    console.log("📈 Creating message statistics view...");
    try {
      await query(`
        CREATE OR REPLACE VIEW message_stats AS
        SELECT 
          COUNT(*) as total_messages,
          COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_messages,
          COUNT(CASE WHEN message_type = 'project' THEN 1 END) as project_inquiries,
          COUNT(CASE WHEN message_type = 'contact' THEN 1 END) as contact_messages,
          COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as last_7_days,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as last_30_days
        FROM messages;
      `);
      console.log("✅ Created message_stats view");
    } catch (error) {
      console.log(`⚠️  View might already exist: ${error.message}`);
    }

    // Add sample data for testing (if table is empty)
    const messageCount = await query("SELECT COUNT(*) as count FROM messages");
    if (parseInt(messageCount.rows[0].count) === 0) {
      console.log("\n📝 Adding sample messages...");

      const sampleMessages = [
        {
          full_name: "John Doe",
          email: "john.doe@example.com",
          subject: "Machine Learning Project Inquiry",
          message: "Looking to build a recommendation system for e-commerce.",
          message_type: "project",
          project_type: "ML Solutions",
          timeline: "2-3 months",
          budget_range: "$15K - $30K",
          phone: "+1234567890",
          status: "read",
        },
        {
          full_name: "Jane Smith",
          email: "jane.smith@example.com",
          subject: "Website Development Help",
          message: "Need a full-stack developer for my startup.",
          message_type: "project",
          project_type: "Web Apps",
          timeline: "1 month",
          budget_range: "$5K - $15K",
          status: "unread",
        },
        {
          full_name: "Alex Johnson",
          email: "alex.j@example.com",
          subject: "General Inquiry",
          message:
            "Just wanted to connect and discuss potential collaboration.",
          message_type: "contact",
          status: "replied",
          reply_message: "Thank you for reaching out! Lets schedule a call.",
        },
      ];

      for (const msg of sampleMessages) {
        const queryText = `
          INSERT INTO messages (
            full_name, email, subject, message, message_type,
            project_type, timeline, budget_range, phone, status, reply_message,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;

        const daysAgo = Math.floor(Math.random() * 30);
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - daysAgo);

        const values = [
          msg.full_name,
          msg.email,
          msg.subject,
          msg.message,
          msg.message_type,
          msg.project_type || null,
          msg.timeline || null,
          msg.budget_range || null,
          msg.phone || null,
          msg.status,
          msg.reply_message || null,
          createdDate,
        ];

        await query(queryText, values);
      }

      console.log("✅ Added 3 sample messages");
    } else {
      console.log(
        `\n📊 Table already contains ${messageCount.rows[0].count} messages, skipping sample data`
      );
    }

    console.log(`\n🎉 Migration completed!`);
    console.log(`   • Added ${addedCount} new columns`);
    console.log(`   • Created ${indexCount} indexes`);
    console.log(`   • Updated_at trigger configured`);
    console.log(`   • Statistics view created`);
    console.log(
      "\n✅ Messages table is now ready for contact forms and project inquiries."
    );
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  migrateMessagesTable();
}

module.exports = migrateMessagesTable;
