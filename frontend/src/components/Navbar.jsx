import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user info if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        EduConnect
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/courses">Courses</Link>

        {user && user.role === "student" && <Link to="/my-courses">My Courses</Link>}
        {user && user.role === "tutor" && <Link to="/add-course">Add Course</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
