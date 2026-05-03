import api from "./api";

// Register new user
const signup = async (name, email, password) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Get logged-in user profile
const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const authService = { signup, login, getMe };
export default authService;