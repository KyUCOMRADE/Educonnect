import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/my-courses`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setMyCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading your courses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>

      {myCourses.length === 0 && (
        <p className="text-gray-600">You have not enrolled in any course yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {myCourses.map(course => (
          <div key={course._id} className="p-5 bg-white shadow rounded">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="mt-2 text-gray-600">{course.description}</p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Open Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
