import { createEmbedding } from './embeddingService.js';

const input = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
]


export default function App() {
  async function handleClick() {
    try {
      const embedding = await createEmbedding(input);
      console.log(embedding);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>Text Embedding App</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

