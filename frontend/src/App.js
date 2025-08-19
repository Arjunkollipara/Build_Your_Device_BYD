import React from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
