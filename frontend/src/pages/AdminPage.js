import React from "react";
import "./AdminPage.css";
import UserList from "../components/admin/UserList";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    window.location.href = "/";
  };
  return (
    <div className="admin-container" style={{ position: "relative", minHeight: "100vh" }}>
      <h2>Admin Dashboard</h2>
      <UserList />
      <button
        onClick={handleLogout}
        style={{
          position: "fixed",
          right: 32,
          bottom: 32,
          padding: "12px 24px",
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          zIndex: 1000
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
