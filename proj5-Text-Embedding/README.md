# VectorMind 🧠

A modern, AI-powered vector database search and chat application built with React. VectorMind allows you to upload any text database, create embeddings, and perform intelligent semantic search with conversational AI responses.

![VectorMind](https://img.shields.io/badge/VectorMind-AI%20Powered-blue)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)
![Supabase](https://img.shields.io/badge/Supabase-Vector%20DB-3ecf8e)

## 🚀 Features

- **Universal Database Support**: Upload any text file as your knowledge base
- **Intelligent Chunking**: Automatically splits documents using LangChain's recursive text splitter
- **Vector Embeddings**: Powered by OpenAI's text-embedding-3-small model
- **Semantic Search**: Find relevant information using vector similarity
- **Conversational AI**: Get chat-style answers using GPT-4
- **Chat History**: Maintains conversation context across multiple queries
- **Modern UI**: Clean, responsive design with beautiful gradients
- **Real-time Processing**: Live feedback during upload and search operations

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router, CSS3
- **AI/ML**: OpenAI GPT-4, OpenAI Embeddings API
- **Database**: Supabase (PostgreSQL with pgvector)
- **Text Processing**: LangChain
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel, Netlify, or any static host

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenAI API key
- Supabase account and project

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd proj5-Text-Embedding
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_anon_key
```

**Important**: Replace the placeholder values with your actual API keys.

### 3. Supabase Database Setup

#### Step 1: Enable the pgvector Extension

In your Supabase SQL editor, run:

```sql
-- Enable the pgvector extension
create extension if not exists vector;
```

#### Step 2: Create the Default Movies Table

```sql
-- Create movies table (you can rename this to any database name)
create table movies (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
```

#### Step 3: Create the Search Function

```sql
-- Create a function to search for movies
create or replace function match_movies (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    movies.id,
    movies.content,
    1 - (movies.embedding <=> query_embedding) as similarity
  from movies
  where movies.embedding <=> query_embedding < 1 - match_threshold
  order by movies.embedding <=> query_embedding
  limit match_count;
$$;
```

#### Step 4: Create Additional Database Tables (Optional)

For each new database you want to create, follow this pattern:

```sql
-- Replace 'your_db_name' with your actual database name
create table your_db_name (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);

-- Create corresponding search function
create or replace function match_your_db_name (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    your_db_name.id,
    your_db_name.content,
    1 - (your_db_name.embedding <=> query_embedding) as similarity
  from your_db_name
  where your_db_name.embedding <=> query_embedding < 1 - match_threshold
  order by your_db_name.embedding <=> query_embedding
  limit match_count;
$$;
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage Guide

### Uploading a Database

1. Click **"Upload New Database"** button
2. Select a text file (`.txt`, `.md`, etc.)
3. Give your database a meaningful name
4. Click **"Store"** to process and upload
5. Wait for processing (chunking + embedding generation)
6. You'll be redirected to the homepage automatically

### Searching Your Database

1. Type your question in the search box
2. Click the search button or press Enter
3. VectorMind will:
   - Convert your query to embeddings
   - Find the most relevant content chunks
   - Generate a conversational response using GPT-4
4. Continue the conversation - chat history is maintained!

### Managing Multiple Databases

- The current database name is shown in the top-left
- You can upload multiple databases
- Each database is stored separately in Supabase
- Switch between databases by uploading a new one

## ⚙️ Configuration

### Chunking Parameters

In `src/chunkingText.js`, you can adjust:

```javascript
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,        // Characters per chunk
    chunkOverlap: 35,      // Overlap between chunks
});
```

### Search Parameters

In `src/vectorSearch.js`, adjust the search sensitivity:

```javascript
const { data } = await supabase.rpc(fnName, {
    query_embedding: embedding,
    match_threshold: 0.3,  // Similarity threshold (0-1)
    match_count: 3,        // Number of results to return
});
```

### AI Model Configuration

The app uses:
- **Embeddings**: `text-embedding-3-small` (1536 dimensions)
- **Chat**: `gpt-4.1` with temperature 0.65

## 🏗️ Project Structure

```
src/
├── App.jsx              # Main app component with routing
├── App.css              # Global styles and layout
├── chunkingText.js      # Document splitting logic
├── embeddingService.js  # OpenAI embeddings + Supabase storage
├── vectorSearch.js      # Search and chat completion
├── config.js            # API client configuration
└── assets/
    └── movies.txt       # Sample data file
```

## 🔍 How It Works

1. **Document Upload**: User uploads a text file
2. **Chunking**: Text is split into overlapping chunks using LangChain
3. **Embedding**: Each chunk is converted to a 1536-dimensional vector using OpenAI
4. **Storage**: Chunks and embeddings are stored in Supabase
5. **Search**: User queries are embedded and compared using cosine similarity
6. **Response**: Relevant chunks are sent to GPT-4 for conversational responses

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🛠️ Troubleshooting

### Common Issues

**1. "OpenAI API Key is missing" error**
- Check your `.env` file
- Ensure the key starts with `sk-`
- Restart the development server

**2. "Supabase connection failed"**
- Verify your Supabase URL and API key
- Check if pgvector extension is enabled
- Ensure tables and functions are created

**3. "No search results"**
- Check if embeddings were stored properly
- Adjust `match_threshold` (try 0.5 or 0.7)
- Verify the search function name matches your table

**4. "Chunk processing errors"**
- Install LangChain: `npm install langchain`
- Check file format (text files work best)
- Ensure file is not too large

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 and embeddings API
- Supabase for vector database capabilities
- LangChain for text processing utilities
- React team for the amazing framework

---

**VectorMind** - Making knowledge searchable and conversational! 🧠✨
