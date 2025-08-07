# MCP Weather & Package Tracking Server

A Model Context Protocol (MCP) server that provides tools for weather data retrieval and package tracking functionality.

## Features

- **Weather Data Tool**: Get weather information for supported cities (New York, London)
- **Package Tracking Tool**: Track delivery status using tracking numbers
- **Static Resources**: Access lists of supported airports and cities

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd proj7-mcp
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Starting the Server

Run the MCP server using the start script:

```bash
npm start
```

The server will start and display:
```
🌤️  Weather MCP Server Started!
🛠️  Tool: getWeatherByCityName
📚 Resource: weather://cities
🏙️  Supported Cities: New York, London
✅ Server ready!
```

### Available Tools

#### 1. Weather Data Tool
- **Name**: `getWeatherByCityName`
- **Description**: Get weather data for New York or London
- **Parameters**: 
  - `city` (string): Name of the city to get weather for

#### 2. Package Tracking Tool
- **Name**: `trackPackage`
- **Description**: Track delivery status using tracking number
- **Parameters**:
  - `trackingNumber` (string): Package tracking number

### Available Resources

#### 1. Airport Codes
- **URI**: `flights://airports`
- **Description**: List of supported airport codes
- **Format**: Text/plain

#### 2. Supported Cities
- **URI**: `weather://cities`
- **Description**: List of supported cities for weather data
- **Format**: Text/plain

## Project Structure

```
proj7-mcp/
├── server.ts          # Main MCP server implementation
├── package.json       # Project dependencies and scripts
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Dependencies

### Production Dependencies
- `@modelcontextprotocol/sdk`: MCP SDK for server implementation
- `zod`: Schema validation library

### Development Dependencies
- `@types/node`: TypeScript definitions for Node.js
- `typescript`: TypeScript compiler
- `tsx`: TypeScript execution engine

## Development

### Adding New Tools

To add a new tool to the server, use the `server.tool()` method:

```typescript
server.tool(
    'toolName',
    'Tool description',
    {
        parameterName: z.string().describe('Parameter description')
    },
    async ({ parameterName }) => {
        // Tool implementation
        return {
            content: [
                {
                    type: 'text',
                    text: 'Tool result'
                }
            ]
        }
    }
)
```

### Adding New Resources

To add a new static resource, use the `server.resource()` method:

```typescript
server.resource(
    'resource://uri',
    'Resource description',
    'text/plain',
    async () => {
        return 'Resource content'
    }
)
```

## Configuration

The server is configured with:
- **Name**: Weather Data Fetcher
- **Version**: 1.0.0
- **Transport**: StdioServerTransport

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other MCP server is running on the same port
2. **Dependencies not found**: Run `npm install` to install missing dependencies
3. **TypeScript errors**: Ensure TypeScript is properly installed and configured

### Debug Mode

To run the server in debug mode, you can modify the start script in `package.json`:

```json
{
  "scripts": {
    "start": "tsx --inspect server.ts"
  }
}
```



## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the MCP documentation
3. Open an issue in the repository

## Related Links

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Zod Schema Validation](https://zod.dev/)
