import React, { useState, useEffect } from "react";
import { registerUser } from "../services/ApiService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './CSS/Style.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referralCode: refCode }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(formData);
      
      toast.success("Signup successful! Please Login", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Signup</h2>
      <form className="form_main" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <FaUser className="inputIcon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="inputField"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <MdAlternateEmail className="inputIcon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="inputField"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <IoMdLock className="inputIcon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="inputField"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button id="button" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

        <div className="signupContainer">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;