import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = ({ onAuthed }) => (
  <div className="app-container">
    <h1>Login</h1>
    <LoginForm onAuthed={onAuthed} />
  </div>
);

export default LoginPage;
