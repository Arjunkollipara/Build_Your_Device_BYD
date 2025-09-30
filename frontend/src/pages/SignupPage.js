import React from "react";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = ({ onAuthed }) => (
  <div className="app-container">
    <h1>Sign Up</h1>
    <SignupForm onAuthed={onAuthed} />
  </div>
);

export default SignupPage;
