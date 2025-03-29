// import mongoose from "mongoose";
// import Candidate from "./Candidate";
// const votingEventSchema = new mongoose.Schema({
//     eventName: { type: String, required:true },
//     // categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
//     // startTime: { 
//     //     type: Date, 
//     //     required: true,
//     //     validate: {
//     //         validator: (value: Date) => value > new Date(),
//     //         message: "Start time must be in the future."
//     //     }
//     // },
//     endTime: {type: Date, required: true},
//     location: { type: String, required: false},
//     status: {type: String, enum: ["ongoing", "closed"], default: "ongoing" },
//     Candidate: [
//         {name: {type: String, required: true},
//         department: {type: String, required: true},
//         profilePicture: {type: String},
//         manifesto: {type: String},
//         votes: {type: Number, default: 0},
//         eventId: { type: mongoose.Schema.Types.ObjectId, ref: "VotingEvent", required: true}
//     }
//     ]
// });

// votingEventSchema.index({ eventId: 1});

// const VotingEvent = mongoose.model("VotingEvent", votingEventSchema);
// export default VotingEvent;


// models/VotingEvent.ts
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manifesto: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    votes: { type: Number, default: 0 },
  },
  { _id: true } // each candidate gets its own _id
);

const votingEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  endTime: { type: Date, required: true },
  location: { type: String, required: false },
  status: { type: String, enum: ["ongoing", "closed"], default: "ongoing" },
  // Now candidates are embedded in the event document
  candidates: [candidateSchema],
});

votingEventSchema.index({ eventId: 1 });

const VotingEvent = mongoose.model("VotingEvent", votingEventSchema);
export default VotingEvent;
