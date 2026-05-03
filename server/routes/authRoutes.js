const express = require("express");
const router = express.Router();

const { signup, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Private route — must be logged in
router.get("/me", protect, getMe);

module.exports = router;