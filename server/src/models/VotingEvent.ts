import mongoose from "mongoose";
const votingEventSchema = new mongoose.Schema({
    eventName: { type: String, required:true },
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    // startTime: { 
    //     type: Date, 
    //     required: true,
    //     validate: {
    //         validator: (value: Date) => value > new Date(),
    //         message: "Start time must be in the future."
    //     }
    // },
    endTime: {type: Date, required: true},
    location: { type: String, required: false},
    status: {type: String, enum: ["ongoing", "closed"], default: "ongoing" },
});

votingEventSchema.index({ eventId: 1});

const VotingEvent = mongoose.model("VotingEvent", votingEventSchema);
export default VotingEvent;


