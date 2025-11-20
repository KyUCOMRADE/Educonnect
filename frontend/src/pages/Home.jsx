// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get("/courses").then(res => {
      if (!mounted) return;
      setCourses(res.data);
    }).catch(err => {
      console.error("Fetch courses error", err?.response?.data || err.message);
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "student") {
      alert("Only students can enroll.");
      return;
    }

    try {
      await api.post(`/enrollments/${courseId}`);
      // redirect to my-courses so student sees it instantly
      navigate("/my-courses");
    } catch (err) {
      alert(err?.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) return <div className="p-8">Loading courses...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Welcome to EduConnect</h1>
        <p className="text-gray-600">Browse courses and enroll. Tutors can add courses too.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => (
          <div key={c._id} className="bg-white border rounded-xl p-5 shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-gray-700 mb-3">{c.description}</p>
            <p className="text-xs text-gray-500">Instructor: {c.instructor}</p>
            <div className="mt-4">
              {user?.role === "student" ? (
                <button onClick={() => handleEnroll(c._id)} className="bg-green-600 text-white px-4 py-2 rounded">Enroll</button>
              ) : user?.role === "instructor" ? (
                <button onClick={() => navigate("/add-course")} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Course</button>
              ) : (
                <button onClick={() => navigate("/login")} className="bg-indigo-600 text-white px-4 py-2 rounded">Login to Enroll</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
