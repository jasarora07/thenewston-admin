"use client"
import { useEffect, useRef } from "react"

export default function AdvancedChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          "autosize": true,
          "symbol": symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "container_id": container.current.id
        })
      }
    }
    document.head.appendChild(script)
  }, [symbol])

  return <div id={`tv_chart_${symbol}`} ref={container} className="h-full w-full" />
}
