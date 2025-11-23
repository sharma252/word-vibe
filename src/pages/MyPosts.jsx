import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/api";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import PostDetailModal from "../components/PostDetailModal";
import Alert from "../components/Alert";

const MyPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getMyPosts(token);
      if (response.success) {
        const postsData = response.data.posts || response.data;
        setPosts(Array.isArray(postsData) ? postsData : []);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
    console.log(posts);
  }, []);

  const handleSavePost = async (postData) => {
    try {
      let response;
      if (editingPost) {
        response = await apiService.updatePost(
          editingPost._id,
          postData,
          token
        );
      } else {
        response = await apiService.createPost(postData, token);
      }

      if (response.success) {
        setAlert({
          type: "success",
          message: editingPost
            ? "Post updated successfully!"
            : "Post created successfully!",
        });
        setShowForm(false);
        setEditingPost(null);
        fetchMyPosts();
      } else {
        setAlert({
          type: "danger",
          message: response.message || "Operation failed",
        });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Network error. Please try again." });
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await apiService.deletePost(postId, token);
      if (response.success) {
        setAlert({ type: "success", message: "Post deleted successfully!" });
        fetchMyPosts();
      } else {
        setAlert({
          type: "danger",
          message: response.message || "Delete failed",
        });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Network error. Please try again." });
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleLike = async (postId) => {
    try {
      await apiService.likePost(postId, token);
      fetchMyPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingPost(null);
          }}
        >
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {showForm ? (
        <PostForm
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      ) : loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven't created any posts yet</p>
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4">
              <PostCard
                post={post}
                onLike={handleLike}
                onView={setSelectedPost}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDeletePost}
              />
            </div>
          ))}
        </div>
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
        />
      )}
    </div>
  );
};

export default MyPosts;
