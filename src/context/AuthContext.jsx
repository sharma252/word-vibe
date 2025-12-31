import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/api";

// Create AuthContext
const AuthContext = createContext(null);

export const useAuth = () => {
  // Custom hook to use the AuthContext
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    console.log("Auth check started");
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await apiService.getMe(storedToken);
          if (response.success) {
            setUser(response.data.user || response.data);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
            setToken(null);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // Provide the AuthContext to children components
  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
