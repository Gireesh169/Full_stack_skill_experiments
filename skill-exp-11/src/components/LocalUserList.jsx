import { useEffect, useState } from "react";

export default function LocalUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("public/user.json")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Local Users</h2>
      {users.map(u => (
        <p key={u.id}>{u.name} - {u.email} - {u.phone}</p>
      ))}
    </div>
  );
}