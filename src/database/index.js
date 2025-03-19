import mongoose from "mongoose";

export default async function connectToDb() {
    try{
        await mongoose.connect(
            "mongodb+srv://huzefa:huzefa123@cluster0.hrv9y.mongodb.net/"
        );
        console.log("Database connected");
    }
    catch (e){
        console.log(e);
    }
}