const { query } = require("../config/database");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    // 1. Create Admin User
    console.log("👤 Creating admin user...");
    const password_hash = await bcrypt.hash("admin123", 10);

    await query(
      `
      INSERT INTO users (username, email, password_hash, full_name, role)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `,
      ["admin", "admin@example.com", password_hash, "Admin User", "admin"]
    );

    console.log(
      "✅ Admin user created (email: admin@example.com, password: admin123)\n"
    );

    // 2. Seed Projects (Optional - update if needed)
    console.log("📁 Seeding projects...");
    const projects = [
      {
        title: "AI-Powered Trading Platform",
        description:
          "Machine learning system for algorithmic trading with real-time analytics",
        short_description: "Quantitative trading AI that analyzes market data",
        category: "AI Finance",
        technologies: [
          "Python",
          "PyTorch",
          "FastAPI",
          "PostgreSQL",
          "Docker",
          "AWS",
        ],
        environment: "Production",
        complexity: "Advanced",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        demo_url: "https://trading-demo.example.com",
        github_url: "https://github.com/username/trading-ai",
        goals: [
          "Create profitable trading algorithms",
          "Implement real-time market analysis",
        ],
        features: ["Real-time market analysis", "Automated trade execution"],
        results: ["Achieved 28.5% ROI in testing", "Reduced risk by 45%"],
        tags: ["ai", "trading", "finance", "machine-learning"],
        development_time: "6 months",
        team_size: "3 members",
      },
    ];

    for (const project of projects) {
      await query(
        `
        INSERT INTO projects (
          title, description, short_description, category, technologies, 
          environment, complexity, status, featured, cover_image, demo_url, 
          github_url, goals, features, results, tags, development_time, team_size
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT DO NOTHING
      `,
        [
          project.title,
          project.description,
          project.short_description,
          project.category,
          project.technologies,
          project.environment,
          project.complexity,
          project.status,
          project.featured,
          project.cover_image,
          project.demo_url,
          project.github_url,
          project.goals,
          project.features,
          project.results,
          project.tags,
          project.development_time,
          project.team_size,
        ]
      );
    }
    console.log(`✅ Seeded ${projects.length} projects\n`);

    // 3. Seed Courses (Books) - UPDATED FOR NEW SCHEMA
    console.log("📚 Seeding AI/ML books...");

    // First, check if we need to drop existing books to avoid conflicts
    await query(
      "DELETE FROM courses WHERE title LIKE '%Machine Learning%' OR title LIKE '%Deep Learning%'"
    );

    const aiBooks = [
      {
        title:
          "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        author: "Aurélien Géron",
        description:
          "Comprehensive guide to building intelligent systems with practical examples and projects. This book covers everything from fundamental concepts to advanced deep learning techniques.",
        short_description: "Practical ML with Scikit-Learn & TensorFlow",
        cover_image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        category: "Machine Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1492032646",
        price: 59.99,
        original_price: 79.99,
        rating: 4.7,
        reviews: 2834,
        priority: "Essential",
        personal_insight:
          "This book transformed how I approach practical ML problems. The hands-on examples are invaluable for real-world applications.",
        time_to_read: "3-4 weeks",
        year: 2022,
        pages: 850,
        why_recommend: ["Career", "Practical", "Foundation"],
        bestseller: true,
        featured: true,
        tags: [
          "Python",
          "Machine Learning",
          "Scikit-Learn",
          "TensorFlow",
          "Keras",
          "Deep Learning",
        ],
        clicks_count: 0,
        publisher: "O'Reilly Media",
        language: "English",
      },
      {
        title: "Deep Learning with Python",
        author: "François Chollet",
        description:
          "Master deep learning using Python and Keras from the creator of Keras himself. This book makes deep learning accessible and practical.",
        short_description: "Deep learning with Python and Keras",
        cover_image:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
        category: "Deep Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1617294438",
        price: 49.99,
        original_price: 59.99,
        rating: 4.8,
        reviews: 1923,
        priority: "Foundational",
        personal_insight:
          "Perfect for understanding deep learning concepts from the ground up. The Keras examples are particularly helpful.",
        time_to_read: "2-3 weeks",
        year: 2021,
        pages: 384,
        why_recommend: ["Foundation", "Practical", "Reference"],
        bestseller: false,
        featured: true,
        tags: ["Python", "Keras", "Neural Networks", "Deep Learning"],
        clicks_count: 0,
        publisher: "Manning Publications",
        language: "English",
      },
      {
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        description:
          "Data wrangling with Pandas, NumPy, and IPython from the creator of Pandas. Essential for anyone working with data in Python.",
        short_description: "Data analysis with Python Pandas",
        cover_image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
        category: "Data Science",
        level: "Beginner",
        amazon_link: "https://amazon.com/dp/109810403X",
        price: 44.99,
        original_price: 54.99,
        rating: 4.6,
        reviews: 3421,
        priority: "Practical",
        personal_insight:
          "The definitive guide to data analysis in Python. Wes McKinney's expertise shines through every chapter.",
        time_to_read: "2 weeks",
        year: 2022,
        pages: 544,
        why_recommend: ["Career", "Practical", "Essential"],
        bestseller: true,
        featured: false,
        tags: ["Python", "Pandas", "Data Analysis", "NumPy", "Data Science"],
        clicks_count: 0,
        publisher: "O'Reilly Media",
        language: "English",
      },
      {
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        description:
          "Mathematical foundations and practical algorithms for pattern recognition. A comprehensive treatment of machine learning from a Bayesian perspective.",
        short_description: "Advanced ML with mathematical foundations",
        cover_image:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        category: "Machine Learning",
        level: "Advanced",
        amazon_link: "https://amazon.com/dp/0387310738",
        price: 79.99,
        original_price: 89.99,
        rating: 4.5,
        reviews: 1456,
        priority: "Theoretical",
        personal_insight:
          "Essential for understanding the mathematical underpinnings of machine learning algorithms.",
        time_to_read: "4-6 weeks",
        year: 2006,
        pages: 738,
        why_recommend: ["Research", "Theoretical", "Reference"],
        bestseller: false,
        featured: false,
        tags: [
          "Mathematics",
          "Pattern Recognition",
          "Bayesian",
          "Machine Learning",
        ],
        clicks_count: 0,
        publisher: "Springer",
        language: "English",
      },
    ];

    for (const book of aiBooks) {
      await query(
        `
        INSERT INTO courses (
          title, author, description, short_description, cover_image,
          category, level, amazon_link, price, original_price,
          rating, reviews, priority, personal_insight, time_to_read,
          year, pages, why_recommend, bestseller, featured, tags,
          clicks_count, publisher, language, reviews_count
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
          $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
        )
        ON CONFLICT DO NOTHING
      `,
        [
          book.title,
          book.author,
          book.description,
          book.short_description,
          book.cover_image,
          book.category,
          book.level,
          book.amazon_link,
          book.price,
          book.original_price,
          book.rating,
          book.reviews,
          book.priority,
          book.personal_insight,
          book.time_to_read,
          book.year,
          book.pages,
          book.why_recommend,
          book.bestseller,
          book.featured,
          book.tags,
          book.clicks_count,
          book.publisher,
          book.language,
          book.reviews, // Map reviews to reviews_count for compatibility
        ]
      );
    }
    console.log(`✅ Seeded ${aiBooks.length} AI/ML books\n`);

    // 4. Seed Formations (Optional)
    console.log("🎓 Seeding formations...");
    const formations = [
      {
        title: "Développement Web Moderne avec React",
        description:
          "Apprenez à créer des applications web modernes avec React, Redux et hooks",
        short_description: "Formation complète React pour débutants",
        category: "Web Development",
        level: "beginner",
        price: 299.0,
        duration_hours: 40,
        max_participants: 20,
        start_date: "2025-11-15",
        end_date: "2025-12-15",
        schedule: "Lundi/Mercredi 18h-20h",
        instructor_name: "Naceur Keraani",
        status: "published",
      },
    ];

    for (const formation of formations) {
      await query(
        `
        INSERT INTO formations (
          title, description, short_description, category, level, price,
          duration_hours, max_participants, start_date, end_date, schedule,
          instructor_name, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT DO NOTHING
      `,
        [
          formation.title,
          formation.description,
          formation.short_description,
          formation.category,
          formation.level,
          formation.price,
          formation.duration_hours,
          formation.max_participants,
          formation.start_date,
          formation.end_date,
          formation.schedule,
          formation.instructor_name,
          formation.status || "published",
        ]
      );
    }
    console.log(`✅ Seeded ${formations.length} formations\n`);

    console.log("🎉 Database seeding completed successfully!\n");

    // Show statistics
    const courseStats = await query(
      "SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE featured = true) as featured FROM courses"
    );
    console.log("📊 Course Statistics:");
    console.log(`   Total books: ${courseStats.rows[0].total}`);
    console.log(`   Featured books: ${courseStats.rows[0].featured}`);

    const categories = await query("SELECT DISTINCT category FROM courses");
    console.log(
      `   Categories: ${categories.rows.map((r) => r.category).join(", ")}`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
