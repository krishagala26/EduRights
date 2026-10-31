import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Kidsdashboard from "./pages/Kidsdashboard.jsx";
import Teendashboard from "./pages/Teendashboard.jsx";
import Modules from "./pages/Modules.jsx";
import ModuleDetail from "./pages/ModuleDetail.jsx";
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
          path="/kids-dashboard"
          element={
            <ProtectedRoute>
              <Kidsdashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teen-dashboard"
          element={
            <ProtectedRoute>
              <Teendashboard />
            </ProtectedRoute>
          }
        />

        {/* Learning Modules */}
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:id" element={<ModuleDetail />} />

        {/* Knowledge Hub */}
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}