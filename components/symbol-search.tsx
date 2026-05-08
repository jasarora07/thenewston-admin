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
      "height": 48, // Absolute minimum height for a search bar
      "colorTheme": "dark",
      "isTransparent": true,
      "showSymbolLogo": true,
      "locale": "en",
      "symbolsGroups": [] // Emptying this often makes the search bar focusable immediately
    })
    container.current?.appendChild(script)
  }, [])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '48px' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
