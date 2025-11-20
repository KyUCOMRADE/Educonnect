# EduConnect

EduConnect is a web platform connecting students with tutors. Students can browse and enroll in courses, while tutors can manage their courses and communicate with students in real-time.

---

## Features

- User authentication (Students & Tutors)
- Browse and enroll in courses
- Tutors can add new courses
- Dashboard for students & tutors
- Real-time messaging between tutors and students (Socket.io)
- Responsive design using React and TailwindCSS
- Backend powered by Node.js, Express, and MongoDB

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Real-time Messaging:** Socket.io
- **Authentication:** JWT (JSON Web Tokens)

---

## Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=5000
```

4. Seed the database with initial courses (optional):

```bash
node seedCourses.js
```

5. Start the backend server:

```bash
npm start
```

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173` (or the port shown in the terminal).

---

## How it Works

1. **Authentication:** Users can register and login. Tokens are stored in `localStorage` to authenticate API requests.  
2. **Courses:** Students can view all available courses and enroll. Tutors can add new courses via their dashboard.  
3. **Dashboard:**  
   - Students see their enrolled courses.  
   - Tutors can see their created courses and add new ones.  
4. **Messaging:** Real-time chat allows tutors and students to communicate.  
5. **API:** Express routes handle authentication, courses, and enrollments. JWT middleware protects routes.  

---

## Project Structure

```
backend/
 ├─ models/
 ├─ routes/
 ├─ middleware/
 ├─ server.js
 ├─ seedCourses.js
frontend/
 ├─ src/
 │   ├─ components/
 │   ├─ pages/
 │   ├─ App.jsx
 │   ├─ main.jsx
 ├─ index.css
 ├─ tailwind.config.cjs
 ├─ vite.config.js
```

---

## Notes

- Ensure your backend is running before starting the frontend.  
- JWT secret in `.env` should be kept secure.  
- Socket.io requires both backend and frontend servers running to enable real-time messaging.

---

## License

MIT License

Copyright (c) 2025 Joseph Chege
