// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = () => {
    // Uses localStorage_flag set at login
    return localStorage.getItem("auth") === "true";
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise allow access
  return children;
}