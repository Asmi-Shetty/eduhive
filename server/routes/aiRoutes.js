const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Delay function to prevent hitting rate limits
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to make OpenAI request with retry logic
async function getSummary(text, retries = 5, delay = 1000) {
    try {
        await sleep(delay);

        const response = await axios.post(
            "https://api.llama.com/v1/",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Summarize this: ${text}` }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000, 
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        if (error.response?.status === 429 && retries > 0) {
            console.log(`Rate limit reached. Retrying in ${delay}ms...`);
            await sleep(delay);
            return getSummary(text, retries - 1, delay * 2);
        } else {
            throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}

// Function to get AI chat response
async function getChatResponse(message, retries = 5, delay = 1000) {
    try {
        await sleep(delay);

        const response = await axios.post(
            "https://api.llama-api.com",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000,
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        if (error.response?.status === 429 && retries > 0) {
            console.log(`Rate limit reached. Retrying in ${delay}ms...`);
            await sleep(delay);
            return getChatResponse(message, retries - 1, delay * 2);
        } else {
            throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}

// Express route to summarize text
router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });

        const summary = await getSummary(text);
        res.json({ summary });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Express route for AI chat
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: "Message is required" });

        const response = await getChatResponse(message);
        res.json({ response });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;