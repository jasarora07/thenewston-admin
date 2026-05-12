"use client"

import React, { useEffect, useRef, useState } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on the client after the initial paint
    // This improves the 1.55s response time by prioritizing the main HTML
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
          "isTransparent": true, // Changed to true for better UI blending
          "displayMode": "adaptive",
          "locale": "en"
        })
        container.current.appendChild(script)
        setIsLoaded(true)
      }
    }, 1000) // 1-second delay to let the Calculators/H1 load first

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-50 h-[44px] bg-[#131722] border-b border-white/5 overflow-hidden">
      {/* Placeholder div ensures the layout doesn't "jump" when the script loads,
         resolving CLS (Cumulative Layout Shift) SEO issues.
      */}
      {!isLoaded && <div className="absolute inset-0 bg-[#131722] animate-pulse" />}
      <div ref={container} className="tradingview-widget-container__widget"></div>
    </div>
  )
}
