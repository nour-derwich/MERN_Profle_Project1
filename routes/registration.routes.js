const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");

// Validation middleware
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
  body("message")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message must not exceed 1000 characters"),
];

// Public routes
// @route   POST /api/registrations
// @desc    Create new registration
// @access  Public
router.post(
  "/",
  registrationValidation,
  registrationController.createRegistration
);

// @route   GET /api/registrations/verify/:token
// @desc    Verify registration email
// @access  Public
//router.get("/verify/:token", registrationController.verifyEmail);

// @route   POST /api/registrations/:id/cancel
// @desc    Cancel registration (by user with email)
// @access  Public
// router.post("/:id/cancel", registrationController.cancelRegistration);

// Protected routes (Admin only)
// @route   GET /api/registrations
// @desc    Get all registrations
// @access  Private/Admin
router.get(
  "/",
  protect,
  authorize("admin"),
  registrationController.getAllRegistrations
);

// @route   GET /api/registrations/stats
// @desc    Get registration statistics
// @access  Private/Admin
router.get(
  "/stats",
  protect,
  authorize("admin"),
  registrationController.getRegistrationStats
);

// @route   GET /api/registrations/formation/:formationId
// @desc    Get registrations by formation
// @access  Private/Admin
router.get(
  "/formation/:formationId",
  protect,
  authorize("admin"),
  registrationController.getRegistrationsByFormation
);

// @route   GET /api/registrations/export
// @desc    Export registrations to CSV
// @access  Private/Admin
router.get(
  "/export",
  protect,
  authorize("admin"),
  registrationController.exportRegistrations
);

// @route   GET /api/registrations/:id
// @desc    Get single registration
// @access  Private/Admin
// router.get(
//   "/:id",
//   protect,
//   authorize("admin"),
//   registrationController.getRegistrationById
// );

// @route   PATCH /api/registrations/:id/status
// @desc    Update registration status
// @access  Private/Admin
// router.patch(
//   "/:id/status",
//   protect,
//   authorize("admin"),
//   body("status")
//     .isIn(["pending", "confirmed", "cancelled", "completed"])
//     .withMessage("Invalid status"),
//   registrationController.updateRegistrationStatus
// );

// @route   PATCH /api/registrations/:id/payment
// @desc    Update payment status
// @access  Private/Admin
// router.patch(
//   "/:id/payment",
//   protect,
//   authorize("admin"),
//   body("payment_status")
//     .isIn(["pending", "paid", "refunded"])
//     .withMessage("Invalid payment status"),
//   registrationController.updatePaymentStatus
// );

// @route   POST /api/registrations/:id/confirm
// @desc    Confirm registration
// @access  Private/Admin
// router.post(
//   "/:id/confirm",
//   protect,
//   authorize("admin"),
//   registrationController.confirmRegistration
// );

// @route   POST /api/registrations/:id/send-reminder
// @desc    Send reminder email
// @access  Private/Admin
// router.post(
//   "/:id/send-reminder",
//   protect,
//   authorize("admin"),
//   registrationController.sendReminder
// );

// @route   PUT /api/registrations/:id
// @desc    Update registration details
// @access  Private/Admin
// router.put(
//   "/:id",
//   protect,
//   authorize("admin"),
//   registrationController.updateRegistration
// );

// @route   DELETE /api/registrations/:id
// @desc    Delete registration
// @access  Private/Admin
// router.delete(
//   "/:id",
//   protect,
//   authorize("admin"),
//   registrationController.deleteRegistration
// );

// @route   POST /api/registrations/bulk-action
// @desc    Perform bulk action on registrations
// @access  Private/Admin
// router.post(
//   "/bulk-action",
//   protect,
//   authorize("admin"),
//   body("action")
//     .isIn(["confirm", "cancel", "delete"])
//     .withMessage("Invalid action"),
//   body("registration_ids")
//     .isArray()
//     .withMessage("Registration IDs must be an array"),
//   registrationController.bulkAction
// );

module.exports = router;
