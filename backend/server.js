import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/connectDB.js";
import AIrouter from "./routes/ai.route.js";
import cors from "cors";

const app = express();

dotenv.config();
connectDB();

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("\nAPI is running\n");
})

app.use("/", AIrouter);

app.listen(process.env.PORT, () => {
    console.log(`\nServer running on http://localhost:${process.env.PORT}\n`)
})