import { dates } from "./utils/dates"

const tickersArr = []

const generateReportBtn = document.querySelector('.generate-report-btn')

generateReportBtn.addEventListener('click', fetchStockData)

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const tickerInput = document.getElementById('ticker-input')
    if (tickerInput.value.length > 2) {
        generateReportBtn.disabled = false
        const newTickerStr = tickerInput.value
        tickersArr.push(newTickerStr.toUpperCase())
        tickerInput.value = ''
        renderTickers()
    } else {
        const label = document.getElementsByTagName('label')[0]
        label.style.color = 'red'
        label.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
    }
})

function renderTickers() {
    const tickersDiv = document.querySelector('.ticker-choice-display')
    tickersDiv.innerHTML = ''
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement('span')
        newTickerSpan.textContent = ticker
        newTickerSpan.classList.add('ticker')
        tickersDiv.appendChild(newTickerSpan)
    })
}

const loadingArea = document.querySelector('.loading-panel')
const apiMessage = document.getElementById('api-message')

async function fetchStockData() {
    document.querySelector('.action-panel').style.display = 'none'
    loadingArea.style.display = 'flex'
    try {
        const summaries = await Promise.all(tickersArr.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`
            console.log('API URL:', url)
            console.log('Dates:', { startDate: dates.startDate, endDate: dates.endDate })

            const response = await fetch(url)
            const json = await response.json()
            const prices = json.results || []

            if (prices.length < 3) {
                loadingArea.innerText = `Not enough data for ${ticker}. Only ${prices.length} day(s) of data. Skipping.`
                return ``
            }

            const summary = prices.map(p =>
                `Ticker: ${ticker} | Date: ${new Date(p.t).toISOString().slice(0, 10)} | Open: ${p.o}, Close: ${p.c}, High: ${p.h}, Low: ${p.l}`
            ).join('\n')

            return summary
        }))

        const combinedReport = summaries.filter(Boolean).join('\n\n')

        if (combinedReport.trim().length === 0) {
            loadingArea.innerText = 'No sufficient stock data to generate report.'
            return
        }
        apiMessage.innerText = 'Creating report...'
        fetchReport(combinedReport)

    } catch (err) {
        loadingArea.innerText = 'There was an error fetching stock data.'
        console.error('error: ', err)
    }
}

async function fetchReport(data) {
    try {
        const url = 'https://gemini-api-worker.fjavid68.workers.dev/'

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: data })
        })
        const result = await response.json()
        renderReport(result.reply)

    } catch (error) {
        console.error('Error generating report:', error)
        loadingArea.innerText = 'Unable to access AI. Please refresh and try again'
    }
}

function renderReport(output) {
    loadingArea.style.display = 'none'
    const outputArea = document.querySelector('.output-panel')
    const report = document.createElement('p')
    outputArea.appendChild(report)
    report.textContent = output
    outputArea.style.display = 'flex'
}