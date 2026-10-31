import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Modules from "./pages/KidsModules.jsx";
import KidsModuleDetail from "./pages/KidsModuleDetail.jsx";

import KnowledgeHub from "./pages/KnowledgeHub.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Routes>
        {/* Main Home / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-Based Protected Dashboards */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules"
          element={
            <ProtectedRoute ageGroup="8-12">
              <Modules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/:id"
          element={
            <ProtectedRoute ageGroup="8-12">
              <KidsModuleDetail />
            </ProtectedRoute>
          }
        />

        
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}