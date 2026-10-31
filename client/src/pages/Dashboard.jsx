

// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// // These import names match the file names in your pages folder exactly.
// import KidsDashboard from "./Kidsdashboard.jsx";
// import TeenDashboard from "./Teendashboard.jsx";

// // Sidebar ids -> real routes in App.jsx.
// // Badges and Profile have no page yet, so they are left out on purpose.
// const KIDS_NAV_ROUTES = {
//   dashboard: "/dashboard",
//   modules: "/modules", // the six modules are kids-only content
//   hub: "/knowledge-hub",
// };

// const TEEN_NAV_ROUTES = {
//   dashboard: "/dashboard",
//   hub: "/knowledge-hub",
// };

// export default function Dashboard() {
//   const { user } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Login.jsx puts ageGroup in both AuthContext and the route state.
//   const ageGroup = user?.ageGroup ?? location.state?.ageGroup;

//   // The name field depends on what Register.jsx saved in Firestore.
//   const userName =
//     user?.name || user?.fullName || user?.username || user?.displayName || "";

//   const makeNavigate = (routes) => (id) => {
//     const path = routes[id];
//     if (!path) return false; // no page for this yet
//     navigate(path);
//     return true;
//   };

//   if (ageGroup === "8-12") {
//     return (
//       <KidsDashboard
//         userName={userName}
//         onNavigate={makeNavigate(KIDS_NAV_ROUTES)}
//         // Topic ids are the same as the module slugs, so they open directly.
//         onOpenModule={(moduleId) => navigate(`/modules/${moduleId}`)}
//       />
//     );
//   }

//   // Teens: no module links (the modules are for ages 8-12 only).
//   return (
//     <TeenDashboard
//       userName={userName}
//       onNavigate={makeNavigate(TEEN_NAV_ROUTES)}
//     />
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
// These import names match the file names in your pages folder exactly.
import KidsDashboard from "./Kidsdashboard.jsx";
import TeenDashboard from "./Teendashboard.jsx";

// Sidebar ids -> real routes in App.jsx.
// Badges and Profile have no page yet, so they are left out on purpose.
const KIDS_NAV_ROUTES = {
  dashboard: "/dashboard",
  modules: "/modules", // the six modules are kids-only content
  hub: "/knowledge-hub",
  profile: "/profile",
};

const TEEN_NAV_ROUTES = {
  dashboard: "/dashboard",
  hub: "/knowledge-hub",
  profile: "/profile",
};

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Login.jsx puts ageGroup in both AuthContext and the route state.
  const ageGroup = user?.ageGroup ?? location.state?.ageGroup;

  // The name field depends on what Register.jsx saved in Firestore.
  const userName =
    user?.name || user?.fullName || user?.username || user?.displayName || "";

  const makeNavigate = (routes) => (id) => {
    const path = routes[id];
    if (!path) return false; // no page for this yet
    navigate(path);
    return true;
  };

  if (ageGroup === "8-12") {
    return (
      <KidsDashboard
        userName={userName}
        onNavigate={makeNavigate(KIDS_NAV_ROUTES)}
        // Topic ids are the same as the module slugs, so they open directly.
        onOpenModule={(moduleId) => navigate(`/modules/${moduleId}`)}
      />
    );
  }

  // Teens: no module links (the modules are for ages 8-12 only).
  return (
    <TeenDashboard
      userName={userName}
      onNavigate={makeNavigate(TEEN_NAV_ROUTES)}
    />
  );
}