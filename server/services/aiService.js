const axios = require('axios');
require('dotenv').config();

const summarizeText = async (text) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: `Summarize this: ${text}` }],
                max_tokens: 150
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error summarizing text:", error);
        return "Error in summarization.";
    }
};

module.exports = { summarizeText };
