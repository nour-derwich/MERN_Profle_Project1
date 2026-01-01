const { query } = require("../config/database");

class Course {
  static async create(courseData) {
    const {
      title,
      author,
      description,
      short_description,
      cover_image,
      category,
      level,
      amazon_link,
      price,
      rating,
    } = courseData;

    const text = `
      INSERT INTO courses (
        title, author, description, short_description, cover_image,
        category, level, amazon_link, price, rating
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const values = [
      title,
      author,
      description,
      short_description,
      cover_image,
      category,
      level,
      amazon_link,
      price,
      rating,
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = "SELECT * FROM courses WHERE 1=1";
    const values = [];
    let paramCount = 1;

    if (filters.category) {
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.author) {
      text += ` AND author ILIKE $${paramCount}`;
      values.push(`%${filters.author}%`);
      paramCount++;
    }

    text += " ORDER BY created_at DESC";

    const result = await query(text, values);
    return result.rows;
  }

  static async findById(id) {
    const text = "SELECT * FROM courses WHERE id = $1";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async update(id, courseData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    // List of fields that should not be updated manually
    const excludedFields = ["id", "created_at", "updated_at"];

    Object.keys(courseData).forEach((key) => {
      // Skip undefined values and excluded fields
      if (courseData[key] !== undefined && !excludedFields.includes(key)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(courseData[key]);
        paramCount++;
      }
    });

    // If no fields to update, return the current record
    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(id);
    const text = `
      UPDATE courses 
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(text, values);
    return result.rows[0];
  }

  static async delete(id) {
    const text = "DELETE FROM courses WHERE id = $1 RETURNING id";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async incrementClicks(id) {
    const text =
      "UPDATE courses SET clicks_count = clicks_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1";
    await query(text, [id]);
  }

  static async findFeatured() {
    const text =
      "SELECT * FROM courses WHERE featured = true ORDER BY created_at DESC";
    const result = await query(text);
    return result.rows;
  }

  static async findCategories() {
    const text = "SELECT DISTINCT category FROM courses ORDER BY category";
    const result = await query(text);
    return result.rows.map((row) => row.category);
  }

  static async search(searchQuery) {
    const text = `
      SELECT * FROM courses 
      WHERE title ILIKE $1 OR author ILIKE $1 OR description ILIKE $1
      ORDER BY created_at DESC
    `;
    const result = await query(text, [`%${searchQuery}%`]);
    return result.rows;
  }

  static async getStats() {
    const text = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE featured = true) as featured,
        COALESCE(SUM(clicks_count), 0) as total_clicks,
        COUNT(DISTINCT category) as categories
      FROM courses
    `;
    const result = await query(text);
    return result.rows[0];
  }
}

module.exports = Course;
