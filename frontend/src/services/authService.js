import axiosInstance from "./axiosInstance";

// Register
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

// Verify Email (6 digit code)
export const verifyEmail = async (data) => {
  const response = await axiosInstance.post("/auth/verify-email", data);
  return response.data;
};

// Login
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  // Save token + user
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

// Forgot Password
export const forgotPassword = async (data) => {
  const response = await axiosInstance.post("/auth/forgot-password", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};