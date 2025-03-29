// //Students need an API to fetch all ongoing voting events.
// //GET /api/students/voting-events
// import express from "express";
// import VotingEvent from "../models/VotingEvent";
// const router = express.Router();

// //Fetch all active events
// router.get("/voting-events", async (req, res) => {
//     try{
//         //allowing only students vote
//         const {userId} = req.body;
//         const student = await Student.findById(userId);
//         //fetching voting events
//         const events = await VotingEvent.find({ status: "ongoing"});
    
//         res.json(events);
//     } catch(error) {
//         res.status(500).json({ error: "Internal server error"});
//     }
// });
// export default router;

// import Category from "../models/Category";

// // GET /api/students/voting-events/:eventId/categories → Fetch event categories
// router.get("/voting-events/:eventId/categories", async (req, res) => {
//     try{
//         const {eventId} = req.params;
//         const categories = await Category.find({ votingEvent: eventId }); 
//         if (!categories.length) {
//             res.status(404).json({error: "No categories found for this event"});
//             return;
//         }
//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({error: "Internal server error"});
//     }
// });


// import Candidate from "../models/Candidate";
// import Student from "../models/Student";

// // GET /api/students/voting-events/:eventId/categories → Fetch event categories
// router.get("/voting-events/:eventId/categories/:categoryId/candidates", async (req, res) => {
//     try{
//         const {categoryId} = req.params;
//         const candidates = await Candidate.find({ category: categoryId }); 
//         if (!candidates.length) {
//             res.status(404).json({error: "No candidates found for this event"});
//             return;
//         }
//         res.json(candidates);
//     } catch (error) {
//         res.status(500).json({error: "Internal server error"});
//     }
// });

// // Student Dashboard - Get Voting Results
// // Endpoint: GET /api/voting-events/:eventId/results/public
// router.get("/voting-events/:eventId/results/public", async (req, res) => {
//     try {
//         const event = await VotingEvent.findById(req.params.eventId).populate({
//             path: "categories",
//             populate: {
//                 path: "candidates",
//                 select: "name votes", // Show only name and votes
//             },
//         });

//         if (!event) {
//             return res.status(404).json({ error: "Voting event not found" });
//         }

//         // Ensure the event results are public
//         if (!event.isResultsPublic) {
//             return res.status(403).json({ error: "Results are not yet available" });
//         }

//         res.json(event.categories);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching voting results" });
//     }
// });






// routes/adminRoutes.ts
import express, { Request, Response } from "express";
import VotingEvent from "../models/VotingEvent";
import Voter from "../models/Voter";
import dotenv from "dotenv";
import { verifyAdmin } from "../MiddleWare/authMiddleware";
import { deleteVotingEvent } from "../controllers/votingController";

dotenv.config();
const router = express.Router();

// DELETE a voting event (only admins)
router.delete("/voting-events/:eventId", verifyAdmin, deleteVotingEvent);

// POST: Create a new voting event (initially with an empty candidates array)
router.post("/voting-events", async (req: Request, res: Response) => {
  try {
    const { eventName, endTime, location } = req.body;
    if (!eventName || !endTime || !location) {
      res
        .status(400)
        .json({ error: "All fields (eventName, location, endTime) are required." });
      return;
    }
    const newEvent = new VotingEvent({ eventName, endTime, location, candidates: [] });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server error" });
  }
});

// GET: Retrieve vote logs (unchanged)
router.get("/votes/logs", async (req: Request, res: Response) => {
  try {
    const logs = await Voter.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching vote logs:", error);
    res.status(500).json({ error: "Error fetching vote logs" });
  }
});

// NEW: Add a candidate to a voting event (replacing the category/candidate endpoints)
router.post("/voting-events/:eventId/candidates", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { name, manifesto, profilePic } = req.body;
    if (!name) {
      res.status(400).json({ error: "Candidate name is required" });
      return;
    }
    const candidate = { name, manifesto, profilePic, votes: 0 };
    const updatedEvent = await VotingEvent.findByIdAndUpdate(
      eventId,
      { $push: { candidates: candidate } },
      { new: true }
    );
    if (!updatedEvent) {
      res.status(404).json({ error: "Voting event not found" });
      return;
    }
    res
      .status(201)
      .json({ message: "Candidate added successfully", candidate, event: updatedEvent });
  } catch (error: any) {
    console.error("Error adding candidate", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// GET: Get all voting events (with candidates embedded)
router.get("/voting-events", async (req: Request, res: Response) => {
  try {
    const events = await VotingEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching voting events" });
  }
});

// GET: Get details of a specific voting event (including candidates)
router.get("/voting-events/:eventId", async (req: Request, res: Response) => {
  try {
    const event = await VotingEvent.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ error: "Voting event not found" });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error fetching voting event details" });
  }
});

// GET: Admin dashboard – Get voting results (candidate names and votes)
router.get("/voting-events/:eventId/results", async (req: Request, res: Response) => {
  try {
    const event = await VotingEvent.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ error: "Voting event not found" });
      return;
    }
    const results = event.candidates.map(candidate => ({
      name: candidate.name,
      votes: candidate.votes,
    }));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching voting results" });
  }
});

// DELETE: Reset all votes for an event’s candidates (repurposing the old /votes/reset/:categoryId endpoint)
router.delete("/votes/reset/:eventId", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const event = await VotingEvent.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Voting event not found" });
      return;
    }
    event.candidates.forEach(candidate => (candidate.votes = 0));
    await event.save();
    res.json({ message: "Votes reset successfully." });
  } catch (error) {
    console.error("Error resetting votes:", error);
    res.status(500).json({ error: "Error resetting votes" });
  }
});

export default router;
