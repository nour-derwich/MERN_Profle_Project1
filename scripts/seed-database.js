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

    // 2. Seed Projects
    console.log("📁 Seeding projects...");
    const projects = [
      {
        title: "E-commerce Platform",
        description:
          "Full-stack e-commerce application with payment integration",
        short_description: "Modern e-commerce solution",
        category: "Web Development",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        enverment: "Production",
        vido: "",
      },
      {
        title: "Task Management App",
        description: "Collaborative task management tool for teams",
        short_description: "Team collaboration tool",
        category: "Productivity",
        technologies: ["Vue.js", "Express", "PostgreSQL"],
        enverment: "Production",
        vido: "",
      },
    ];

    for (const project of projects) {
      await query(
        `
        INSERT INTO projects (title, description, short_description, category, technologies, status, enverment, video)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
      `,
        [
          project.title,
          project.description,
          project.short_description,
          project.category,
          project.technologies,
          "published",
          project.enverment,
          project.vido,
        ]
      );
    }
    console.log(`✅ Seeded ${projects.length} projects\n`);

    // 3. Seed Formations
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
      },
      {
        title: "Node.js & API Development",
        description:
          "Maîtrisez le développement backend avec Node.js et Express",
        short_description: "Backend avec Node.js",
        category: "Backend",
        level: "intermediate",
        price: 349.0,
        duration_hours: 35,
        max_participants: 15,
        start_date: "2025-11-20",
        end_date: "2025-12-20",
        schedule: "Mardi/Jeudi 19h-21h",
        instructor_name: "Naceur Keraani",
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
          "published",
        ]
      );
    }
    console.log(`✅ Seeded ${formations.length} formations\n`);

    // 4. Seed Courses (Books)
    console.log("📚 Seeding courses...");
    const courses = [
      {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        description:
          "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
        short_description: "Learn to write clean, maintainable code",
        category: "Programming",
        level: "intermediate",
        price: 39.99,
        amazon_link:
          "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
        rating: 4.7,
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        description:
          "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad.",
        short_description: "Essential JavaScript knowledge",
        category: "JavaScript",
        level: "beginner",
        price: 29.99,
        amazon_link:
          "https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742",
        rating: 4.5,
      },
    ];

    for (const course of courses) {
      await query(
        `
        INSERT INTO courses (
          title, author, description, short_description, category,
          level, price, amazon_link, rating
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
        [
          course.title,
          course.author,
          course.description,
          course.short_description,
          course.category,
          course.level,
          course.price,
          course.amazon_link,
          course.rating,
        ]
      );
    }
    console.log(`✅ Seeded ${courses.length} courses\n`);

    console.log("🎉 Database seeding completed!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
