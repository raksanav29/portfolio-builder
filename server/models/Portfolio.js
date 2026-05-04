// 

const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Portfolio title is required"],
      trim: true,
    },

    // ── Hero Section ──────────────────────────
    hero: {
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      tagline: { type: String, default: "" },
      bio: { type: String, default: "" },
      profileImage: { type: String, default: "" }, // Cloudinary URL
      location: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      ctaText: { type: String, default: "View My Work" },
      ctaLink: { type: String, default: "#projects" },
      ctaSecondaryText: { type: String, default: "Download Resume" },
    },

    // ── About Section ─────────────────────────
    about: {
      title: { type: String, default: "About Me" },
      description: { type: String, default: "" },
      highlights: { type: [String], default: [] },
      yearsOfExperience: { type: String, default: "" },
      projectsCompleted: { type: String, default: "" },
      image: { type: String, default: "" },
    },

    // ── Skills Section ────────────────────────
    // Categorized skills e.g. { category: "Frontend", skills: ["React", "CSS"] }
    skillCategories: [
      {
        category: { type: String, default: "" },
        skills: [
          {
            name: { type: String, default: "" },
            level: { type: Number, default: 80 }, // percentage 0-100
          },
        ],
      },
    ],

    // ── Projects Section ──────────────────────
    projects: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        techStack: { type: [String], default: [] },
        image: { type: String, default: "" }, // Cloudinary URL
        liveUrl: { type: String, default: "" },
        githubUrl: { type: String, default: "" },
        featured: { type: Boolean, default: false },
        // Case study
        caseStudy: {
          problem: { type: String, default: "" },
          solution: { type: String, default: "" },
          result: { type: String, default: "" },
        },
      },
    ],

    // ── Achievements / Certifications ─────────
    achievements: [
      {
        title: { type: String, default: "" },
        issuer: { type: String, default: "" },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
        link: { type: String, default: "" },
        image: { type: String, default: "" },
        type: {
          type: String,
          enum: ["certification", "achievement", "award"],
          default: "certification",
        },
      },
    ],

    // ── Education Section ─────────────────────
    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        field: { type: String, default: "" },
        year: { type: String, default: "" },
        grade: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    // ── Statistics Section ────────────────────
    statistics: [
      {
        label: { type: String, default: "" },
        value: { type: String, default: "" }, // e.g. "50", "100"
        suffix: { type: String, default: "+" }, // e.g. "+", "%", "k"
        icon: { type: String, default: "⭐" },
      },
    ],

    // ── Testimonials Section ──────────────────
    testimonials: [
      {
        name: { type: String, default: "" },
        role: { type: String, default: "" },
        company: { type: String, default: "" },
        message: { type: String, default: "" },
        avatar: { type: String, default: "" },
        rating: { type: Number, default: 5 },
      },
    ],

    // ── Contact Section ───────────────────────
    contact: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      availability: { type: String, default: "Open to opportunities" },
    },

    // ── Social Links ──────────────────────────
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    // ── Resume ────────────────────────────────
    resumeUrl: { type: String, default: "" }, // Cloudinary PDF URL

    // ── Template & Theme ──────────────────────
    template: {
      type: String,
      enum: ["minimal", "modern", "creative", "advanced"],
      default: "minimal",
    },

    theme: {
      mode: { type: String, enum: ["light", "dark"], default: "light" },
      primaryColor: { type: String, default: "#6366f1" },
      secondaryColor: { type: String, default: "#8b5cf6" },
      fontFamily: { type: String, default: "Inter" },
      buttonStyle: {
        type: String,
        enum: ["rounded", "sharp", "pill"],
        default: "rounded",
      },
    },

    slug: { type: String, unique: true, sparse: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);