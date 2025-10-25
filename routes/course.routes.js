const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");

// Validation middleware
const courseValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("level")
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Invalid level"),
  body("amazon_link")
    .optional()
    .isURL()
    .withMessage("Amazon link must be a valid URL"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
];

// Public routes
// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get("/", courseController.getAllCourses);

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get("/featured", courseController.getFeaturedCourses);

// @route   GET /api/courses/categories
// @desc    Get all course categories
// @access  Public
router.get("/categories", courseController.getCategories);

// @route   GET /api/courses/search
// @desc    Search courses
// @access  Public
router.get("/search", courseController.searchCourses);

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get("/:id", courseController.getCourseById);

// @route   POST /api/courses/:id/click
// @desc    Track Amazon link click
// @access  Public
router.post("/:id/click", courseController.trackClick);

// Protected routes (Admin only)
// @route   POST /api/courses
// @desc    Create new course
// @access  Private/Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  courseValidation,
  courseController.createCourse
);

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private/Admin
router.put("/:id", protect, authorize("admin"), courseController.updateCourse);

// @route   PATCH /api/courses/:id/featured
// @desc    Toggle course featured status
// @access  Private/Admin
router.patch(
  "/:id/featured",
  protect,
  authorize("admin"),
  courseController.toggleFeatured
);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  courseController.deleteCourse
);

// @route   GET /api/courses/admin/stats
// @desc    Get course statistics
// @access  Private/Admin
router.get(
  "/admin/stats",
  protect,
  authorize("admin"),
  courseController.getCourseStats
);

module.exports = router;
