"use client"

import { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
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
  const [selected, setSelected] = useState("Quick Select...")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 1. TOP NAVIGATION & BRANDING */}
      <TickerBar />
      <NewsHeader />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 container mx-auto px-4 py-8 md:px-8 space-y-12">
        
        {/* PAGE TITLE SECTION */}
        <header className="space-y-2 border-b border-border/60 pb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Globe className="h-4 w-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Global Terminal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            MARKET <span className="text-primary">INTELLIGENCE</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Access institutional-grade market data. Search global equities, 
            commodities, and indices through our real-time terminal.
          </p>
        </header>

        {/* 3. TERMINAL TOOLS (SEARCH & DROPDOWN) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* SEARCH BOX */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Search className="h-3.5 w-3.5" /> Command Search
              </h2>
              <span className="text-[9px] text-muted-foreground italic">Powered by TradingView</span>
            </div>
            <div className="h-[80px] w-full rounded-xl border border-primary/20 bg-[#131722] overflow-hidden shadow-2xl shadow-primary/5 relative z-40">
              <SymbolSearch />
            </div>
          </section>

          {/* QUICK WATCHLIST */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
              <Activity className="h-3.5 w-3.5" /> Quick Watchlist
            </h2>
            <div className="relative group">
              <select 
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full h-[80px] bg-secondary/20 border border-border rounded-xl px-6 appearance-none text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-all hover:bg-secondary/40 text-white"
              >
                <option value="Quick Select..." disabled>Quick Select...</option>
                {POPULAR_STOCKS.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name} ({stock.symbol.split(':')[1]})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none text-muted-foreground" />
            </div>
          </section>
        </div>

        {/* 4. MARKET HEATMAP SECTION */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 px-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Performance Heatmap (Live)
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden min-h-[650px]">
            <MarketWidget />
          </div>
        </section>
      </main>
      <div className="h-20" />
    </div>
  )
}
