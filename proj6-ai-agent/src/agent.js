import OpenAI from "openai"
import { getCurrentWeather, getLocation } from "./tools/tools.js"

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const availableFunctions = {
    getCurrentWeather,
    getLocation
}


async function runAgent(query) {

    const systemPrompt = `
    You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. 
    Your final answer should be highly specific to the observations you have from running
    the actions.
    1. Thought: Describe your thoughts about the question you have been asked.
    2. Action: run one of the actions available to you - then return PAUSE.
    3. PAUSE
    4. Observation: will be the result of running those actions.

    Available actions:
    - getCurrentWeather: 
        E.g. getCurrentWeather: Salt Lake City
        Returns the current weather of the location specified.
    - getLocation:
        E.g. getLocation: null
        Returns user's location details. No arguments needed.

    Example session:
    Question: Please give me some ideas for activities to do this afternoon.
    Thought: I should look up the user's location so I can give location-specific activity ideas.
    Action: getLocation: null
    PAUSE

    You will be called again with something like this:
    Observation: "New York City, NY"

    Then you loop again:
    Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
    Action: getCurrentWeather: New York City
    PAUSE

    You'll then be called again with something like this:
    Observation: { location: "New York City, NY", forecast: ["sunny"] }

    You then output:
    Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
    `
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
    ]

    const MAX_ITERATIONS = 5
    const actionRegex = /^\s*Action: (\w+): (.*)$/

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        console.log(`Iteration #${i + 1}`);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages
        })

        /**
         * PLAN:
         * 1. Split the string on the newline character \n
         * 2. Search through the array of strings for one that has "Action:"
         * 3. Parse the action (function and parameter) from the string
         * 4. Calling the function
         * 5. Add an "Obversation" message with the results of the function call
         */

        const responseText = response.choices[0].message.content
        console.log(responseText)

        messages.push({ role: "assistant", content: responseText })

        const responseLines = responseText.split('\n')
        const foundActionStr = responseLines.find(str => actionRegex.test(str))

        if (foundActionStr) {
            const actions = actionRegex.exec(foundActionStr)
            const [_, action, actionArg] = actions

            if (!(action in availableFunctions)) {
                throw new Error(`Unknown action: ${action}: ${actionArg}`)
            }

            console.log(`Calling function ${action} with argument ${actionArg}`);


            const observation = await availableFunctions[action](actionArg)
            messages.push({ role: "assistant", content: `Observation: ${observation}` })
        } else {
            console.log("Agent finished with task")
            return responseText
        }
    }

}


// This line runs immediately when the file is imported
console.log(await runAgent("What are some activity ideas that I can do this afternoon based on my location and weather?"))