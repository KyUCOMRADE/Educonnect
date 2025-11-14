import { useEffect, useState } from "react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view your courses.");
        return;
      }

      try {
        const res = await fetch("/api/enrollments/my-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">My Enrolled Courses</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <p className="text-sm mt-3 text-blue-600">Instructor: {course.instructor}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You haven’t enrolled in any courses yet.
        </p>
      )}
    </div>
  );
}
