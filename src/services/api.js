const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiService = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Post endpoints
  getPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/posts?${queryString}`);
    return response.json();
  },

  getPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return response.json();
  },

  createPost: async (postData, token) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  updatePost: async (id, postData, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  deletePost: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  likePost: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/like`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  addComment: async (id, comment, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });
    return response.json();
  },

  getMyPosts: async (token) => {
    const response = await fetch(`${API_BASE_URL}/posts/user/my-posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

export default apiService;
