import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import KidsDashboard from "./Kidsdashboard.jsx";
import TeenDashboard from "./Teendashboard.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();

  // Login.jsx puts ageGroup in both AuthContext and the route state.
  const ageGroup = user?.ageGroup ?? location.state?.ageGroup;

  // The name field depends on what Register.jsx saved in Firestore.
  const userName =
    user?.name || user?.fullName || user?.username || user?.displayName || "";

  // Temporary debug line, remove once the right dashboard shows up.
  console.log("Dashboard debug:", { ageGroup, birthDate: user?.birthDate, user });

  return ageGroup === "8-12" ? (
    <KidsDashboard userName={userName} />
  ) : (
    <TeenDashboard userName={userName} />
  );
}