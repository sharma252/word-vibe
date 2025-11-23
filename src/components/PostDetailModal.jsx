import React, { useState } from "react";
import { User, Calendar, Tag, Heart, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/api";

const PostDetailModal = ({ post, onClose, onLike }) => {
  const { isAuthenticated, token } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await apiService.addComment(post._id, comment, token);
      if (response.success) {
        setComments([...comments, response.data]);
        setComment("");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <span className="text-muted me-3">
                <User size={14} style={{ display: "inline" }} />{" "}
                {post.author?.name}
              </span>
              <span className="text-muted">
                <Calendar size={14} style={{ display: "inline" }} />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            {post.excerpt && <p className="lead text-muted">{post.excerpt}</p>}

            <div className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
              {post.content}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark me-2">
                    <Tag size={12} style={{ display: "inline" }} /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="d-flex gap-2 mb-4">
              <button
                className="btn btn-outline-danger"
                onClick={() => onLike(post._id)}
                disabled={!isAuthenticated}
              >
                <Heart size={16} style={{ display: "inline" }} />{" "}
                {post.likes?.length || 0} Likes
              </button>
              <button className="btn btn-outline-info" disabled>
                <Eye size={16} style={{ display: "inline" }} />{" "}
                {post.views || 0} Views
              </button>
            </div>

            <hr />

            <h6 className="mb-3">Comments ({comments.length})</h6>

            {isAuthenticated && (
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    Post
                  </button>
                </div>
              </form>
            )}

            <div>
              {comments.map((c, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body py-2">
                    <small className="text-muted">
                      {c.user?.name || "Anonymous"}
                    </small>
                    <p className="mb-0">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
