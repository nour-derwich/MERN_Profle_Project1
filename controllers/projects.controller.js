const Project = require("../models/project.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;

  const filters = {
    category,
    featured: featured === "true",
  };

  const projects = await Project.findAll(filters);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.update(req.params.id, req.body);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.delete(req.params.id);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

// @desc    Get project categories
exports.getCategories = asyncHandler(async (req, res) => {
  const text =
    "SELECT DISTINCT category FROM projects WHERE status = $1 ORDER BY category";
  const result = await query(text, ["published"]);

  const categories = result.rows.map((row) => row.category);

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Search projects
exports.searchProjects = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const text = `
    SELECT * FROM projects 
    WHERE status = 'published' 
    AND (title ILIKE $1 OR description ILIKE $1)
    ORDER BY created_at DESC
  `;

  const result = await query(text, [`%${q}%`]);

  res.status(200).json({
    success: true,
    count: result.rows.length,
    data: result.rows,
  });
});

// @desc    Increment project views
exports.incrementViews = asyncHandler(async (req, res) => {
  await query(
    "UPDATE projects SET views_count = views_count + 1 WHERE id = $1",
    [req.params.id]
  );

  res.status(200).json({
    success: true,
    message: "View count incremented",
  });
});

// @desc    Upload project image
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse("Please upload an image", 400));
  }

  res.status(200).json({
    success: true,
    data: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  });
});

// @desc    Update project status
exports.updateStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const text = `
    UPDATE projects 
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;

  const result = await query(text, [status, req.params.id]);

  if (result.rows.length === 0) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project status updated",
    data: result.rows[0],
  });
});

// @desc    Toggle featured status
exports.toggleFeatured = asyncHandler(async (req, res, next) => {
  const text = `
    UPDATE projects 
    SET featured = NOT featured, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await query(text, [req.params.id]);

  if (result.rows.length === 0) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Featured status toggled",
    data: result.rows[0],
  });
});

// @desc    Reorder projects
exports.reorderProjects = asyncHandler(async (req, res) => {
  const { projects } = req.body; // Array of { id, display_order }

  for (const project of projects) {
    await query("UPDATE projects SET display_order = $1 WHERE id = $2", [
      project.display_order,
      project.id,
    ]);
  }

  res.status(200).json({
    success: true,
    message: "Projects reordered successfully",
  });
});

// @desc    Get all projects for admin (including drafts)
exports.getAllProjectsAdmin = asyncHandler(async (req, res) => {
  const text =
    "SELECT * FROM projects ORDER BY display_order ASC, created_at DESC";
  const result = await query(text);

  res.status(200).json({
    success: true,
    count: result.rows.length,
    data: result.rows,
  });
});
// @desc    Get featured projects
exports.getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll({ featured: true });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});





