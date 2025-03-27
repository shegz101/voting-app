import mongoose from "mongoose";

export interface ICategory extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    eventId: mongoose.Types.ObjectId;
    candidates: mongoose.Types.ObjectId[];
}
const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: "VotingEvent"},
    candidates: [{type: mongoose.Schema.Types.ObjectId, ref: "Candidate"}]
});
const Category = mongoose.model("Category", categorySchema);
export default Category;

