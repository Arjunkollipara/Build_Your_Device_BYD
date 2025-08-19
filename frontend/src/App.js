import React, { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    // Fetch all users and set first user as "logged-in"
    const fetchData = async () => {
      const res = await getUsers();
      setUsers(res.data);
      setMe(res.data[0] || null);
    };
    fetchData();
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    if (!me) setMe(newUser); // if no "logged-in" user yet, set this one
  };

  if (!me) return <p>Create at least one user first, then refresh.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>CampusCollab — Prototype</h1>
      <section style={{ marginBottom: 30 }}>
        <h2>User Management</h2>
        <UserForm onUserAdded={handleUserAdded} />
        <UserList users={users} />
      </section>

      <section>
        <h2>Projects</h2>
        <p>Acting as: {me.name} ({me.email})</p>
        <ProjectForm
          ownerId={me._id}
          onCreated={() => {
            /* ProjectList will refetch after creation */
          }}
        />
        <ProjectList currentUserId={me._id} />
      </section>
    </div>
  );
}

export default App;
