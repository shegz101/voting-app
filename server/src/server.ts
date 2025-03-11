import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Middleware
app.use(express.json()); // to parse JSON request body

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Voting App API!" });
});

app.use("/api", authRoutes);

// MongoDB connection
(async () => {
  return await mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:5000")
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error: Error) => console.log("MongoDB connection error:", error));
})();

app.post("/register");

// Routes

// Start the server
