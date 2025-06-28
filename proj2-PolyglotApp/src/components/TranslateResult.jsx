import React from 'react';
import '../App.css';

export default function TranslateResult({ original, translation, onReset }) {
    return (
        <div className="translate-form">
            <h2 className="section-title">Original text <span>👇</span></h2>
            <div className="result-box">{original}</div>

            <h2 className="section-title">Your translation <span>👇</span></h2>
            <div className="result-box">{translation}</div>

            <button onClick={onReset} className="translate-btn">Start Over</button>
        </div>
    );
};

