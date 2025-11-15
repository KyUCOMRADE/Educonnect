// seedCourses.js
import mongoose from "mongoose";
import Course from "./models/Course.js"; // adjust the path
import dotenv from "dotenv";

dotenv.config();

const courses = [
  { title: "Full Stack Web Development", description: "Learn HTML, CSS, JS, Node.js, React", instructor: "Admin" },
  { title: "Frontend Development with React & Tailwind", description: "Build responsive frontends", instructor: "Admin" },
  { title: "Backend Development with Node.js & Express", description: "Server-side development", instructor: "Admin" },
  { title: "Android App Development (Kotlin)", description: "Learn to make Android apps", instructor: "Admin" },
  { title: "iOS App Development (Swift)", description: "Learn to make iOS apps", instructor: "Admin" },
  { title: "Python for Data Science", description: "Data analysis & visualization", instructor: "Admin" },
  { title: "Machine Learning & AI Basics", description: "Introduction to ML & AI", instructor: "Admin" },
  { title: "Ethical Hacking & Penetration Testing", description: "Learn cybersecurity basics", instructor: "Admin" },
  { title: "AWS Cloud Practitioner", description: "Introduction to AWS Cloud", instructor: "Admin" },
  { title: "Blockchain Development & Smart Contracts", description: "Build blockchain apps", instructor: "Admin" },
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("Connected to MongoDB");
  await Course.insertMany(courses);
  console.log("Courses seeded successfully!");
  mongoose.disconnect();
})
.catch(err => console.error(err));
