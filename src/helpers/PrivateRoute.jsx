import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "./../pages/CSS/Loader.css";
import BookLoader from "../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader-container">
        {/* <div className="spinner"></div> */}
        <BookLoader />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
