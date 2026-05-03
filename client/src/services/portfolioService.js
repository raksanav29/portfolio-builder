import api from "./api";

// Create a new portfolio
const createPortfolio = async (title) => {
  const response = await api.post("/portfolios", { title });
  return response.data;
};

// Get all portfolios of logged-in user
const getMyPortfolios = async () => {
  const response = await api.get("/portfolios");
  return response.data;
};

// Get a single portfolio by ID
const getPortfolioById = async (id) => {
  const response = await api.get(`/portfolios/${id}`);
  return response.data;
};

// Update portfolio
const updatePortfolio = async (id, data) => {
  const response = await api.put(`/portfolios/${id}`, data);
  return response.data;
};

// Delete portfolio
const deletePortfolio = async (id) => {
  const response = await api.delete(`/portfolios/${id}`);
  return response.data;
};

// Toggle publish/unpublish
const togglePublish = async (id) => {
  const response = await api.put(`/portfolios/${id}/publish`);
  return response.data;
};

// Get public portfolio by slug
const getPublicPortfolio = async (slug) => {
  const response = await api.get(`/portfolios/public/${slug}`);
  return response.data;
};

const portfolioService = {
  createPortfolio,
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublish,
  getPublicPortfolio,
};

export default portfolioService;