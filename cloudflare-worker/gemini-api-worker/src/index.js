import { GoogleGenerativeAI } from "@google/generative-ai";

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

		const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
		const model = genAI.getGenerativeModel(
			{ model: "gemini-2.5-flash" },
			{
				baseUrl: `https://gateway.ai.cloudflare.com/v1/4043e9d7f7c00a1f092a6963e40d13b4/stock-predictions/google-ai-studio`
			}
		)

		const systemInstruction = `You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.`

		try {
			const reqBody = await request.json()
			const userInput = reqBody.message || 'No input provided'

			const prompt = `${systemInstruction}\n\nUser Input: ${userInput}`

			const result = await model.generateContent(prompt)
			const response = result.response
			const text = response.text()

			return new Response(JSON.stringify({ content: text }), { headers: corsHeaders })

		} catch (error) {
			console.error('Error:', error)
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: corsHeaders
			})
		}
	}
}