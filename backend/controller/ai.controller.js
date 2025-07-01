import { OpenAI } from "openai/client.js";
import dotenv from "dotenv"
import PromptSchema from "../models/prompt.js"
import info from "./info.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const chat = async (req, res) => {
    const { messages } = req.body;

    await PromptSchema.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
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