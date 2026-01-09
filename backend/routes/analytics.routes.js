const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");
const { protect, authorize } = require("../middleware/auth");

// Public route (track events)
router.post("/track", analyticsController.trackEvent);

// Protected routes (admin only)
router.get(
  "/overview",
  protect,
  authorize("admin"),
  analyticsController.getOverview
);
router.get(
  "/formations",
  protect,
  authorize("admin"),
  analyticsController.getFormationAnalytics
);
router.get(
  "/traffic",
  protect,
  authorize("admin"),
  analyticsController.getTrafficAnalytics
);
router.get(
  "/conversions",
  protect,
  authorize("admin"),
  analyticsController.getConversionAnalytics
);
router.get(
  "/monthly",
  protect,
  authorize("admin"),
  analyticsController.getMonthlyAnalytics
);

module.exports = router;
