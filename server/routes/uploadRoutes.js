const express = require("express");
const router = express.Router();
const {
  uploadImage,
  uploadResume,
  deleteImage,
} = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

// All upload routes require login
router.use(protect);

router.post("/image",  uploadImage);
router.post("/resume", uploadResume);
router.delete("/delete", deleteImage);

module.exports = router;