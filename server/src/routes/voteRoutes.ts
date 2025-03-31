import express, {Request, Response} from "express";
import Voter from "../models/Voter";
import VotingEvent from "../models/VotingEvent";
import mongoose from "mongoose";
const router= express.Router();
router.post ("/votes/:candidateId", async (req: Request, res: Response) => {
    try{
        const candidateId = (req.params.candidateId || "").trim();
        const { voterId} = req.body;
        
        // Check if voter has already voted
        // const existingVote = await Vote.findOne({ voterId, candidateId });
        // if (existingVote) return res.status(400).json({ error: "You have already voted" });
        // router.post("/votes/:candidateId", verifyVoterToken, async (req: Request, res: Response) => {
        //     try{
        //         const { candidateId} = req.params;
        //         const voterId = req.user?.id;
        //     }
        // });
        if (!voterId) {
            res.status(400).json({ error: "voterId is required"});
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(candidateId)) {
            res.status(400).json({ error: "Invalid candidateId"});
            return;
        }

        // const candidate = await Candidate.findById(candidateId);
        //     { inc: { votes: 1}},
        //     { new: true }
        // );
        // if (!candidate) {
        //     res.status(404).json({error: "Candidate not found"});
        //     return;
        // }
        // console.log("Candidate Object:", candidate);
       
        const event = await VotingEvent.findOne({
            "candidates._id": candidateId,
            status: "ongoing"
        });
        // console.log("Found event:", event);
        // const event = await VotingEvent.findById(category.eventId);
        if (!event) {
            res.status(400).json({error: "Voting is currently not allowed."});
            return;
        }
        //logs not needed
        // console.log("Extracted categoryId:", candidate?.categoryId?._id);
        // if (!category || !category._id) {
        //     res.status(500).json({ error: "candidate does not have a valid category"});
        //     return;
        // }
        const existingVote = await Voter.findOne({voterId, candidateId});
        if(existingVote) {
            res.status(400).json({error: "You have already voted in this category."});
            return
        }        
        
        const newVote = new Voter({ voterId, candidateId});
        await newVote.save().catch((err:any) => {
            if (err.code === 11000) {
                return res.status(400).json({ error: "You have already voted in this category"})
            }
            throw err;
        })
        const updatedEvent = await VotingEvent.findOneAndUpdate(
            {"candidates._id": candidateId},
            { $inc: { "candidates.$.votes": 1}},
            { new: true }
        );
        if (!updatedEvent) {
            res.status(500).json({ error: "Error updating candidate votes" });
            return;
        }
        
        const updatedCandidate = updatedEvent.candidates.id(candidateId);
        if (!updatedCandidate) {
            res.status(500).json({ error: "Candidate not found in the event after update"});
            return;
        }
        // const newVote = new Voter({ voterId, categoryId: categoryId});
        // await newVote.save();

        res.status(200).json({
            message: "vote cast successfully",
            candidate: updatedCandidate,
        });
        
    } catch(error) {
        console.error("Error casting vote:", error);
        res.status(500).json({ error: "Error casting vote"});
    }
});




export default router;