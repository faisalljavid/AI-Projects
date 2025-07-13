import { createEmbedding } from './embeddingService.js';
import { vectorSearch } from "./vectorSearch.js"
import { getChatCompletion } from './chatCompletion.js';
import podcasts from "./assets/contents.js"
import "./App.css"

// User query about podcasts
const query = "Something related to Space"

export default function App() {
  // Store embeddings into Supabase
  async function handleClickStore() {
    try {
      const embedding = await createEmbedding(podcasts);
      console.log(embedding);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }

  // Vector similarity search
  async function handleClickSearch() {
    try {
      const search = await vectorSearch(query);
      console.log(search);
    } catch (error) {
      console.error('Error in vector search:', error);
    }
  }

  // Use GPT-4 to generate chat-style answer
  async function handleClickChatCompletion() {
    try {
      const context = await vectorSearch(query)
      const response = await getChatCompletion(context, query)
      console.log(response);

    } catch (error) {
      console.log("Chat completion error:", error);
    }
  }

  return (
    <main>
      <h1>Text Embedding App</h1>
      <button onClick={handleClickStore} className='store-button'>Store Data</button>
      <button onClick={handleClickSearch} className='search-button'>Search Data</button>
      <button onClick={handleClickChatCompletion} className='chat-button'>Chat Completion</button>
    </main>
  )
}