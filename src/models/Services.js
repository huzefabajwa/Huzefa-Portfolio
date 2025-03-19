import mongoose from "mongoose";
import { headers } from "next/headers";

const ServiceSchema = new mongoose.Schema(
    {
        title: String,
        service: String, 
        fareacticon: String,
    },
    {timestamps:true}
);
const Services = mongoose.models.Services || mongoose.model("Services", ServiceSchema);
export default Services;