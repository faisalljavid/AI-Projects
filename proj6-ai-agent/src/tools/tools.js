export async function getCurrentWeather() {
    const weather = {
        temperature: "40",
        unit: "C",
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}

export async function getLocation() {
    return "Jalandhar, Punjab"
}