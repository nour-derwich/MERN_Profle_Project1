const { query } = require("../config/database");
const bcrypt = require("bcrypt");

class User {
  static async create(userData) {
    const { username, email, password, full_name, role = "admin" } = userData;
    const password_hash = await bcrypt.hash(password, 10);

    const text = `
      INSERT INTO users (username, email, password_hash, full_name, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, full_name, role, created_at
    `;
    const values = [username, email, password_hash, full_name, role];

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const text = "SELECT * FROM users WHERE email = $1";
    const result = await query(text, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const text =
      "SELECT id, username, email, full_name, role, avatar_url, is_active, created_at FROM users WHERE id = $1";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async update(id, userData) {
    const { full_name, avatar_url } = userData;
    const text = `
      UPDATE users 
      SET full_name = $1, avatar_url = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, username, email, full_name, avatar_url, role
    `;
    const result = await query(text, [full_name, avatar_url, id]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
