import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../pages/CSS/Loader.css";
import Loader from "../components/Loader/Loader";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loader-container">
        <Loader color={"#f08080"} />
      </div>
    );
  }

  if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
