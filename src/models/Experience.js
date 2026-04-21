import mongoose from "mongoose";
import { headers } from "next/headers";

const ExperienceSchema = new mongoose.Schema(
    {
        position: String,
        company: String, 
        duration: String,
        location: String,
        jobprofile:String,
        order: { type: Number, default: 0 }
    },
    {timestamps:true}
);
delete mongoose.models.Experience;
const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;