// controllers/formation.controller.js
const Formation = require("../models/formation.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all formations with filters
// @route   GET /api/formations
// @access  Public
exports.getAllFormations = asyncHandler(async (req, res) => {
  const {
    category,
    level,
    status,
    featured,
    limit = 10,
    offset = 0,
    sortBy = "featured",
    searchQuery,
    priceRange,
    selectedStatus,
    admin,
  } = req.query;

  const filters = {
    category,
    level,
    status,
    featured: featured === "true",
    limit: parseInt(limit),
    offset: parseInt(offset),
    sortBy,
    searchQuery,
    priceRange,
    selectedStatus,
    admin: admin === "true",
  };

  const formations = await Formation.findAll(filters);

  res.status(200).json({
    success: true,
    count: formations.length,
    data: formations,
  });
});

// @desc    Get formation by ID
// @route   GET /api/formations/:id
// @access  Public
exports.getFormationById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log(`🔍 getFormationById called with: ${id}`);

  // Check if this is a static route that was misrouted
  const staticRoutes = ["statuses", "categories", "levels", "stats", "export"];
  if (staticRoutes.includes(id)) {
    console.error(
      `❌ ERROR: Static route "${id}" was routed to getFormationById!`
    );
    return res.status(404).json({
      success: false,
      message: `Route /api/formations/${id} not found. Check your route configuration.`,
    });
  }

  const formation = await Formation.findById(id);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  // Increment views
  await Formation.incrementViews(id);

  res.status(200).json({
    success: true,
    data: formation,
  });
});

// @desc    Create new formation
// @route   POST /api/formations
// @access  Private/Admin
exports.createFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.create(req.body);

  res.status(201).json({
    success: true,
    message: "Formation created successfully",
    data: formation,
  });
});

// @desc    Update formation
// @route   PUT /api/formations/:id
// @access  Private/Admin
exports.updateFormation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Remove computed fields from the request body
  const dataToUpdate = { ...req.body };
  delete dataToUpdate.spots_left;
  delete dataToUpdate.rating;
  delete dataToUpdate.reviews_count;
  delete dataToUpdate.total_registrations;
  delete dataToUpdate.id;
  delete dataToUpdate.created_at;
  delete dataToUpdate.updated_at;

  const formation = await Formation.update(id, dataToUpdate);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Formation updated successfully",
    data: formation,
  });
});

// @desc    Delete formation
// @route   DELETE /api/formations/:id
// @access  Private/Admin
exports.deleteFormation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const formation = await Formation.delete(id);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Formation deleted successfully",
  });
});

// @desc    Get formation statistics
// @route   GET /api/formations/stats/overview
// @access  Private/Admin
exports.getFormationStats = asyncHandler(async (req, res) => {
  const stats = await Formation.getStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

// @desc    Get formation categories
// @route   GET /api/formations/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Formation.getCategories();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @desc    Get formation levels
// @route   GET /api/formations/levels
// @access  Public
exports.getLevels = asyncHandler(async (req, res) => {
  const levels = await Formation.getLevels();

  res.status(200).json({
    success: true,
    count: levels.length,
    data: levels,
  });
});

// @desc    Get formation statuses
// @route   GET /api/formations/statuses
// @access  Private/Admin
exports.getStatuses = asyncHandler(async (req, res) => {
  console.log("🔍 getStatuses controller called");
  const statuses = await Formation.getStatuses();

  res.status(200).json({
    success: true,
    count: statuses.length,
    data: statuses,
  });
});

// @desc    Update formation participants
// @route   PUT /api/formations/:id/participants
// @access  Private/Admin
exports.updateParticipants = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { count } = req.body;

  if (!count || typeof count !== "number") {
    return next(new ErrorResponse("Please provide a valid count", 400));
  }

  const formation = await Formation.updateParticipants(id, count);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Participants updated successfully",
    data: formation,
  });
});
