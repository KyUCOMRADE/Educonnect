import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user info from token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // In a real app, you'd verify the token and get user info
      setUser({ name: "Admin User", role: "instructor" });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>

      <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Welcome, {user ? user.name : "Loading..."}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/add-course")}
            className="cursor-pointer p-6 bg-blue-100 border border-blue-300 rounded-xl text-center hover:bg-blue-200 transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              ➕ Add New Course
            </h3>
            <p>Add a new course to your platform.</p>
          </div>

          <div
            onClick={() => navigate("/my-courses")}
            className="cursor-pointer p-6 bg-green-100 border border-green-300 rounded-xl text-center hover:bg-green-200 transition"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              📚 My Courses
            </h3>
            <p>View and manage your created courses.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
