import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Owner: Member 1 — wraps pages that require login (Dashboard, Quiz, etc.)
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
