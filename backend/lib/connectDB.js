import mongoose from "mongoose";

export default async function connectDB(){
    await mongoose.connect(`${process.env.DATABASE}`).then(()=>{
        console.log("\nConnected to Database\n");
    })
}