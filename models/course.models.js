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
      original_price,
      rating,
      reviews,
      priority,
      personal_insight,
      time_to_read,
      year,
      pages,
      why_recommend,
      bestseller,
      featured,
      tags,
    } = courseData;

    const text = `
      INSERT INTO courses (
        title, author, description, short_description, cover_image,
        category, level, amazon_link, price, original_price,
        rating, reviews, priority, personal_insight, time_to_read,
        year, pages, why_recommend, bestseller, featured, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
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
      original_price || null,
      rating || 0.0,
      reviews || 0,
      priority || "Recommended",
      personal_insight || description,
      time_to_read || "2-3 weeks",
      year || new Date().getFullYear(),
      pages || 300,
      why_recommend || ["Practical", "Career", "Foundation"],
      bestseller || false,
      featured || false,
      tags || [],
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let text = "SELECT * FROM courses WHERE 1=1";
    const values = [];
    let paramCount = 1;

    // Category filter
    if (filters.category && filters.category !== "all") {
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    // Level filter
    if (filters.level && filters.level !== "all") {
      text += ` AND level = $${paramCount}`;
      values.push(filters.level);
      paramCount++;
    }

    // Price filter
    if (filters.priceRange && filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under40":
          text += ` AND price < $${paramCount}`;
          values.push(40);
          break;
        case "40-80":
          text += ` AND price >= $${paramCount} AND price <= $${
            paramCount + 1
          }`;
          values.push(40, 80);
          paramCount += 2;
          break;
        case "80-120":
          text += ` AND price >= $${paramCount} AND price <= $${
            paramCount + 1
          }`;
          values.push(80, 120);
          paramCount += 2;
          break;
        case "over120":
          text += ` AND price > $${paramCount}`;
          values.push(120);
          break;
      }
    }

    // Search query
    if (filters.searchQuery) {
      text += ` AND (
        title ILIKE $${paramCount} OR 
        author ILIKE $${paramCount} OR 
        category ILIKE $${paramCount} OR
        EXISTS (SELECT 1 FROM unnest(tags) AS tag WHERE tag ILIKE $${paramCount})
      )`;
      values.push(`%${filters.searchQuery}%`);
      paramCount++;
    }

    // Sort order
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          text += " ORDER BY price ASC";
          break;
        case "price-high":
          text += " ORDER BY price DESC";
          break;
        case "rating":
          text += " ORDER BY rating DESC";
          break;
        case "popular":
          text += " ORDER BY reviews DESC";
          break;
        case "featured":
          text += " ORDER BY featured DESC, created_at DESC";
          break;
        default:
          text += " ORDER BY created_at DESC";
      }
    } else {
      text += " ORDER BY created_at DESC";
    }

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

    const excludedFields = ["id", "created_at", "updated_at"];

    Object.keys(courseData).forEach((key) => {
      if (courseData[key] !== undefined && !excludedFields.includes(key)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(courseData[key]);
        paramCount++;
      }
    });

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
      "SELECT * FROM courses WHERE featured = true ORDER BY created_at DESC LIMIT 3";
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
      WHERE 
        title ILIKE $1 OR 
        author ILIKE $1 OR 
        description ILIKE $1 OR
        category ILIKE $1 OR
        EXISTS (SELECT 1 FROM unnest(tags) AS tag WHERE tag ILIKE $1)
      ORDER BY 
        CASE 
          WHEN title ILIKE $1 THEN 1
          WHEN author ILIKE $1 THEN 2
          WHEN tags::text ILIKE $1 THEN 3
          ELSE 4
        END,
        created_at DESC
    `;
    const result = await query(text, [`%${searchQuery}%`]);
    return result.rows;
  }

  static async getStats() {
    const text = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE featured = true) as featured,
        COUNT(*) FILTER (WHERE bestseller = true) as bestsellers,
        COALESCE(SUM(clicks_count), 0) as total_clicks,
        COUNT(DISTINCT category) as categories,
        ROUND(AVG(price), 2) as avg_price,
        ROUND(AVG(rating), 2) as avg_rating
      FROM courses
    `;
    const result = await query(text);
    return result.rows[0];
  }

  static async getLevels() {
    const text = "SELECT DISTINCT level FROM courses ORDER BY level";
    const result = await query(text);
    return result.rows.map((row) => row.level);
  }

  static async getRecommendations(limit = 3) {
    const text = `
      SELECT * FROM courses 
      WHERE featured = true 
      ORDER BY rating DESC, reviews DESC 
      LIMIT $1
    `;
    const result = await query(text, [limit]);
    return result.rows;
  }

  static async getByCategory(category) {
    const text =
      "SELECT * FROM courses WHERE category = $1 ORDER BY created_at DESC";
    const result = await query(text, [category]);
    return result.rows;
  }
}

module.exports = Course;
