"use client"
import React, { useEffect, useRef } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ""
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
      })
      container.current.appendChild(script)
    }
  }, [])

  return (
    <div className="h-[44px] bg-[#131722] border-b border-border overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
