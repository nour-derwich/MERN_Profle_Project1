const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");

// Validation middleware (NO payment fields)
const registrationValidation = [
  body("formation_id")
    .notEmpty()
    .withMessage("Formation ID is required")
    .isUUID()
    .withMessage("Invalid formation ID"),
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
    )
    .withMessage("Please provide a valid phone number"),
  body("role")
    .optional()
    .isIn([
      "student",
      "developer",
      "data-scientist",
      "ml-engineer",
      "manager",
      "other",
    ])
    .withMessage("Invalid role"),
  body("current_role")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Current role must not exceed 100 characters"),
  body("terms").isBoolean().withMessage("Terms must be accepted"),
];

// Public routes
router.post(
  "/",
  registrationValidation,
  registrationController.createRegistration
);
router.get("/verify/:token", registrationController.verifyEmail);
router.post(
  "/resend-verification",
  registrationController.resendVerificationEmail
);
router.post("/:id/cancel", registrationController.cancelRegistration);

// Protected routes (Admin only)
router.get(
  "/",
  protect,
  authorize("admin"),
  registrationController.getAllRegistrations
);
router.get(
  "/stats",
  protect,
  authorize("admin"),
  registrationController.getRegistrationStats
);
router.get(
  "/formation/:formationId",
  protect,
  authorize("admin"),
  registrationController.getRegistrationsByFormation
);
router.get(
  "/export",
  protect,
  authorize("admin"),
  registrationController.exportRegistrations
);
router.get(
  "/:id",
  protect,
  authorize("admin"),
  registrationController.getRegistrationById
);
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  registrationController.updateRegistrationStatus
);
router.post(
  "/:id/confirm",
  protect,
  authorize("admin"),
  registrationController.updateRegistrationStatus
);
router.post(
  "/:id/send-welcome",
  protect,
  authorize("admin"),
  registrationController.sendWelcomeEmail
);
router.post(
  "/:id/notify",
  protect,
  authorize("admin"),
  registrationController.sendCustomNotification
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  registrationController.updateRegistration
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  registrationController.deleteRegistration
);
router.post(
  "/bulk-action",
  protect,
  authorize("admin"),
  registrationController.bulkAction
);

// REMOVED payment-related routes
module.exports = router;
