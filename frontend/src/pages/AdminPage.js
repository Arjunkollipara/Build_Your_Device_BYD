import React from "react";
import "./AdminPage.css";
import UserList from "../components/admin/UserList";

const AdminPage = () => (
  <div className="admin-container">
    <h2>Admin Dashboard</h2>
    <UserList />
  </div>
);

export default AdminPage;
