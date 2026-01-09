// scripts/seed-courses-fixed.js
const { query } = require("../config/database");

const seedCourses = async () => {
  try {
    console.log("📚 Seeding courses (books)...\n");

    const books = [
      {
        title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        author: "Aurélien Géron",
        description: "Through a series of recent breakthroughs, deep learning has boosted the entire field of machine learning. Now, even programmers who know close to nothing about this technology can use simple, efficient tools to implement programs capable of learning from data.",
        short_description: "Practical ML with Scikit-Learn & TensorFlow",
        cover_image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
        category: "Machine Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1492032646",
        price: 59.99,
        original_price: 79.99,
        currency: "USD",
        rating: 4.7,
        reviews: 2834,
        reviews_count: 2834,
        isbn: "978-1492032649",
        publisher: "O'Reilly Media",
        publication_year: 2022,
        pages: 850,
        language: "English",
        featured: true,
        personal_insight: "This book transformed how I approach practical ML problems. The hands-on examples are invaluable for real-world applications.",
        clicks_count: 0,
        time_to_read: "3-4 weeks",
        year: 2022,
        why_recommend: ["Career", "Practical", "Foundation"],
        bestseller: true,
        tags: ["Python", "Machine Learning", "Scikit-Learn", "TensorFlow", "Keras"]
      },
      {
        title: "Deep Learning with Python",
        author: "François Chollet",
        description: "Written by Keras creator and Google AI researcher François Chollet, this book builds your understanding through intuitive explanations and practical examples. You'll explore challenging concepts and practice with applications in computer vision, natural-language processing, and generative models.",
        short_description: "Deep learning with Python and Keras",
        cover_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
        category: "Deep Learning",
        level: "Intermediate",
        amazon_link: "https://amazon.com/dp/1617294438",
        price: 49.99,
        original_price: 59.99,
        currency: "USD",
        rating: 4.8,
        reviews: 1923,
        reviews_count: 1923,
        isbn: "978-1617294433",
        publisher: "Manning Publications",
        publication_year: 2021,
        pages: 384,
        language: "English",
        featured: true,
        personal_insight: "Perfect for understanding deep learning concepts from the ground up. The Keras examples are particularly helpful.",
        clicks_count: 0,
        time_to_read: "2-3 weeks",
        year: 2021,
        why_recommend: ["Foundation", "Practical", "Reference"],
        bestseller: false,
        tags: ["Python", "Keras", "Neural Networks", "Deep Learning"]
      },
      {
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        description: "Get complete instructions for manipulating, processing, cleaning, and crunching datasets in Python. Updated for Python 3.10 and pandas 1.4, this handbook is packed with practical case studies that show you how to solve a broad set of data analysis problems effectively.",
        short_description: "Data analysis with Python Pandas",
        cover_image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        category: "Data Science",
        level: "Beginner",
        amazon_link: "https://amazon.com/dp/109810403X",
        price: 44.99,
        original_price: 54.99,
        currency: "USD",
        rating: 4.6,
        reviews: 3421,
        reviews_count: 3421,
        isbn: "978-1098104030",
        publisher: "O'Reilly Media",
        publication_year: 2022,
        pages: 544,
        language: "English",
        featured: false,
        personal_insight: "The definitive guide to data analysis in Python. Wes McKinney's expertise shines through every chapter.",
        clicks_count: 0,
        time_to_read: "2 weeks",
        year: 2022,
        why_recommend: ["Career", "Practical", "Essential"],
        bestseller: true,
        tags: ["Python", "Pandas", "Data Analysis", "NumPy"]
      },
      {
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        description: "The dramatic growth in practical applications for machine learning over the last ten years has been accompanied by many important developments in the underlying algorithms and techniques. This completely new textbook reflects these recent developments while providing a comprehensive introduction to the fields of pattern recognition and machine learning.",
        short_description: "Advanced ML with mathematical foundations",
        cover_image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        category: "Machine Learning",
        level: "Advanced",
        amazon_link: "https://amazon.com/dp/0387310738",
        price: 79.99,
        original_price: 89.99,
        currency: "USD",
        rating: 4.5,
        reviews: 1456,
        reviews_count: 1456,
        isbn: "978-0387310732",
        publisher: "Springer",
        publication_year: 2006,
        pages: 738,
        language: "English",
        featured: false,
        personal_insight: "Essential for understanding the mathematical underpinnings of machine learning algorithms.",
        clicks_count: 0,
        time_to_read: "4-6 weeks",
        year: 2006,
        why_recommend: ["Research", "Theoretical", "Reference"],
        bestseller: false,
        tags: ["Mathematics", "Pattern Recognition", "Bayesian", "ML Theory"]
      },
      {
        title: "Introduction to Statistical Learning",
        author: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani",
        description: "An accessible overview of the field of statistical learning, an essential toolset for making sense of the vast and complex data sets that have emerged in fields ranging from biology to finance to marketing to astrophysics in the past twenty years.",
        short_description: "Statistical learning made accessible",
        cover_image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
        category: "Statistics",
        level: "Beginner",
        amazon_link: "https://amazon.com/dp/1071614177",
        price: 89.99,
        original_price: 99.99,
        currency: "USD",
        rating: 4.8,
        reviews: 892,
        reviews_count: 892,
        isbn: "978-1071614174",
        publisher: "Springer",
        publication_year: 2021,
        pages: 607,
        language: "English",
        featured: true,
        personal_insight: "The perfect bridge between statistics and machine learning. Clear explanations with R code examples.",
        clicks_count: 0,
        time_to_read: "3 weeks",
        year: 2021,
        why_recommend: ["Foundation", "Academic", "Comprehensive"],
        bestseller: true,
        tags: ["Statistics", "R", "Machine Learning", "Data Science"]
      }
    ];

    let seededCount = 0;
    let skippedCount = 0;

    for (const book of books) {
      try {
        // Check if book already exists
        const existingBook = await query(
          "SELECT id FROM courses WHERE title = $1 OR isbn = $2",
          [book.title, book.isbn]
        );

        if (existingBook.rows.length > 0) {
          console.log(`⚠️  Skipping (already exists): ${book.title}`);
          skippedCount++;
          continue;
        }

        // Insert without the priority column
        const result = await query(
          `
          INSERT INTO courses (
            title, author, description, short_description, cover_image,
            category, level, amazon_link, price, original_price, currency,
            rating, reviews, reviews_count, isbn, publisher, publication_year, pages,
            language, featured, personal_insight, clicks_count, time_to_read,
            year, why_recommend, bestseller, tags
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
            $22, $23, $24, $25, $26, $27
          )
          RETURNING id, title
          `,
          [
            book.title, book.author, book.description, book.short_description,
            book.cover_image, book.category, book.level, book.amazon_link,
            book.price, book.original_price, book.currency, book.rating,
            book.reviews, book.reviews_count, book.isbn, book.publisher, 
            book.publication_year, book.pages, book.language, book.featured, 
            book.personal_insight, book.clicks_count, book.time_to_read, 
            book.year, book.why_recommend, book.bestseller, book.tags
          ]
        );
        
        console.log(`✓ Seeded: ${result.rows[0].title}`);
        seededCount++;
        
      } catch (error) {
        console.error(`✗ Error seeding book "${book.title}":`, error.message);
        skippedCount++;
      }
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`   Seeded: ${seededCount} books`);
    console.log(`   Skipped: ${skippedCount} books`);

    // Show statistics
    const stats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE featured = true) as featured,
        COUNT(*) FILTER (WHERE bestseller = true) as bestsellers,
        COUNT(DISTINCT category) as categories,
        ROUND(AVG(rating), 2) as avg_rating
      FROM courses
    `);

    console.log(`\n📊 Current database stats:`);
    console.log(`   Total books: ${stats.rows[0].total}`);
    console.log(`   Featured: ${stats.rows[0].featured}`);
    console.log(`   Bestsellers: ${stats.rows[0].bestsellers}`);
    console.log(`   Categories: ${stats.rows[0].categories}`);
    console.log(`   Average rating: ${stats.rows[0].avg_rating}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

// Run seeding
seedCourses();