import { openai } from "./config"

export async function getChatCompletion(text, query) {
    const messages = [
        {
            role: 'system',
            content: `You are an enthusiastic podcast expert who loves recommending podcasts to people.
            You will be given two pieces of information - some context about podcasts episodes and a question. 
            Your main job is to formulate a short answer to the question using the provided context. 
            If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." 
            Please do not make up the answer.`
        },
        {
            role: 'user',
            content: `Context: ${text} Question: ${query}`
        }
    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: messages,
        temperature: 0.5,
        frequency_penalty: 0.5
    })
    return response.choices[0].message.content
}