import express, {Request, Response} from "express";
import Candidate from "../models/Candidate";
import Voter from "../models/Voter";
import VotingEvent from "../models/VotingEvent";
import Category, {ICategory} from "../models/Category";
const router= express.Router();
router.post ("/votes/:candidateId", async (req: Request, res: Response) => {
    try{
        const { candidateId} = req.params;
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

        const candidate = await Candidate.findById(candidateId).populate({
            path: "categoryId", 
            model: "Category",
        });
        //     { inc: { votes: 1}},
        //     { new: true }
        // );
        if (!candidate) {
            res.status(404).json({error: "Candidate not found"});
            return;
        }
        // console.log("Candidate Object:", candidate);
       
        const category = candidate.categoryId as unknown as ICategory;
        const eventId = category.eventId;
        const event = await VotingEvent.findById(eventId);
        // const event = await VotingEvent.findById(category.eventId);
        if (!event || event.status !== "ongoing") {
            res.status(400).json({error: "Voting is currently not allowed."});
            return;
        }
        //logs not needed
        // console.log("Extracted categoryId:", candidate?.categoryId?._id);
        // if (!category || !category._id) {
        //     res.status(500).json({ error: "candidate does not have a valid category"});
        //     return;
        // }
        const existingVote = await Voter.findOne({voterId, categoryId: category._id});
        if(existingVote) {
            res.status(400).json({error: "You have already voted in this category."});
            return
        }        
        
        const newVote = new Voter({ voterId, categoryId: category._id});
        await newVote.save().catch((err:any) => {
            if (err.code === 11000) {
                return res.status(400).json({ error: "You have already voted in this category"})
            }
            throw err;
        })
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            candidateId,
            { $inc: { votes: 1}},
            { new: true }
        );
        
        // const newVote = new Voter({ voterId, categoryId: categoryId});
        // await newVote.save();

        res.status(200).json({
            message: "vote cast successfully",
            candidate: updatedCandidate
        });
    } catch(error) {
        console.error("Error casting vote:", error);
        res.status(500).json({ error: "Error casting vote"});
    }
});




export default router;