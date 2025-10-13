import jwt from "jsonwebtoken";

// check if the token is valid
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach id and role to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// check if the user has admin or instructor role
export const verifyAdminOrInstructor = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "instructor") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};
