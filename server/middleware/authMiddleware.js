const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes — only logged-in users can access
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please log in.",
    });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the logged-in user to the request object
    // so controllers can access req.user
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    next(); // Move to the next middleware / controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

module.exports = { protect };