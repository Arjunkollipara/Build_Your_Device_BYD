import React, { useEffect, useState } from "react";
import { getMe } from "./api/authApi";
import { getUsers } from "./api/userApi";
import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);

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

  // load users (for UserList section)
  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setUsers(res.data);
    })();
  }, []);

  const handleAuthed = (user) => setMe(user);
  const handleLogout = () => { localStorage.removeItem('token'); setMe(null); };

  if (!me) {
    return (
      <div style={{ padding: 20 }}>
        <h1>CampusCollab</h1>
        <SignupForm onAuthed={handleAuthed} />
        <LoginForm onAuthed={handleAuthed} />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CampusCollab — Prototype</h1>
      <p>Logged in as: {me.name} ({me.email}) <button onClick={handleLogout}>Logout</button></p>

      <section style={{ marginTop: 24, marginBottom: 24 }}>
        <h2>Projects</h2>
        <ProjectForm ownerId={me._id} onCreated={() => { /* ProjectList refetches internally if you wired it that way */ }} />
        <ProjectList currentUserId={me._id} />
      </section>

      <section>
        <h2>User Management (temporary admin view)</h2>
        <UserForm onUserAdded={(u)=>setUsers(prev=>[...prev,u])} />
        <UserList users={users} />
      </section>
    </div>
  );
}

export default App;
