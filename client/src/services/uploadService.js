const CLOUD_NAME = "dqrm4luxk";
const UPLOAD_PRESET = "portfolio_builder"; // the one you just created

// Upload image directly from browser to Cloudinary
export const uploadImageToCloudinary = async (file, folder = "general") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `portfolio-builder/${folder}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};

// Upload PDF resume directly from browser to Cloudinary
export const uploadResumeToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "portfolio-builder/resumes");
  formData.append("resource_type", "raw");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};