import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin", 
    enum: ["admin"],
  },
});

export interface AdminType {
  id: string; // MongoDB _id
  email: string;
  role: "admin"; // Ensures only 'admin' is allowed
  name: string;
}

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
