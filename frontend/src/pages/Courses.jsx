// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get("/courses")
      .then(res => { if (mounted) setCourses(res.data); })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const handleEnroll = async (id) => {
    if (!user) return navigate("/login");
    if (user.role !== "student") return alert("Only students can enroll.");
    try {
      await api.post(`/enrollments/${id}`);
      alert("Enrolled! Check My Courses.");
      navigate("/my-courses");
    } catch (err) {
      alert(err?.response?.data?.message || "Enroll failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map(c => (
          <div key={c._id} className="border rounded p-4 shadow">
            <h2 className="font-semibold text-lg">{c.title}</h2>
            <p className="text-gray-600">{c.description}</p>
            <div className="mt-3">
              <button onClick={() => handleEnroll(c._id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
