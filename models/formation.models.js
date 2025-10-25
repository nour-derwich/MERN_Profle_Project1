const { query } = require("../config/database");

class Formation {
  static async create(formationData) {
    const {
      title,
      description,
      short_description,
      cover_image,
      category,
      level,
      price,
      duration_hours,
      max_participants,
      start_date,
      end_date,
      schedule,
      program,
      prerequisites,
      learning_objectives,
      instructor_name,
      instructor_bio,
      instructor_photo,
    } = formationData;

    const text = `
      INSERT INTO formations (
        title, description, short_description, cover_image, category,
        level, price, duration_hours, max_participants, start_date,
        end_date, schedule, program, prerequisites, learning_objectives,
        instructor_name, instructor_bio, instructor_photo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `;

    const values = [
      title,
      description,
      short_description,
      cover_image,
      category,
      level,
      price,
      duration_hours,
      max_participants,
      start_date,
      end_date,
      schedule,
      JSON.stringify(program),
      prerequisites,
      learning_objectives,
      instructor_name,
      instructor_bio,
      instructor_photo,
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = "SELECT * FROM formations WHERE 1=1";
    const values = [];
    let paramCount = 1;

    if (filters.category) {
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.level) {
      text += ` AND level = $${paramCount}`;
      values.push(filters.level);
      paramCount++;
    }

    if (filters.status) {
      text += ` AND status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    if (filters.featured) {
      text += ` AND featured = true`;
    }

    text += " ORDER BY created_at DESC";

    if (filters.limit) {
      text += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
      paramCount++;
    }

    if (filters.offset) {
      text += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
    }

    const result = await query(text, values);
    return result.rows;
  }

  static async findById(id) {
    const text = "SELECT * FROM formations WHERE id = $1";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async update(id, formationData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(formationData).forEach((key) => {
      if (formationData[key] !== undefined) {
        if (key === "program") {
          fields.push(`${key} = $${paramCount}`);
          values.push(JSON.stringify(formationData[key]));
        } else {
          fields.push(`${key} = $${paramCount}`);
          values.push(formationData[key]);
        }
        paramCount++;
      }
    });

    values.push(id);
    const text = `
      UPDATE formations 
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(text, values);
    return result.rows[0];
  }

  static async delete(id) {
    const text = "DELETE FROM formations WHERE id = $1 RETURNING id";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async incrementViews(id) {
    const text =
      "UPDATE formations SET views_count = views_count + 1 WHERE id = $1";
    await query(text, [id]);
  }

  static async getStats() {
    const text = "SELECT * FROM formation_stats";
    const result = await query(text);
    return result.rows;
  }
}

module.exports = Formation;
