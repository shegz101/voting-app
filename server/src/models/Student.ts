import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  matricNo: {
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
    enum: ["student"],
    default: "student"
  }
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
