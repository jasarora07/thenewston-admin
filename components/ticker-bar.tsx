"use client"

import React, { useEffect, useRef, useState } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 300ms delay ensures SEO metadata is prioritized while maintaining speed
    const timer = setTimeout(() => {
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
          "isTransparent": false, // Fixed the transparency issue
          "displayMode": "adaptive",
          "locale": "en"
        })
        container.current.appendChild(script)
        setIsLoaded(true)
      }
    }, 300) 

    return () => clearTimeout(timer)
  }, [])

  return (
    /* FIXED: Added z-50 to ensure it sits on TOP of the z-40 NewsHeader.
       Ensures the ticker remains visible and not hidden behind the header.
    */
    <div className="relative z-50 h-[44px] bg-[#131722] border-b border-white/5 overflow-hidden w-full">
      {!isLoaded && <div className="absolute inset-0 bg-[#131722]" />}
      <div ref={container} className="tradingview-widget-container__widget"></div>
    </div>
  )
}
