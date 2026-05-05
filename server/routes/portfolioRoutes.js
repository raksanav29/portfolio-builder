// const express = require("express");
// const router = express.Router();

// const {
//   createPortfolio,
//   getMyPortfolios,
//   getPortfolioById,
//   updatePortfolio,
//   deletePortfolio,
//   togglePublish,
//   getPublicPortfolio,
// } = require("../controllers/portfolioController");

// const { protect } = require("../middleware/authMiddleware");

// // ── Public route (no login needed) ───────────
// // Get a published portfolio by shareable slug
// router.get("/public/:slug", getPublicPortfolio);

// // ── Private routes (login required) ──────────
// router.use(protect); // All routes below this line are protected

// router.post("/", createPortfolio);         // Create new portfolio
// router.get("/", getMyPortfolios);          // Get all my portfolios
// router.get("/:id", getPortfolioById);      // Get one portfolio
// router.put("/:id", updatePortfolio);       // Update portfolio
// router.delete("/:id", deletePortfolio);    // Delete portfolio
// router.put("/:id/publish", togglePublish); // Publish / unpublish

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  createPortfolio,
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublish,
  getPublicPortfolio,
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

// Public
router.get("/public/:slug", getPublicPortfolio);

// Protected
router.use(protect);
router.post("/", createPortfolio);
router.get("/", getMyPortfolios);
router.get("/:id", getPortfolioById);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);
router.put("/:id/publish", togglePublish);

module.exports = router;