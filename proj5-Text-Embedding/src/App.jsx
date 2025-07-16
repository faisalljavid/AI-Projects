import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { createAndStoreEmbeddings } from './embeddingService.js';
import { vectorSearch } from './vectorSearch.js';
import './App.css';

function AppHeader() {
  return (
    <header className="app-header">
      <h1 className="app-title">VectorMind</h1>
    </header>
  );
}

function UploadDB({ setDbName }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  async function handleStore() {
    if (file && name) {
      setError('');
      setLoading(true);
      try {
        setDbName(name);
        localStorage.setItem('dbName', name);
        await createAndStoreEmbeddings(file, name);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1200);
      } catch (err) {
        setError('Error storing data: ' + (err.message || err));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="upload-db-page">
      <AppHeader />
      <div className="upload-db-card">
        <h2>Upload Your Own Database</h2>
        <input type="file" onChange={handleFileChange} />
        <input type="text" placeholder="Database Name" value={name} onChange={handleNameChange} />
        <button onClick={handleStore} disabled={!file || !name || loading}>Store</button>
        {loading && <div>Processing and storing embeddings...</div>}
        {success && <div className="success-msg">Database stored! Redirecting...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </main>
  );
}

function Home({ dbName }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setResults(null);
    setError('');
    setLoading(true);
    try {
      const { answer, chatMessages: updatedHistory } = await vectorSearch(query, dbName, chatMessages);
      setResults([answer]);
      setChatMessages(updatedHistory);
    } catch (err) {
      setError('Error: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home-page">
      <AppHeader />

      <div className="top-bar">
        <div className="db-info">
          <span className="db-text">Database: <strong>{dbName}</strong></span>
        </div>
        <button className="upload-btn" onClick={() => navigate('/upload-db')}>
          Upload New Database
        </button>
      </div>

      <div className="search-container">
        <div className="search-content">
          <form onSubmit={handleSearch} className="search-form-new">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Ask me anything about your database..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input-new"
              />
              <button type="submit" className="search-btn-new" disabled={loading}>
                {loading ? '...' : '🔍'}
              </button>
            </div>
          </form>

          {error && <div className="error-msg">{error}</div>}

          {results && (
            <div className="answer-box">
              <h3>Answer</h3>
              <div className="answer-content">
                {results.map((r, i) => <div key={i}>{r}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [dbName, setDbName] = useState(() => localStorage.getItem('dbName') || 'Default DB');

  useEffect(() => {
    localStorage.setItem('dbName', dbName);
  }, [dbName]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home dbName={dbName} />} />
        <Route path="/upload-db" element={<UploadDB setDbName={setDbName} />} />
      </Routes>
    </Router>
  );
}