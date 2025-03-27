//Students need an API to fetch all ongoing voting events.
//GET /api/students/voting-events
import express from "express";
import VotingEvent from "../models/VotingEvent";
const router = express.Router();

//Fetch all active events
router.get("/voting-events", async (req, res) => {
    try{
        //allowing only students vote
        const {userId} = req.body;
        const student = await Student.findById(userId);
        //fetching voting events
        const events = await VotingEvent.find({ status: "ongoing"});
    
        res.json(events);
    } catch(error) {
        res.status(500).json({ error: "Internal server error"});
    }
});
export default router;

import Category from "../models/Category";

// GET /api/students/voting-events/:eventId/categories → Fetch event categories
router.get("/voting-events/:eventId/categories", async (req, res) => {
    try{
        const {eventId} = req.params;
        const categories = await Category.find({ votingEvent: eventId }); 
        if (!categories.length) {
            res.status(404).json({error: "No categories found for this event"});
            return;
        }
        res.json(categories);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});


import Candidate from "../models/Candidate";
import Student from "../models/Student";

// GET /api/students/voting-events/:eventId/categories → Fetch event categories
router.get("/voting-events/:eventId/categories/:categoryId/candidates", async (req, res) => {
    try{
        const {categoryId} = req.params;
        const candidates = await Candidate.find({ category: categoryId }); 
        if (!candidates.length) {
            res.status(404).json({error: "No candidates found for this event"});
            return;
        }
        res.json(candidates);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});





// Student Features

// Implement Voting Event List Page (GET /api/students/voting-events).

// Implement Voting Page (GET /api/students/voting-events/:eventId/categories).

// Implement Vote Submission API (POST /api/students/vote).

// Restrict multiple votes per category & event.

//  Deployment & Hosting

// Deploy backend & database.