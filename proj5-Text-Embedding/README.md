# Text Embedding App

A React application that generates text embeddings using OpenAI's API.

## Project Structure

The project follows a modular structure similar to the tutorial:

- **`src/config.js`** - OpenAI configuration and client setup
- **`src/embeddingService.js`** - Text embedding functionality
- **`src/App.jsx`** - Main React component with UI
- **`src/App.css`** - Styling for the application

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your OpenAI API key:**
   Create a `.env` file in the root directory and add:
   ```
   VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
   ```
   
   **Important:** Replace `your_actual_openai_api_key_here` with your real OpenAI API key.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## How it Works

1. **Configuration (`config.js`):**
   - Imports OpenAI client
   - Validates API key from environment variables
   - Creates and exports configured OpenAI instance

2. **Embedding Service (`embeddingService.js`):**
   - Imports the configured OpenAI client
   - Provides `createEmbedding()` function for text embedding
   - Includes error handling and testing function

3. **React App (`App.jsx`):**
   - Uses React hooks for state management
   - Imports embedding service
   - Provides user interface for text input and embedding generation
   - Displays results with proper error handling

## Features

- ✅ Text input with validation
- ✅ Real-time embedding generation
- ✅ Loading states and error handling
- ✅ Beautiful, responsive UI
- ✅ Display of embedding metadata and vector data
- ✅ Modular, maintainable code structure

## API Usage

The app uses OpenAI's `text-embedding-ada-002` model to generate embeddings. Each request includes:
- Model specification
- Input text
- Float encoding format

## Troubleshooting

- **"OpenAI API Key is missing" error:** Make sure you've created a `.env` file with your API key
- **API errors:** Check your OpenAI API key is valid and has sufficient credits
- **CORS issues:** The app uses `dangerouslyAllowBrowser: true` for client-side API calls

## Technologies Used

- React 19
- Vite
- OpenAI API
- Modern CSS with gradients and animations
