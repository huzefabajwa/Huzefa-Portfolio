import mongoose from "mongoose";
import { headers } from "next/headers";

const ExperienceSchema = new mongoose.Schema(
    {
        position: String,
        company: String, 
        duration: String,
        location: String,
        jobprofile:String
    },
    {timestamps:true}
);
const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
export default Experience;