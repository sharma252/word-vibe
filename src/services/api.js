import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Create axios reusable instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  getPosts: async (params = {}) => {
    const response = await api.get("/posts", { params });
    return response.data;
  },

  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData, token) => {
    const response = await api.post("/posts", postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updatePost: async (id, postData, token) => {
    const response = await api.put(`/posts/${id}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deletePost: async (id, token) => {
    const response = await api.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  likePost: async (id, token) => {
    const response = await api.put(`/posts/${id}/like`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  addComment: async (id, comment, token) => {
    const response = await api.post(
      `/posts/${id}/comments`,
      { text: comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  getMyPosts: async (token) => {
    const response = await api.get("/posts/user/my-posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getMe: async (token) => {
    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default apiService;
