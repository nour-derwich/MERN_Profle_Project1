// scripts/seed-registrations.js
const { query } = require("../config/database");
const crypto = require("crypto");

// Sample data for registrations - UPDATED FOR YOUR SCHEMA
const demoRegistrations = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "developer",
    job_title: "Software Engineer",
    message: "I want to enhance my skills in modern web development.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    role: "data-scientist",
    job_title: "Data Analyst",
    message: "Looking to transition into AI and machine learning.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1555123456",
    role: "manager",
    job_title: "Project Manager",
    message:
      "Need to understand tech projects better to manage my team effectively.",
    terms_accepted: true,
    status: "pending",
    is_verified: false,
  },
  {
    full_name: "Maria Garcia",
    email: "maria.g@example.com",
    phone: "+1555987654",
    role: "ml-engineer",
    job_title: "AI Specialist",
    message: "Want to learn about deploying ML models in production.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "David Chen",
    email: "david.chen@example.com",
    phone: "+1234987654",
    role: "student",
    job_title: "Computer Science Student",
    message: "Looking for internship opportunities and practical experience.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1444333222",
    role: "other",
    job_title: "Digital Marketer",
    message: "Want to understand tech to work better with development teams.",
    terms_accepted: true,
    status: "pending",
    is_verified: false,
  },
  {
    full_name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1666777888",
    role: "developer",
    job_title: "EdTech Developer",
    message: "Interested in creating educational technology solutions.",
    terms_accepted: true,
    status: "cancelled",
    is_verified: true,
    cancellation_reason: "Schedule conflict",
  },
  {
    full_name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "+1888999000",
    role: "data-scientist",
    job_title: "UX Researcher",
    message: "Want to incorporate data analysis into user research.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Alex Taylor",
    email: "alex.t@example.com",
    phone: "+1222333444",
    role: "developer",
    job_title: "Full Stack Developer",
    message: "Need to stay updated with the latest technologies.",
    terms_accepted: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1777888999",
    role: "manager",
    job_title: "IT Consultant",
    message: "Helping clients choose the right technology solutions.",
    terms_accepted: true,
    status: "pending",
    is_verified: false,
  },
];

async function seedRegistrations() {
  try {
    console.log("🌱 Starting registration seeding...");

    // First, get some formation IDs to use
    console.log("Fetching formations...");
    const formations = await query(
      "SELECT id FROM formations ORDER BY created_at DESC LIMIT 3"
    );

    if (formations.rows.length === 0) {
      console.log("❌ No formations found. Please seed formations first.");
      console.log("Run: npm run db:seed (for formations)");
      process.exit(1);
    }

    const formationIds = formations.rows.map((row) => row.id);
    console.log(`Found ${formationIds.length} formations to use`);

    // Clear existing demo data
    console.log("Clearing existing demo registrations...");
    await query("DELETE FROM registrations WHERE email LIKE '%@example.com'");
    console.log("✓ Cleared existing demo registrations");

    let createdCount = 0;
    let updatedFormations = new Set();

    // Create registrations
    for (let i = 0; i < demoRegistrations.length; i++) {
      const registration = demoRegistrations[i];
      const formationId = formationIds[i % formationIds.length];
      updatedFormations.add(formationId);

      // Generate verification token for pending registrations
      const verificationToken = registration.is_verified
        ? null
        : crypto.randomBytes(20).toString("hex");
      const verificationTokenExpires = registration.is_verified
        ? null
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Set registration date (random in last 30 days)
      const registrationDate = new Date();
      registrationDate.setDate(
        registrationDate.getDate() - Math.floor(Math.random() * 30)
      );

      const confirmedAt =
        registration.status === "confirmed" ? new Date() : null;
      const cancelledAt =
        registration.status === "cancelled" ? new Date() : null;

      // SQL that matches your exact schema
      const text = `
        INSERT INTO registrations (
          formation_id, full_name, email, phone,
          role, job_title, message, terms_accepted,
          verification_token, verification_token_expires, 
          status, is_verified, registration_date, 
          confirmed_at, cancelled_at, cancellation_reason
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        )
        RETURNING id, full_name, email, status
      `;

      const values = [
        formationId,
        registration.full_name,
        registration.email,
        registration.phone,
        registration.role,
        registration.job_title,
        registration.message,
        registration.terms_accepted,
        verificationToken,
        verificationTokenExpires,
        registration.status,
        registration.is_verified,
        registrationDate,
        confirmedAt,
        cancelledAt,
        registration.cancellation_reason || null,
      ];

      try {
        const result = await query(text, values);
        createdCount++;
        console.log(
          `✓ Created registration for: ${result.rows[0].full_name} (${result.rows[0].status})`
        );
      } catch (error) {
        console.error(
          `Error creating registration for ${registration.full_name}:`,
          error.message
        );
      }
    }

    // Update formation participant counts
    console.log("\nUpdating formation participant counts...");
    for (const formationId of updatedFormations) {
      const countResult = await query(
        `SELECT COUNT(*) as count FROM registrations WHERE formation_id = $1 AND status != 'cancelled'`,
        [formationId]
      );

      const count = parseInt(countResult.rows[0].count);

      await query(
        `UPDATE formations SET current_participants = $1 WHERE id = $2`,
        [count, formationId]
      );

      console.log(`✓ Formation ${formationId} now has ${count} participants`);
    }

    console.log("\n======================================");
    console.log(`✅ Successfully seeded ${createdCount} registrations`);
    console.log("======================================\n");

    // Display summary
    const stats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
        COUNT(CASE WHEN is_verified = true THEN 1 END) as verified
      FROM registrations
    `);

    const summary = stats.rows[0];
    console.log("Registration Summary:");
    console.log(`- Total: ${summary.total}`);
    console.log(`- Confirmed: ${summary.confirmed}`);
    console.log(`- Pending: ${summary.pending}`);
    console.log(`- Cancelled: ${summary.cancelled}`);
    console.log(`- Verified: ${summary.verified}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding registrations:", error);
    process.exit(1);
  }
}

// Run the seed function
seedRegistrations();
