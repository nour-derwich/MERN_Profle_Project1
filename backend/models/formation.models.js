const { query } = require("../config/database");

class Formation {
  // Helper function for safe JSON parsing
  static parseJSONSafe(jsonString, defaultValue = []) {
    if (!jsonString || jsonString === "" || jsonString === "null") {
      return defaultValue;
    }
    try {
      // If it's already an object, return it
      if (typeof jsonString === "object") {
        return jsonString;
      }
      // Try to parse as JSON
      const parsed = JSON.parse(jsonString);
      return parsed || defaultValue;
    } catch (error) {
      console.error("JSON parsing error:", {
        data: jsonString,
        error: error.message,
      });
      return defaultValue;
    }
  }

  static async create(formationData) {
    const {
      title,
      description,
      short_description,
      full_description,
      cover_image,
      category,
      level,
      price,
      original_price,
      installment_price,
      currency,
      duration_hours,
      weeks_duration,
      hours_per_week,
      max_participants,
      current_participants = 0,
      start_date,
      end_date,
      schedule,
      program,
      prerequisites,
      learning_objectives,
      features,
      highlights,
      modules,
      testimonials,
      tags,
      status = "draft",
      featured = false,
      format,
      location,
      live_sessions,
      instructor_name,
      instructor_title,
      instructor_bio,
      instructor_photo,
      instructor_rating,
      instructor_reviews,
      instructor_students,
      instructor_verified = false,
      rating = 0.0,
      reviews_count = 0,
      views_count = 0,
      spots_left,
    } = formationData;

    const text = `
      INSERT INTO formations (
        title, description, short_description, full_description, cover_image,
        category, level, price, original_price, installment_price, currency,
        duration_hours, weeks_duration, hours_per_week, max_participants,
        current_participants, start_date, end_date, schedule, program,
        prerequisites, learning_objectives, features, highlights, modules,
        testimonials, tags, status, featured, format, location, live_sessions,
        instructor_name, instructor_title, instructor_bio, instructor_photo,
        instructor_rating, instructor_reviews, instructor_students,
        instructor_verified, rating, reviews_count, views_count, spots_left
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28,
        $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41,
        $42, $43, $44
      )
      RETURNING *
    `;

    const values = [
      title,
      description,
      short_description,
      full_description,
      cover_image,
      category,
      level,
      price,
      original_price,
      installment_price,
      currency || "USD",
      duration_hours,
      weeks_duration,
      hours_per_week,
      max_participants,
      current_participants,
      start_date,
      end_date,
      schedule,
      JSON.stringify(program || []),
      prerequisites,
      learning_objectives || [],
      features || [],
      highlights || [],
      JSON.stringify(modules || []),
      JSON.stringify(testimonials || []),
      tags || [],
      status,
      featured,
      format || "Online",
      location || "Online",
      live_sessions,
      instructor_name,
      instructor_title,
      instructor_bio,
      instructor_photo,
      instructor_rating,
      instructor_reviews,
      instructor_students,
      instructor_verified,
      rating,
      reviews_count,
      views_count,
      spots_left || max_participants,
    ];

    try {
      const result = await query(text, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating formation:", error);
      throw error;
    }
  }

  static async findAll(filters = {}) {
    let text = `
      SELECT 
        f.*,
        (f.max_participants - f.current_participants) as spots_left,
        COALESCE(r.average_rating, 0) as rating,
        COALESCE(r.reviews_count, 0) as reviews_count
      FROM formations f
      LEFT JOIN (
        SELECT 
          formation_id,
          AVG(rating) as average_rating,
          COUNT(*) as reviews_count
        FROM reviews
        WHERE is_approved = true
        GROUP BY formation_id
      ) r ON f.id = r.formation_id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 1;

    // Status filter (default to published if not specified)
    if (filters.status) {
      text += ` AND f.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    } else if (!filters.admin) {
      // If not admin, only show published formations
      text += ` AND f.status = 'published'`;
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      text += ` AND f.category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    // Level filter
    if (filters.level && filters.level !== "all") {
      text += ` AND f.level = $${paramCount}`;
      values.push(filters.level);
      paramCount++;
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under600":
          text += ` AND f.price < 600`;
          break;
        case "600-900":
          text += ` AND f.price >= 600 AND f.price <= 900`;
          break;
        case "900-1200":
          text += ` AND f.price >= 900 AND f.price <= 1200`;
          break;
        case "over1200":
          text += ` AND f.price > 1200`;
          break;
      }
    }

    // Status filter
    if (filters.selectedStatus && filters.selectedStatus !== "all") {
      text += ` AND f.status = $${paramCount}`;
      values.push(filters.selectedStatus);
      paramCount++;
    }

    // Search query
    if (filters.searchQuery) {
      text += ` AND (
        f.title ILIKE $${paramCount} OR 
        f.description ILIKE $${paramCount} OR 
        f.category ILIKE $${paramCount}
      )`;
      values.push(`%${filters.searchQuery}%`);
      paramCount++;
    }

    // Featured filter
    if (filters.featured === true) {
      text += ` AND f.featured = true`;
    }

    // Sort options
    switch (filters.sortBy) {
      case "popular":
        text += ` ORDER BY f.views_count DESC`;
        break;
      case "rating":
        text += ` ORDER BY COALESCE(r.average_rating, 0) DESC`;
        break;
      case "recent":
        text += ` ORDER BY f.created_at DESC`;
        break;
      case "price-low":
        text += ` ORDER BY f.price ASC`;
        break;
      case "price-high":
        text += ` ORDER BY f.price DESC`;
        break;
      case "featured":
      default:
        text += ` ORDER BY f.featured DESC, f.created_at DESC`;
        break;
    }

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

      // Parse JSON fields safely
      return result.rows.map((row) => ({
        ...row,
        program: Formation.parseJSONSafe(row.program, []),
        modules: Formation.parseJSONSafe(row.modules, []),
        testimonials: Formation.parseJSONSafe(row.testimonials, []),
        features: row.features || [],
        highlights: row.highlights || [],
        learning_objectives: row.learning_objectives || [],
        tags: row.tags || [],
      }));
    } catch (error) {
      console.error("Error in Formation.findAll:", error);
      throw error;
    }
  }

  static async findById(id) {
    const text = `
      SELECT 
        f.*,
        (f.max_participants - f.current_participants) as spots_left,
        COALESCE(r.average_rating, 0) as rating,
        COALESCE(r.reviews_count, 0) as reviews_count,
        COALESCE(reg.total_registrations, 0) as total_registrations
      FROM formations f
      LEFT JOIN (
        SELECT 
          formation_id,
          AVG(rating) as average_rating,
          COUNT(*) as reviews_count
        FROM reviews
        WHERE is_approved = true
        GROUP BY formation_id
      ) r ON f.id = r.formation_id
      LEFT JOIN (
        SELECT 
          formation_id,
          COUNT(*) as total_registrations
        FROM registrations
        WHERE status = 'confirmed'
        GROUP BY formation_id
      ) reg ON f.id = reg.formation_id
      WHERE f.id = $1
    `;

    try {
      const result = await query(text, [id]);

      if (!result.rows[0]) {
        return null;
      }

      const formation = result.rows[0];

      // Parse JSON fields safely
      return {
        ...formation,
        program: Formation.parseJSONSafe(formation.program, []),
        modules: Formation.parseJSONSafe(formation.modules, []),
        testimonials: Formation.parseJSONSafe(formation.testimonials, []),
        features: formation.features || [],
        highlights: formation.highlights || [],
        learning_objectives: formation.learning_objectives || [],
        tags: formation.tags || [],
        prerequisites: formation.prerequisites || "",
      };
    } catch (error) {
      console.error(`Error in Formation.findById(${id}):`, error);
      throw error;
    }
  }

  static async update(id, formationData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    // Only allow updating of actual database columns
    const allowedFields = [
      "title",
      "description",
      "short_description",
      "full_description",
      "cover_image",
      "category",
      "level",
      "price",
      "original_price",
      "installment_price",
      "currency",
      "duration_hours",
      "weeks_duration",
      "hours_per_week",
      "max_participants",
      "current_participants",
      "start_date",
      "end_date",
      "schedule",
      "program",
      "prerequisites",
      "learning_objectives",
      "features",
      "highlights",
      "modules",
      "testimonials",
      "tags",
      "status",
      "featured",
      "format",
      "location",
      "live_sessions",
      "instructor_name",
      "instructor_title",
      "instructor_bio",
      "instructor_photo",
      "instructor_rating",
      "instructor_reviews",
      "instructor_students",
      "instructor_verified",
      "views_count",
    ];

    // Remove computed fields that shouldn't be updated directly
    const dataToUpdate = { ...formationData };
    delete dataToUpdate.spots_left;
    delete dataToUpdate.rating;
    delete dataToUpdate.reviews_count;
    delete dataToUpdate.total_registrations;

    Object.keys(dataToUpdate).forEach((key) => {
      // Only update allowed fields that exist in the request
      if (dataToUpdate[key] !== undefined && allowedFields.includes(key)) {
        // Handle JSON fields
        if (["program", "modules", "testimonials"].includes(key)) {
          fields.push(`${key} = $${paramCount}`);
          values.push(JSON.stringify(dataToUpdate[key] || []));
        }
        // Handle array fields
        else if (
          ["features", "highlights", "learning_objectives", "tags"].includes(
            key
          )
        ) {
          fields.push(`${key} = $${paramCount}`);
          values.push(dataToUpdate[key] || []);
        }
        // Handle regular fields
        else {
          fields.push(`${key} = $${paramCount}`);
          values.push(dataToUpdate[key]);
        }
        paramCount++;
      }
    });

    // If no valid fields to update, return early
    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(id);

    const text = `
    UPDATE formations 
    SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${paramCount}
    RETURNING *
  `;

    try {
      const result = await query(text, values);

      if (!result.rows[0]) {
        return null;
      }

      const formation = result.rows[0];

      // Parse JSON fields safely
      return {
        ...formation,
        program: Formation.parseJSONSafe(formation.program, []),
        modules: Formation.parseJSONSafe(formation.modules, []),
        testimonials: Formation.parseJSONSafe(formation.testimonials, []),
        features: formation.features || [],
        highlights: formation.highlights || [],
        learning_objectives: formation.learning_objectives || [],
        tags: formation.tags || [],
      };
    } catch (error) {
      console.error(`Error in Formation.update(${id}):`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const text = "DELETE FROM formations WHERE id = $1 RETURNING id";
      const result = await query(text, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Formation.delete(${id}):`, error);
      throw error;
    }
  }

  static async incrementViews(id) {
    try {
      const text =
        "UPDATE formations SET views_count = views_count + 1 WHERE id = $1";
      await query(text, [id]);
    } catch (error) {
      console.error(`Error in Formation.incrementViews(${id}):`, error);
      throw error;
    }
  }

  static async updateParticipants(id, count) {
    try {
      const text = `
        UPDATE formations 
        SET current_participants = current_participants + $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `;
      const result = await query(text, [count, id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Formation.updateParticipants(${id}):`, error);
      throw error;
    }
  }

  static async getStats() {
    try {
      const text = `
        SELECT 
          COUNT(*) as total_formations,
          COUNT(*) FILTER (WHERE status = 'published') as published_formations,
          COUNT(*) FILTER (WHERE status = 'draft') as draft_formations,
          COUNT(*) FILTER (WHERE featured = true) as featured_formations,
          SUM(current_participants) as total_participants,
          SUM(max_participants) as total_capacity,
          AVG(price) as average_price,
          SUM(views_count) as total_views
        FROM formations
      `;
      const result = await query(text);
      return (
        result.rows[0] || {
          total_formations: 0,
          published_formations: 0,
          draft_formations: 0,
          featured_formations: 0,
          total_participants: 0,
          total_capacity: 0,
          average_price: 0,
          total_views: 0,
        }
      );
    } catch (error) {
      console.error("Error in Formation.getStats:", error);
      return {
        total_formations: 0,
        published_formations: 0,
        draft_formations: 0,
        featured_formations: 0,
        total_participants: 0,
        total_capacity: 0,
        average_price: 0,
        total_views: 0,
      };
    }
  }

  static async getCategories() {
    try {
      const text = `
        SELECT 
          category,
          COUNT(*) as count
        FROM formations
        WHERE status = 'published'
        GROUP BY category
        ORDER BY count DESC
      `;
      const result = await query(text);
      return result.rows || [];
    } catch (error) {
      console.error("Error in Formation.getCategories:", error);
      return [];
    }
  }

  static async getLevels() {
    try {
      const text = `
        SELECT 
          level,
          COUNT(*) as count
        FROM formations
        WHERE status = 'published'
        GROUP BY level
        ORDER BY 
          CASE level
            WHEN 'beginner' THEN 1
            WHEN 'intermediate' THEN 2
            WHEN 'advanced' THEN 3
            WHEN 'expert' THEN 4
            ELSE 5
          END
      `;
      const result = await query(text);
      return result.rows || [];
    } catch (error) {
      console.error("Error in Formation.getLevels:", error);
      return [];
    }
  }

  static async getStatuses() {
    try {
      const text = `
        SELECT 
          status,
          COUNT(*) as count
        FROM formations
        GROUP BY status
        ORDER BY status
      `;
      const result = await query(text);
      return result.rows || [];
    } catch (error) {
      console.error("Error in Formation.getStatuses:", error);
      return [];
    }
  }
}

module.exports = Formation;
