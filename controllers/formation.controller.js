const Formation = require("../models/formation.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all formations
// @route   GET /api/formations
// @access  Public
exports.getAllFormations = asyncHandler(async (req, res) => {
  const { category, level, status, featured, limit, offset } = req.query;

  const filters = {
    category,
    level,
    status: status || "published",
    featured: featured === "true",
    limit: parseInt(limit) || 10,
    offset: parseInt(offset) || 0,
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
  const formation = await Formation.findById(req.params.id);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  // Increment views
  await Formation.incrementViews(req.params.id);

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
  const formation = await Formation.update(req.params.id, req.body);

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
  const formation = await Formation.delete(req.params.id);

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
