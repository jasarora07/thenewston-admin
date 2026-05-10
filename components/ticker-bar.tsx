"use client"

import React, { useEffect, useRef } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run if the container exists and has no children yet
    if (container.current && container.current.children.length === 0) {
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
    /* Added 'relative' and 'z-50' to ensure it stays on top of the stack 
       but occupies real space in the layout so the header doesn't overlap it.
    */
    <div className="relative z-50 h-[44px] bg-[#131722] border-b border-white/5 overflow-hidden">
      <div ref={container} className="tradingview-widget-container__widget"></div>
    </div>
  )
}
