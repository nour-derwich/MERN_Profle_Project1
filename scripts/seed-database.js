const { query } = require("../config/database");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    // 1. Create Admin User
    // console.log("👤 Creating admin user...");
    // const password_hash = await bcrypt.hash("admin123", 10);

    // await query(
    //   `
    //   INSERT INTO users (username, email, password_hash, full_name, role)
    //   VALUES ($1, $2, $3, $4, $5)
    //   ON CONFLICT (email) DO NOTHING
    // `,
    //   ["admin", "admin@example.com", password_hash, "Admin User", "admin"]
    // );

    // console.log(
    //   "✅ Admin user created (email: admin@example.com, password: admin123)\n"
    // );

    // // 2. Seed Projects (Optional - update if needed)
    // console.log("📁 Seeding projects...");
    // const projects = [
    //   {
    //     title: "AI-Powered Trading Platform",
    //     description:
    //       "Machine learning system for algorithmic trading with real-time analytics",
    //     short_description: "Quantitative trading AI that analyzes market data",
    //     category: "AI Finance",
    //     technologies: [
    //       "Python",
    //       "PyTorch",
    //       "FastAPI",
    //       "PostgreSQL",
    //       "Docker",
    //       "AWS",
    //     ],
    //     environment: "Production",
    //     complexity: "Advanced",
    //     status: "published",
    //     featured: true,
    //     cover_image:
    //       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    //     demo_url: "https://trading-demo.example.com",
    //     github_url: "https://github.com/username/trading-ai",
    //     goals: [
    //       "Create profitable trading algorithms",
    //       "Implement real-time market analysis",
    //     ],
    //     features: ["Real-time market analysis", "Automated trade execution"],
    //     results: ["Achieved 28.5% ROI in testing", "Reduced risk by 45%"],
    //     tags: ["ai", "trading", "finance", "machine-learning"],
    //     development_time: "6 months",
    //     team_size: "3 members",
    //   },
    // ];

    // for (const project of projects) {
    //   await query(
    //     `
    //     INSERT INTO projects (
    //       title, description, short_description, category, technologies,
    //       environment, complexity, status, featured, cover_image, demo_url,
    //       github_url, goals, features, results, tags, development_time, team_size
    //     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    //     ON CONFLICT DO NOTHING
    //   `,
    //     [
    //       project.title,
    //       project.description,
    //       project.short_description,
    //       project.category,
    //       project.technologies,
    //       project.environment,
    //       project.complexity,
    //       project.status,
    //       project.featured,
    //       project.cover_image,
    //       project.demo_url,
    //       project.github_url,
    //       project.goals,
    //       project.features,
    //       project.results,
    //       project.tags,
    //       project.development_time,
    //       project.team_size,
    //     ]
    //   );
    // }
    // console.log(`✅ Seeded ${projects.length} projects\n`);

    // // 3. Seed Courses (Books) - UPDATED FOR NEW SCHEMA
    // console.log("📚 Seeding AI/ML books...");

    // // First, check if we need to drop existing books to avoid conflicts
    // await query(
    //   "DELETE FROM courses WHERE title LIKE '%Machine Learning%' OR title LIKE '%Deep Learning%'"
    // );

    // const aiBooks = [
    //   {
    //     title:
    //       "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    //     author: "Aurélien Géron",
    //     description:
    //       "Comprehensive guide to building intelligent systems with practical examples and projects. This book covers everything from fundamental concepts to advanced deep learning techniques.",
    //     short_description: "Practical ML with Scikit-Learn & TensorFlow",
    //     cover_image:
    //       "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    //     category: "Machine Learning",
    //     level: "Intermediate",
    //     amazon_link: "https://amazon.com/dp/1492032646",
    //     price: 59.99,
    //     original_price: 79.99,
    //     rating: 4.7,
    //     reviews: 2834,
    //     priority: "Essential",
    //     personal_insight:
    //       "This book transformed how I approach practical ML problems. The hands-on examples are invaluable for real-world applications.",
    //     time_to_read: "3-4 weeks",
    //     year: 2022,
    //     pages: 850,
    //     why_recommend: ["Career", "Practical", "Foundation"],
    //     bestseller: true,
    //     featured: true,
    //     tags: [
    //       "Python",
    //       "Machine Learning",
    //       "Scikit-Learn",
    //       "TensorFlow",
    //       "Keras",
    //       "Deep Learning",
    //     ],
    //     clicks_count: 0,
    //     publisher: "O'Reilly Media",
    //     language: "English",
    //   },
    //   {
    //     title: "Deep Learning with Python",
    //     author: "François Chollet",
    //     description:
    //       "Master deep learning using Python and Keras from the creator of Keras himself. This book makes deep learning accessible and practical.",
    //     short_description: "Deep learning with Python and Keras",
    //     cover_image:
    //       "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    //     category: "Deep Learning",
    //     level: "Intermediate",
    //     amazon_link: "https://amazon.com/dp/1617294438",
    //     price: 49.99,
    //     original_price: 59.99,
    //     rating: 4.8,
    //     reviews: 1923,
    //     priority: "Foundational",
    //     personal_insight:
    //       "Perfect for understanding deep learning concepts from the ground up. The Keras examples are particularly helpful.",
    //     time_to_read: "2-3 weeks",
    //     year: 2021,
    //     pages: 384,
    //     why_recommend: ["Foundation", "Practical", "Reference"],
    //     bestseller: false,
    //     featured: true,
    //     tags: ["Python", "Keras", "Neural Networks", "Deep Learning"],
    //     clicks_count: 0,
    //     publisher: "Manning Publications",
    //     language: "English",
    //   },
    //   {
    //     title: "Python for Data Analysis",
    //     author: "Wes McKinney",
    //     description:
    //       "Data wrangling with Pandas, NumPy, and IPython from the creator of Pandas. Essential for anyone working with data in Python.",
    //     short_description: "Data analysis with Python Pandas",
    //     cover_image:
    //       "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    //     category: "Data Science",
    //     level: "Beginner",
    //     amazon_link: "https://amazon.com/dp/109810403X",
    //     price: 44.99,
    //     original_price: 54.99,
    //     rating: 4.6,
    //     reviews: 3421,
    //     priority: "Practical",
    //     personal_insight:
    //       "The definitive guide to data analysis in Python. Wes McKinney's expertise shines through every chapter.",
    //     time_to_read: "2 weeks",
    //     year: 2022,
    //     pages: 544,
    //     why_recommend: ["Career", "Practical", "Essential"],
    //     bestseller: true,
    //     featured: false,
    //     tags: ["Python", "Pandas", "Data Analysis", "NumPy", "Data Science"],
    //     clicks_count: 0,
    //     publisher: "O'Reilly Media",
    //     language: "English",
    //   },
    //   {
    //     title: "Pattern Recognition and Machine Learning",
    //     author: "Christopher Bishop",
    //     description:
    //       "Mathematical foundations and practical algorithms for pattern recognition. A comprehensive treatment of machine learning from a Bayesian perspective.",
    //     short_description: "Advanced ML with mathematical foundations",
    //     cover_image:
    //       "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    //     category: "Machine Learning",
    //     level: "Advanced",
    //     amazon_link: "https://amazon.com/dp/0387310738",
    //     price: 79.99,
    //     original_price: 89.99,
    //     rating: 4.5,
    //     reviews: 1456,
    //     priority: "Theoretical",
    //     personal_insight:
    //       "Essential for understanding the mathematical underpinnings of machine learning algorithms.",
    //     time_to_read: "4-6 weeks",
    //     year: 2006,
    //     pages: 738,
    //     why_recommend: ["Research", "Theoretical", "Reference"],
    //     bestseller: false,
    //     featured: false,
    //     tags: [
    //       "Mathematics",
    //       "Pattern Recognition",
    //       "Bayesian",
    //       "Machine Learning",
    //     ],
    //     clicks_count: 0,
    //     publisher: "Springer",
    //     language: "English",
    //   },
    // ];

    // for (const book of aiBooks) {
    //   await query(
    //     `
    //     INSERT INTO courses (
    //       title, author, description, short_description, cover_image,
    //       category, level, amazon_link, price, original_price,
    //       rating, reviews, priority, personal_insight, time_to_read,
    //       year, pages, why_recommend, bestseller, featured, tags,
    //       clicks_count, publisher, language, reviews_count
    //     ) VALUES (
    //       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
    //       $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
    //     )
    //     ON CONFLICT DO NOTHING
    //   `,
    //     [
    //       book.title,
    //       book.author,
    //       book.description,
    //       book.short_description,
    //       book.cover_image,
    //       book.category,
    //       book.level,
    //       book.amazon_link,
    //       book.price,
    //       book.original_price,
    //       book.rating,
    //       book.reviews,
    //       book.priority,
    //       book.personal_insight,
    //       book.time_to_read,
    //       book.year,
    //       book.pages,
    //       book.why_recommend,
    //       book.bestseller,
    //       book.featured,
    //       book.tags,
    //       book.clicks_count,
    //       book.publisher,
    //       book.language,
    //       book.reviews, // Map reviews to reviews_count for compatibility
    //     ]
    //   );
    // }
    // console.log(`✅ Seeded ${aiBooks.length} AI/ML books\n`);

    // 4. Seed Formations (Optional)
    console.log("🎓 Seeding formations...");
    const seedFormations = async () => {
      const formations = [
        {
          title: "Machine Learning Mastery Bootcamp",
          description:
            "Comprehensive hands-on training in machine learning algorithms, from fundamentals to advanced techniques. Transform your career with real-world projects.",
          short_description: "Master ML from fundamentals to advanced",
          full_description:
            "A 12-week intensive bootcamp covering all aspects of machine learning. Learn to build, train, and deploy ML models with real-world datasets.",
          category: "Machine Learning",
          level: "advanced",
          price: 899.0,
          original_price: 1199.0,
          installment_price: 299.0,
          currency: "USD",
          duration_hours: 96,
          weeks_duration: "12 weeks",
          hours_per_week: "8 hours",
          max_participants: 15,
          current_participants: 10,
          start_date: "2025-03-15",
          end_date: "2025-05-10",
          schedule: "Mon, Wed, Fri - 6:00 PM - 9:00 PM",
          format: "Online + Live Sessions",
          location: "Online",
          live_sessions: "Weekly",
          spots_left: 5,
          instructor_name: "Naceur Keraani",
          instructor_title: "Senior ML Engineer",
          instructor_bio: "8+ years experience in ML, former lead at Google AI",
          instructor_photo:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur",
          instructor_rating: 4.9,
          instructor_reviews: 124,
          instructor_students: 2500,
          instructor_verified: true,
          rating: 4.8,
          reviews_count: 124,
          views_count: 1500,
          status: "enrolling",
          featured: true,
          cover_image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
          prerequisites:
            "Python programming knowledge, Basic statistics and linear algebra, Passion for AI and data science",
          learning_objectives: [
            "Build ML models from scratch",
            "Deploy models to production",
            "Understand ML algorithms",
            "Work with real-world datasets",
          ],
          features: [
            "Live Interactive Sessions",
            "Career Support",
            "Certificate",
            "Real Projects",
            "Lifetime Access",
            "Mentorship",
          ],
          highlights: [
            "Build 10+ ML models from scratch",
            "Master Scikit-learn, PyTorch, TensorFlow",
            "Real-world datasets and capstone projects",
            "One-on-one mentorship sessions",
            "Industry-recognized certificate",
          ],
          modules: JSON.stringify([
            {
              title: "Weeks 1-3: ML Fundamentals",
              duration: "24 hours",
              topics: [
                "Linear Regression",
                "Logistic Regression",
                "Decision Trees",
                "Model Evaluation",
              ],
            },
            {
              title: "Weeks 4-6: Advanced Algorithms",
              duration: "24 hours",
              topics: [
                "Random Forests",
                "SVM",
                "Ensemble Methods",
                "Hyperparameter Tuning",
              ],
            },
            {
              title: "Weeks 7-9: Deep Learning",
              duration: "24 hours",
              topics: ["Neural Networks", "CNNs", "RNNs", "Transfer Learning"],
            },
            {
              title: "Weeks 10-12: Real Projects",
              duration: "24 hours",
              topics: [
                "Capstone Project",
                "Model Deployment",
                "MLOps",
                "Portfolio Building",
              ],
            },
          ]),
          testimonials: JSON.stringify([
            {
              name: "Ahmed Benali",
              role: "Data Scientist at Startup",
              text: "This course transformed my career. The practical projects helped me land my dream job!",
              rating: 5,
            },
            {
              name: "Sarah Mohamed",
              role: "ML Engineer",
              text: "Naceur explains complex concepts with clarity. Best investment in my education!",
              rating: 5,
            },
          ]),
          tags: ["Machine Learning", "AI", "Data Science", "Python", "MLOps"],
          meta_description:
            "Master Machine Learning in 12 weeks with hands-on projects. Learn from industry expert Naceur Keraani.",
          meta_keywords: "machine learning, ai, data science, python, bootcamp",
        },
        // Add more formations following the same structure...
      ];

      for (const formation of formations) {
        await query(
          `
      INSERT INTO formations (
        title, description, short_description, full_description, category,
        level, price, original_price, installment_price, currency,
        duration_hours, weeks_duration, hours_per_week, max_participants,
        current_participants, start_date, end_date, schedule, format,
        location, live_sessions, spots_left, instructor_name, instructor_title,
        instructor_bio, instructor_photo, instructor_rating, instructor_reviews,
        instructor_students, instructor_verified, rating, reviews_count,
        views_count, status, featured, cover_image, prerequisites,
        learning_objectives, features, highlights, modules, testimonials,
        tags, meta_description, meta_keywords
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26,
        $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
        $39, $40, $41, $42, $43, $44, $45, $46, $47
      )
      ON CONFLICT (title) DO UPDATE SET
        description = EXCLUDED.description,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id
      `,
          [
            formation.title,
            formation.description,
            formation.short_description,
            formation.full_description,
            formation.category,
            formation.level,
            formation.price,
            formation.original_price,
            formation.installment_price,
            formation.currency,
            formation.duration_hours,
            formation.weeks_duration,
            formation.hours_per_week,
            formation.max_participants,
            formation.current_participants,
            formation.start_date,
            formation.end_date,
            formation.schedule,
            formation.format,
            formation.location,
            formation.live_sessions,
            formation.spots_left,
            formation.instructor_name,
            formation.instructor_title,
            formation.instructor_bio,
            formation.instructor_photo,
            formation.instructor_rating,
            formation.instructor_reviews,
            formation.instructor_students,
            formation.instructor_verified,
            formation.rating,
            formation.reviews_count,
            formation.views_count,
            formation.status,
            formation.featured,
            formation.cover_image,
            formation.prerequisites,
            formation.learning_objectives,
            formation.features,
            formation.highlights,
            formation.modules,
            formation.testimonials,
            formation.tags,
            formation.meta_description,
            formation.meta_keywords,
          ]
        );
      }

      console.log(`✅ Seeded ${formations.length} formations`);
    };
    // In your seed-database.js, update the formations seeding section:

    console.log("🎓 Seeding formations...");
    const formations = [
      {
        title: "Machine Learning Mastery Bootcamp",
        description:
          "Comprehensive hands-on training in machine learning algorithms, from fundamentals to advanced techniques. Transform your career with real-world projects.",
        short_description: "Master ML from fundamentals to advanced",
        category: "Machine Learning",
        level: "advanced",
        price: 899.0,
        duration_hours: 96,
        max_participants: 15,
        current_participants: 10,
        start_date: "2025-03-15",
        end_date: "2025-05-10",
        schedule: "Mon, Wed, Fri - 6:00 PM - 9:00 PM",
        instructor_name: "Naceur Keraani",
        instructor_bio: "8+ years experience in ML, former lead at Google AI",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",

        // New fields (only if they exist in the table)
        original_price: 1199.0,
        installment_price: 299.0,
        weeks_duration: "12 weeks",
        hours_per_week: "8 hours",
        format: "Online + Live Sessions",
        location: "Online",
        live_sessions: "Weekly",
        instructor_title: "Senior ML Engineer",
        instructor_rating: 4.9,
        instructor_reviews: 124,
        instructor_students: 2500,
        instructor_verified: true,
        rating: 4.8,
        reviews_count: 124,
        views_count: 1500,
        tags: ["Machine Learning", "AI", "Data Science", "Python", "MLOps"],
      },
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
        current_participants: 5,
        start_date: "2025-11-15",
        end_date: "2025-12-15",
        schedule: "Lundi/Mercredi 18h-20h",
        instructor_name: "Naceur Keraani",
        status: "published",
        featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        original_price: 399.0,
        weeks_duration: "8 weeks",
        format: "Online",
        location: "Online",
        instructor_title: "Full Stack Developer",
        instructor_rating: 4.7,
        instructor_reviews: 89,
        instructor_students: 1200,
        rating: 4.5,
        tags: ["React", "JavaScript", "Web Development", "Frontend"],
      },
    ];

    for (const formation of formations) {
      // Build the query dynamically based on available fields
      const fields = [];
      const values = [];
      const placeholders = [];
      let paramCount = 1;

      Object.entries(formation).forEach(([key, value]) => {
        fields.push(key);
        values.push(value);
        placeholders.push(`$${paramCount}`);
        paramCount++;
      });

      const text = `
    INSERT INTO formations (${fields.join(", ")})
    VALUES (${placeholders.join(", ")})
    ON CONFLICT (title) DO UPDATE SET
      description = EXCLUDED.description,
      updated_at = CURRENT_TIMESTAMP
    RETURNING id
  `;

      try {
        await query(text, values);
        console.log(`✅ Added formation: ${formation.title}`);
      } catch (error) {
        console.error(
          `❌ Error adding formation ${formation.title}:`,
          error.message
        );
        // If there's a column error, try without the problematic columns
        if (error.message.includes("column")) {
          console.log(`   Trying simplified insert...`);
          const simpleFormation = {
            title: formation.title,
            description: formation.description,
            short_description: formation.short_description,
            category: formation.category,
            level: formation.level,
            price: formation.price,
            duration_hours: formation.duration_hours,
            max_participants: formation.max_participants,
            current_participants: formation.current_participants,
            start_date: formation.start_date,
            end_date: formation.end_date,
            schedule: formation.schedule,
            instructor_name: formation.instructor_name,
            status: formation.status || "published",
            featured: formation.featured || false,
            cover_image: formation.cover_image,
          };

          await query(
            `
        INSERT INTO formations (
          title, description, short_description, category, level, price,
          duration_hours, max_participants, current_participants, start_date, 
          end_date, schedule, instructor_name, status, featured, cover_image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (title) DO UPDATE SET
          description = EXCLUDED.description,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id
      `,
            Object.values(simpleFormation)
          );
          console.log(`✅ Added simplified formation: ${formation.title}`);
        }
      }
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
