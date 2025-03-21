import mongoose from "mongoose";
import { headers } from "next/headers";

const ReviewSchema = new mongoose.Schema(
    {
        author: String,
        content: String,
        company: String,  
        rating: { type: Number, required: true },
    },
    {timestamps:true}
);
const Reviews = mongoose.models.Reviews || mongoose.model("Reviews", ReviewSchema);
export default Reviews;