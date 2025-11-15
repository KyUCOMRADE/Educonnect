import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const enroll = async (id) => {
    try {
      await fetch(`${API}/enroll/${id}`, {
        method: "POST",
        credentials: "include"
      });
      alert("Enrolled successfully");
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (loading) return <div className="p-6">Loading courses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="p-5 bg-white shadow rounded">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="mt-2 text-gray-600">{course.description}</p>

            <button
              onClick={() => enroll(course._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
