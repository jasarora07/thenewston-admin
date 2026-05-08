"use client"
import { useEffect, useRef } from "react"

export default function AdvancedChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ""
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.type = "text/javascript"
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "tv_chart_container"
          })
        }
      }
      container.current.appendChild(script)
    }
  }, [symbol]) // Re-renders when symbol changes

  return <div id="tv_chart_container" ref={container} className="h-full w-full" />
}
