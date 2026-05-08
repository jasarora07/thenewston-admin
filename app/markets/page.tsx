"use client"

import { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import AdvancedChart from "@/components/advanced-chart" // We will create this
import { Search, ChevronDown, Activity, TrendingUp, Globe } from "lucide-react"

const POPULAR_STOCKS = [
  { name: "Apple", symbol: "NASDAQ:AAPL" },
  { name: "NVIDIA", symbol: "NASDAQ:NVDA" },
  { name: "Tesla", symbol: "NASDAQ:TSLA" },
  { name: "Gold", symbol: "TVC:GOLD" },
  { name: "S&P 500", symbol: "FOREXCOM:SPX500" },
  { name: "Bitcoin", symbol: "BINANCE:BTCUSDT" },
]

export default function MarketsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TickerBar />
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 md:px-8 space-y-12">
        <header className="space-y-2 border-b border-border/60 pb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase">
            Market <span className="text-primary">Terminal</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SEARCH BOX */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-primary">Global Search</h2>
            <div className="h-[80px] rounded-xl border border-primary/20 bg-[#131722] overflow-hidden relative z-50">
              <SymbolSearch />
            </div>
          </div>

          {/* QUICK SELECT */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quick Switch</h2>
            <div className="relative">
              <select 
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full h-[80px] bg-secondary/20 border border-border rounded-xl px-6 appearance-none text-sm text-white cursor-pointer"
              >
                {POPULAR_STOCKS.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>{stock.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ACTIVE CHART SECTION - This reacts to the dropdown */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-primary">Active Analysis: {selectedSymbol}</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden h-[500px]">
             <AdvancedChart symbol={selectedSymbol} />
          </div>
        </section>

        {/* HEATMAP */}
        <section className="pt-10">
          <MarketWidget />
        </section>
      </main>
    </div>
  )
}
