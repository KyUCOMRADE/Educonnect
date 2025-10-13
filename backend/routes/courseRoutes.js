import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// Existing routes (GET, POST)...

// ✅ Enroll in a course
router.post("/:id/enroll", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.enrolledCourses.includes(id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push(id);
    await user.save();

    res.json({ message: "Enrollment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// ✅ Get user's enrolled courses
router.get("/my/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("enrolledCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
});

export default router;
