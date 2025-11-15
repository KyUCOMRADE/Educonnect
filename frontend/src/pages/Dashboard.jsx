import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchCourses = () => {
    fetch(`${API}/my-teacher-courses`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setCourses(data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    await fetch(`${API}/add-course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description })
    });

    setTitle("");
    setDescription("");
    fetchCourses();
    alert("Course added.");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="bg-white shadow p-5 rounded mb-6">
        <h2 className="text-xl font-semibold mb-3">Add a New Course</h2>

        <input
          className="border w-full p-3 mb-3 rounded"
          placeholder="Course Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-3 mb-3 rounded"
          placeholder="Course Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-3">Your Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="bg-white p-5 shadow rounded">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="mt-2 text-gray-600">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
