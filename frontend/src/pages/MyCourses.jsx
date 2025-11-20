// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/enrollments")
      .then(res => {
        if (!mounted) return;
        // backend returns enrollments populated with course
        setEnrollments(res.data);
      })
      .catch(err => console.error("MyCourses fetch error", err))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Loading your courses...</div>;

  if (!enrollments || enrollments.length === 0) {
    return <div className="p-6"><h2 className="text-xl font-semibold">My Courses</h2><p className="mt-3 text-gray-600">You have not enrolled in any courses yet.</p></div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {enrollments.map(e => {
          const course = e.course || e; // handle different backend shapes
          return (
            <div key={e._id || course._id} className="border rounded p-4 shadow">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-gray-700">{course.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
