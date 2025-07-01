import { GoogleGenAI } from "@google/genai";

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
}

export default {
	async fetch(request, env, ctx) {

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders })
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
			return new Response(JSON.stringify(text), { headers: corsHeaders })
		} catch (error) {
			console.error('Error:', error, { headers: corsHeaders })
		}

	}
}

