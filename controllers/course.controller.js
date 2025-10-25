const Course = require("../models/course.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = asyncHandler(async (req, res) => {
  const { category, author } = req.query;

  const filters = { category, author };
  const courses = await Course.findAll(filters);

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
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
// @desc   getFeaturedCourses
exports.getFeaturedCourses = asyncHandler(async (req, res) => {
    const courses = await Course.findFeatured();
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});
// @desc   getCategories
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Course.findCategories();
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
});
// @desc   searchCourses
exports.searchCourses = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const courses = await Course.search(q);
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});
// @desc   toggleFeatured
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
// @desc getCourseStats
exports.getCourseStats = asyncHandler(async (req, res, next) => {
    const stats = await Course.getStats();
    res.status(200).json({
        success: true,
        data: stats,
    });
});