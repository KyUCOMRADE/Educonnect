import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentList({ courseId }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/enrollments/students/${courseId}`, {
      withCredentials: true
    }).then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, [courseId]);

  return (
    <ul>
      {students.map(s => (
        <li key={s._id} className="border-b py-1">
          {s.name} — {s.email}
        </li>
      ))}
    </ul>
  );
}
