import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => setError("Failed to load courses."));
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/enrollments/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        alert("Enrolled successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to enroll.");
      }
    } catch (err) {
      console.error(err);
      alert("Error enrolling in course.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>
            <button
              onClick={() => handleEnroll(course._id)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
