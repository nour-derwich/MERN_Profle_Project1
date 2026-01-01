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

  // ADD THESE MISSING METHODS:

  static async getCategories() {
    const text =
      "SELECT DISTINCT category FROM projects WHERE status = $1 ORDER BY category";
    const result = await query(text, ["published"]);
    return result.rows.map((row) => row.category);
  }

  static async search(searchQuery) {
    const text = `
      SELECT * FROM projects 
      WHERE status = 'published' 
      AND (title ILIKE $1 OR description ILIKE $1)
      ORDER BY created_at DESC
    `;
    const result = await query(text, [`%${searchQuery}%`]);
    return result.rows;
  }

  static async incrementViews(id) {
    const text =
      "UPDATE projects SET views_count = views_count + 1 WHERE id = $1";
    await query(text, [id]);
  }

  static async updateStatus(id, status) {
    const text = `
      UPDATE projects 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(text, [status, id]);
    return result.rows[0] || null;
  }

  static async toggleFeatured(id) {
    const text = `
      UPDATE projects 
      SET featured = NOT featured, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  static async reorder(projects) {
    for (const project of projects) {
      await query("UPDATE projects SET display_order = $1 WHERE id = $2", [
        project.display_order,
        project.id,
      ]);
    }
  }

  static async findAllAdmin() {
    const text =
      "SELECT * FROM projects ORDER BY display_order ASC, created_at DESC";
    const result = await query(text);
    return result.rows;
  }
}

module.exports = Project;
