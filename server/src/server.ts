import dotenv from "dotenv";
dotenv.config();
// import express from "express";
// import mongoose from "mongoose";

// import cors from "cors";
// import authRoutes from "./routes/authRoutes";

// //connecting the routes 
// import adminRoutes from "./routes/adminRoutes";

// // Load environment variables


// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// // Middleware
// app.use(express.json()); // to parse JSON request body

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Voting App API!" });
// });
// app.get("/api/test", (req, res) => {
//   res.json({message: "server is working!"});
// })
// app.use("/api", authRoutes);
// app.use("/api/admin", adminRoutes);


// // MongoDB connection
// (async () => {
//   return await mongoose
//     .connect(process.env.MONGO_URI || "mongodb://localhost:5000/voting-app")
//     .then(() => {
//       console.log("Connected to MongoDB");
//       app.listen(port, () => {
//         console.log(`Server running on http://localhost:${port}`);
//       });
//     })
//     .catch((error: Error) => console.log("MongoDB connection error:", error));
// })();
// console.log("MONGO_URI:", process.env.MONGO_URI);



// dotenv.config();

// const mongoUri = process.env.MONGO_URI;
// if (!mongoUri) {
//   console.error("⚠️ MONGO_URI is not defined in .env file!");
//   process.exit(1); // Exit the process if no URI is found
// };

// const testMongoConnection = async () => {
//   try {
//     await mongoose.connect(mongoUri);
//     console.log("✅ Successfully connected to MongoDB Atlas!");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error);
//   }
// };

// testMongoConnection();



// (async () => {
//   try{
//     await mongoose.connect(process.env.MONGO_URI as string, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions);
//     app.listen(5000, () => {
//       console.log('Server running on port 5000');
//     });
//   }catch (error) {
//     console.error("Mongo db connection error:", error);
//     process.exit(1);
//   }
// })
// app.post("/register");

// Routes

// Start the server

import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";


// Import routes
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import studentRoutes from "./routes/studentRoutes";
import voteRoutes from "./routes/voteRoutes";

// Load environment variables


const app: Express = express(); // Define app here before use
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/", voteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Voting App API!" });
});
app.get("/api/test", (req, res) => {
  res.json({message: "server is working!"});
});
// Ensure MongoDB URI exists
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("⚠️ MONGO_URI is not defined in .env file!");
  process.exit(1);
}


// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions);
    console.log("Successfully connected to MongoDB!");

    // Start the server only after MongoDB connection is successful
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
})();

