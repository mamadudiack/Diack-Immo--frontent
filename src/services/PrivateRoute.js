import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Si pas connecté
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté mais pas admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Si admin
  return children;
};

export default PrivateRoute;