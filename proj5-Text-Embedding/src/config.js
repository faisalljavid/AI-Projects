import OpenAI from "openai"

// Check if API key is available
if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("OpenAI API Key is missing or invalid.");
}

// OpenAI config
export default new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})