import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import Student from "../models/Student";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Admin Sign Up
export const adminSignUp = async (req: any, res: any) => {
  const { fullName, email, password } = req.body;
  try {
    const adminExist = await Admin.findOne({ email });
    if (adminExist)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ fullName, email, password: hashedPassword });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Login
export const adminLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student Sign Up
export const studentSignUp = async (req: any, res: any) => {
  const { fullName, matricNo, password } = req.body;
  try {
    const studentExist = await Student.findOne({ matricNo });
    if (studentExist)
      return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      fullName,
      matricNo,
      password: hashedPassword,
    });
    await newStudent.save();

    const token = jwt.sign(
      { id: newStudent._id, role: "student" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student Login
export const studentLogin = async (req: any, res: any) => {
  const { matricNo, password } = req.body;
  try {
    const student = await Student.findOne({ matricNo });
    if (!student)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Student logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
