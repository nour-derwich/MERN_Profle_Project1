const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");
const { upload } = require("../utils/uploadImage");

// Validation middleware - UPDATED FOR NEW FIELDS
const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("short_description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Short description must not exceed 500 characters"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("technologies")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Technologies must be an array");
      }
      return true;
    }),
  body("demo_url")
    .optional()
    .isURL()
    .withMessage("Demo URL must be a valid URL"),
  body("github_url")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("complexity")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced", "Expert"])
    .withMessage(
      "Complexity must be one of: Beginner, Intermediate, Advanced, Expert"
    ),
  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Status must be one of: draft, published, archived"),
];

// ===== PUBLIC ROUTES =====

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Projects API is working",
    timestamp: new Date().toISOString(),
  });
});

// @route   GET /api/projects
// @desc    Get all published projects
// @access  Public
router.get("/", projectController.getAllProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get("/featured", projectController.getFeaturedProjects);

// @route   GET /api/projects/categories
// @desc    Get all project categories
// @access  Public
router.get("/categories", projectController.getCategories);

// @route   GET /api/projects/complexities
// @desc    Get all complexity levels
// @access  Public
router.get("/complexities", projectController.getComplexities);

// @route   GET /api/projects/technologies
// @desc    Get all technologies used
// @access  Public
router.get("/technologies", projectController.getTechnologies);

// @route   GET /api/projects/search
// @desc    Search projects
// @access  Public
router.get("/search", projectController.searchProjects);

// @route   GET /api/projects/stats
// @desc    Get project statistics
// @access  Public
router.get("/stats", projectController.getProjectStats);
router.post("/test-upload", protect, authorize("admin"), (req, res) => {
  console.log("🔍 Test upload endpoint hit");
  res.json({
    success: true,
    message: "Upload endpoint is working",
    timestamp: new Date().toISOString(),
  });
});


// ===== PARAMETERIZED ROUTES =====

// @route   GET /api/projects/:id
// @desc    Get single project by ID or slug
// @access  Public
router.get("/:id", projectController.getProjectById);

// @route   GET /api/projects/:id/related
// @desc    Get related projects
// @access  Public
router.get("/:id/related", projectController.getRelatedProjects);

// @route   POST /api/projects/:id/view
// @desc    Increment project view count
// @access  Public
router.post("/:id/view", projectController.incrementViews);

// @route   POST /api/projects/:id/star
// @desc    Increment project stars
// @access  Public
router.post("/:id/star", projectController.incrementStars);

// @route   POST /api/projects/:id/fork
// @desc    Increment project forks
// @access  Public
router.post("/:id/fork", projectController.incrementForks);

// ===== PROTECTED ROUTES (Admin only) =====

// @route   POST /api/projects
// @desc    Create new project
// @access  Private/Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  projectValidation,
  projectController.createProject
);

// @route   POST /api/projects/upload-image
// @desc    Upload project image
// @access  Private/Admin
router.post(
  "/upload-image",
  protect,
  authorize("admin"),
  upload.single("image"),
  projectController.uploadImage
);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  authorize("admin"),
  projectController.updateProject
);

// @route   PATCH /api/projects/:id/status
// @desc    Update project status
// @access  Private/Admin
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  projectController.updateStatus
);

// @route   PATCH /api/projects/:id/featured
// @desc    Toggle project featured status
// @access  Private/Admin
router.patch(
  "/:id/featured",
  protect,
  authorize("admin"),
  projectController.toggleFeatured
);

// @route   PUT /api/projects/reorder
// @desc    Reorder projects
// @access  Private/Admin
router.put(
  "/reorder",
  protect,
  authorize("admin"),
  projectController.reorderProjects
);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  projectController.deleteProject
);

// @route   GET /api/projects/admin/all
// @desc    Get all projects (including drafts) for admin
// @access  Private/Admin
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  projectController.getAllProjectsAdmin
);
router.post("/test-upload", protect, authorize("admin"), (req, res) => {
  console.log("🔍 Test upload endpoint hit");
  res.json({
    success: true,
    message: "Upload endpoint is working",
    timestamp: new Date().toISOString(),
  });
});


module.exports = router;
