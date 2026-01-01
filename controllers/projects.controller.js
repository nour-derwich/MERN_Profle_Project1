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
  const categories = await Project.getCategories();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Search projects
exports.searchProjects = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const projects = await Project.search(q);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Increment project views
exports.incrementViews = asyncHandler(async (req, res) => {
  await Project.incrementViews(req.params.id);

  res.status(200).json({
    success: true,
    message: "View count incremented",
  });
});


// @desc    Upload project image
// @route   POST /api/projects/upload-image
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('🔐 User:', req.user); // Check if user is authenticated
    console.log('📁 File:', req.file); // Check if file is received
    
    if (!req.file) {
      console.log('❌ No file received');
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    console.log('✅ File uploaded to Cloudinary:', {
      path: req.file.path,
      filename: req.file.filename,
      size: req.file.size
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Cloudinary public ID
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update project status
exports.updateStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const project = await Project.updateStatus(req.params.id, status);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project status updated",
    data: project,
  });
});

// @desc    Toggle featured status
exports.toggleFeatured = asyncHandler(async (req, res, next) => {
  const project = await Project.toggleFeatured(req.params.id);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Featured status toggled",
    data: project,
  });
});

// @desc    Reorder projects
exports.reorderProjects = asyncHandler(async (req, res) => {
  const { projects } = req.body;

  await Project.reorder(projects);

  res.status(200).json({
    success: true,
    message: "Projects reordered successfully",
  });
});

// @desc    Get all projects for admin (including drafts)
exports.getAllProjectsAdmin = asyncHandler(async (req, res) => {
  const projects = await Project.findAllAdmin();

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Get featured projects
exports.getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll({ featured: true });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});
