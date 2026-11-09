import { apiRequest } from "./api.js";

// Register a new user
export const signupUser = async (email, password) => {
  return await apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// Log in an existing user
export const loginUser = async (email, password) => {
  return await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// Get the currently logged-in user
export const getCurrentUser = async () => {
  return await apiRequest("/api/auth/me", {
    method: "GET",
  });
};

// Log out the current user
export const logoutUser = async () => {
  return await apiRequest("/api/auth/logout", {
    method: "POST",
  });
};