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

		const config = {
			temperature: 1.1,
			thinkingConfig: {
				thinkingBudget: 0,
			},
			systemInstruction: [
				{
					text: `You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.`
				}
			],
		}

		try {
			const model = 'gemini-2.5-flash'
			const reqBody = await request.json()
			const userInput = reqBody.message || 'No input provided'

			const contents = [
				{
					role: 'user',
					parts: [
						{
							text: userInput
						},
					],
				},
			]
			const response = await ai.models.generateContent({
				model,
				config,
				contents
			})

			const text = response.text
			return new Response(JSON.stringify({ reply: text }), { headers: corsHeaders })

		} catch (error) {
			console.error('Error:', error, { headers: corsHeaders })
		}

	}
}

