import { GoogleGenAI } from "@google/genai";

// const corsHeaders = {
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Methods': 'POST, OPTIONS',
// }

export default {
	async fetch(request, env, ctx) {

		if (request.method === 'OPTIONS') {
			return new Response(null)
		}

		const ai = new GoogleGenAI({
			apiKey: env.GEMINI_API_KEY
		})

		try {
			const response = await ai.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: `Should I trust stock predictions from Dodgy Dave? Give a 50 word answer`
			})

			const text = response.text
			return new Response(JSON.stringify(text))
		} catch (error) {
			console.error('Error:', error);
		}

	}
}

