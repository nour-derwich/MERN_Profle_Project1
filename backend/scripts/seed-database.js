// scripts/seed-database.js
const { query } = require("../config/database");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    // 1. Update Admin User (since already created in schema)
    console.log("👤 Updating admin user...");
    const passwordHash = await bcrypt.hash("naceur159@", 10);

    await query(
      `
      UPDATE users 
      SET password_hash = $1, 
          full_name = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE username = 'admin'
      RETURNING id, email, full_name
      `,
      [passwordHash, "Naceur Keraani"],
    );

    console.log("✅ Admin user updated");
    console.log("   📧 Email: naceur.vps@keraani.com");
    console.log("   🔑 Password: naceur159@\n");

    // 2. Seed Projects
    console.log("📁 Seeding projects...");
    const projects = [
      {
        title: "AI-Powered Trading Platform",
        slug: "ai-trading-platform",
        description:
          "Machine learning system for algorithmic trading with real-time market analytics and automated execution strategies.",
        short_description:
          "ML-based quantitative trading platform with real-time analytics",
        full_description:
          "A comprehensive algorithmic trading platform leveraging machine learning for market prediction and automated trade execution. Features include real-time data processing, risk management, and portfolio optimization.",
        category: "AI & Finance",
        technologies: [
          "Python",
          "PyTorch",
          "FastAPI",
          "PostgreSQL",
          "Redis",
          "Docker",
          "AWS",
        ],
        complexity: "Advanced",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
        demo_url: "https://trading-demo.example.com",
        github_url: "https://github.com/naceurkeraani/trading-ai",
        environment: "Production",
        development_time: "6 months",
        team_size: "3 developers",
        goals: [
          "Develop profitable trading algorithms",
          "Implement real-time market analysis",
          "Create automated risk management system",
          "Build scalable cloud infrastructure",
        ],
        features: [
          "Real-time market data processing",
          "ML-based price prediction",
          "Automated trade execution",
          "Risk management & portfolio optimization",
          "Backtesting framework",
          "Live trading dashboard",
        ],
        results: [
          "28.5% ROI in live testing period",
          "45% reduction in risk exposure",
          "Processing 10K+ trades per second",
          "99.9% uptime in production",
        ],
        metrics: JSON.stringify({
          roi: "28.5%",
          uptime: "99.9%",
          trades_per_second: 10000,
          accuracy: "76%",
        }),
        tags: ["AI", "Trading", "Finance", "Machine Learning", "Python"],
        live_demo_available: true,
        source_code_available: true,
        open_source: false,
        views_count: 2450,
        stars: 156,
        display_order: 1,
      },
      {
        title: "Healthcare Diagnosis Assistant",
        slug: "healthcare-diagnosis-ai",
        description:
          "Deep learning system for medical image analysis and disease diagnosis with 94% accuracy on chest X-rays.",
        short_description: "AI-powered medical diagnosis from X-ray images",
        category: "Healthcare AI",
        technologies: [
          "Python",
          "TensorFlow",
          "Keras",
          "OpenCV",
          "Flask",
          "MongoDB",
        ],
        complexity: "Expert",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
        github_url: "https://github.com/naceurkeraani/healthcare-ai",
        environment: "Research/Testing",
        development_time: "8 months",
        dataset_size: "50,000 X-ray images",
        goals: [
          "Assist radiologists with preliminary diagnosis",
          "Reduce diagnosis time by 50%",
          "Achieve 90%+ accuracy on common conditions",
        ],
        features: [
          "Automated X-ray analysis",
          "Multi-disease detection",
          "Confidence scoring",
          "DICOM image support",
          "Report generation",
        ],
        results: [
          "94% accuracy on test dataset",
          "60% faster diagnosis time",
          "Validated by 15 medical professionals",
          "Processed 10,000+ clinical images",
        ],
        metrics: JSON.stringify({
          accuracy: "94%",
          precision: "92%",
          recall: "91%",
          f1_score: "91.5%",
        }),
        tags: ["Healthcare", "Deep Learning", "Computer Vision", "Medical AI"],
        source_code_available: true,
        documentation_available: true,
        open_source: false,
        views_count: 1890,
        stars: 203,
        display_order: 2,
      },
      {
        title: "E-Commerce Recommendation Engine",
        slug: "ecommerce-recommender",
        description:
          "Personalized product recommendation system using collaborative filtering and deep learning.",
        short_description: "ML-powered personalized shopping recommendations",
        category: "E-Commerce AI",
        technologies: [
          "Python",
          "Scikit-learn",
          "PyTorch",
          "FastAPI",
          "Redis",
          "PostgreSQL",
        ],
        complexity: "Intermediate",
        status: "published",
        featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
        demo_url: "https://recommender-demo.example.com",
        github_url: "https://github.com/naceurkeraani/ecommerce-ai",
        environment: "Production",
        development_time: "4 months",
        team_size: "2 developers",
        goals: [
          "Increase conversion rate by 20%",
          "Provide real-time personalized recommendations",
          "Handle 1M+ users",
        ],
        features: [
          "Collaborative filtering",
          "Content-based recommendations",
          "Real-time personalization",
          "A/B testing framework",
          "Analytics dashboard",
        ],
        results: [
          "32% increase in conversion rate",
          "15% increase in average order value",
          "Sub-100ms recommendation latency",
          "Serving 2M+ requests daily",
        ],
        tags: ["Machine Learning", "Recommender Systems", "E-Commerce"],
        live_demo_available: true,
        source_code_available: true,
        open_source: true,
        views_count: 1560,
        stars: 89,
        display_order: 3,
      },
      {
        title: "Natural Language Processing Chatbot",
        slug: "nlp-customer-support",
        description:
          "Intelligent customer support chatbot using transformer models for natural conversations.",
        short_description: "AI chatbot for automated customer support",
        category: "NLP & Chatbots",
        technologies: [
          "Python",
          "Transformers",
          "BERT",
          "FastAPI",
          "Docker",
          "Kubernetes",
        ],
        complexity: "Advanced",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
        demo_url: "https://chatbot-demo.example.com",
        environment: "Production",
        development_time: "5 months",
        goals: [
          "Handle 80% of customer inquiries automatically",
          "Reduce support costs by 50%",
          "Maintain 90% customer satisfaction",
        ],
        features: [
          "Natural language understanding",
          "Multi-language support",
          "Context-aware responses",
          "Sentiment analysis",
          "Seamless human handoff",
        ],
        results: [
          "85% automation rate",
          "55% cost reduction",
          "92% customer satisfaction",
          "24/7 availability",
        ],
        tags: ["NLP", "Chatbot", "Customer Support", "Transformers"],
        live_demo_available: true,
        documentation_available: true,
        views_count: 2100,
        stars: 134,
        display_order: 4,
      },
      {
        title: "Real-Time Fraud Detection System",
        slug: "fraud-detection-ml",
        description:
          "Machine learning system for detecting fraudulent transactions in real-time with ensemble methods.",
        short_description:
          "Real-time ML fraud detection for financial transactions",
        category: "FinTech Security",
        technologies: [
          "Python",
          "XGBoost",
          "Kafka",
          "Spark",
          "Cassandra",
          "Docker",
        ],
        complexity: "Expert",
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
        environment: "Production",
        development_time: "7 months",
        team_size: "4 developers",
        goals: [
          "Detect fraud in real-time (<100ms)",
          "Reduce false positives by 40%",
          "Process millions of transactions daily",
        ],
        features: [
          "Real-time transaction scoring",
          "Ensemble ML models",
          "Anomaly detection",
          "Risk profiling",
          "Alert system",
          "Fraud pattern analysis",
        ],
        results: [
          "97% fraud detection accuracy",
          "45% reduction in false positives",
          "Processing 5M+ transactions daily",
          "Saved $2M+ in prevented fraud",
        ],
        metrics: JSON.stringify({
          accuracy: "97%",
          latency_ms: 85,
          daily_transactions: 5000000,
          fraud_prevented: "$2M+",
        }),
        tags: ["Fraud Detection", "Machine Learning", "FinTech", "Security"],
        documentation_available: true,
        api_available: true,
        views_count: 1780,
        stars: 167,
        display_order: 5,
      },
    ];

    for (const project of projects) {
      try {
        const result = await query(
          `
          INSERT INTO projects (
            title, slug, description, short_description, full_description,
            category, technologies, complexity, status, featured,
            cover_image, demo_url, github_url, environment,
            development_time, team_size, dataset_size, goals, features,
            results, metrics, tags, live_demo_available, source_code_available,
            documentation_available, api_available, open_source,
            views_count, stars, display_order, architecture
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
            $31
          )
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            updated_at = CURRENT_TIMESTAMP
          RETURNING id, title
          `,
          [
            project.title,
            project.slug,
            project.description,
            project.short_description,
            project.full_description,
            project.category,
            project.technologies,
            project.complexity,
            project.status,
            project.featured,
            project.cover_image,
            project.demo_url,
            project.github_url,
            project.environment,
            project.development_time,
            project.team_size,
            project.dataset_size,
            project.goals,
            project.features,
            project.results,
            project.metrics,
            project.tags,
            project.live_demo_available,
            project.source_code_available,
            project.documentation_available,
            project.api_available,
            project.open_source,
            project.views_count,
            project.stars,
            project.display_order,
            "Microservices Architecture", // Default architecture
          ],
        );
        console.log(`✓ Added project: ${result.rows[0].title}`);
      } catch (error) {
        console.error(
          `✗ Error adding project ${project.title}:`,
          error.message,
        );
      }
    }
    console.log(`✅ Seeded ${projects.length} projects\n`);

    // 3. Seed Courses (Books)
    console.log("📚 Seeding AI/ML books...");
    const books = [
      {
        title:
          "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        author: "Aurélien Géron",
        description:
          "Through a series of recent breakthroughs, deep learning has boosted the entire field of machine learning. Now, even programmers who know close to nothing about this technology can use simple, efficient tools to implement programs capable of learning from data.",
        short_description: "Practical ML with Scikit-Learn & TensorFlow",
        cover_image:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
        category: "Machine Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1492032646",
        price: 59.99,
        original_price: 79.99,
        currency: "USD",
        rating: 4.7,
        reviews_count: 2834,
        personal_insight:
          "This book transformed how I approach practical ML problems. The hands-on examples are invaluable for real-world applications.",
        time_to_read: "3-4 weeks",
        year: 2022,
        pages: 850,
        publisher: "O'Reilly Media",
        language: "English",
        why_recommend: ["Career", "Practical", "Foundation"],
        bestseller: true,
        featured: true,
        tags: [
          "Python",
          "Machine Learning",
          "Scikit-Learn",
          "TensorFlow",
          "Keras",
        ],
      },
      {
        title: "Deep Learning with Python",
        author: "François Chollet",
        description:
          "Written by Keras creator and Google AI researcher François Chollet, this book builds your understanding through intuitive explanations and practical examples. You'll explore challenging concepts and practice with applications in computer vision, natural-language processing, and generative models.",
        short_description: "Deep learning with Python and Keras",
        cover_image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
        category: "Deep Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1617294438",
        price: 49.99,
        original_price: 59.99,
        rating: 4.8,
        reviews_count: 1923,
        personal_insight:
          "Perfect for understanding deep learning concepts from the ground up. The Keras examples are particularly helpful.",
        time_to_read: "2-3 weeks",
        year: 2021,
        pages: 384,
        publisher: "Manning Publications",
        language: "English",
        why_recommend: ["Foundation", "Practical", "Reference"],
        bestseller: false,
        featured: true,
        tags: ["Python", "Keras", "Neural Networks", "Deep Learning"],
      },
      {
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        description:
          "Get complete instructions for manipulating, processing, cleaning, and crunching datasets in Python. Updated for Python 3.10 and pandas 1.4, this handbook is packed with practical case studies that show you how to solve a broad set of data analysis problems effectively.",
        short_description: "Data analysis with Python Pandas",
        cover_image:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        category: "Data Science",
        level: "Beginner",
        amazon_link: "https://amazon.com/dp/109810403X",
        price: 44.99,
        original_price: 54.99,
        rating: 4.6,
        reviews_count: 3421,
        personal_insight:
          "The definitive guide to data analysis in Python. Wes McKinney's expertise shines through every chapter.",
        time_to_read: "2 weeks",
        year: 2022,
        pages: 544,
        publisher: "O'Reilly Media",
        language: "English",
        why_recommend: ["Career", "Practical", "Essential"],
        bestseller: true,
        featured: false,
        tags: ["Python", "Pandas", "Data Analysis", "NumPy"],
      },
      {
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        description:
          "The dramatic growth in practical applications for machine learning over the last ten years has been accompanied by many important developments in the underlying algorithms and techniques. This completely new textbook reflects these recent developments while providing a comprehensive introduction to the fields of pattern recognition and machine learning.",
        short_description: "Advanced ML with mathematical foundations",
        cover_image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        category: "Machine Learning",
        level: "Advanced",
        amazon_link: "https://amazon.com/dp/0387310738",
        price: 79.99,
        original_price: 89.99,
        rating: 4.5,
        reviews_count: 1456,
        personal_insight:
          "Essential for understanding the mathematical underpinnings of machine learning algorithms.",
        time_to_read: "4-6 weeks",
        year: 2006,
        pages: 738,
        publisher: "Springer",
        language: "English",
        why_recommend: ["Research", "Theoretical", "Reference"],
        bestseller: false,
        featured: false,
        tags: ["Mathematics", "Pattern Recognition", "Bayesian", "ML Theory"],
      },
      {
        title: "Introduction to Statistical Learning",
        author:
          "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani",
        description:
          "An accessible overview of the field of statistical learning, an essential toolset for making sense of the vast and complex data sets that have emerged in fields ranging from biology to finance to marketing to astrophysics in the past twenty years.",
        short_description: "Statistical learning made accessible",
        cover_image:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
        category: "Statistics",
        level: "Beginner",
        amazon_link: "https://amazon.com/dp/1071614177",
        price: 89.99,
        original_price: 99.99,
        rating: 4.8,
        reviews_count: 892,
        personal_insight:
          "The perfect bridge between statistics and machine learning. Clear explanations with R code examples.",
        time_to_read: "3 weeks",
        year: 2021,
        pages: 607,
        publisher: "Springer",
        language: "English",
        why_recommend: ["Foundation", "Academic", "Comprehensive"],
        bestseller: true,
        featured: true,
        tags: ["Statistics", "R", "Machine Learning", "Data Science"],
      },
    ];

    for (const book of books) {
      try {
        // Fix: Include all required columns and match the table structure
        const result = await query(
          `
          INSERT INTO courses (
            title, author, description, short_description, cover_image,
            category, level, amazon_link, price, original_price, currency,
            rating, reviews_count, personal_insight, time_to_read, year,
            pages, publisher, language, why_recommend, bestseller,
            featured, tags, clicks_count, isbn, publication_year
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, 0, $24, $25
          )
          ON CONFLICT (title) DO UPDATE SET
            author = EXCLUDED.author,
            description = EXCLUDED.description,
            updated_at = CURRENT_TIMESTAMP
          RETURNING id, title
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
            book.currency,
            book.rating,
            book.reviews_count,
            book.personal_insight,
            book.time_to_read,
            book.year,
            book.pages,
            book.publisher,
            book.language,
            book.why_recommend,
            book.bestseller,
            book.featured,
            book.tags,
            book.isbn || "978-1492032649", // Default ISBN
            book.year, // publication_year
          ],
        );
        console.log(`✓ Added book: ${result.rows[0].title}`);
      } catch (error) {
        console.error(`✗ Error adding book ${book.title}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${books.length} books\n`);

    // 4. Seed Formations (Fixed query)
    console.log("🎓 Seeding formations...");
    const formations = [
      {
        title: "Machine Learning Mastery Bootcamp",
        description:
          "Comprehensive hands-on training in machine learning algorithms, from fundamentals to advanced techniques. Transform your career with real-world projects.",
        short_description: "Master ML from fundamentals to advanced",
        full_description:
          "A 12-week intensive bootcamp covering all aspects of machine learning. Learn to build, train, and deploy ML models with real-world datasets. Work on 5 capstone projects and receive personalized mentorship.",
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
        end_date: "2025-06-10",
        schedule: "Mon, Wed, Fri - 6:00 PM - 9:00 PM EST",
        format: "Online + Live Sessions",
        location: "Online",
        live_sessions: "36 live sessions",
        instructor_name: "Naceur Keraani",
        instructor_title: "Senior ML Engineer",
        instructor_bio:
          "8+ years experience in ML, former ML lead at tech unicorn. Specializes in production ML systems.",
        instructor_rating: 4.9,
        instructor_reviews: 124,
        instructor_students: 2500,
        instructor_verified: true,
        rating: 4.8,
        reviews_count: 124,
        views_count: 1500,
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
        prerequisites:
          "Python programming knowledge, Basic statistics and linear algebra, Passion for AI and data science",
        learning_objectives: [
          "Build ML models from scratch",
          "Deploy models to production",
          "Understand deep learning fundamentals",
          "Work with real-world datasets",
          "Master MLOps best practices",
        ],
        features: [
          "Live Interactive Sessions",
          "Career Support & Job Placement",
          "Industry-Recognized Certificate",
          "Real-World Projects",
          "Lifetime Access to Materials",
          "1-on-1 Mentorship Sessions",
        ],
        highlights: [
          "Build 10+ ML models from scratch",
          "Master Scikit-learn, PyTorch, TensorFlow",
          "Real-world datasets and capstone projects",
          "One-on-one mentorship sessions",
          "Industry-recognized certificate",
          "Job placement assistance",
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
            title: "Weeks 10-12: Production & MLOps",
            duration: "24 hours",
            topics: [
              "Model Deployment",
              "MLOps",
              "Monitoring",
              "Portfolio Building",
            ],
          },
        ]),
        testimonials: JSON.stringify([
          {
            name: "Ahmed Benali",
            role: "Data Scientist at TechCorp",
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
      },
      {
        title: "Deep Learning Specialization",
        description:
          "Master neural networks and deep learning with hands-on projects. Learn PyTorch, TensorFlow, and deploy AI models.",
        short_description: "Master neural networks with PyTorch & TensorFlow",
        full_description:
          "10-week intensive program covering neural networks, CNNs, RNNs, and Transformers. Build computer vision and NLP applications.",
        category: "Deep Learning",
        level: "intermediate",
        price: 749.0,
        original_price: 999.0,
        installment_price: 249.0,
        currency: "USD",
        duration_hours: 80,
        weeks_duration: "10 weeks",
        hours_per_week: "8 hours",
        max_participants: 20,
        current_participants: 8,
        start_date: "2025-04-01",
        end_date: "2025-06-15",
        schedule: "Tue, Thu - 7:00 PM - 10:00 PM EST",
        format: "Online",
        location: "Online",
        live_sessions: "20 live sessions",
        instructor_name: "Naceur Keraani",
        instructor_title: "Deep Learning Specialist",
        instructor_bio:
          "PhD in Computer Vision, 6+ years in deep learning research and applications",
        instructor_rating: 4.8,
        instructor_reviews: 89,
        instructor_students: 1800,
        instructor_verified: true,
        rating: 4.7,
        reviews_count: 89,
        status: "published",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
        prerequisites:
          "Python knowledge, Basic ML understanding, Linear algebra basics",
        learning_objectives: [
          "Master neural networks architecture",
          "Build computer vision models",
          "Implement NLP solutions",
          "Deploy deep learning models",
        ],
        features: [
          "Live Sessions",
          "Hands-on Projects",
          "Certificate",
          "Code Reviews",
          "Community Access",
        ],
        tags: [
          "Deep Learning",
          "Neural Networks",
          "PyTorch",
          "Computer Vision",
          "NLP",
        ],
      },
      {
        title: "Data Science Fundamentals",
        description:
          "Start your data science journey with Python, statistics, and visualization. Perfect for beginners.",
        short_description: "Complete data science foundation",
        category: "Data Science",
        level: "beginner",
        price: 599.0,
        original_price: 799.0,
        currency: "USD",
        duration_hours: 64,
        weeks_duration: "8 weeks",
        max_participants: 25,
        current_participants: 7,
        start_date: "2025-05-01",
        end_date: "2025-06-30",
        schedule: "Mon, Wed - 6:00 PM - 8:00 PM EST",
        format: "Online",
        instructor_name: "Naceur Keraani",
        instructor_title: "Data Science Lead",
        status: "published",
        featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        tags: ["Data Science", "Python", "Statistics", "Pandas"],
      },
    ];

    for (const formation of formations) {
      try {
        // Fixed: Explicitly list all required fields for formations table
        const result = await query(
          `
          INSERT INTO formations (
            title, description, short_description, full_description,
            category, level, price, original_price, installment_price, currency,
            duration_hours, weeks_duration, hours_per_week, max_participants, current_participants,
            start_date, end_date, schedule, format, location, live_sessions,
            instructor_name, instructor_title, instructor_bio, instructor_rating,
            instructor_reviews, instructor_students, instructor_verified,
            rating, reviews_count, views_count, status, featured, cover_image,
            prerequisites, learning_objectives, features, highlights, modules,
            testimonials, tags, program
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
            $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
            $41, $42
          )
          ON CONFLICT (title) DO UPDATE SET
            description = EXCLUDED.description,
            updated_at = CURRENT_TIMESTAMP
          RETURNING id, title
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
            formation.instructor_name,
            formation.instructor_title,
            formation.instructor_bio || "",
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
            formation.prerequisites || "",
            formation.learning_objectives || "{}",
            formation.features || "{}",
            formation.highlights || "{}",
            formation.modules || "{}",
            formation.testimonials || "{}",
            formation.tags || "{}",
            "{}", // program JSONB
          ],
        );
        console.log(`✓ Added formation: ${result.rows[0].title}`);
      } catch (error) {
        console.error(
          `✗ Error adding formation ${formation.title}:`,
          error.message,
        );
      }
    }
    console.log(`✅ Seeded ${formations.length} formations\n`);

    // Display final statistics
    console.log("📊 Final Statistics:");

    const projectStats = await query("SELECT COUNT(*) as total FROM projects");
    console.log(`   Projects: ${projectStats.rows[0].total}`);

    const courseStats = await query("SELECT COUNT(*) as total FROM courses");
    console.log(`   Books: ${courseStats.rows[0].total}`);

    const formationStats = await query(
      "SELECT COUNT(*) as total FROM formations",
    );
    console.log(`   Formations: ${formationStats.rows[0].total}`);

    const userStats = await query("SELECT COUNT(*) as total FROM users");
    console.log(`   Users: ${userStats.rows[0].total}`);

    console.log("\n✅ Database seeding completed successfully!");
    console.log("💡 You can now start your application with 'npm run dev'\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
