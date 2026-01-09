const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  getFeaturedCourses,
  getCategories,
  getLevels,
  getRecommendations,
  searchCourses,
  getCoursesByCategory,
  trackClick,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleFeatured,
  getCourseStats,
  bulkCreateCourses,
} = require("../controllers/course.controller");

const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getAllCourses);
router.get("/featured", getFeaturedCourses);
router.get("/categories", getCategories);
router.get("/levels", getLevels);
router.get("/recommendations", getRecommendations);
router.get("/search", searchCourses);
router.get("/category/:category", getCoursesByCategory);
router.get("/stats", getCourseStats);
router.get("/:id", getCourseById);
router.post("/:id/click", trackClick);

// Protected admin routes
router.use(protect);
router.use(authorize("admin"));

router.post("/", createCourse);
router.post("/bulk", bulkCreateCourses);
router.put("/:id", updateCourse);
router.put("/:id/toggle-featured", toggleFeatured);
router.delete("/:id", deleteCourse);

module.exports = router;
