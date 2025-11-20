// src/pages/AddCourse.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    if (user && user.role !== "instructor") {
      // block non-instructors
      // optionally redirect or show an error
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const instructorName = user?.name || "Instructor";
      const res = await api.post("/courses", { title, description, instructor: instructorName });
      alert("Course added");
      navigate("/courses");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Course title" className="border p-2 rounded" />
        <textarea required value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
        <button disabled={loading} type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{loading ? "Adding..." : "Add Course"}</button>
      </form>
    </div>
  );
}
