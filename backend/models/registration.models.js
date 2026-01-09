// models/registration.models.js - UPDATED VERSION
const { query } = require("../config/database");

class Registration {
  /**
   * Create new registration (NO PAYMENT FIELDS)
   */
  static async create(registrationData) {
    const {
      formation_id,
      full_name,
      email,
      phone,
      role,
      current_role, // This might come from frontend
      job_title, // This might come from frontend
      message,
      terms, // This should be terms_accepted
    } = registrationData;

    // Use job_title if provided, otherwise current_role
    const position = job_title || current_role;

    // FIXED: Use job_title column instead of current_role
    const text = `
      INSERT INTO registrations (
        formation_id, full_name, email, phone,
        role, job_title, message, terms_accepted,
        verification_token, verification_token_expires, 
        status, is_verified
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', false
      )
      RETURNING *
    `;

    const crypto = require("crypto");
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const values = [
      formation_id,
      full_name,
      email,
      phone,
      role || "student",
      position || null, // This goes into job_title column
      message || null,
      terms || false,
      verificationToken,
      verificationTokenExpires,
    ];

    console.log("Creating registration with values:", values);

    try {
      const result = await query(text, values);

      // Increment formation participants count
      await query(
        "UPDATE formations SET current_participants = current_participants + 1 WHERE id = $1",
        [formation_id]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error creating registration:", error);
      console.error("SQL that failed:", text);
      console.error("Values:", values);
      throw error;
    }
  }

  /**
   * Find all registrations with filters (NO PAYMENT FIELDS)
   */
  static async findAll(filters = {}) {
    let text = `
      SELECT 
        r.*,
        f.title as formation_title,
        f.category as formation_category,
        f.level as formation_level,
        f.start_date as formation_start_date,
        f.cover_image as formation_image
      FROM registrations r
      LEFT JOIN formations f ON r.formation_id = f.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 1;

    // Formation filter
    if (filters.formation_id) {
      text += ` AND r.formation_id = $${paramCount}`;
      values.push(filters.formation_id);
      paramCount++;
    }

    // Status filter
    if (filters.status) {
      text += ` AND r.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    // Email filter
    if (filters.email) {
      text += ` AND r.email ILIKE $${paramCount}`;
      values.push(`%${filters.email}%`);
      paramCount++;
    }

    // Search query
    if (filters.searchQuery) {
      text += ` AND (
        r.full_name ILIKE $${paramCount} OR 
        r.email ILIKE $${paramCount} OR
        r.phone ILIKE $${paramCount}
      )`;
      values.push(`%${filters.searchQuery}%`);
      paramCount++;
    }

    // Sort
    text += ` ORDER BY r.registration_date DESC`;

    // Pagination
    if (filters.limit) {
      text += ` LIMIT $${paramCount}`;
      values.push(parseInt(filters.limit));
      paramCount++;
    }

    if (filters.offset) {
      text += ` OFFSET $${paramCount}`;
      values.push(parseInt(filters.offset));
    }

    try {
      const result = await query(text, values);
      return result.rows;
    } catch (error) {
      console.error("Error in Registration.findAll:", error);
      throw error;
    }
  }

  /**
   * Find registration by ID
   */
  static async findById(id) {
    const text = `
      SELECT 
        r.*,
        f.title as formation_title,
        f.category as formation_category,
        f.level as formation_level,
        f.start_date as formation_start_date
      FROM registrations r
      LEFT JOIN formations f ON r.formation_id = f.id
      WHERE r.id = $1
    `;

    try {
      const result = await query(text, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error in Registration.findById(${id}):`, error);
      throw error;
    }
  }

  /**
   * Find registration by email and formation
   */
  static async findByEmailAndFormation(email, formation_id) {
    const text = `
      SELECT * FROM registrations 
      WHERE email = $1 AND formation_id = $2
    `;

    try {
      const result = await query(text, [email, formation_id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error in Registration.findByEmailAndFormation:", error);
      throw error;
    }
  }

  /**
   * Update registration status
   */
  static async updateStatus(id, status) {
    const text = `
      UPDATE registrations 
      SET status = $1, 
          confirmed_at = CASE WHEN $1 = 'confirmed' THEN CURRENT_TIMESTAMP ELSE confirmed_at END,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await query(text, [status, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error in Registration.updateStatus(${id}):`, error);
      throw error;
    }
  }

  /**
   * Delete registration
   */
  static async delete(id) {
    try {
      // Get registration first to decrement formation count
      const registration = await this.findById(id);

      if (registration) {
        // Decrement formation participants count
        await query(
          "UPDATE formations SET current_participants = current_participants - 1 WHERE id = $1 AND current_participants > 0",
          [registration.formation_id]
        );
      }

      const text = "DELETE FROM registrations WHERE id = $1 RETURNING id";
      const result = await query(text, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error in Registration.delete(${id}):`, error);
      throw error;
    }
  }

  /**
   * Get registration statistics (NO PAYMENT FIELDS)
   */
  static async getStats() {
    const text = `
    SELECT 
      COUNT(*) as total_registrations,
      COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
      COUNT(CASE WHEN is_verified = true THEN 1 END) as verified,
      COUNT(DISTINCT formation_id) as unique_formations,
      COUNT(DISTINCT email) as unique_participants
    FROM registrations
  `;

    try {
      const result = await query(text);
      return (
        result.rows[0] || {
          total_registrations: 0,
          confirmed: 0,
          pending: 0,
          cancelled: 0,
          verified: 0,
          unique_formations: 0,
          unique_participants: 0,
        }
      );
    } catch (error) {
      console.error("Error in Registration.getStats:", error);
      return {
        total_registrations: 0,
        confirmed: 0,
        pending: 0,
        cancelled: 0,
        verified: 0,
        unique_formations: 0,
        unique_participants: 0,
      };
    }
  }
}

module.exports = Registration;
