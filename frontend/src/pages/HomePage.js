import React from "react";
import "./HomePage.css";

import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Animated background shapes */}
      <div className="animated-bg">
        <div className="shape shape1" />
        <div className="shape shape2" />
        <div className="shape shape3" />
      </div>
      <div className="home-content">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Collaboration" className="home-img" />
        <h1 className="home-title">Welcome to CampusCollab</h1>
        <p className="home-desc">Connect, collaborate, and build amazing projects with your campus community! Showcase your achievements, earn badges, and grow your network.</p>
        <div className="home-features">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Projects" />
            <h3>Find & Join Projects</h3>
            <p>Browse and join projects that match your skills and interests.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="Badges" />
            <h3>Earn Badges</h3>
            <p>Showcase your achievements and skills with unique badges.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Collaboration" />
            <h3>Connect with Peers</h3>
            <p>Meet new collaborators and grow your professional network.</p>
          </div>
        </div>
        <div className="home-actions">
          <button className="home-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="home-btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
