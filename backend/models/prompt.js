import mongoose from "mongoose"

const prompt = new mongoose.Schema({
    prompt: {
        type: String,
        require: true,
    },

}, { timestamps: true });

const PromptSchema = mongoose.model("User", prompt);

export default PromptSchema;