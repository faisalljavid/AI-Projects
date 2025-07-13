import { createEmbedding } from './embeddingService.js';
import { vectorSearch } from "./vectorSearch.js"
import podcasts from "./assets/contents.js"
import "./App.css"

// User query about podcasts
const query = "Jammin'n in the Big Easy"

export default function App() {
  async function handleClickStore() {
    try {
      const embedding = await createEmbedding(podcasts);
      console.log(embedding);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function handleClickSearch() {
    try {
      const search = await vectorSearch(query);
      console.log(search);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <main>
      <h1>Text Embedding App</h1>
      <button onClick={handleClickStore} className='store-button'>Store Data</button>
      <button onClick={handleClickSearch} className='search-button'>Search Data</button>
    </main>
  )
}