import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import MyPosts from "../pages/MyPosts";
import Profile from "../pages/Profile";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import About from "../pages/About";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

const AppRoutes = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/my-posts"
                    element={
                        <ProtectedRoute>
                            <MyPosts />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Layout>
    );
};

export default AppRoutes;
