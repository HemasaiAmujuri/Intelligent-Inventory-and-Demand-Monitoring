import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Verify token
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // Attach user info to request object
    req.user = user;

    // Pass control to next middleware or route handler
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Access token expired" });
    }

    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};