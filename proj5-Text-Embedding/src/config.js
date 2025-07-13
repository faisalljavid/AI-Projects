import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

// Check if API key is available
if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("OpenAI API Key is missing or invalid.");
}

// OpenAI config
export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

// Supabase config
const privateKey = import.meta.env.VITE_SUPABASE_API_KEY
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`)
const url = import.meta.env.VITE_SUPABASE_URL
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
export const supabase = createClient(url, privateKey)