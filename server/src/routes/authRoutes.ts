import express from "express";
import {adminSignUp, adminLogin, studentSignUp, studentLogin} 
from "../controllers/authControllers";

const router = express.Router();

// Admin routes
// post: localhost:5000/api/auth/admins/signup
router.post("/admins/signup", adminSignUp);
// post: localhost:5000/api/auth/admins/login
router.post("/admins/login", adminLogin);

// Student routes
// post: localhost:5000/api/auth/student/signup
router.post("/student/signup", studentSignUp);
// post: localhost:5000/api/auth/student/login
router.post("/student/login", studentLogin);

export default router;

