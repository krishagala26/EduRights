import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import KidsProfile from "./KidsProfile.jsx";
import TeenProfile from "./TeenProfile.jsx";

// Picks the kids or teen profile from the logged-in user's age group,
// the same way Dashboard.jsx picks the dashboard.
export default function Profile() {
  const { user } = useAuth();
  const location = useLocation();

  const ageGroup = user?.ageGroup ?? location.state?.ageGroup;

  return ageGroup === "8-12" ? <KidsProfile /> : <TeenProfile />;
}