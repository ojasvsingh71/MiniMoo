import { OpenAI } from "openai/client.js";
import dotenv from "dotenv"

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const chat = async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: "You are MiniMoo, helpful assistant." },
                { role: 'user', content: prompt },
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