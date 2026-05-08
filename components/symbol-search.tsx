"use client"
import { useEffect, useRef } from "react"

export default function SymbolSearch() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) { container.current.innerHTML = "" }
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-search.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": 60, // Increased from 48 to 60 for better clickability
      "colorTheme": "dark",
      "isTransparent": false, // Set to false to see the physical box clearly
      "showSymbolLogo": true,
      "locale": "en",
      "symbolsGroups": [] 
    })
    container.current?.appendChild(script)
  }, [])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '60px', width: '100%' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
