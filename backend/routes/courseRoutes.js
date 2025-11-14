import express from "express";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all courses (public)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching courses" });
  }
});

// ✅ Add new course (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: "Course created", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Server error adding course" });
  }
});

export default router;
