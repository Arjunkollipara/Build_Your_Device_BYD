import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      if (res.data.user.role === "admin") {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      } else {
        setError("Not an admin account.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#e0eafc" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 320 }}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
        {error && <div style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 6, background: "#0077B5", color: "#fff", fontWeight: 600, border: "none" }}>Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
