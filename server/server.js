// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");

// // const connectDB = require("./config/db");
// // const authRoutes = require("./routes/authRoutes");
// // const portfolioRoutes = require("./routes/portfolioRoutes");
// // const errorHandler = require("./middleware/errorHandler");

// // // Load environment variables from .env file
// // dotenv.config();

// // // Connect to MongoDB
// // connectDB();

// // const app = express();

// // // ─── Middleware ───────────────────────────────
// // // Allow requests from our React frontend
// // app.use(
// //   cors({
// //     origin: process.env.CLIENT_URL || "http://localhost:5173",
// //     credentials: true,
// //   })
// // );

// // // Parse incoming JSON request bodies
// // app.use(express.json());

// // // Parse URL-encoded data (form submissions)
// // app.use(express.urlencoded({ extended: true }));

// // // ─── Routes ──────────────────────────────────
// // app.use("/api/auth", authRoutes);
// // app.use("/api/portfolios", portfolioRoutes);

// // // Health check — useful to verify server is running
// // app.get("/api/health", (req, res) => {
// //   res.json({ success: true, message: "Server is running 🚀" });
// // });

// // // 404 handler — for routes that don't exist
// // app.use((req, res) => {
// //   res.status(404).json({ success: false, message: "Route not found" });
// // });

// // // ─── Global Error Handler ─────────────────────
// // // Must be LAST — after all routes
// // app.use(errorHandler);

// // // ─── Start Server ─────────────────────────────
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const portfolioRoutes = require("./routes/portfolioRoutes");
// const errorHandler = require("./middleware/errorHandler");

// // Load env
// dotenv.config();

// // Connect DB
// connectDB();

// const app = express();


// // ─── ✅ FIXED CORS (IMPORTANT) ─────────────────
// const allowedOrigins = [
//   "http://localhost:5173",           // local frontend
//   process.env.CLIENT_URL             // deployed frontend (Vercel)
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like Postman)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("CORS not allowed"), false);
//       }
//     },
//     credentials: true,
//   })
// );


// // ─── Middleware ───────────────────────────────
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // ─── Routes ──────────────────────────────────
// app.use("/api/auth", authRoutes);
// app.use("/api/portfolios", portfolioRoutes);


// // ─── Health Check ────────────────────────────
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running 🚀",
//   });
// });


// // ─── 404 Handler ─────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });


// // ─── Error Handler ───────────────────────────
// app.use(errorHandler);


// // ─── Start Server ────────────────────────────
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));

// Increase limit for base64 image uploads (images can be large)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Routes
app.use("/api/auth",       authRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/upload",     uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running 🚀" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});