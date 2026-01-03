const Project = require("../models/project.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("cloudinary").v2;

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = asyncHandler(async (req, res) => {
  const { category, featured, complexity, status, search, sortBy } = req.query;

  const filters = {
    category,
    featured: featured === "true",
    complexity,
    status,
    search,
    sortBy,
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
  // Check if it's a UUID format
  const id = req.params.id;

  // If it's a slug, use getProjectBySlug
  if (!id.includes("-") && id.length < 36) {
    // Likely a slug
    const project = await Project.getProjectBySlug(id);
    if (!project) {
      return next(new ErrorResponse("Project not found", 404));
    }
    return res.status(200).json({
      success: true,
      data: project,
    });
  }

  // Otherwise treat as UUID
  const project = await Project.findById(id);

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
  // Clean and prepare project data
  const projectData = {
    ...req.body,
    // Ensure arrays are properly formatted
    technologies: Array.isArray(req.body.technologies)
      ? req.body.technologies
      : [],
    goals: Array.isArray(req.body.goals) ? req.body.goals : [],
    features: Array.isArray(req.body.features) ? req.body.features : [],
    results: Array.isArray(req.body.results) ? req.body.results : [],
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    // Ensure metrics is a valid JSON object
    metrics: req.body.metrics ? JSON.stringify(req.body.metrics) : "{}",
    // Set defaults
    status: req.body.status || "draft",
    featured: req.body.featured || false,
    display_order: req.body.display_order || 0,
    complexity: req.body.complexity || "Intermediate",
    environment: req.body.environment || "",
    contributors: req.body.contributors || 1,
  };

  const project = await Project.create(projectData);

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
  const id = req.params.id;
  const updateData = { ...req.body };

  // Clean up data for update
  if (updateData.metrics && typeof updateData.metrics === "object") {
    updateData.metrics = JSON.stringify(updateData.metrics);
  }

  const project = await Project.update(id, updateData);

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

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

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
    console.log("📤 Upload request received");
    console.log("📄 Request headers:", req.headers);
    console.log("📄 Request body keys:", Object.keys(req.body));
    console.log(
      "📄 Request file:",
      req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            filename: req.file.filename,
          }
        : "No file"
    );

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({
        success: false,
        message: "Please upload an image file",
        details: "No file was received by the server",
      });
    }

    // Check if Cloudinary returned a URL
    if (!req.file.path) {
      console.log("❌ No URL returned from Cloudinary");
      return res.status(500).json({
        success: false,
        message: "Image upload failed - no URL returned from Cloudinary",
        details: "Check Cloudinary configuration",
      });
    }

    console.log("✅ Upload successful!");
    console.log("🌐 Image URL:", req.file.path);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: req.file.path,
      public_id: req.file.filename,
      width: req.file.width,
      height: req.file.height,
      format: req.file.format,
      size: req.file.size,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    console.error("Error stack:", error.stack);

    let statusCode = 500;
    let errorMessage = "Error uploading image";
    let details =
      process.env.NODE_ENV === "development" ? error.message : undefined;

    // Handle specific errors
    if (error.message.includes("File too large")) {
      statusCode = 413;
      errorMessage = "File too large. Maximum size is 5MB";
    } else if (error.message.includes("Only image files")) {
      statusCode = 400;
      errorMessage = "Only image files are allowed (JPEG, PNG, WebP)";
    } else if (error.message.includes("Cloudinary")) {
      errorMessage = "Cloudinary upload failed. Check configuration.";
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      details: details,
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

  if (!Array.isArray(projects)) {
    return res.status(400).json({
      success: false,
      message: "Projects array is required",
    });
  }

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
  const projects = await Project.findFeatured();

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});


// @desc    Get project statistics
exports.getProjectStats = asyncHandler(async (req, res) => {
  const stats = await Project.getStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

// @desc    Get complexities
exports.getComplexities = asyncHandler(async (req, res) => {
  const complexities = await Project.getComplexities();

  res.status(200).json({
    success: true,
    data: complexities,
  });
});

// @desc    Get technologies
exports.getTechnologies = asyncHandler(async (req, res) => {
  const technologies = await Project.getTechnologies();

  res.status(200).json({
    success: true,
    data: technologies,
  });
});

// @desc    Get related projects
exports.getRelatedProjects = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  const relatedProjects = await Project.getRelatedProjects(
    req.params.id,
    project.category,
    3
  );

  res.status(200).json({
    success: true,
    data: relatedProjects,
  });
});

// @desc    Increment stars
exports.incrementStars = asyncHandler(async (req, res) => {
  await Project.incrementStars(req.params.id);

  res.status(200).json({
    success: true,
    message: "Star count incremented",
  });
});

// @desc    Increment forks
exports.incrementForks = asyncHandler(async (req, res) => {
  await Project.incrementForks(req.params.id);

  res.status(200).json({
    success: true,
    message: "Fork count incremented",
  });
});
