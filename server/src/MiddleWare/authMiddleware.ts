import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { AdminType } from "../models/Admin"; // Import your Admin model
// Import the AdminType

// Extend Request type to include user
interface AuthRequest extends Request {
  user?: AdminType; // Now TypeScript knows req.user is an admin
}

// Middleware to verify admin access
export const verifyAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ error: "Access denied. No token provided." });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AdminType;

    // Find the admin in the database
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.role !== "admin") {
      res.status(403).json({ error: "Access denied. Admins only." });
      return;
    }

    req.user = decoded; // Attach user data to request
    next(); // Move to next middleware
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
