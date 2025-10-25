const express = require("express");
const router = express.Router();
const formationController = require("../controllers/formation.controller");
const { protect, authorize } = require("../middleware/auth");
const { validateFormation } = require("../middleware/validation");

// Public routes
router.get("/", formationController.getAllFormations);
router.get("/:id", formationController.getFormationById);

// Protected routes (admin only)
router.post(
  "/",
  protect,
  authorize("admin"),
  validateFormation,
  formationController.createFormation
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  formationController.updateFormation
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  formationController.deleteFormation
);
router.get(
  "/stats/overview",
  protect,
  authorize("admin"),
  formationController.getFormationStats
);

module.exports = router;
