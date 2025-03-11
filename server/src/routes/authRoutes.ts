import express from "express";
import {
  adminSignUp,
  adminLogin,
  studentSignUp,
  studentLogin,
} from "../controllers/authControllers";

const router = express.Router();

// Admin routes
router.post("/admins/register", adminSignUp);
router.post("/admins/login", adminLogin);

// Student routes
router.post("/student/signup", studentSignUp);
router.post("/student/login", studentLogin);

export default router;
