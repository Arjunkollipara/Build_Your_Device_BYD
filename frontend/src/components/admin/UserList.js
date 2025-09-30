import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => setError("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  const handleBan = async (id) => {
    if (!window.confirm("Ban this user?")) return;
    try {
      await api.patch(`/api/users/ban/${id}`);
      setUsers(users => users.map(u => u._id === id ? { ...u, banned: true } : u));
    } catch {
      alert("Failed to ban user");
    }
  };

  const handlePromote = async (id) => {
    if (!window.confirm("Promote this user to admin?")) return;
    try {
      await api.patch(`/api/users/promote/${id}`);
      setUsers(users => users.map(u => u._id === id ? { ...u, role: "admin" } : u));
    } catch {
      alert("Failed to promote user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h3>All Users</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={{ background: user.banned ? "#ffeaea" : "inherit" }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.banned ? "Yes" : "No"}</td>
              <td>
                {!user.banned && <button onClick={() => handleBan(user._id)}>Ban</button>}
                {user.role !== "admin" && <button onClick={() => handlePromote(user._id)} style={{ marginLeft: 8 }}>Make Admin</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
