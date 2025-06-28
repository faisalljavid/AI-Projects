import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import TranslateForm from "./components/TranslateForm"
import TranslateResult from "./components/TranslateResult"
import { GoogleGenAI } from "@google/genai"


export default function App() {
    const [isTranslated, setIsTranslated] = useState(false)
    const [originalText, setOriginalText] = useState('')
    const [translatedText, setTranslatedText] = useState('')

    const handleTranslate = async (text, language) => {
        setOriginalText(text);

        try {
            const ai = new GoogleGenAI({
                apiKey: import.meta.env.VITE_GEMINI_API_KEY
            })

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Translate the following English sentence to ${language}:${text}. Give only exact translation and nothing else`
            })

            const translated = response.text
            setTranslatedText(translated)
            setIsTranslated(true)

        } catch (error) {
            console.log("Gemini API error", error);
            setTranslatedText("Error translating with Gemini.");
            setIsTranslated(true);
        }
    }


    const handleStartOver = () => {
        setIsTranslated(false)
        setOriginalText('')
        setTranslatedText('')
    }

    return (
        <>
            <Header />
            {isTranslated ? (
                <TranslateResult
                    original={originalText}
                    translation={translatedText}
                    onReset={handleStartOver}
                />
            ) : (
                <TranslateForm onTranslate={handleTranslate} />
            )}
        </>
    )
}