// routes/formation.routes.js
const express = require("express");
const router = express.Router();
const formationController = require("../controllers/formation.controller");
const { protect, authorize } = require("../middleware/auth");

console.log("✅ Formation routes loaded");

// ========== PUBLIC STATIC ROUTES (MUST COME FIRST) ==========
router.get("/categories", formationController.getCategories);
router.get("/levels", formationController.getLevels);
router.get("/statuses", formationController.getStatuses);

// ========== MAIN FORMATIONS LISTING ==========
router.get("/", formationController.getAllFormations);

// ========== SINGLE FORMATION ROUTE (MUST BE LAST GET ROUTE) ==========
router.get("/:id", formationController.getFormationById);

// ========== ADMIN PROTECTED ROUTES ==========
router.post(
  "/",
  protect,
  authorize("admin"),
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

router.put(
  "/:id/participants",
  protect,
  authorize("admin"),
  formationController.updateParticipants
);

module.exports = router;
