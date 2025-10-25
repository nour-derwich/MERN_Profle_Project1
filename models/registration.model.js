const { query } = require("../config/database");

class Registration {
  static async create(registrationData) {
    const { formation_id, full_name, email, phone, message, amount_paid } =
      registrationData;

    const text = `
      INSERT INTO registrations (
        formation_id, full_name, email, phone, message, amount_paid
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      formation_id,
      full_name,
      email,
      phone,
      message,
      amount_paid,
    ];
    const result = await query(text, values);

    // Increment formation participants count
    await query(
      "UPDATE formations SET current_participants = current_participants + 1 WHERE id = $1",
      [formation_id]
    );

    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = `
      SELECT r.*, f.title as formation_title, f.start_date
      FROM registrations r
      LEFT JOIN formations f ON r.formation_id = f.id
      WHERE 1=1
    `;
    const values = [];
    let paramCount = 1;

    if (filters.formation_id) {
      text += ` AND r.formation_id = $${paramCount}`;
      values.push(filters.formation_id);
      paramCount++;
    }

    if (filters.status) {
      text += ` AND r.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    text += " ORDER BY r.registration_date DESC";

    const result = await query(text, values);
    return result.rows;
  }

  static async findById(id) {
    const text = `
      SELECT r.*, f.title as formation_title
      FROM registrations r
      LEFT JOIN formations f ON r.formation_id = f.id
      WHERE r.id = $1
    `;
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const text = `
      UPDATE registrations 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(text, [status, id]);
    return result.rows[0];
  }
}

module.exports = Registration;
