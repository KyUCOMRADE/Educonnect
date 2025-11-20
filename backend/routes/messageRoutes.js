// routes/messageRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import Message from "../models/Message.js";

const router = express.Router();

// Send message (to student or broadcast to all in a course)
router.post("/", auth, async (req, res) => {
  try {
    const { recipient, course, content } = req.body;
    
    if (!content) return res.status(400).json({ message: "Content is required" });

    const message = await Message.create({
      sender: req.user.id,
      recipient: recipient || null,
      course: course || null,
      content
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get messages for a tutor or student
router.get("/:courseId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      course: req.params.courseId
    }).populate("sender", "name role");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
kuji