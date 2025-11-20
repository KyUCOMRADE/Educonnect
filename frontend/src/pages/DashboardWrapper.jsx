// src/pages/DashboardWrapper.jsx
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export default function DashboardWrapper() {
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

  return <Dashboard user={user} />;
}
