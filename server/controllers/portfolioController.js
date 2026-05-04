const Portfolio = require("../models/Portfolio");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSlug = (name) => {
  const base = name.toLowerCase().trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${suffix}`;
};

// Create portfolio
const createPortfolio = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const slug = generateSlug(title);
    const portfolio = await Portfolio.create({ user: req.user.id, title, slug });

    res.status(201).json({ success: true, portfolio });
  } catch (error) { next(error); }
};

// Get all portfolios
const getMyPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select("title template theme isPublished slug createdAt updatedAt hero");

    res.status(200).json({ success: true, count: portfolios.length, portfolios });
  } catch (error) { next(error); }
};

// Get single portfolio
const getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: "Not found" });
    if (portfolio.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not authorized" });

    res.status(200).json({ success: true, portfolio });
  } catch (error) { next(error); }
};

// Update portfolio
const updatePortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: "Not found" });
    if (portfolio.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not authorized" });

    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Saved!", portfolio });
  } catch (error) { next(error); }
};

// Delete portfolio
const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: "Not found" });
    if (portfolio.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not authorized" });

    await portfolio.deleteOne();
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) { next(error); }
};

// Toggle publish
const togglePublish = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: "Not found" });
    if (portfolio.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not authorized" });

    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: portfolio.isPublished ? "Portfolio published! 🎉" : "Portfolio unpublished",
      isPublished: portfolio.isPublished,
      slug: portfolio.slug,
    });
  } catch (error) { next(error); }
};

// Public portfolio by slug
const getPublicPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      slug: req.params.slug,
      isPublished: true,
    });
    if (!portfolio) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, portfolio });
  } catch (error) { next(error); }
};

// Upload image to Cloudinary
const uploadImage = async (req, res, next) => {
  try {
    const { image, folder } = req.body;
    if (!image) return res.status(400).json({ success: false, message: "No image provided" });

    const result = await cloudinary.uploader.upload(image, {
      folder: `portfolio-builder/${folder || "general"}`,
      transformation: [{ width: 800, quality: "auto", fetch_format: "auto" }],
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) { next(error); }
};

module.exports = {
  createPortfolio, getMyPortfolios, getPortfolioById,
  updatePortfolio, deletePortfolio, togglePublish,
  getPublicPortfolio, uploadImage,
};