import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { getMe } from "./api/authApi";

// pages
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
// later: import AdminPage from "./pages/AdminPage";

import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm";

function App() {
  const [me, setMe] = useState(null);

  // try to restore session
  useEffect(() => {
    (async () => {
      try {
        const u = await getMe();
        setMe(u);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const handleAuthed = (user) => setMe(user);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setMe(null);
  };

  if (!me) {
    // show login/signup if not authenticated
    return (
      <div style={{ padding: 20 }}>
        <h1>CampusCollab</h1>
        <SignupForm onAuthed={handleAuthed} />
        <LoginForm onAuthed={handleAuthed} />
      </div>
    );
  }

  // Check if profile is complete: bio is not empty and skills array has at least one skill
  const isProfileComplete = me.bio && me.bio.trim() !== "" && me.skills && me.skills.length > 0;

  // Helper to refresh user info after profile update
  const refreshMe = async () => {
    try {
      const u = await getMe();
      setMe(u);
    } catch {
      setMe(null);
    }
  };

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>CampusCollab</h1>
        <p>
          Logged in as: {me.name} ({me.email}){" "}
          <span style={{ marginLeft: 10, fontWeight: "bold" }}>Role: {me.role || "user"}</span>
          <button style={{ marginLeft: 10 }} onClick={handleLogout}>Logout</button>
        </p>

        {/* Always show Profile first after login */}
        <nav style={{ marginBottom: 20 }}>
          <Link to="/profile" style={{ marginRight: 10 }}>Profile</Link>
          <Link to="/projects">
            <button style={{ marginLeft: 10 }}>See Available Projects</button>
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/profile" element={<ProfilePage me={me} onProfileUpdated={refreshMe} />} />
          <Route path="/projects" element={<ProjectsPage me={me} />} />
          {/* Default route: always go to profile after login */}
          <Route path="/" element={<Navigate to="/profile" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
