// scripts/cleanup-payment-columns.js
const { query } = require("../config/database");

async function cleanupPaymentColumns() {
  try {
    console.log(
      "Checking for payment-related columns in registrations table..."
    );

    // Check if payment_status column exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'registrations' 
      AND column_name IN (
        'payment_status', 
        'payment_method', 
        'payment_reference', 
        'amount_paid', 
        'payment_date'
      )
    `;

    const result = await query(checkQuery);

    if (result.rows.length > 0) {
      console.log(
        "Found payment columns to remove:",
        result.rows.map((r) => r.column_name)
      );

      // Remove each payment column
      for (const row of result.rows) {
        const columnName = row.column_name;
        console.log(`Removing column: ${columnName}`);

        try {
          await query(
            `ALTER TABLE registrations DROP COLUMN IF EXISTS ${columnName}`
          );
          console.log(`✓ Removed column: ${columnName}`);
        } catch (err) {
          console.error(`Error removing column ${columnName}:`, err.message);
        }
      }
    } else {
      console.log("No payment columns found to remove.");
    }

    console.log("Cleanup completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
}

cleanupPaymentColumns();
