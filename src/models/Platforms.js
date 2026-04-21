import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        logoUrl: { type: String },
        color: { type: String, default: "#00A1E0" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Platforms = mongoose.models.Platforms || mongoose.model("Platforms", PlatformSchema);
export default Platforms;
