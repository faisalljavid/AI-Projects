import OpenAI from "openai"
import { getCurrentWeather, getLocation } from "./tools/tools.js"

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

async function runAgent() {
    const weather = await getCurrentWeather()
    const location = await getLocation()

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Give me a list of activity ideas based on my current location of ${location} and weather of ${weather}`
            }
        ]
    })

    console.log(response.choices[0].message.content)
}

runAgent() // This line runs immediately when the file is imported