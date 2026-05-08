"use client"

import React, { useEffect, useRef } from "react"

export function HomeMarketBar() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      // Clear container to prevent duplicate widgets on fast refreshes
      container.current.innerHTML = ""
      
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
          { "proName": "TVC:GOLD", "title": "Gold" },
          { "proName": "TVC:USOIL", "title": "Crude Oil" },
          { "proName": "NASDAQ:NVDA", "title": "NVIDIA" },
          { "proName": "NASDAQ:AAPL", "title": "Apple" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "en"
      })
      
      container.current.appendChild(script)
    }

    // Cleanup logic
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="w-full bg-transparent overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
