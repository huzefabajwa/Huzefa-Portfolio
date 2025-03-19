import mongoose from "mongoose";
import { headers } from "next/headers";

const AboutSchema = new mongoose.Schema(
    {
        aboutme: { type: String, required: true },
        noofprojects: { type: Number, required: true },
        yearsofexperience: { type: Number, required: true },
        noofclients: { type: Number, required: true },
        skills: { type: String, required: true },
    },
    {timestamps:true}
);
const About = mongoose.models.About || mongoose.model("About", AboutSchema);
export default About;