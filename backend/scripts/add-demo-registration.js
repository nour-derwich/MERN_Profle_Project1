const { query } = require("../config/database");
const crypto = require("crypto");

async function testRegistration() {
  try {
    console.log("🧪 Testing registration insert...");

    // Get a formation ID
    const formations = await query("SELECT id FROM formations LIMIT 1");
    if (formations.rows.length === 0) {
      console.log("❌ No formations found");
      return;
    }

    const formationId = formations.rows[0].id;
    console.log("Using formation:", formationId);

    // Test SQL directly
    const testData = {
      formation_id: formationId,
      full_name: "Test User",
      email: `test${Date.now()}@example.com`,
      phone: "+1234567890",
      role: "student",
      job_title: "Software Engineer",
      message: "Test registration",
      terms_accepted: true,
    };

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const text = `
      INSERT INTO registrations (
        formation_id, full_name, email, phone,
        role, job_title, message, terms_accepted,
        verification_token, verification_token_expires, 
        status, is_verified
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', false
      )
      RETURNING id, full_name, email
    `;

    const values = [
      testData.formation_id,
      testData.full_name,
      testData.email,
      testData.phone,
      testData.role,
      testData.job_title,
      testData.message,
      testData.terms_accepted,
      verificationToken,
      verificationTokenExpires,
    ];

    console.log("Testing SQL:", text);
    console.log("With values:", values);

    const result = await query(text, values);

    console.log("✅ Success! Created registration:", result.rows[0]);

    // Clean up
    await query("DELETE FROM registrations WHERE email LIKE $1", [
      "%test%@example.com",
    ]);
    console.log("✅ Cleaned up test data");

    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

testRegistration();
