// utils/uploadImage.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test Cloudinary connection on startup
cloudinary.api
  .ping()
  .then((result) => {
    console.log("✅ Cloudinary connection successful:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      status: result.status,
    });
  })
  .catch((error) => {
    console.error("❌ Cloudinary connection failed:", error.message);
    console.error("Please check your Cloudinary credentials in .env file");
  });

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
    resource_type: "auto",
    // Use unique public_id for each upload
    public_id: (req, file) => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      return `${timestamp}-${random}`;
    },
  },
});

// Create multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (JPEG, PNG, WebP)"), false);
    }
  },
});

module.exports = { upload, cloudinary };
