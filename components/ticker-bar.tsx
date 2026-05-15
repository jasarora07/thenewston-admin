"use client"

import React, { useEffect, useRef, useState } from "react"

export function TickerBar() {
  const container = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
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
          "isTransparent": false,
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
    /**
     * HEIGHT & OVERLAP FIX: 
     * 1. h-[44px] is explicitly set to match TradingView's default output.
     * 2. flex-shrink-0 ensures the layout doesn't compress the ticker when the screen is small.
     * 3. block-size containment prevents the browser from recalculating layout when the script loads.
     */
    <div 
      className="relative z-50 h-[44px] min-h-[44px] w-full bg-[#131722] border-b border-white/5 overflow-hidden flex-shrink-0"
      style={{ contain: 'size layout', contentVisibility: 'auto' }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#131722] flex items-center px-4 animate-pulse">
           {/* Placeholder line to maintain visual weight before script execution */}
           <div className="h-1 w-full bg-white/5 rounded" />
        </div>
      )}
      <div 
        ref={container} 
        className="tradingview-widget-container__widget h-full w-full"
      ></div>
    </div>
  )
}
