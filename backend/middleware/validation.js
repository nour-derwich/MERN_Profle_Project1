const { body, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Formation validation
exports.validateFormation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("level")
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Invalid level"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("max_participants")
    .isInt({ min: 1 })
    .withMessage("Max participants must be at least 1"),
  handleValidationErrors,
];

// Project validation
exports.validateProject = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  handleValidationErrors,
];

// Registration validation
exports.validateRegistration = [
  body("formation_id").notEmpty().withMessage("Formation ID is required"),
  body("full_name").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Valid phone number required"),
  handleValidationErrors,
];

// Message validation
exports.validateMessage = [
  body("full_name").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
  handleValidationErrors,
];
