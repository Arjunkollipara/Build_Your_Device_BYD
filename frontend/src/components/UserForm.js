import React from "react";

function UserForm() {
  return (
    <div>
      <h2>Add User</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default UserForm;
