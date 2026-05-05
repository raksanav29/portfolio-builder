import api from "./api";

const createPortfolio  = async (title) => (await api.post("/portfolios", { title })).data;
const getMyPortfolios  = async () => (await api.get("/portfolios")).data;
const getPortfolioById = async (id) => (await api.get(`/portfolios/${id}`)).data;
const updatePortfolio  = async (id, data) => (await api.put(`/portfolios/${id}`, data)).data;
const deletePortfolio  = async (id) => (await api.delete(`/portfolios/${id}`)).data;
const togglePublish    = async (id) => (await api.put(`/portfolios/${id}/publish`)).data;
const getPublicPortfolio = async (slug) => (await api.get(`/portfolios/public/${slug}`)).data;

// Upload image (profile photo, project image)
const uploadImage = async (base64Image, folder = "general") => {
  const response = await api.post("/upload/image", {
    image: base64Image,
    folder,
  });
  return response.data;
};

// Upload resume PDF
const uploadResume = async (base64File) => {
  const response = await api.post("/upload/resume", {
    file: base64File,
  });
  return response.data;
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  const response = await api.delete("/upload/delete", {
    data: { public_id: publicId },
  });
  return response.data;
};

const portfolioService = {
  createPortfolio, getMyPortfolios, getPortfolioById,
  updatePortfolio, deletePortfolio, togglePublish,
  getPublicPortfolio, uploadImage, uploadResume, deleteImage,
};

export default portfolioService;