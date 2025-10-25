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

    Object.keys(courseData).forEach((key) => {
      if (courseData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(courseData[key]);
        paramCount++;
      }
    });

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
      "UPDATE courses SET clicks_count = clicks_count + 1 WHERE id = $1";
    await query(text, [id]);
  }
}

module.exports = Course;
