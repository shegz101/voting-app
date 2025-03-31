// import mongoose from "mongoose";

// const candidateSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     department: {type: String, required: true},
//     profilePicture: {type: String},
//     manifesto: {type: String},
//     categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
//     votes: {type: Number, default: 0},
//     eventId: { type: mongoose.Schema.Types.ObjectId, ref: "VotingEvent", required: true}
// });

// const Candidate = mongoose.model("Candidate", candidateSchema, "candidates");
// export default Candidate;