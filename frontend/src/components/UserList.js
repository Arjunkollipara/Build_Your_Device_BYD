import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch users when the component loads
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
