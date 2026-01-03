const { query } = require("../config/database");

class Project {
  static async create(projectData) {
    const {
      title,
      description,
      short_description,
      full_description,
      cover_image,
      demo_url,
      github_url,
      documentation_url,
      article_url,
      category,
      technologies,
      environment,
      video,
      complexity,
      status,
      featured,
      display_order,
      views_count,
      stars,
      forks,
      contributors,
      development_time,
      dataset_size,
      last_updated,
      team_size,
      duration,
      architecture,
      goals,
      features,
      challenges,
      results,
      metrics,
      live_demo_available,
      source_code_available,
      documentation_available,
      api_available,
      open_source,
      tags,
      meta_description,
      meta_keywords,
    } = projectData;

    const text = `
    INSERT INTO projects (
      title, description, short_description, full_description, cover_image,
      demo_url, github_url, documentation_url, article_url, category, 
      technologies, environment, video, complexity, status, featured, 
      display_order, views_count, stars, forks, contributors, 
      development_time, dataset_size, last_updated, team_size, duration,
      architecture, goals, features, challenges, results, metrics,
      live_demo_available, source_code_available, documentation_available,
      api_available, open_source, tags, meta_description, meta_keywords,
      created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 
    $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 
    $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, 
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *
  `;

    const values = [
      title,
      description,
      short_description,
      full_description,
      cover_image,
      demo_url,
      github_url,
      documentation_url,
      article_url,
      category,
      technologies,
      environment,
      video,
      complexity,
      status || "draft",
      featured || false,
      display_order || 0,
      views_count || 0,
      stars || 0,
      forks || 0,
      contributors || 1,
      development_time,
      dataset_size,
      last_updated || new Date(),
      team_size,
      duration,
      architecture,
      goals,
      features,
      challenges,
      results,
      metrics,
      live_demo_available || false,
      source_code_available || false,
      documentation_available || false,
      api_available || false,
      open_source || false,
      tags,
      meta_description,
      meta_keywords,
    ];

    console.log("📝 SQL Columns count:", 40); // Should match number of columns
    console.log("📦 Values count:", values.length); // Should be 40 (without the duplicate)

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = "SELECT * FROM projects WHERE status = $1";
    const values = ["published"];
    let paramCount = 2;

    // Add filters
    if (filters.category && filters.category !== "all") {
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.complexity && filters.complexity !== "all") {
      text += ` AND complexity = $${paramCount}`;
      values.push(filters.complexity);
      paramCount++;
    }

    if (filters.status && filters.status !== "all") {
      text += ` AND status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    if (filters.featured) {
      text += ` AND featured = true`;
    }

    if (filters.search) {
      text += ` AND (
        title ILIKE $${paramCount} OR 
        description ILIKE $${paramCount} OR 
        short_description ILIKE $${paramCount} OR
        technologies::text ILIKE $${paramCount} OR
        tags::text ILIKE $${paramCount}
      )`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }

    // Add advanced filters
    if (filters.live_demo_available) {
      text += ` AND live_demo_available = true`;
    }

    if (filters.source_code_available) {
      text += ` AND source_code_available = true`;
    }

    if (filters.open_source) {
      text += ` AND open_source = true`;
    }

    // Add sorting
    const sortOptions = {
      featured: "featured DESC, display_order ASC, created_at DESC",
      recent: "created_at DESC",
      complexity: `CASE 
        WHEN complexity = 'Expert' THEN 1
        WHEN complexity = 'Advanced' THEN 2
        WHEN complexity = 'Intermediate' THEN 3
        WHEN complexity = 'Beginner' THEN 4
        ELSE 5
      END, display_order ASC`,
      popular: "views_count DESC, stars DESC",
      alphabetical: "title ASC",
    };

    const sortBy = filters.sortBy || "featured";
    text += ` ORDER BY ${sortOptions[sortBy] || sortOptions.featured}`;

    const result = await query(text, values);
    return result.rows;
  }

  static async findFeatured() {
    const text = `
    SELECT *
    FROM projects
    WHERE status = 'published'
      AND featured = true
    ORDER BY display_order ASC, created_at DESC
  `;

    const result = await query(text);
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

  static async getCategories() {
    const text = `
      SELECT DISTINCT category, COUNT(*) as count 
      FROM projects 
      WHERE status = 'published' 
      GROUP BY category 
      ORDER BY category
    `;
    const result = await query(text);
    return result.rows;
  }

  static async search(searchQuery) {
    const text = `
      SELECT * FROM projects 
      WHERE status = 'published' 
      AND (
        title ILIKE $1 OR 
        description ILIKE $1 OR 
        short_description ILIKE $1 OR
        technologies::text ILIKE $1 OR
        tags::text ILIKE $1 OR
        category ILIKE $1
      )
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

  static async getStats() {
    const text = `
      SELECT 
        COUNT(*) as total_projects,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_projects,
        COUNT(CASE WHEN featured = true THEN 1 END) as featured_projects,
        COUNT(CASE WHEN open_source = true THEN 1 END) as open_source_projects,
        SUM(views_count) as total_views,
        SUM(stars) as total_stars,
        SUM(forks) as total_forks,
        AVG(CASE WHEN complexity = 'Expert' THEN 1
                WHEN complexity = 'Advanced' THEN 2
                WHEN complexity = 'Intermediate' THEN 3
                WHEN complexity = 'Beginner' THEN 4
                ELSE 5 END) as avg_complexity
      FROM projects
    `;
    const result = await query(text);
    return result.rows[0];
  }

  static async getComplexities() {
    const text = `
      SELECT DISTINCT complexity, COUNT(*) as count 
      FROM projects 
      WHERE status = 'published' 
      GROUP BY complexity 
      ORDER BY 
        CASE complexity
          WHEN 'Expert' THEN 1
          WHEN 'Advanced' THEN 2
          WHEN 'Intermediate' THEN 3
          WHEN 'Beginner' THEN 4
          ELSE 5
        END
    `;
    const result = await query(text);
    return result.rows;
  }

  static async getTechnologies() {
    const text = `
      SELECT DISTINCT UNNEST(technologies) as technology, COUNT(*) as count
      FROM projects
      WHERE status = 'published'
      GROUP BY technology
      ORDER BY count DESC, technology
    `;
    const result = await query(text);
    return result.rows;
  }

  static async getProjectBySlug(slug) {
    const text = `
      SELECT * FROM projects 
      WHERE slug = $1 AND status = 'published'
    `;
    const result = await query(text, [slug]);
    return result.rows[0];
  }

  static async incrementStars(id) {
    const text = "UPDATE projects SET stars = stars + 1 WHERE id = $1";
    await query(text, [id]);
  }

  static async incrementForks(id) {
    const text = "UPDATE projects SET forks = forks + 1 WHERE id = $1";
    await query(text, [id]);
  }

  static async getRelatedProjects(projectId, category, limit = 3) {
    const text = `
      SELECT * FROM projects 
      WHERE id != $1 
      AND category = $2 
      AND status = 'published'
      ORDER BY featured DESC, views_count DESC, created_at DESC
      LIMIT $3
    `;
    const result = await query(text, [projectId, category, limit]);
    return result.rows;
  }
}

module.exports = Project;
