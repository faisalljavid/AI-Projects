import { openai, supabase } from './config.js';

// For question embedding
async function createEmbedding(input) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input
    });
    return response.data[0].embedding;
}

// For Supabase search
async function findNearestMatch(embedding, dbName = 'movies') {
    // The RPC function name may need to match the table/db name
    const fnName = `match_${dbName}`;
    const { data } = await supabase.rpc(fnName, {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: 3,
    });
    const match = data.map(obj => obj.content).join(' ');
    return match;
}

const systemPrompt = {
    role: 'system',
    content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If the answer is not given in the context, find the answer in the conversation history if possible. If you are unsure and cannot find the answer, say, "Sorry, I don't know the answer." Please do not make up the answer. Always speak as if you were chatting to a friend.`
};

// Main function to be called from UI
export async function vectorSearch(query, dbName = 'movies', chatMessages = null) {
    try {
        const embedding = await createEmbedding(query);
        const context = await findNearestMatch(embedding, dbName);

        // If no chatMessages provided, start a new array with system prompt
        if (!chatMessages) {
            chatMessages = [systemPrompt];
        }

        // Add the new user message
        chatMessages.push({
            role: 'user',
            content: `Context: ${context} Question: ${query}`
        });

        const response = await openai.chat.completions.create({
            model: 'gpt-4.1',
            messages: chatMessages,
            temperature: 0.65,
            frequency_penalty: 0.5,
        });

        // Add the assistant's reply to the history
        const assistantMessage = response.choices[0].message;
        chatMessages.push(assistantMessage);

        return {
            answer: assistantMessage.content,
            chatMessages // return updated history for next turn
        };
    } catch (error) {
        console.error("Error in vectorSearch function", error);
        throw error;
    }
}