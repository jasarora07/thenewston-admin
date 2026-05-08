import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { Search, TrendingUp } from "lucide-react"

export default function MarketsPage() {
  return (
    /* 1. The 'md:pl-64' or 'md:ml-64' is usually what reveals the sidebar */
    /* Adjust '64' to match your sidebar width if it's different */
    <div className="flex-1 w-full min-h-screen bg-background p-4 md:p-8 lg:p-12">
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <header className="space-y-2 border-b border-border pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            Market Intelligence
          </h1>
          <p className="text-muted-foreground text-base">
            Search global assets and monitor real-time performance.
          </p>
        </header>

        {/* 2. SYMBOL SEARCH - Restricting the height so it's not a giant box */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-green-500">
            <Search className="h-5 w-5" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">Symbol Search Terminal</h2>
          </div>
          <div className="rounded-xl border border-border bg-[#0a0a0a] overflow-hidden h-[120px]">
            <SymbolSearch />
          </div>
          <p className="text-[10px] text-muted-foreground italic px-2">
            Tip: Type a symbol like "NVDA" or "BTC" to see detailed charts.
          </p>
        </section>

        {/* 3. HEATMAP SECTION */}
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Global Market Heatmap</h2>
          <div className="rounded-xl border border-border bg-[#0a0a0a] overflow-hidden min-h-[500px]">
            <MarketWidget />
          </div>
        </section>

      </div>
    </div>
  )
}
