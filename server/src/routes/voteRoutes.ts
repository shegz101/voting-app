import express, { Request, Response } from "express";
import Voter from "../models/Voter";
import VotingEvent from "../models/VotingEvent";
import mongoose from "mongoose";
const router = express.Router();
router.post("/votes/:candidateId", async (req: Request, res: Response):Promise<any>=> {
  try {
    const candidateId = (req.params.candidateId || "").trim();
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({ error: "Invalid candidateId format"});
    }
    const { voterId } = req.body;
    if (!voterId) {
        return res.status(400).json({ error: "voterId (matric number) is required" });
      }
   
    const event = await VotingEvent.findOne({
        "candidates._id": candidateId,
        status: "ongoing"
    });
    console.log("Found event:", event);
    if (!event) {
        return res.status(400).json({error: "Voting is currently not allowed."});
    }
    const candidate = event.candidates.id(candidateId);
    if (!candidate) {
        return res.status(404).json({ error: "Candidate not found in the event" });
    }
    // const candidateIds = event.candidates.map((cand: any) => cand._id.toString());
    const eventIdStr = event._id.toString();
    const existingVote = await Voter.findOne({ voterId, 
        eventId: eventIdStr 
    });
    if (existingVote) {
        return res.status(400).json({error: "You have already voted in this Event."});
    }   
    console.log(eventIdStr);
    console.log(candidateId);
    const newVote = new Voter({ voterId, candidateId, eventId: eventIdStr });
    try {
        await newVote.save();
      } catch (err: any) {
        if (err.code === 11000) {
          return res.status(400).json({ error: "You have already voted in this event." });
        }
        throw err;
      }
    const updatedEvent = await VotingEvent.findOneAndUpdate(
        {"candidates._id": candidateId},
        { $inc: { "candidates.$.votes": 1}},
        { new: true }
    );
    if (!updatedEvent) {
        return res.status(500).json({ error: "Error updating candidate votes" });
    }
    
    const updatedCandidate = updatedEvent.candidates.id(candidateId);
    if (!updatedCandidate) {
        return res.status(500).json({ error: "Candidate not found in the event after update"});
    
    }
    // const newVote = new Voter({ voterId, categoryId: categoryId});
    // await newVote.save();

    return res.status(200).json({
        message: "vote cast successfully",
        candidate: updatedCandidate,
    });
    
} catch(error) {
    console.error("Error casting vote:", error);
    if (!res.headersSent) {
        return res.status(500).json({ error: "Error casting vote"});
    }
}
});
export default router;
