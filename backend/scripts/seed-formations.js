const { query } = require("../config/database");

const seedFormations = async () => {
  try {
    console.log("🎓 Seeding formations...");

    // First, clear existing formations
    await query("DELETE FROM formations");
    console.log("🗑️  Cleared existing formations");

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
      {
        title: "Deep Learning Specialization",
        description:
          "Deep dive into neural networks and deep learning. Master PyTorch and TensorFlow for cutting-edge AI applications.",
        short_description: "Master neural networks with PyTorch & TensorFlow",
        full_description:
          "Advanced deep learning course focusing on neural networks, computer vision, and natural language processing.",
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
        end_date: "2025-05-15",
        schedule: "Tue, Thu - 7:00 PM - 10:00 PM",
        format: "Online + Live Sessions",
        location: "Online",
        live_sessions: "Bi-weekly",
        spots_left: 12,
        instructor_name: "Naceur Keraani",
        instructor_title: "Deep Learning Specialist",
        instructor_bio: "5+ years in deep learning research and applications",
        instructor_photo:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur2",
        instructor_rating: 4.8,
        instructor_reviews: 89,
        instructor_students: 1800,
        instructor_verified: true,
        rating: 4.7,
        reviews_count: 89,
        views_count: 1200,
        status: "enrolling",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
        prerequisites:
          "Python and NumPy knowledge, Basic ML understanding, Linear algebra basics",
        learning_objectives: [
          "Master neural networks",
          "Build computer vision models",
          "Implement NLP solutions",
          "Deploy deep learning models",
        ],
        features: [
          "Live Interactive Sessions",
          "Hands-on Projects",
          "Certificate",
          "Code Reviews",
          "Community Access",
        ],
        highlights: [
          "Master PyTorch and TensorFlow",
          "Build CNNs, RNNs, and Transformers",
          "Computer vision projects",
          "NLP applications",
          "GPU training techniques",
        ],
        modules: JSON.stringify([
          {
            title: "Weeks 1-2: Neural Network Basics",
            duration: "16 hours",
            topics: [
              "Perceptrons",
              "Backpropagation",
              "Optimization",
              "Activation Functions",
            ],
          },
          {
            title: "Weeks 3-5: CNNs for Computer Vision",
            duration: "24 hours",
            topics: [
              "Convolutions",
              "Image Classification",
              "Object Detection",
              "Transfer Learning",
            ],
          },
          {
            title: "Weeks 6-8: RNNs & NLP",
            duration: "24 hours",
            topics: ["LSTMs", "Attention", "Transformers", "BERT"],
          },
          {
            title: "Weeks 9-10: Advanced Topics",
            duration: "16 hours",
            topics: ["GANs", "Reinforcement Learning", "Model Deployment"],
          },
        ]),
        testimonials: JSON.stringify([
          {
            name: "Mohamed K.",
            role: "AI Developer",
            text: "Excellent course structure. The projects are industry-relevant and challenging.",
            rating: 5,
          },
        ]),
        tags: [
          "Deep Learning",
          "Neural Networks",
          "PyTorch",
          "Computer Vision",
          "NLP",
        ],
        meta_description:
          "Master Deep Learning with neural networks, computer vision, and NLP applications.",
        meta_keywords:
          "deep learning, neural networks, pytorch, tensorflow, ai",
      },
      {
        title: "Data Science Fundamentals",
        description:
          "Complete introduction to data science. Learn Python, statistics, and visualization to kickstart your data career.",
        short_description: "Start your data science journey",
        full_description:
          "Beginner-friendly data science course covering Python, statistics, data visualization, and real-world projects.",
        category: "Data Science",
        level: "beginner",
        price: 599.0,
        original_price: 799.0,
        installment_price: 199.0,
        currency: "USD",
        duration_hours: 64,
        weeks_duration: "8 weeks",
        hours_per_week: "8 hours",
        max_participants: 25,
        current_participants: 7,
        start_date: "2025-05-01",
        end_date: "2025-06-15",
        schedule: "Mon, Wed - 6:00 PM - 8:00 PM",
        format: "Online",
        location: "Online",
        live_sessions: "Recorded",
        spots_left: 18,
        instructor_name: "Naceur Keraani",
        instructor_title: "Data Science Lead",
        instructor_bio: "7+ years in data science and analytics",
        instructor_photo:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur3",
        instructor_rating: 4.6,
        instructor_reviews: 156,
        instructor_students: 3200,
        instructor_verified: true,
        rating: 4.6,
        reviews_count: 156,
        views_count: 2000,
        status: "upcoming",
        featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        prerequisites:
          "Basic programming knowledge, High school mathematics, Curiosity about data",
        learning_objectives: [
          "Master Python for data analysis",
          "Understand statistics",
          "Create data visualizations",
          "Work with real datasets",
        ],
        features: [
          "Self-paced Learning",
          "Certificate",
          "Practice Exercises",
          "Community Forum",
          "Career Guidance",
        ],
        highlights: [
          "Master Python for data analysis",
          "Statistical analysis and hypothesis testing",
          "Data visualization with Seaborn",
          "Real-world case studies",
          "SQL for data scientists",
        ],
        modules: JSON.stringify([
          {
            title: "Weeks 1-2: Python for Data Science",
            duration: "16 hours",
            topics: [
              "Pandas",
              "NumPy",
              "Data Cleaning",
              "Exploratory Analysis",
            ],
          },
          {
            title: "Weeks 3-4: Statistics & Probability",
            duration: "16 hours",
            topics: [
              "Descriptive Stats",
              "Inferential Stats",
              "Hypothesis Testing",
              "A/B Testing",
            ],
          },
          {
            title: "Weeks 5-6: Data Visualization",
            duration: "16 hours",
            topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Design"],
          },
          {
            title: "Weeks 7-8: Real Projects",
            duration: "16 hours",
            topics: ["Capstone Project", "Portfolio", "Interview Prep"],
          },
        ]),
        testimonials: JSON.stringify([]),
        tags: [
          "Data Science",
          "Python",
          "Statistics",
          "Visualization",
          "Pandas",
        ],
        meta_description:
          "Start your data science career with this comprehensive fundamentals course.",
        meta_keywords:
          "data science, python, statistics, data analysis, pandas",
      },
      {
        title: "AI Engineering Career Path",
        description:
          "Become a full-stack AI engineer. Master ML systems, deployment, and MLOps for production environments.",
        short_description: "Full-stack AI engineering with MLOps",
        full_description:
          "Comprehensive AI engineering program covering ML systems, deployment, MLOps, and production environments.",
        category: "AI Engineering",
        level: "expert",
        price: 1299.0,
        original_price: 1799.0,
        installment_price: 433.0,
        currency: "USD",
        duration_hours: 128,
        weeks_duration: "16 weeks",
        hours_per_week: "8 hours",
        max_participants: 10,
        current_participants: 10,
        start_date: "2024-10-01",
        end_date: "2024-12-15",
        schedule: "Flexible",
        format: "Hybrid",
        location: "Online & In-person",
        live_sessions: "Weekly",
        spots_left: 0,
        instructor_name: "Naceur Keraani",
        instructor_title: "AI Architect",
        instructor_bio: "10+ years in AI system design and architecture",
        instructor_photo:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur4",
        instructor_rating: 4.9,
        instructor_reviews: 45,
        instructor_students: 1200,
        instructor_verified: true,
        rating: 4.9,
        reviews_count: 45,
        views_count: 800,
        status: "full",
        featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
        prerequisites:
          "Advanced ML knowledge, Software engineering experience, Cloud computing basics",
        learning_objectives: [
          "Design ML systems",
          "Implement MLOps",
          "Deploy AI solutions",
          "Scale ML applications",
        ],
        features: [
          "Intensive Mentorship",
          "Industry Projects",
          "Career Placement",
          "Networking Events",
          "Lifetime Support",
        ],
        highlights: [
          "ML system design and architecture",
          "Model deployment and serving",
          "MLOps and CI/CD pipelines",
          "Cloud platforms (AWS, GCP, Azure)",
          "Scalable ML systems",
        ],
        modules: JSON.stringify([
          {
            title: "Weeks 1-4: ML System Design",
            duration: "32 hours",
            topics: [
              "Architecture Patterns",
              "Data Pipelines",
              "Feature Stores",
              "Monitoring",
            ],
          },
          {
            title: "Weeks 5-8: Deployment & Serving",
            duration: "32 hours",
            topics: [
              "Containerization",
              "Kubernetes",
              "Model Serving",
              "A/B Testing",
            ],
          },
          {
            title: "Weeks 9-12: MLOps",
            duration: "32 hours",
            topics: [
              "CI/CD for ML",
              "Experiment Tracking",
              "Model Registry",
              "Automation",
            ],
          },
          {
            title: "Weeks 13-16: Capstone",
            duration: "32 hours",
            topics: [
              "End-to-end Project",
              "Production Deployment",
              "Case Studies",
            ],
          },
        ]),
        testimonials: JSON.stringify([
          {
            name: "Rami S.",
            role: "Senior AI Engineer",
            text: "This program took my skills to the next level. The MLOps content is gold.",
            rating: 5,
          },
        ]),
        tags: [
          "AI Engineering",
          "MLOps",
          "Cloud",
          "Deployment",
          "System Design",
        ],
        meta_description:
          "Become a full-stack AI engineer with this comprehensive career path program.",
        meta_keywords:
          "ai engineering, mlops, deployment, cloud, system design",
      },
    ];

    for (const formation of formations) {
      const {
        title,
        description,
        short_description,
        full_description,
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
        current_participants,
        start_date,
        end_date,
        schedule,
        format,
        location,
        live_sessions,
        spots_left,
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
        status,
        featured,
        cover_image,
        prerequisites,
        learning_objectives,
        features,
        highlights,
        modules,
        testimonials,
        tags,
        meta_description,
        meta_keywords,
      } = formation;

      const text = `
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
        RETURNING id
      `;

      const values = [
        title,
        description,
        short_description,
        full_description,
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
        current_participants,
        start_date,
        end_date,
        schedule,
        format,
        location,
        live_sessions,
        spots_left,
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
        status,
        featured,
        cover_image,
        prerequisites,
        learning_objectives,
        features,
        highlights,
        modules,
        testimonials,
        tags,
        meta_description,
        meta_keywords,
      ];

      try {
        const result = await query(text, values);
        console.log(`✅ Added formation: ${title} (ID: ${result.rows[0].id})`);
      } catch (error) {
        console.error(`❌ Error adding formation ${title}:`, error.message);
        // Try simplified insert
        try {
          const simpleText = `
            INSERT INTO formations (
              title, description, short_description, category, level, price,
              duration_hours, max_participants, current_participants, start_date,
              end_date, schedule, instructor_name, status, featured, cover_image
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING id
          `;
          const simpleValues = [
            title,
            description,
            short_description,
            category,
            level,
            price,
            duration_hours,
            max_participants,
            current_participants,
            start_date,
            end_date,
            schedule,
            instructor_name,
            status,
            featured,
            cover_image,
          ];
          const result = await query(simpleText, simpleValues);
          console.log(
            `✅ Added simplified formation: ${title} (ID: ${result.rows[0].id})`
          );
        } catch (simpleError) {
          console.error(
            `❌ Failed to add even simplified version:`,
            simpleError.message
          );
        }
      }
    }

    console.log(`\n🎉 Successfully seeded ${formations.length} formations`);
    return true;
  } catch (error) {
    console.error("❌ Formations seeding error:", error.message);
    return false;
  }
};

// Run if called directly
if (require.main === module) {
  seedFormations().then((success) => {
    if (success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
}

module.exports = seedFormations;
