// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/my-courses", {
          withCredentials: true, // Important if your backend uses cookies/auth
        });
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load your courses. Please try again.");
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading your courses...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg">{course.title}</h2>
              <p className="text-sm mt-2">{course.description}</p>
              <p className="text-xs mt-1 text-gray-500">Instructor: {course.instructor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
