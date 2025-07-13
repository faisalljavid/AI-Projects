import { openai, supabase } from './config.js';

export async function createEmbedding(input) {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input,
            encoding_format: "float",
        })

        const result = input.map((textItem, index) => {
            return {
                content: textItem,
                embedding: response.data[index].embedding
            }
        })

        // Insert content and embedding into Supabase
        await supabase.from('documents').insert(result)
        console.log("Embedding and storing complete!")
        return result

    } catch (error) {
        console.error('Error creating embedding:', error);
        throw error;
    }
} 