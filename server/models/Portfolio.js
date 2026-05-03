const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    // Which user owns this portfolio
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic info section
    title: {
      type: String,
      required: [true, "Portfolio title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    // Hero / About section
    hero: {
      name: { type: String, default: "" },
      tagline: { type: String, default: "" },
      bio: { type: String, default: "" },
      avatar: { type: String, default: "" }, // image URL
      location: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
    },

    // Social links
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    // Skills section — array of skill strings
    skills: {
      type: [String],
      default: [],
    },

    // Projects section
    projects: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        techStack: { type: [String], default: [] },
        liveUrl: { type: String, default: "" },
        githubUrl: { type: String, default: "" },
        image: { type: String, default: "" },
      },
    ],

    // Experience section
    experience: [
      {
        company: { type: String, default: "" },
        role: { type: String, default: "" },
        duration: { type: String, default: "" }, // e.g. "Jan 2022 - Present"
        description: { type: String, default: "" },
      },
    ],

    // Education section
    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        year: { type: String, default: "" },
      },
    ],

    // Template & theme settings
    template: {
      type: String,
      enum: ["minimal", "modern", "creative"],
      default: "minimal",
    },

    theme: {
      mode: { type: String, enum: ["light", "dark"], default: "light" },
      primaryColor: { type: String, default: "#6366f1" }, // indigo
      fontFamily: { type: String, default: "Inter" },
      buttonStyle: {
        type: String,
        enum: ["rounded", "sharp", "pill"],
        default: "rounded",
      },
    },

    // Shareable public slug (e.g. /p/john-doe)
    slug: {
      type: String,
      unique: true,
      sparse: true, // allows multiple null values
    },

    // Is this portfolio publicly visible?
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);