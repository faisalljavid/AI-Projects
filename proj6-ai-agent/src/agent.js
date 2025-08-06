import OpenAI from "openai"
import { getCurrentWeather, getLocation, tools } from "./tools/tools.js"
import { renderNewMessage } from "./tools/dom.js"

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const availableFunctions = {
    getCurrentWeather,
    getLocation
}


async function runAgent(query) {

    const messages = [
        {
            role: "system", content: `You are a helpful AI agent. Give highly specific answers based on the information you're provided. 
            Prefer to gather information with the tools provided to you rather than giving basic, generic answers. And also don't try to use bold formatting.`
        },
        {
            role: "user", content: query
        }
    ]

    renderNewMessage(query, "user")

    const MAX_ITERATIONS = 5
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            tools
        })

        /**
         * PLAN:
         * 1. Split the string on the newline character \n
         * 2. Search through the array of strings for one that has "Action:"
         * 3. Parse the action (function and parameter) from the string
         * 4. Calling the function
         * 5. Add an "Obversation" message with the results of the function call
         */

        const { finish_reason: finishReason, message } = response.choices[0]
        const { tool_calls: toolCalls } = message

        messages.push(message)

        if (finishReason === "stop") {
            renderNewMessage(message.content, "assistant")
            return

        } else if (finishReason === "tool_calls") {
            for (const toolCall of toolCalls) {
                // get the function name
                // access the actual function from the array of available functions
                // call the function
                const functionName = toolCall.function.name
                const functionToCall = availableFunctions[functionName]
                const functionArgs = JSON.parse(toolCall.function.arguments)
                const functionResponse = await functionToCall(functionArgs)

                messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName,
                    content: functionResponse
                })
            }
        }
    }
}



document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputElement = document.getElementById("user-input")
    inputElement.focus()
    const formData = new FormData(event.target)
    const query = formData.get("user-input")
    event.target.reset()
    await runAgent(query)
})