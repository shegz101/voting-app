import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import Student from "../models/Student";
import { Request, Response } from "express";


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Admin Sign Up
export const adminSignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    const adminExist = await Admin.findOne({ email });
    if (adminExist){
      res.status(400).json({ message: "Admin already exists" });
      return;
    }
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
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin){
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch){
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    // if (password !== admin.password) {
    //   res.status(404).json({ message: "Invalid credentials"});
    //   return;
    // }

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student Sign Up
export const studentSignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, matricNo, password } = req.body;
    const studentExist = await Student.findOne({ matricNo });
    if (studentExist){
      res.status(400).json({ message: "Student already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      fullName,
      matricNo,
      password: hashedPassword,
    });
    await newStudent.save();

    const token = jwt.sign(
      { id: newStudent._id, role: "student" },JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student Login
export const studentLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matricNo, password } = req.body;
    const student = await Student.findOne({ matricNo });
    if (!student){
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch){
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Student logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
