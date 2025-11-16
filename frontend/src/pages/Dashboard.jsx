import { useState, useEffect } from "react";
import axios from "axios";
import AddCourse from "./AddCourse"; // for tutors

export default function Dashboard({ user }) {
  const [tab, setTab] = useState("my-courses");
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (tab === "my-courses") {
      axios.get("http://localhost:5000/api/my-courses", { withCredentials: true })
        .then(res => setMyCourses(res.data))
        .catch(err => console.log(err));
    }
  }, [tab]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${tab === "my-courses" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("my-courses")}
        >
          My Courses
        </button>
        {user?.role === "tutor" && (
          <button
            className={`px-4 py-2 rounded ${tab === "add-course" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("add-course")}
          >
            Add Course
          </button>
        )}
      </div>

      <div>
        {tab === "my-courses" && (
          myCourses.length === 0 ? (
            <p>You have not enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map(course => (
                <div key={course._id} className="border rounded p-4 shadow">
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
          )
        )}

        {tab === "add-course" && <AddCourse />}
      </div>
    </div>
  );
}
