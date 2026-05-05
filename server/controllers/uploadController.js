// // const cloudinary = require("../config/cloudinary");

// // // ─────────────────────────────────────────────
// // // @route   POST /api/upload/image
// // // @desc    Upload image (profile, project) to Cloudinary
// // // @access  Private
// // // ─────────────────────────────────────────────
// // const uploadImage = async (req, res, next) => {
// //   try {
// //     const { image, folder } = req.body;

// //     if (!image) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No image provided",
// //       });
// //     }

// //     // Check if it's a valid base64 image
// //     if (!image.startsWith("data:image")) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid image format. Must be base64.",
// //       });
// //     }

// //     // Upload to Cloudinary
// //     const result = await cloudinary.uploader.upload(image, {
// //       folder: `portfolio-builder/${folder || "general"}`,
// //       transformation: [
// //         { width: 1200, crop: "limit" },   // max width 1200px
// //         { quality: "auto:good" },          // auto optimize quality
// //         { fetch_format: "auto" },          // auto format (webp if supported)
// //       ],
// //       resource_type: "image",
// //     });

// //     res.status(200).json({
// //       success: true,
// //       url: result.secure_url,
// //       public_id: result.public_id,
// //       width: result.width,
// //       height: result.height,
// //     });
// //   } catch (error) {
// //     console.error("Cloudinary upload error:", error);
// //     next(error);
// //   }
// // };

// // // ─────────────────────────────────────────────
// // // @route   POST /api/upload/resume
// // // @desc    Upload PDF resume to Cloudinary
// // // @access  Private
// // // ─────────────────────────────────────────────
// // const uploadResume = async (req, res, next) => {
// //   try {
// //     const { file } = req.body;

// //     if (!file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No file provided",
// //       });
// //     }

// //     // Upload PDF to Cloudinary as raw file
// //     const result = await cloudinary.uploader.upload(file, {
// //       folder: "portfolio-builder/resumes",
// //       resource_type: "raw",       // for non-image files like PDF
// //       format: "pdf",
// //       type: "upload",
// //     });

// //     res.status(200).json({
// //       success: true,
// //       url: result.secure_url,
// //       public_id: result.public_id,
// //     });
// //   } catch (error) {
// //     console.error("Resume upload error:", error);
// //     next(error);
// //   }
// // };

// // // ─────────────────────────────────────────────
// // // @route   DELETE /api/upload/delete
// // // @desc    Delete an image from Cloudinary
// // // @access  Private
// // // ─────────────────────────────────────────────
// // const deleteImage = async (req, res, next) => {
// //   try {
// //     const { public_id } = req.body;

// //     if (!public_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No public_id provided",
// //       });
// //     }

// //     await cloudinary.uploader.destroy(public_id);

// //     res.status(200).json({
// //       success: true,
// //       message: "Image deleted successfully",
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // module.exports = { uploadImage, uploadResume, deleteImage };

// const cloudinary = require("../config/cloudinary");

// const uploadImage = async (req, res, next) => {
//   try {
//     const { image, folder } = req.body;

//     if (!image) {
//       return res.status(400).json({
//         success: false,
//         message: "No image provided",
//       });
//     }

//     const result = await cloudinary.uploader.upload(image, {
//       folder: `portfolio-builder/${folder || "general"}`,
//       transformation: [
//         { width: 1200, crop: "limit" },
//         { quality: "auto:good" },
//         { fetch_format: "auto" },
//       ],
//       resource_type: "image",
//     });

//     res.status(200).json({
//       success: true,
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error.message);
//     next(error);
//   }
// };

// const uploadResume = async (req, res, next) => {
//   try {
//     const { file } = req.body;

//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file provided",
//       });
//     }

//     const result = await cloudinary.uploader.upload(file, {
//       folder: "portfolio-builder/resumes",
//       resource_type: "raw",
//       format: "pdf",
//     });

//     res.status(200).json({
//       success: true,
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     console.error("Resume upload error:", error.message);
//     next(error);
//   }
// };

// const deleteImage = async (req, res, next) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) {
//       return res.status(400).json({
//         success: false,
//         message: "No public_id provided",
//       });
//     }
//     await cloudinary.uploader.destroy(public_id);
//     res.status(200).json({ success: true, message: "Deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { uploadImage, uploadResume, deleteImage };

const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res, next) => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    // Log config to verify keys loaded
    console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Missing");
    console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Missing");

    const result = await cloudinary.uploader.upload(image, {
      folder: `portfolio-builder/${folder || "general"}`,
      resource_type: "image",
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    console.error("Full error:", JSON.stringify(error, null, 2));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadResume = async (req, res, next) => {
  try {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: "portfolio-builder/resumes",
      resource_type: "raw",
      format: "pdf",
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("❌ Resume upload error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "No public_id provided",
      });
    }
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage, uploadResume, deleteImage };