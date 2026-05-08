"use client"

import { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import AdvancedChart from "@/components/advanced-chart"
import { Search, ChevronDown, Activity, Globe } from "lucide-react"

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
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
            Market <span className="text-primary">Terminal</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SEARCH BOX - High Z-Index to beat the header overlap */}
          <div className="lg:col-span-2 space-y-4 relative z-50">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Search className="h-3 w-3" /> Live Terminal Search
            </h2>
            <div className="h-[80px] rounded-xl border border-primary/20 bg-[#131722] overflow-hidden shadow-2xl pointer-events-auto">
              <SymbolSearch />
            </div>
          </div>

          {/* QUICK SELECT */}
          <div className="space-y-4 relative z-40">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="h-3 w-3" /> Quick Switch
            </h2>
            <div className="relative">
              <select 
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full h-[80px] bg-secondary/20 border border-border rounded-xl px-6 appearance-none text-sm text-white cursor-pointer hover:bg-secondary/40 transition-colors"
              >
                {POPULAR_STOCKS.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol} className="bg-[#131722]">
                    {stock.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* DYNAMIC CHART - The key prop forces a refresh when symbol changes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-primary">Active Analysis</h2>
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">{selectedSymbol}</span>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden h-[500px] w-full">
             <AdvancedChart key={selectedSymbol} symbol={selectedSymbol} />
          </div>
        </section>

        <section className="pt-10">
          <MarketWidget />
        </section>
      </main>
    </div>
  )
}
