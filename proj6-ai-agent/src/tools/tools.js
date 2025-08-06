export async function getCurrentWeather({ location, unit = "celsius" }) {
    try {
        const weatherURL = new URL('https://apis.scrimba.com/openweathermap/data/2.5/weather')
        weatherURL.searchParams.append('q', location)
        weatherURL.searchParams.append('units', unit === "fahrenheit" ? "metric" : "imperial")
        const res = await fetch(weatherURL)
        const data = await res.json()

        if (data.cod && data.cod !== 200) {
            return JSON.stringify({ error: `Weather data not found for location: ${location}` })
        }

        return JSON.stringify(data)
        
    } catch (err) {
        console.error(err.message)
        return JSON.stringify({ error: `Failed to fetch weather data: ${err.message}` })
    }
}

export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        if (data.error) {
            return JSON.stringify({ error: "Failed to get location data" })
        }

        return JSON.stringify(data)
    } catch (err) {
        console.error(err.message)
        return JSON.stringify({ error: `Failed to get location: ${err.message}` })
    }
}

export const tools = [
    {
        type: "function",
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather for a specific location",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The city name or location to get weather for (e.g., 'New York', 'London')"
                    },
                    unit: {
                        type: "string",
                        enum: ["celsius", "fahrenheit"],
                        description: "Temperature unit (defaults to fahrenheit if not specified)"
                    },
                },
                required: ["location"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "getLocation",
            description: "Get the user's current location based on their IP address",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
]