

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Owner: Member 1 — wraps pages that require login (Dashboard, Quiz, etc.)
// Optional: pass ageGroup="8-12" to also limit a page to that age group.
// Anyone else who is logged in is sent back to their dashboard.
export default function ProtectedRoute({ children, ageGroup }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (ageGroup && user.ageGroup !== ageGroup) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}