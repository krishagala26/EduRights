import { Link } from "react-router-dom";

// Owner: Member 1 (Team Lead + Frontend)
// Dashboard, Modules and Knowledge Hub are reached from the dashboard's
// own sidebar, so they are not repeated here.
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