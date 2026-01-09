const Course = require("../models/course.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all courses with filters
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = asyncHandler(async (req, res) => {
  const {
    category = "all",
    level = "all",
    priceRange = "all",
    sortBy = "featured",
    search = "",
    page = 1,
    limit = 9,
  } = req.query;

  // Build filters object
  const filters = {
    category: category !== "all" ? category : null,
    level: level !== "all" ? level : null,
    priceRange: priceRange !== "all" ? priceRange : null,
    sortBy,
    searchQuery: search,
  };

  // Get filtered courses
  const courses = await Course.findAll(filters);

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    count: courses.length,
    totalPages: Math.ceil(courses.length / limit),
    currentPage: parseInt(page),
    data: paginatedCourses,
  });
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Get featured courses (recommendations)
// @route   GET /api/courses/featured
// @access  Public
exports.getFeaturedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findFeatured();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Get categories
// @route   GET /api/courses/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Course.findCategories();
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @desc    Get levels
// @route   GET /api/courses/levels
// @access  Public
exports.getLevels = asyncHandler(async (req, res) => {
  const levels = await Course.getLevels();
  res.status(200).json({
    success: true,
    count: levels.length,
    data: levels,
  });
});

// @desc    Get recommendations
// @route   GET /api/courses/recommendations
// @access  Public
exports.getRecommendations = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 3;
  const courses = await Course.getRecommendations(limit);
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Search courses
// @route   GET /api/courses/search
// @access  Public
exports.searchCourses = asyncHandler(async (req, res) => {
  const { q, category, level } = req.query;

  const filters = {
    searchQuery: q,
    category: category !== "all" ? category : null,
    level: level !== "all" ? level : null,
  };

  const courses = await Course.findAll(filters);

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
exports.getCoursesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const courses = await Course.getByCategory(category);

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Track Amazon link click
// @route   POST /api/courses/:id/click
// @access  Public
exports.trackClick = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  await Course.incrementClicks(req.params.id);

  res.status(200).json({
    success: true,
    message: "Click tracked",
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.update(req.params.id, req.body);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.delete(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

// @desc    Toggle featured status
// @route   PUT /api/courses/:id/toggle-featured
// @access  Private/Admin
exports.toggleFeatured = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  const updatedCourse = await Course.update(req.params.id, {
    featured: !course.featured,
  });

  res.status(200).json({
    success: true,
    message: `Course featured status toggled to ${updatedCourse.featured}`,
    data: updatedCourse,
  });
});

// @desc    Get course statistics
// @route   GET /api/courses/stats
// @access  Private/Admin
exports.getCourseStats = asyncHandler(async (req, res, next) => {
  const stats = await Course.getStats();
  res.status(200).json({
    success: true,
    data: stats,
  });
});

// @desc    Bulk create courses (for seeding)
// @route   POST /api/courses/bulk
// @access  Private/Admin
exports.bulkCreateCourses = asyncHandler(async (req, res) => {
  const courses = req.body.courses || [];
  const createdCourses = [];

  for (const courseData of courses) {
    const course = await Course.create(courseData);
    createdCourses.push(course);
  }

  res.status(201).json({
    success: true,
    message: `${createdCourses.length} courses created successfully`,
    data: createdCourses,
  });
});
