"use client"

import { useEffect, useRef } from "react"

export default function MarketWidget() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Safety Wipe: Ensures no duplicate widgets or stray syntax ghosts
    if (container.current) {
      container.current.innerHTML = ""
    }

    // 2. Create the script element
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.type = "text/javascript"
    script.async = true

    // 3. Configuration with all your requested symbols
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "isTransparent": true, // Blends into your boilerplate dark background
      "showSymbolLogo": true,
      "showFloatingTooltip": true,
      "plotLineColorGrowing": "rgba(34, 197, 94, 1)",
      "plotLineColorFalling": "rgba(239, 68, 68, 1)",
      "gridLineColor": "rgba(42, 46, 57, 0)",
      "scaleFontColor": "rgba(209, 213, 219, 1)",
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
          "title": "Forex & Crypto",
          "symbols": [
            { "s": "FX:EURUSD", "d": "EUR / USD" },
            { "s": "FX:GBPUSD", "d": "GBP / USD" },
            { "s": "FX:USDJPY", "d": "USD / JPY" },
            { "s": "FX:USDCAD", "d": "USD / CAD" },
            { "s": "BINANCE:BTCUSDT", "d": "Bitcoin (BTC)" },
            { "s": "BINANCE:ETHUSDT", "d": "Ethereum (ETH)" }
          ]
        }
      ]
    })

    // 4. Inject the script into the container
    if (container.current) {
      container.current.appendChild(script)
    }

    // 5. Cleanup function for when the user navigates away
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div 
      className="w-full h-[600px] bg-card/30 rounded-xl overflow-hidden border border-border shadow-2xl" 
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
