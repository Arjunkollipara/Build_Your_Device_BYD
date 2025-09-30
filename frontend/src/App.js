// PrivateRoute for admin
import AdminPage from "./pages/AdminPage";

function PrivateAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  // You may want to check for role in a more robust way (e.g., context or API)
  const isAdmin = token && JSON.parse(atob(token.split('.')[1])).role === "admin";
  return isAdmin ? children : <Navigate to="/admin-login" />;
}
import OwnerApprovalPage from "./pages/OwnerApprovalPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { getMe } from "./api/authApi";
import "./App.css";

// pages
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
// later: import AdminPage from "./pages/AdminPage";

import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [me, setMe] = useState(null);

  // try to restore session
  useEffect(() => {
    (async () => {
      try {
        const u = await getMe();
        setMe(u);
      } catch (err) {
        setMe(null);
      }
    })();
  }, []);

  const handleAuthed = (user) => setMe(user);
  // Use a wrapper to access navigate
  const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      setMe(null);
      navigate("/");
    };
    return (
      <button style={{ marginLeft: 10 }} onClick={handleLogout}>Logout</button>
    );
  };

  // Check if profile is complete: bio is not empty and skills array has at least one skill
  const isProfileComplete = me && me.bio && me.bio.trim() !== "" && me.skills && me.skills.length > 0;

  // Helper to refresh user info after profile update
  const refreshMe = async () => {
    try {
      const u = await getMe();
      setMe(u);
    } catch (err) {
      setMe(null);
    }
  };

  if (!me) {
    // Unauthenticated: show only public routes
    return (
      <Router>
        <Routes>
          <Route path="/admin" element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          } />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onAuthed={handleAuthed} />} />
          <Route path="/signup" element={<SignupPage onAuthed={handleAuthed} />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
        </Routes>
      </Router>
    );
  }

  // Authenticated: show main app
  if (me.role === "admin") {
    // Only show admin dashboard for /admin route
    return (
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </Router>
    );
  }

  // Regular user view
  return (
    <Router>
      <div className="app-container">
        <p>
          Logged in as: {me.name} ({me.email}){" "}
          <span style={{ marginLeft: 10, fontWeight: "bold" }}>Role: {me.role || "user"}</span>
          <LogoutButton />
        </p>
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/projects">
            <button style={{ marginLeft: 10 }}>See Available Projects</button>
          </Link>
            <Link to="/owner-approvals">
              <button style={{ marginLeft: 10 }}>Pending Approvals</button>
            </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<ProfilePage me={me} onProfileUpdated={refreshMe} />} />
          <Route path="/projects" element={<ProjectsPage me={me} />} />
          <Route path="/owner-approvals" element={<OwnerApprovalPage me={me} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
