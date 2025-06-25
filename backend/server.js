import express from "express"
import dotenv from "dotenv"

const app = express();

dotenv.config();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("\nAPI is running\n");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer running on http://localhost:${process.env.PORT}\n`)
})