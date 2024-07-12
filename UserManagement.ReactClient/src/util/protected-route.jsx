import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthService } from "../services/auth.service";

const ProtectedRoute = () => {
  const authService = new AuthService();
  let location = useLocation();
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
