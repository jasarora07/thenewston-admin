"use client"

import { useEffect, useRef } from "react"

export default function SymbolSearch() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ""
    }

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-search.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": 60,
      "colorTheme": "dark",
      "isTransparent": false,
      "showSymbolLogo": true,
      "locale": "en",
      "symbolsGroups": []
    })
    
    container.current?.appendChild(script)

    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div 
      className="tradingview-widget-container relative z-50" 
      ref={container} 
      style={{ height: '60px' }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
