import mongoose from "mongoose";
import { headers } from "next/headers";

const AboutSchema = new mongoose.Schema(
    {
        aboutme: { type: String, required: true },
        noofprojects: { type: String, required: false },
        yearsofexperience: { type: String, required: false },
        noofclients: { type: String, required: false },
        skills: { type: String, required: false },
    },
    {timestamps:true}
);
const About = mongoose.models.About || mongoose.model("About", AboutSchema);
export default About;