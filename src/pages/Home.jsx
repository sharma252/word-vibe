import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/api";
import PostCard from "../components/PostCard";
import PostDetailModal from "../components/PostDetailModal";

const Home = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1) => {
    setLoading(true);

    // Mock posts definition available for both success and error paths
    const mockPosts = [
      {
        _id: "mock1",
        title: "Getting Started with React 19",
        excerpt: "Explore the new features in React 19 including the Transition API, Server Actions, and more.",
        content: "React 19 brings a host of new features that simplify state management and server-side rendering. The new Transition API allows for smoother UI updates, while Server Actions enable seamless data mutations directly from components. We also see improvements in concurrent rendering and better support for Web Components.",
        author: { name: "System Admin" },
        createdAt: new Date().toISOString(),
        category: "Technology",
        tags: ["React", "Frontend"],
        likes: [],
        views: 1205
      },
      {
        _id: "mock2",
        title: "The Art of Minimalist Design",
        excerpt: "Why less is more when it comes to user interface design in modern web applications.",
        content: "Minimalism isn't just about removing elements; it's about prioritizing content and user focus. By reducing visual clutter, we help users achieve their goals faster. This article explores the principles of negative space, typography, and color theory in creating effective minimalist interfaces.",
        author: { name: "Design Lead" },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        category: "Design",
        tags: ["UI/UX", "Minimalism"],
        likes: ["1", "2"],
        views: 850
      },
      {
        _id: "mock3",
        title: "Future of Artificial Intelligence",
        excerpt: "How AI agents are reshaping software development and creative industries in 2025.",
        content: "Artificial Intelligence is no longer just a buzzword; it's a co-pilot. From autonomous coding agents to generative design tools, AI is augmenting human capability. In this post, we discuss the ethical implications and the exciting frontiers of AGI...",
        author: { name: "Tech Insider" },
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        category: "AI",
        tags: ["AI", "Future"],
        likes: ["3", "4", "5"],
        views: 2341
      },
      {
        _id: "mock4",
        title: "Top 10 Travel Destinations for Digital Nomads",
        excerpt: "Discover the best cities to work remotely from, balancing cost of living, wifi speed, and adventure.",
        content: "Bali, Lisbon, Chiang Mai, and Medellin. What do they have in common? They are havens for digital nomads. we break down the pros and cons of each, focusing on internet reliability, community vibes, and of course, coffee shops...",
        author: { name: "Nomad Life" },
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        category: "Travel",
        tags: ["Travel", "Remote Work"],
        likes: ["6"],
        views: 1567
      },
      {
        _id: "mock5",
        title: "Healthy Habits for Developers",
        excerpt: "Combat burnout and eye strain with these essential health tips for coding professionals.",
        content: "Sitting for 8+ hours a day takes a toll. We share simple desk exercises, the importance of the 20-20-20 rule for eye health, and how to maintain mental clarity through structured breaks and hydration...",
        author: { name: "Health Coach" },
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        category: "Health",
        tags: ["Lifestyle", "Wellness"],
        likes: ["7", "8"],
        views: 980
      }
    ];

    try {
      const response = await apiService.getPosts({
        page,
        limit: 6,
        search: searchQuery,
      });

      if (response && response.success) {
        const postsData = response.data.posts || response.data;
        const finalPosts = [...(Array.isArray(postsData) ? postsData : []), ...mockPosts];
        setPosts(finalPosts);
        setTotalPages(Math.ceil((response.total || 0) / 6));
      } else {
        // Fallback for non-success API response
        setPosts(mockPosts);
        setTotalPages(1);
      }
    } catch (error) {
      console.warn("Failed to fetch posts (backend might be down). Showing mock data.", error);
      // Fallback for network errors or backend down
      setPosts(mockPosts);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts(1);
  };

  const handleLike = async (postId) => {
    if (!token) return;

    // Don't try to like mock posts
    if (postId.toString().startsWith('mock')) return;

    try {
      await apiService.likePost(postId, token);
      fetchPosts(currentPage);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <form onSubmit={handleSearch}>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No posts found</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post._id} className="col-md-6 col-lg-4 d-flex align-items-stretch">
                <PostCard
                  post={post}
                  onLike={handleLike}
                  onView={setSelectedPost}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
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

export default Home;
