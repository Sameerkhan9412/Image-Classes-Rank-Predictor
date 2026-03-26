"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u: any) => (
        <div key={u._id} className="bg-white p-3 mb-2 rounded shadow">
          <p>{u.name}</p>
          <p>{u.mobile}</p>
        </div>
      ))}
    </div>
  );
}