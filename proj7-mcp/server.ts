import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"


// Create MCP server instance
const server = new McpServer({
    name: 'Weather Data Fetcher',
    version: '1.0.0'
})

// Define a tool
server.tool(
    // Name of the tool
    'trackPackage',
    // Short description of what this tool does
    'Track delivery status using tracking number',
    //  Define the input schema using Zod
    {
        trackingNumber: z.string().describe('Package tracking number')
    },
    // Define the async function that will run when the tool is called
    async ({ trackingNumber }) => {
        // We could connect to a real API here, but for now we're just simulating it
        return {
            content: [
                {
                    type: 'text',
                    text: `Checking delivery status for: ${trackingNumber}`
                }
            ]
        }
    }
)


// A helper function to simulate fetching weather data
async function getWeatherByCity(city: string) {
    if (city.toLowerCase() === 'new york') {
        return { temp: '22°C', forecast: 'Partly cloudy with a breeze' };
    }
    if (city.toLowerCase() === 'london') {
        return { temp: '16°C', forecast: 'Rainy and overcast' };
    }
    return { temp: null, error: 'Weather data not available for this city' };
}

server.tool(
    'getWeatherByCityName',
    'Get weather data for New York or London',
    {
        city: z.string().describe('Name of the city to get weather for')
    },
    async ({ city }) => {
        const weatherData = await getWeatherByCity(city)
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(weatherData)
                }
            ]
        }
    }
)


// Registering a static resource on the MCP server
server.resource(
    // URI: A unique identifier for this resource
    'flights://airports',
    // Description: Explains what this resource provide
    'List of supported airport codes',
    // MIME Type: Describes the format of the data being returned
    'text/plain',
    // Data Function: An async function that returns the actual content of the resource
    async () => {
        return `Supported Airports:
        - JFK (New York)
        - LHR (London Heathrow)
        - SFO (San Francisco)
        `
    }
)


server.resource(
    'weather://cities',
    'List of supported cities',
    'text/plain',
    async () => {
        return `Supported Cities:
        - London (UK)
        - New York (USA)
        `
    }
)

async function init() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('🌤️  Weather MCP Server Started!');
    console.error('🛠️  Tool: getWeatherByCityName');
    console.error('📚 Resource: weather://cities');
    console.error('🏙️  Supported Cities: New York, London');
    console.error('✅ Server ready!');
}

init().catch(console.error)