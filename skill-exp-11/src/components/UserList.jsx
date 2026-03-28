import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>API Users</h2>
      {users.map(u => (
        <p key={u.id}>{u.name} - {u.email} - {u.phone}</p>
      ))}
    </div>
  );
}