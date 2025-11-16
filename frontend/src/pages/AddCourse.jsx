import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingCourses, setExistingCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch all courses to check duplicates
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setExistingCourses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if course already exists
    const duplicate = existingCourses.find(
      (course) => course.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) {
      setError("This course already exists!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });

      if (res.ok) {
        setSuccess("Course added successfully!");
        setTitle("");
        setDescription("");
        // Optionally redirect to home or courses
        navigate("/courses");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add course.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add a New Course</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
