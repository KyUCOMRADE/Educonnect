import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Enroll in a course
router.post("/:courseId", auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({ user: userId, course: courseId });
    await newEnrollment.save();

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment: newEnrollment
    });
  } catch (error) {
    console.error("Enrollment error:", error.message);
    res.status(500).json({ message: "Server error during enrollment" });
  }
});

// Get all enrollments for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ user: userId }).populate("course");

    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found" });
    }

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error.message);
    res.status(500).json({ message: "Server error fetching enrollments" });
  }
});

export default router;
