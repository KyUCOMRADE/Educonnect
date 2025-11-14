import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        setMessage("⚠️ Error fetching courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first to enroll in a course.");
      return;
    }

    try {
      const res = await fetch(`/api/enrollments/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("✅ Successfully enrolled in the course!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-md">
          Welcome to the Course Hub
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore and enroll in exciting new courses today 🚀
        </p>
      </header>

      {/* Display messages */}
      {message && (
        <div className="text-center mb-6">
          <p
            className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No courses available at the moment. Check back later.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-3">{course.description}</p>
                <p className="text-sm text-gray-500">
                  Instructor:{" "}
                  <span className="font-medium text-gray-800">
                    {course.instructor}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleEnroll(course._id)}
                className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Scroll-to-top button (Bonus enhancement for 11/10 UI) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
