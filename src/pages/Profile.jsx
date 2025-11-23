import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <p className="text-muted">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">Profile</h3>

              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <p className="form-control-plaintext">{user?.name}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <p className="form-control-plaintext">{user?.email}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Role</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-primary">
                    {user?.role || "user"}
                  </span>
                </p>
              </div>

              {user?.bio && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Bio</label>
                  <p className="form-control-plaintext">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
