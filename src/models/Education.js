import mongoose from "mongoose";
import { headers } from "next/headers";

const EducationSchema = new mongoose.Schema(
    {
        degree: String,
        year: String, 
        college: String,
        order: { type: Number, default: 0 }
    },
    {timestamps:true}
);
delete mongoose.models.Education;
const Education = mongoose.model("Education", EducationSchema);
export default Education;