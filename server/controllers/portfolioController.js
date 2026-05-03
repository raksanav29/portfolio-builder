const Portfolio = require("../models/Portfolio");

// Helper — generate a unique slug from user's name
// e.g. "John Doe" → "john-doe-1a2b3c"
const generateSlug = (name) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  const suffix = Math.random().toString(36).substring(2, 8); // random 6 chars
  return `${base}-${suffix}`;
};

// ─────────────────────────────────────────────
// @route   POST /api/portfolios
// @desc    Create a new portfolio
// @access  Private
// ─────────────────────────────────────────────
const createPortfolio = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Portfolio title is required",
      });
    }

    // Generate a unique shareable slug
    const slug = generateSlug(title);

    const portfolio = await Portfolio.create({
      user: req.user.id, // from authMiddleware
      title,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/portfolios
// @desc    Get all portfolios of logged-in user
// @access  Private
// ─────────────────────────────────────────────
const getMyPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id })
      .sort({ updatedAt: -1 }) // newest first
      .select("title template theme isPublished slug createdAt updatedAt");

    res.status(200).json({
      success: true,
      count: portfolios.length,
      portfolios,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/portfolios/:id
// @desc    Get a single portfolio by ID
// @access  Private
// ─────────────────────────────────────────────
const getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Make sure the portfolio belongs to the logged-in user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this portfolio",
      });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/portfolios/:id
// @desc    Update a portfolio (all sections)
// @access  Private
// ─────────────────────────────────────────────
const updatePortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Make sure the portfolio belongs to the logged-in user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this portfolio",
      });
    }

    // Update with whatever fields are sent in request body
    // { new: true } returns the updated document
    // { runValidators: true } runs schema validations on update
    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /api/portfolios/:id
// @desc    Delete a portfolio
// @access  Private
// ─────────────────────────────────────────────
const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Make sure the portfolio belongs to the logged-in user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this portfolio",
      });
    }

    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/portfolios/:id/publish
// @desc    Toggle publish/unpublish a portfolio
// @access  Private
// ─────────────────────────────────────────────
const togglePublish = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (portfolio.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Flip the published status
    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: portfolio.isPublished
        ? "Portfolio published! 🎉"
        : "Portfolio unpublished",
      isPublished: portfolio.isPublished,
      slug: portfolio.slug,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/portfolios/public/:slug
// @desc    Get a published portfolio by slug (shareable link)
// @access  Public
// ─────────────────────────────────────────────
const getPublicPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found or not published",
      });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPortfolio,
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublish,
  getPublicPortfolio,
};