import mongoose from "mongoose";

export default async function connectToDb() {
    try{
        await mongoose.connect(
            "mongodb+srv://huzefa:huzefa123@cluster0.fphbdbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Database connected");
    }
    catch (e){
        console.log(e);
    }
}