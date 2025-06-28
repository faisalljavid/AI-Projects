import { useState } from "react"
import "../App.css"

export default function TranslateForm({ onTranslate }) {
    const [text, setText] = useState('How are you?')
    const [language, setLanguage] = useState('french')

    const handleSubmit = (e) => {
        e.preventDefault()
        onTranslate(text, language)
        //API
    }

    return (
        <form className="translate-form" onSubmit={handleSubmit}>
            <h2 className="section-title">Text to translate <span>👇</span></h2>
            <textarea
                value={text}
                onChange={(e) => { setText(e.target.value) }}
                rows="4"
                placeholder="Enter text here..."
            >
            </textarea>

            <h2 className="section-title">Select Language <span>👇</span></h2>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="french"
                        checked={language === 'french'}
                        onChange={() => setLanguage(e.target.value)}
                    />
                    French
                </label>
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="spanish"
                        checked={language === 'spanish'}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    Spanish
                </label>
                <label>
                    <input
                        type="radio"
                        name="language"
                        value="japanese"
                        checked={language === 'japanese'}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    Japanese
                </label>
            </div>
            <button type="submit" className="translate-btn">Translate</button>
        </form>
    )
}
