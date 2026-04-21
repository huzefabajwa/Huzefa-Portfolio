import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema(
    {
        name:              String,
        application:       String,
        github:            String,
        imageUrl:          String,      // thumbnail (primary card image)
        images:            [String],    // gallery — up to 4 additional
        description:       String,      // rich HTML from Quill editor
        shortdescription:  String,
        playstore:         String,
        techstack:         String,
        ios:               String,
        weburl:            String,
        projecttype:       String,
        tags:              [String],
        thumbnailPosition: { type: String, default: "center" }, // "top" | "center" | "bottom"
    },
    { timestamps: true }
);

const Projects = mongoose.models.Projects || mongoose.model("Projects", ProjectsSchema);
export default Projects;