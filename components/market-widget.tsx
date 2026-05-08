"use client"

import { useEffect, useRef } from "react"

export default function MarketWidget() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up any existing scripts to prevent duplicate widgets on re-renders
    if (container.current) {
      container.current.innerHTML = ""
    }

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%", // We let the parent container control height
      "largeChartUrl": "",
      "isTransparent": true, // CRITICAL: This lets your boilerplate background show through
      "showSymbolLogo": true,
      "showFloatingTooltip": true,
      "plotLineColorGrowing": "rgba(34, 197, 94, 1)", // Tailwind green-500
      "plotLineColorFalling": "rgba(239, 68, 68, 1)", // Tailwind red-500
      "gridLineColor": "rgba(42, 46, 57, 0)", // Transparent grid
      "scaleFontColor": "rgba(209, 213, 219, 1)", // Tailwind gray-300
      "tabs": [
  {
    "title": "Major Indices",
    "symbols": [
      { "s": "FOREXCOM:SPX500", "d": "S&P 500" },
      { "s": "FOREXCOM:NSXUSD", "d": "Nasdaq 100" },
      { "s": "FOREXCOM:DJI", "d": "Dow 30" }
    ]
  },
  {
    "title": "Tech Giants",
    "symbols": [
      { "s": "NASDAQ:AAPL", "d": "Apple" },
      { "s": "NASDAQ:NVDA", "d": "NVIDIA" },
      { "s": "NASDAQ:META", "d": "Meta" },
      { "s": "NASDAQ:GOOGL", "d": "Google" },
      { "s": "NASDAQ:TSLA", "d": "Tesla" },
      { "s": "NASDAQ:MSFT", "d": "Microsoft" }
    ]
  },
  {
    "title": "Crypto / FX",
    "symbols": [
      { "s": "BINANCE:BTCUSDT", "d": "BTC/USDT" },
      { "s": "BINANCE:ETHUSDT", "d": "ETH/USDT" },
      { "s": "FX_IDC:EURUSD", "d": "EUR/USD" }
    ]
  }
]
    })
    
    if (container.current) {
      container.current.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full h-[500px] bg-card/50 rounded-xl overflow-hidden border border-border" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
