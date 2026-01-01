// scripts/debug-user.js
const { query } = require("../config/database");
const bcrypt = require("bcrypt");

const debugUser = async () => {
  try {
    console.log("🔍 Debugging user authentication...\n");

    // Check if user exists
    const user = await query("SELECT * FROM users WHERE email = $1", [
      "admin@example.com",
    ]);

    if (user.rows.length === 0) {
      console.log("❌ User not found in database");
      return;
    }

    const dbUser = user.rows[0];
    console.log("📋 User found in database:");
    console.log(`   ID: ${dbUser.id}`);
    console.log(`   Email: ${dbUser.email}`);
    console.log(`   Username: ${dbUser.username}`);
    console.log(`   Password Hash: ${dbUser.password_hash}`);
    console.log(`   Role: ${dbUser.role}`);

    // Test password verification
    const testPassword = "admin123";
    console.log(`\n🔐 Testing password verification:`);
    console.log(`   Test password: ${testPassword}`);

    const isMatch = await bcrypt.compare(testPassword, dbUser.password_hash);
    console.log(`   Password match: ${isMatch}`);

    if (!isMatch) {
      console.log("\n❌ Password doesn't match. Let's fix this...");
      await resetPassword();
    } else {
      console.log("\n✅ Password verification successful!");
    }
  } catch (error) {
    console.error("❌ Debug error:", error);
  }
};

const resetPassword = async () => {
  try {
    const newPassword = "admin123";
    const password_hash = await bcrypt.hash(newPassword, 10);

    await query("UPDATE users SET password_hash = $1 WHERE email = $2", [
      password_hash,
      "admin@example.com",
    ]);

    console.log("✅ Password reset successfully!");
    console.log(`📧 Email: admin@example.com`);
    console.log(`🔐 New Password: ${newPassword}`);

    // Verify the reset worked
    const updatedUser = await query("SELECT * FROM users WHERE email = $1", [
      "admin@example.com",
    ]);

    const isMatch = await bcrypt.compare(
      newPassword,
      updatedUser.rows[0].password_hash
    );
    console.log(`✅ Verification after reset: ${isMatch}`);
  } catch (error) {
    console.error("❌ Error resetting password:", error);
  }
};

debugUser();
