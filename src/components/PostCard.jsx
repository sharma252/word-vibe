import { User, Calendar, Tag, Heart, MessageCircle, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PostCard = ({
  post,
  onLike,
  onView,
  showActions = false,
  onEdit,
  onDelete,
}) => {
  const { isAuthenticated, user } = useAuth();
  const isOwner = user?._id === post.author?._id;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{post.title}</h5>
          {showActions && isOwner && (
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2 w-100"
                onClick={() => onEdit(post)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger w-100 mt-1"
                onClick={() => onDelete(post._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="text-muted small mb-2">
          <span className="me-3">
            <User size={14} style={{ display: "inline" }} />{" "}
            {post.author?.name || "Anonymous"}
          </span>
          <span className="me-3">
            <Calendar size={14} style={{ display: "inline" }} />{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          {post.category && (
            <span className="badge bg-secondary me-2 p-1">{post.category}</span>
          )}
        </div>

        {post.excerpt && <p className="card-text text-muted">{post.excerpt}</p>}

        <p className="card-text mb-auto">{post.content?.substring(0, 200)}...</p>

        {post.tags && post.tags.length > 0 && (
          <div className="mb-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="badge bg-light text-dark me-2">
                <Tag size={12} style={{ display: "inline" }} /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => onLike(post._id)}
              disabled={!isAuthenticated}
            >
              <Heart size={16} style={{ display: "inline" }} />{" "}
              {post.likes?.length || 0}
            </button>
            <button className="btn btn-sm btn-outline-secondary me-2" disabled>
              <MessageCircle size={16} style={{ display: "inline" }} />{" "}
              {post.comments?.length || 0}
            </button>
            <button className="btn btn-sm btn-outline-info" disabled>
              <Eye size={16} style={{ display: "inline" }} /> {post.views || 0}
            </button>
          </div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onView(post)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
