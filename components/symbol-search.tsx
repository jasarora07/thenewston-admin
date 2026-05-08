"use client"

import { useEffect, useRef } from "react"

export default function SymbolSearch() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up to prevent double-loading
    if (container.current) {
      container.current.innerHTML = ""
    }

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-search.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "colorTheme": "dark",
      "isTransparent": true,
      "showSymbolLogo": true,
      "locale": "en",
      "symbolsGroups": [
        {
          "name": "Equities",
          "symbols": [
            { "s": "NASDAQ:AAPL" },
            { "s": "NASDAQ:NVDA" },
            { "s": "NASDAQ:TSLA" },
            { "s": "NASDAQ:GOOGL" },
            { "s": "NASDAQ:MSFT" }
          ]
        },
        {
          "name": "Crypto",
          "symbols": [
            { "s": "BINANCE:BTCUSDT" },
            { "s": "BINANCE:ETHUSDT" }
          ]
        }
      ]
    })
    
    if (container.current) {
      container.current.appendChild(script)
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="w-full h-[300px] bg-card/30 rounded-xl overflow-hidden border border-border" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
