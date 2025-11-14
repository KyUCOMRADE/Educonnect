import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch courses");

        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle enrollment
  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please log in to enroll in a course.");
        return;
      }

      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, courseId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Enrollment failed");

      alert("Enrollment successful!");
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error: {error}. Please try again.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Available Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600">
          No courses available. Please check again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-3">
                {course.description?.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Instructor:{" "}
                <span className="font-medium">{course.instructor}</span>
              </p>
              <button
                onClick={() => handleEnroll(course._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
