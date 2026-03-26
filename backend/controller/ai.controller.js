import OpenAI from "openai"
import dotenv from "dotenv"
import PromptSchema from "../models/prompt.js"
import info from "./info.js";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_APP_NAME || "Minimoo"
    }
})

const chat = async (req, res) => {
    const { messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
            error: "Missing API key"
        });
    }

    await PromptSchema.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                { role: 'system', content: info },
                ...messages
            ]
        })

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to get response from OpenAI"
        });
    }
}

export default chat;