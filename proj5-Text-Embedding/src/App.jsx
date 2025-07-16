import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { createAndStoreEmbeddings } from './embeddingService.js';
import { vectorSearch } from './vectorSearch.js';
import './App.css';

// UploadDB page for uploading/selecting DB
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
        // Store DB name in state and localStorage
        setDbName(name);
        localStorage.setItem('dbName', name);
        // Create embeddings and store in Supabase
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
      <h2>Upload Your Own Database</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Database Name" value={name} onChange={handleNameChange} />
      <button onClick={handleStore} disabled={!file || !name || loading}>Store</button>
      {loading && <div>Processing and storing embeddings...</div>}
      {success && <div className="success-msg">Database stored! Redirecting...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
      setChatMessages(updatedHistory); // update history for next turn
    } catch (err) {
      setError('Error: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home-layout">
      <div className="left">Using database <b>{dbName}</b></div>
      <div className="center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-box"
          />
          <button type="submit" className="search-icon" disabled={loading}>🔍</button>
        </form>
        {loading && <div>Searching...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {results && (
          <div className="results-box">
            {results.map((r, i) => <div key={i}>{r}</div>)}
          </div>
        )}
      </div>
      <div className="right">
        <button className="use-own-db" onClick={() => navigate('/upload-db')}>Use your own db</button>
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