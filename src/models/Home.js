import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
    {
        heading:  String,
        summary:  String,
        hireme:   String,
        upwork:   String,
        slack:    String,
        github:   String,
        linkedin: String,
        stack:    String,
        imageUrl: String,   // profile photo — uploaded via /api/upload
    },
    { timestamps: true }
);
const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);
export default Home;