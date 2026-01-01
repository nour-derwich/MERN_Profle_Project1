const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");
const { upload } = require("../utils/uploadImage");

// Validation middleware
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
    .isArray()
    .withMessage("Technologies must be an array"),
  body("demo_url")
    .optional()
    .isURL()
    .withMessage("Demo URL must be a valid URL"),
  body("github_url")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
];

// ===== PUBLIC ROUTES =====

// Health check - MUST come before parameterized routes
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

// @route   GET /api/projects/search
// @desc    Search projects
// @access  Public
router.get("/search", projectController.searchProjects);

// ===== PARAMETERIZED ROUTES =====
// These should come AFTER all specific routes

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get("/:id", projectController.getProjectById);

// @route   POST /api/projects/:id/view
// @desc    Increment project view count
// @access  Public
router.post("/:id/view", projectController.incrementViews);

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

module.exports = router;
