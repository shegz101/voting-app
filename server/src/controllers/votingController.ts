//polling
//ENDPOINT: GET /api/admin/voting-events/:eventId/results
import { Request, Response, NextFunction} from "express";
import Category from "../models/Category";
import Candidate from "../models/Candidate";
import VotingEvent from "../models/VotingEvent";
interface AuthRequest extends Request {
    user?: { id: string; role: "admin" };
}

export const getVotingResults = async (req: Request, res: Response) => {
    try {
        const {eventId} = req.params;
        const event = await VotingEvent.findById(eventId).populate({
            path: "categories",
            populate: {
                path: "candidates",
                select: "name votes department profilePicture manifesto",
            },
        });

        if (!event) {
            res.status(404).json({error: "voting event not found"});
            return;
        }
        const results = event.categories.map((category: any) => ({
            categoryName: category.name,
            candidates: category.candidates.map((candidate: any) => ({
                name: candidate.name,
                votes: candidate.votes,
                department: candidate.department,
                profilePicture: candidate.profilePicture,
                manifesto: candidate.manifesto,
            })),
        }));
        res.json({eventName: event.eventName, results});
    } catch (error) {
        console.error("Error fetching voting results:", error);
        res.status(500).json({error: "Server error"});
    }
};

//Update Voting Event Status (Ongoing → Closed)
//ENDPOINT: PATCH /api/admin/voting-events/:eventId/close

export const closeVotingEvent = async (req: Request, res: Response) => {
    try{
        const {eventId} = req.params;
        const event = await VotingEvent.findById(eventId);
        if (!event) {
            return res.status(404).json({error: "Voting event not found"});
        }
        //to check if event is already closed
        if (event.status === "closed") {
            return res.status(400).json({error: "Voting event is already closed"});
        }

        //check if the deadline has passed
        if(new Date() < new Date(event.endTime)) {
            return res.status(400).json({error: "voting is still ongoing"});
        }
        event.status = "closed";
        await event.save();
        res.json({message: "Voting event closed succssfully", status: event.status });
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
};

//automatically close voting events when the deadline passes
// import VotingEvent from "../models/VotingEvent";
const checkAndCloseVotingEvent = async () => {
    const now = new Date();
    const events = await VotingEvent.find({ status: "ongoing", endTime: { $lte: now} });

    for (const event of events) {
        event.status = "closed";
        await event.save();
        console.log(`Voting event "${event.eventName}" has been closed.`);
    }
};

//  Create a new voting event
export const createVotingEvent = async (req: Request, res: Response) => {
    try{
        const{eventName, categories, duration} = req.body;
        const newEvent = new VotingEvent({
            eventName,
            categories,
            duration,
            status: "ongoing",
        });
        await newEvent.save();
        res.status(201).json({ message: "Voting event created successfully", event: newEvent});
    } catch(error) {
        res.status(500).json({error: "Failed to create voting event"});
    }
};

//Delete a voting event


export const deleteVotingEvent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { eventId } = req.params;

        // Find the event first
        const event = await VotingEvent.findById(eventId);
        if (!event) {
            res.status(404).json({ error: "Voting event not found" });
            return;
        }

        // Delete all categories under this event
        const deletedCategories = await Category.find({ eventId });
        await Category.deleteMany({ eventId });

        // Delete all candidates under those categories
        const categoryIds = deletedCategories.map(cat => cat._id);
        await Candidate.deleteMany({ categoryId: { $in: categoryIds } });

        // Finally, delete the event itself
        await VotingEvent.findByIdAndDelete(eventId);

        res.json({ message: "Voting event and all related data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete voting event" });
    }
};

// export const deleteVotingEvent = async (req: Request, res: Response) => {
//     try{
//         const {eventId} = req.params;
//         const deletedEvent = await VotingEvent.findByIdAndDelete(eventId);

//         if (!deletedEvent) {
//             return res.status(404).json({error: "Voting event not found"});
//         }
//         res.json({message: "Voting event deleted successfully"});
//     } catch (error) {
//         res.status(500).json({error: "Failed to delete voting event"})
//     }
// };
// //running every 1 min
setInterval(checkAndCloseVotingEvent, 60000);