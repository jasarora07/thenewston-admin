"use client"

import { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { Search, ChevronDown, Activity, TrendingUp } from "lucide-react"

const POPULAR_STOCKS = [
  { name: "Apple", symbol: "NASDAQ:AAPL" },
  { name: "NVIDIA", symbol: "NASDAQ:NVDA" },
  { name: "Tesla", symbol: "NASDAQ:TSLA" },
  { name: "Meta", symbol: "NASDAQ:META" },
  { name: "Google", symbol: "NASDAQ:GOOGL" },
  { name: "Microsoft", symbol: "NASDAQ:MSFT" },
  { name: "Bitcoin", symbol: "BINANCE:BTCUSDT" },
]

export default function MarketsPage() {
  const [selected, setSelected] = useState("Quick Select Stock...")

  return (
    <div className="min-h-screen bg-background">
      {/* 1. The Global Top Bar */}
      <TickerBar />
      
      {/* 2. The Main Header (Contains 'Newston' and Menu) */}
      <NewsHeader />

      <main className="container mx-auto p-4 md:p-8 space-y-10">
        <header className="space-y-2 border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-primary" />
            Market Intelligence
          </h1>
          <p className="text-muted-foreground text-sm">
            Real-time global asset search and market performance heatmap.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3. SYMBOL SEARCH SECTION */}
          <section className="lg:col-span-2 space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Search className="h-3 w-3" /> Live Terminal Search
            </h2>
            <div className="h-[64px] rounded-lg border border-border bg-black/40 overflow-hidden">
              <SymbolSearch />
            </div>
          </section>

          {/* 4. QUICK SELECT DROPDOWN */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="h-3 w-3" /> Asset Watchlist
            </h2>
            <div className="relative">
              <select 
                onChange={(e) => setSelected(e.target.value)}
                className="w-full h-[64px] bg-secondary/30 border border-border rounded-lg px-4 appearance-none text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option disabled selected>{selected}</option>
                {POPULAR_STOCKS.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </section>
        </div>

        {/* 5. MARKET HEATMAP */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Global Market Heatmap
          </h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden min-h-[600px]">
            <MarketWidget />
          </div>
        </section>
      </main>
    </div>
  )
}
