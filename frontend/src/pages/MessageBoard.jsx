// src/pages/MessageBoard.jsx
import React, { useEffect, useState } from "react";
import Messages from "../components/Messages";

export default function MessageBoard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p className="text-center mt-8">Please login to chat.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Message Board</h1>
      <Messages user={user} />
    </div>
  );
}
