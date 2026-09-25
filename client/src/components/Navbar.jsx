import { Link } from "react-router-dom";

// Owner: Member 1 (Team Lead + Frontend)
export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#4f46e5",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        EduRights
      </Link>

      <Link to="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link to="/modules" style={{ color: "white" }}>
        Modules
      </Link>

      <Link to="/knowledge-hub" style={{ color: "white" }}>
        Knowledge Hub
      </Link>

      <Link
        to="/login"
        style={{
          color: "white",
          marginLeft: "auto",
        }}
      >
        Login
      </Link>

      <Link to="/register" style={{ color: "white" }}>
        Sign Up
      </Link>
    </nav>
  );
}
