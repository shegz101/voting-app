import express, { NextFunction, Request, Response } from "express";
import Candidate from "../models/Candidate";
import Voter from "../models/Voter";
import Category from "../models/Category";
import VotingEvent from "../models/VotingEvent";
import dotenv from "dotenv"
import { verifyAdmin } from "../MiddleWare/authMiddleware";
import { deleteVotingEvent } from "../controllers/votingController";
const router = express.Router();
const JWT_SECRET: string = process.env.JWT_SECRET || "your_secret_key";
dotenv.config();

// Protect the DELETE route (only admins can delete voting events)
router.delete("/voting-events/:eventId", verifyAdmin, deleteVotingEvent);

//post: localhost:5000/api/admins/voting-events
router.post("/voting-events", async (req: Request, res: Response) => {
    try{
        const {eventName, endTime, location} = req.body;
        // if (!token) {
        //     res.status(401).json({error: "Unauthorized. Admin token required."});
        //     return;
        // }
        // //verify token and get user data
        // const decoded: any = jwt.verify(token, JWT_SECRET);
        // if (!decoded || decoded.role !== hardcodedAdmin.email){
        //     res.status(403).json({erroe: "Forbidden. Only admins can create events"});
        //     return;
        // }
        if (!eventName || !endTime || !location) {
            res.status(400).json({error: "All fields (eventName, location, endTime) are required."})
            return;
        }
        // if (new Date(endTime) <= new Date(location)) {
        //     res.status(400).json({ error: "End time must be after start time."})
        // }
        const newEvent = new VotingEvent({ eventName, endTime, location});
        await newEvent.save();
        res.status(201).json(newEvent);//now ive created the event
    } catch (error: any) {
        res.status(500).json({error: error.message || "Internal Server error"});
    }
});

// GET: Retrieve all votes (sorted by timestamp)
router.get("/votes/logs", async (req: Request, res: Response) => {
    try{
        const logs = await Voter.find()
            .populate("categoryId", "name")
            .sort({createdAt: -1});
        res.json(logs);
    } catch (error) {
        console.error("Erroe fetching vote logs:", error);
        res.status(500).json({error: "Error fetching vote logs"})
    }
}); 

//Adding category
// Endpoint: POST /api/admin/voting-events/:eventId/categories
router.post("/voting-events/:eventId/categories", async (req, res) => {
    try{
        const{name} = req.body;
        if(!name) {
            res.status(400).json({ error: "Category name is required"});
            return;
        }
        const{eventId} = req.params;
        const newCategory = new Category({ name, eventId});
        await newCategory.save();

        //adding references of the category to VotingEvent
        await VotingEvent.findByIdAndUpdate(eventId, {
            $push: { categories: newCategory._id },
        });
        res.status(201).json(newCategory);
    } catch (error: any) {
        console.error("Error adding category", error);
        res.status(500).json({ error: error.messsage || "Internal server error"});
    }
});

//Adding candidates
//Endpoint: POST /api/admin/voting-events/:eventId/categories/:categoryId/candidates
router.post("/voting-events/:eventId/categories/:categoryId/candidates", async (req, res) => { 
    try{
        const{name, department, profilePicture, manifesto, eventId } = req.body;
        const{categoryId} = req.params;

        const newCandidate = new Candidate({
            name,
            department,
            profilePicture,
            manifesto,
            categoryId,
            eventId,
        });

        await newCandidate.save()

        //adding references of the candidate to Category
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
            $push: {candidates: newCandidate._id} ,
            new: true
        });
        if (!updatedCategory) {
            res.status(404).json({error: "Category not found"});
            return;
        }


        res.status(201).json({message: "Candidate added succcessfully", candidate: newCandidate});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error adding candidate"});
    }
});


//allowing to get all voting events
//Endpoint: GET /api/admin/voting-events
router.get("/voting-events", async (req, res) => {
    try{
        const events = await VotingEvent.find().populate("categories");
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Error fetching voting events"});
    }
});

