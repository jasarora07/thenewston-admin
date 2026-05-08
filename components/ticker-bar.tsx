"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  symbol: string
  price: string
  change: number
  changePercent: number
}

const tickerData: TickerItem[] = [
  { symbol: "AAPL", price: "189.45", change: 2.34, changePercent: 1.25 },
  { symbol: "MSFT", price: "378.91", change: -1.23, changePercent: -0.32 },
  { symbol: "GOOGL", price: "141.80", change: 3.45, changePercent: 2.49 },
  { symbol: "AMZN", price: "178.25", change: 1.89, changePercent: 1.07 },
  { symbol: "NVDA", price: "875.30", change: 12.45, changePercent: 1.44 },
  { symbol: "META", price: "505.12", change: -2.78, changePercent: -0.55 },
  { symbol: "TSLA", price: "248.50", change: 5.67, changePercent: 2.33 },
  { symbol: "BRK.B", price: "408.75", change: 0.85, changePercent: 0.21 },
  { symbol: "JPM", price: "198.30", change: -0.45, changePercent: -0.23 },
  { symbol: "V", price: "278.90", change: 1.12, changePercent: 0.40 },
]

export function TickerBar() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100)
    }, 140)
    return () => clearInterval(interval)
  }, [])

  const duplicatedData = [...tickerData, ...tickerData, ...tickerData]

  return (
    <div className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-sm border-b border-border overflow-hidden">
      <div 
        className="flex items-center gap-4 sm:gap-8 py-1.5 sm:py-2 whitespace-nowrap"
        style={{ transform: `translateX(-${offset}%)` }}
      >
        {duplicatedData.map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4">
            <span className="font-semibold text-foreground text-xs sm:text-sm">{item.symbol}</span>
            <span className="text-muted-foreground text-xs sm:text-sm">${item.price}</span>
            <span
              className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm ${
                item.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}
              {item.change >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
