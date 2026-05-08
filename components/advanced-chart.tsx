"use client"

import React, { useEffect, useRef } from "react"

export default function AdvancedChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chartId = `tv_chart_${Math.random().toString(36).substring(2, 9)}`
    
    if (container.current) {
      container.current.innerHTML = ""
      const childDiv = document.createElement("div")
      childDiv.id = chartId
      childDiv.style.height = "100%"
      childDiv.style.width = "100%"
      container.current.appendChild(childDiv)

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.type = "text/javascript"
      script.async = true
      script.onload = () => {
        if (typeof window !== "undefined" && window.TradingView) {
          new window.TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "1", // Set to 1-minute for the most "live" feel
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": chartId,
            "withdateranges": true,
            "hide_side_toolbar": false,
            "details": true, // Shows live bid/ask/change details
            "hotlist": true, // Enables real-time tracking of market movers
            "calendar": true,
            "show_popup_button": true,
            "popup_width": "1000",
            "popup_height": "650",
            "backgroundColor": "rgba(19, 23, 34, 1)",
          })
        }
      }
      container.current.appendChild(script)
    }

    return () => {
      if (container.current) container.current.innerHTML = ""
    }
  }, [symbol])

  return <div ref={container} className="h-full w-full bg-[#131722]" style={{ minHeight: "650px" }} />
}
