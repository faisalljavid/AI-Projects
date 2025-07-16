import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function splitDocument(document) {
    let text = '';
    if (typeof document === 'string') {
        // If a string is passed, use it directly
        text = document;
    } else if (document instanceof File) {
        // If a File object is passed, read it using FileReader
        text = await readFileAsText(document);
    } else {
        throw new Error('Invalid document type. Must be a string or File.');
    }
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 35,
    });
    const output = await splitter.createDocuments([text]);
    return output;
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
} 