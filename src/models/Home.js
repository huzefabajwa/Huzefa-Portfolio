import mongoose from "mongoose";
import { headers } from "next/headers";

const HomeSchema = new mongoose.Schema(
    {
        heading: String,
        summary: String,
        hireme:String,
        upwork:String,
        slack:String,
        github:String,
        linkedin:String,
        stack:String,
    },
    {timestamps:true}
);
const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);
export default Home;