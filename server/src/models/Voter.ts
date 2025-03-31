import mongoose, {Schema, Document} from "mongoose";

interface Ivoter extends Document {
    voterId: string;
    candidateId: mongoose.Types.ObjectId;
    // To track when each vote was cast
    createdAt: Date;
}
const VoterSchema = new Schema<Ivoter>({
    voterId: {type: String, required: true},
    candidateId: {type: Schema.Types.ObjectId, ref: "Candidate", required: true},
    //To store the voting time
    createdAt: { type: Date, default: Date.now }
});
// Ensure a voter can only vote once per category
VoterSchema.index({ voterId: 1, categoryId: 1}, {unique: true});

const Voter = mongoose.model<Ivoter>("Voter", VoterSchema);
export default Voter;