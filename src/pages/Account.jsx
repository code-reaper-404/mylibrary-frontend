import React, { useState, useEffect } from "react";
import "./CSS/Account.css";
import { getUserProfile, updateUser, updatePassword } from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/Loader/Loader';


const Account = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
        setFormData(res.data);

      } catch (error) {
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
    try {
      const res = await updateUser(formData);
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error("Failed to update details");
    }
  };

  const handlePasswordReset = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await updatePassword(passwordData);
      toast.success("Password updated successfully!");
      setIsResettingPassword(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

   if (loading) return <Loader color={"#9381ff"} />;


  return (
    <div className="account-container">
      {user && (
        <>
          <img
            src={
              user.avatar ||
              "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"
            }
            alt="avatar"
            className="account-avatar"
          />
          <div className="account-details">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>

          <div className="account-actions">
            <button onClick={() => setIsEditing(true)}>Edit Details</button>
            <button onClick={() => setIsResettingPassword(true)}>
              Change / Forgot Password
            </button>
          </div>
        </>
      )}

      {/* Edit form */}
      {isEditing && (
        <div className="overlay-container">
          <div className="form-container">
            <h3>Edit Account Details</h3>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleEditChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleEditChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleEditChange}
              placeholder="Phone"
            />
            <div className="form-buttons">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button className="cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password reset form */}
      {isResettingPassword && (
        <div className="overlay-container">
          <div className="form-container">
            <h3>Change / Reset Password</h3>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
            />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
            />
            <div className="form-buttons">
              <button className="save" onClick={handlePasswordReset}>
                Update Password
              </button>
              <button
                className="cancel"
                onClick={() => setIsResettingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