//Getting voting details(both categories and candidates)
//Endpoint: GET /api/admin/voting-events/:eventId
router.get("/voting-events/:eventId", async (req, res) =>{
    try{
        const event = await VotingEvent.findById(req.params.eventId).populate({
            path: "categories",
            populate: {
                path: "candidates",
            },
        });

        if (!event) {
            res.status(404).json({error: "Voting event not found"});
            return;
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({error: "Error fetching voting evevnt details"});
    }
});


//Admin dashboard
//Endpoint: GET /api/admin/voting-events/:eventId/results
router.get("/voting-events/:eventId/results", async (req, res) => {
    try{
        const event = await VotingEvent.findById(req.params.eventId).populate({
            path: "categories",
            populate: {
                path: "candidates",
                select: "name votes",
            },
        });
        if (!event) {
            res.status(404).json({error: "Voting event not found"});
            return;
        }
        res.json(event?.categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching voting results"});
    }
});

// DELETE: Reset all votes in a category
router.delete("/votes/reset/:categoryId", async (req: Request, res:Response) => {
    try{
        const {categoryId} = req.params;
        //deleting all votes in this category
        await Voter.deleteMany({ categoryId});
        //Reset all candidates votes to 0
        await Candidate.updateMany({ categoryId },{ $set: { votes: 0 }});
        res.json({message: "Votes reset successfully."});
    } catch (error) {
        console.error("Error resetting votes:", error);
        res.status(500).json({error: "Error resetting votes"});
    }
});
export default router;
// import Admin from "../models/Admin";
// import votingEvent from "../models/VotingEvent";
// import jwt from "jsonwebtoken";
// // import { verifyAdminToken } from "../Middleware/authMiddleware";
// import dotenv, { configDotenv } from "dotenv";
// //extend request type to include asmin
// // declare module "express-serve-static-core" {
// //     interface Request {
// //         admin?: any;
// //     }
// // }

// // const verifyAdminToken = ( next: NextFunction, req: Request, res: Response) => {
// //     try{
// //         const token = req.headers.authorization?.split(" ")[1];
// //         if (!token) {
// //             return res.status(401).json({error: "Access denied. No token provided"});
// //         }
// //         const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);//verify jwt
// //         //const admin = await Admin.findById(decoded.id);
// //         Admin.findById(decoded.id)
// //         .then((admin) => {
// //             if (!admin || admin.role !== "admin") {
// //                 res.status(403).json({message: "Access Denied. Admins only."});
// //                 return;
// //             }
// //             req.admin = admin
// //             next();

// //         })
// //         .catch (() => res.status(401).json({message: "Invalid token"}));
// //     } catch (error) {
// //         res.status(401).json({message: "Invalid token"});
// //     }
// // };
// // router.post("/voting-events/:eventId/close", verifyAdminToken, getVotingEvent);
// // router.delete("/voting-events/:eventId/results", verifyAdminToken, closeVotingEvent);
// dotenv.config();
// interface AythRequest extends Request{
//     admin?: any;

// }
// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"
// const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ error: "Access denied. No token provided." });
//         }

//         const decoded: any= jwt.verify(token, SECRET_KEY);
//         if (typeof decoded !== "object" || !decoded.admin) {
//             return res.status(403).json({ message: "Access Denied. Admins only." });
//         }

//         req.admin = decoded; // Attach admin info
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// };

// // ✅ Close Voting Event
// router.patch("/voting-events/:eventId/close", verifyAdminToken, async (req: Request, res: Response) => {
//     try {
//         const { eventId } = req.params;
//         const event = await VotingEvent.findById(eventId);

//         if (!event) {
//             return res.status(404).json({ error: "Voting event not found" });
//         }

//         if (event.status === "closed") {
//             return res.status(400).json({ error: "Voting event is already closed." });
//         }

//         if (new Date() < new Date(event.endTime)) {
//             return res.status(400).json({ error: "Voting is still ongoing." });
//         }

//         event.status = "closed";
//         await event.save();
//         res.json({ message: "Voting event closed successfully", status: event.status });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // ✅ Get Voting Results
// router.get("/voting-events/:eventId/results", verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const event = await VotingEvent.findById(req.params.eventId).populate({
//             path: "categories",
//             populate: {
//                 path: "candidates",
//                 select: "name votes department profilePicture manifesto",
//             },
//         });

//         if (!event) {
//             res.status(404).json({ error: "Voting event not found" });
//             return;
//         }

//         const results = event.categories.map((category: any) => ({
//             categoryName: category.name,
//             candidates: category.candidates.map((candidate: any) => ({
//                 name: candidate.name,
//                 votes: candidate.votes,
//                 department: candidate.department,
//                 profilePicture: candidate.profilePicture,
//                 manifesto: candidate.manifesto,
//             })),
//         }));

//         res.json({ eventName: event.eventName, results });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

