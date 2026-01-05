// scripts/seed-registrations.js
const { query } = require("../config/database");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Sample data for registrations
const demoRegistrations = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    company: "Tech Corp",
    role: "developer",
    current_role: "Software Engineer",
    motivation: "I want to enhance my skills in modern web development.",
    expectations: "Practical knowledge and real-world projects",
    experience_level: "intermediate",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    company: "Data Analytics Inc",
    role: "data-scientist",
    current_role: "Data Analyst",
    motivation: "Looking to transition into AI and machine learning.",
    expectations: "Comprehensive curriculum and mentorship",
    experience_level: "beginner",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1555123456",
    company: "Finance Solutions",
    role: "manager",
    current_role: "Project Manager",
    motivation:
      "Need to understand tech projects better to manage my team effectively.",
    expectations: "Management-focused technical insights",
    experience_level: "advanced",
    terms: true,
    status: "pending",
    is_verified: false,
  },
  {
    full_name: "Maria Garcia",
    email: "maria.g@example.com",
    phone: "+1555987654",
    company: "Healthcare IT",
    role: "ml-engineer",
    current_role: "AI Specialist",
    motivation: "Want to learn about deploying ML models in production.",
    expectations: "Hands-on deployment exercises",
    experience_level: "advanced",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "David Chen",
    email: "david.chen@example.com",
    phone: "+1234987654",
    company: "Startup XYZ",
    role: "student",
    current_role: "Computer Science Student",
    motivation:
      "Looking for internship opportunities and practical experience.",
    expectations: "Industry connections and portfolio projects",
    experience_level: "beginner",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1444333222",
    company: "Marketing Pro",
    role: "other",
    current_role: "Digital Marketer",
    motivation:
      "Want to understand tech to work better with development teams.",
    expectations: "Non-technical explanations of technical concepts",
    experience_level: "beginner",
    terms: true,
    status: "pending",
    is_verified: false,
  },
  {
    full_name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1666777888",
    company: "Education First",
    role: "developer",
    current_role: "EdTech Developer",
    motivation: "Interested in creating educational technology solutions.",
    expectations: "Pedagogical approaches to tech education",
    experience_level: "intermediate",
    terms: true,
    status: "cancelled",
    is_verified: true,
    cancellation_reason: "Schedule conflict",
  },
  {
    full_name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "+1888999000",
    company: "Creative Agency",
    role: "data-scientist",
    current_role: "UX Researcher",
    motivation: "Want to incorporate data analysis into user research.",
    expectations: "Data visualization and analysis techniques",
    experience_level: "beginner",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Alex Taylor",
    email: "alex.t@example.com",
    phone: "+1222333444",
    company: "Freelancer",
    role: "developer",
    current_role: "Full Stack Developer",
    motivation: "Need to stay updated with the latest technologies.",
    expectations: "Cutting-edge tech stack and best practices",
    experience_level: "advanced",
    terms: true,
    status: "confirmed",
    is_verified: true,
  },
  {
    full_name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1777888999",
    company: "Consulting Firm",
    role: "manager",
    current_role: "IT Consultant",
    motivation: "Helping clients choose the right technology solutions.",
    expectations: "Technology comparison and implementation strategies",
    experience_level: "intermediate",
    terms: true,
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
      console.log("Run: npm run db:seed");
      process.exit(1);
    }

    const formationIds = formations.rows.map((row) => row.id);
    console.log(`Found ${formationIds.length} formations to use`);

    // Clear existing demo data (optional - you can skip this if you want to keep existing data)
    console.log("Clearing existing demo registrations...");
    await query("DELETE FROM registrations WHERE email LIKE '%@example.com'");
    console.log("✓ Cleared existing demo registrations");

    let createdCount = 0;
    let updatedFormations = new Set();

    // Create registrations
    for (let i = 0; i < demoRegistrations.length; i++) {
      const registration = demoRegistrations[i];
      const formationId = formationIds[i % formationIds.length]; // Distribute across formations
      updatedFormations.add(formationId);

      // Generate verification token for pending registrations
      const verificationToken = registration.is_verified
        ? null
        : crypto.randomBytes(20).toString("hex");
      const verificationTokenExpires = registration.is_verified
        ? null
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Set dates based on status
      const registrationDate = new Date();
      registrationDate.setDate(
        registrationDate.getDate() - Math.floor(Math.random() * 30)
      ); // Random date in last 30 days

      const confirmedAt =
        registration.status === "confirmed" ? new Date() : null;
      const cancelledAt =
        registration.status === "cancelled" ? new Date() : null;

      const text = `
        INSERT INTO registrations (
          formation_id, full_name, email, phone, company,
          role, current_role, motivation, expectations,
          experience_level, terms, verification_token,
          verification_token_expires, status, is_verified,
          registration_date, confirmed_at, cancelled_at,
          cancellation_reason
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
          $14, $15, $16, $17, $18, $19
        )
        RETURNING id, full_name, email, status
      `;

      const values = [
        formationId,
        registration.full_name,
        registration.email,
        registration.phone,
        registration.company,
        registration.role,
        registration.current_role,
        registration.motivation,
        registration.expectations,
        registration.experience_level,
        registration.terms,
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
