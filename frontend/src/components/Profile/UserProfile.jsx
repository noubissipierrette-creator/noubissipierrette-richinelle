import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const UserProfile = () => {
  const { user, isAuthorized } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_BASE}/api/v1/user/password/update`,
        { currentPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(data.message || "Password updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h2>
            My
            <span>Profile</span>
          </h2>
          <p>View your details and keep your account secure.</p>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <h3>Account Details</h3>
            <p className="muted">Your profile information.</p>
            <div className="profile-row">
              <span>Name</span>
              <strong>{user?.name || "-"}</strong>
            </div>
            <div className="profile-row">
              <span>Email</span>
              <strong>{user?.email || "-"}</strong>
            </div>
            <div className="profile-row">
              <span>Role</span>
              <strong>{user?.role || "-"}</strong>
            </div>
          </div>

          <div className="profile-card">
            <h3>Change Password</h3>
            <p className="muted">Use a strong password to keep your account safe.</p>
            <form className="form-grid" onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
