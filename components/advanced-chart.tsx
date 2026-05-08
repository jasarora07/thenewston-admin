"use client"

import React, { useEffect, useRef } from "react"

interface AdvancedChartProps {
  symbol: string
}

export default function AdvancedChart({ symbol }: AdvancedChartProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Create a unique ID for the chart container to prevent script collisions
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
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": chartId,
            "hide_side_toolbar": false,
            "save_image": false,
            "backgroundColor": "rgba(19, 23, 34, 1)",
            "gridColor": "rgba(42, 46, 57, 0.06)",
          })
        }
      }
      container.current.appendChild(script)
    }

    // Cleanup: Clear the div when the symbol changes or component unmounts
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [symbol])

  return (
    <div 
      ref={container} 
      className="h-full w-full bg-[#131722]" 
      style={{ minHeight: "500px" }}
    />
  )
}
