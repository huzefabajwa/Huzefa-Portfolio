import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
    {
        heading:   String,
        summary:   String,
        roleTitle: String,   // editable subtitle under name, e.g. "CRM Consultant & Digital Transformation Expert"
        hireme:    String,
        upwork:    String,
        slack:     String,
        github:    String,
        linkedin:  String,
        stack:     String,
        imageUrl:  String,   // profile photo — uploaded + cropped via /api/upload
    },
    { timestamps: true }
);
const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);
export default Home;