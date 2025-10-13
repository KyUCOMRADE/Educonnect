import express from "express";
import Enrollment from "../models/Enrollment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Enroll in a course
router.post("/", verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const existing = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (existing)
      return res.status(400).json({ message: "Already enrolled in this course" });

    const enrollment = new Enrollment({
      student: req.user.id,
      course: courseId,
    });
    await enrollment.save();

    res.status(201).json({ message: "Enrollment successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course" });
  }
});

// ✅ Get all courses a student enrolled in
router.get("/my-courses", verifyToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate("course");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses" });
  }
});

export default router;
