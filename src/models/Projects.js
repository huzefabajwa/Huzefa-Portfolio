import mongoose from "mongoose";
import { headers } from "next/headers";

const ProjectsSchema = new mongoose.Schema(
    {
        name: String,
        application: String, 
        github: String,
        imageUrl: [String],
        imageUrl1:String,
        imageUrl2:String,
        imageUrl3:String,
        description: String,
        shortdescription: String,
        playstore: String,
        techstack: String,
        ios: String,
        weburl: String,
        projecttype: String,
    },
    {timestamps:true}
);
const Projects = mongoose.models.Projects || mongoose.model("Projects", ProjectsSchema);
export default Projects;