"use client"

import { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import AdvancedChart from "@/components/advanced-chart"
import { ChevronDown, Globe, Map, Zap, Building2 } from "lucide-react"

// Complete Data Tree
const DATA_TREE = {
  "US Markets": {
    "S&P 500": [
      { name: "Index Overview", s: "FOREXCOM:SPX500" },
      { name: "Apple", s: "NASDAQ:AAPL" },
      { name: "Microsoft", s: "NASDAQ:MSFT" },
      { name: "NVIDIA", s: "NASDAQ:NVDA" },
    ],
    "Nasdaq 100": [
      { name: "Index Overview", s: "FOREXCOM:NSXUSD" },
      { name: "Tesla", s: "NASDAQ:TSLA" },
      { name: "Google", s: "NASDAQ:GOOGL" },
    ]
  },
  "European Markets": {
    "FTSE 100": [
      { name: "Index Overview", s: "FOREXCOM:UK100" },
      { name: "Shell", s: "LSE:SHEL" },
      { name: "AstraZeneca", s: "LSE:AZN" },
    ],
    "DAX 40": [
      { name: "Index Overview", s: "FOREXCOM:GER40" },
      { name: "SAP", s: "XETR:SAP" },
      { name: "Siemens", s: "XETR:SIE" },
    ]
  }
}

export default function MarketsPage() {
  // State for the three layers
  const [region, setRegion] = useState(Object.keys(DATA_TREE)[0])
  const [index, setIndex] = useState(Object.keys(DATA_TREE[region])[0])
  const [symbol, setSymbol] = useState(DATA_TREE[region][index][0].s)

  // Update handlers to ensure lower levels reset when upper levels change
  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion)
    const firstIndex = Object.keys(DATA_TREE[newRegion])[0]
    setIndex(firstIndex)
    setSymbol(DATA_TREE[newRegion][firstIndex][0].s)
  }

  const handleIndexChange = (newIndex: string) => {
    setIndex(newIndex)
    setSymbol(DATA_TREE[region][newIndex][0].s)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TickerBar />
      <NewsHeader />

      <main className="container mx-auto px-4 py-10 space-y-8">
        <header className="border-b border-border/40 pb-6">
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            MARKET <span className="text-primary">DRILLDOWN</span>
          </h1>
        </header>

        {/* TRIPLE SELECTOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-secondary/10 p-6 rounded-2xl border border-border/60">
          
          {/* Layer 1: Region */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Map className="h-3 w-3" /> 1. Region
            </label>
            <div className="relative">
              <select 
                value={region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer"
              >
                {Object.keys(DATA_TREE).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Layer 2: Index */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-3 w-3" /> 2. Index
            </label>
            <div className="relative">
              <select 
                value={index}
                onChange={(e) => handleIndexChange(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer"
              >
                {Object.keys(DATA_TREE[region]).map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Layer 3: Stock / Constituent */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Building2 className="h-3 w-3" /> 3. Company / Symbol
            </label>
            <div className="relative">
              <select 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer"
              >
                {DATA_TREE[region][index].map(item => (
                  <option key={item.s} value={item.s}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* CHART DISPLAY */}
        <div className="rounded-xl border border-border bg-[#131722] overflow-hidden h-[600px] shadow-2xl">
          <AdvancedChart key={symbol} symbol={symbol} />
        </div>
      </main>
    </div>
  )
}
