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
      "height": "100%",
      "colorTheme": "dark",
      "isTransparent": false,
      "showSymbolLogo": true,
      "locale": "en",
      "symbolsGroups": [], // Leaving this empty allows it to search ALL global symbols
      "color": "#1e222d"
    })
    
    container.current?.appendChild(script)
  }, [])

  return (
    <div 
      className="tradingview-widget-container relative z-50 w-full h-full min-h-[64px]" 
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
