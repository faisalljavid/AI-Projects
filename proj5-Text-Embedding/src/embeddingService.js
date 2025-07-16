import { splitDocument } from './chunkingText.js';
import { openai, supabase } from './config.js';

export async function createAndStoreEmbeddings(document, tableName = 'movies') {
    try {
        const chunkData = await splitDocument(document);
        const textChunks = chunkData.map(doc => doc.pageContent);
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: textChunks,
            encoding_format: "float",
        });
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('OpenAI response missing data array.');
        }
        const result = textChunks.map((textItem, index) => {
            return {
                content: textItem,
                embedding: response.data[index].embedding
            };
        });
        const { error } = await supabase.from(tableName).insert(result);
        if (error) {
            throw new Error('Issue inserting data into the database.');
        }
        console.log("SUCCESS!");
    } catch (error) {
        console.error('ERROR ' + error.message);
        throw error;
    }
}