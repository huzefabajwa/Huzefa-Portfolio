import mongoose from "mongoose";
import { headers } from "next/headers";

const UserSchema = new mongoose.Schema(
    {
        username : String,
        password: String, 
    },
    {timestamps:true}
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;