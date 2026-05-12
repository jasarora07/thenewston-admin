"use client"

import React, { useEffect, useRef, useState } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reduced delay to 300ms to fix the "slow loading" feel 
    // while still prioritizing SEO-critical HTML first
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
          "isTransparent": false, // RESTORED: Fixed the color/transparency issue
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
    // FIXED: Removed 'z-50' to stop overlapping the NewsHeader
    <div className="relative h-[44px] bg-[#131722] border-b border-white/5 overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 bg-[#131722]" />}
      <div ref={container} className="tradingview-widget-container__widget"></div>
    </div>
  )
}
