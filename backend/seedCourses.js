import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB for seeding"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Sample courses
const sampleCourses = [
  {
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js to build powerful web apps.",
    instructor: "Joseph Chege",
  },
  {
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python.",
    instructor: "Keshii",
  },
  {
    title: "UI/UX Design Principles",
    description: "Learn design thinking, wireframing, and prototyping to craft engaging user experiences.",
    instructor: "Anne Kariuki",
  },
  {
    title: "Cybersecurity Fundamentals",
    description: "Understand how to secure systems and networks from common cyber threats.",
    instructor: "Dennis Oluoch",
  },
];

// Function to seed database
const seedCourses = async () => {
  try {
    await Course.deleteMany(); // clear previous data
    await Course.insertMany(sampleCourses);
    console.log("🌱 Sample courses seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
    mongoose.connection.close();
  }
};

seedCourses();
