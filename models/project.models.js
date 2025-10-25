

const { query } = require("../config/database");

class Project {
  static async create(projectData) {
    const {
      title,
      description,
      short_description,
      cover_image,
      demo_url,
      github_url,
      category,
      technologies,
      enverment,
      video,
    } = projectData;

    const text = `
      INSERT INTO projects (
        title, description, short_description, cover_image,
        demo_url, github_url, category, technologies,enverment,video
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const values = [
      title,
      description,
      short_description,
      cover_image,
      demo_url,
      github_url,
      category,
      technologies,
      enverment,
      video,
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = "SELECT * FROM projects WHERE status = $1";
    const values = ["published"];
    let paramCount = 2;

    if (filters.category) {
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.featured) {
      text += ` AND featured = true`;
    }

    text += " ORDER BY display_order ASC, created_at DESC";

    const result = await query(text, values);
    return result.rows;
  }

  static async findById(id) {
    const text = "SELECT * FROM projects WHERE id = $1";
    const result = await query(text, [id]);
    return result.rows[0];
  }

  static async update(id, projectData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(projectData).forEach((key) => {
      if (projectData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(projectData[key]);
        paramCount++;
      }
    });

    values.push(id);
    const text = `
      UPDATE projects 
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(text, values);
    return result.rows[0];
  }

  static async delete(id) {
    const text = "DELETE FROM projects WHERE id = $1 RETURNING id";
    const result = await query(text, [id]);
    return result.rows[0];
  }
}

module.exports = Project;
