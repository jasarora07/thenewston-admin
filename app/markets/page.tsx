import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { Search, TrendingUp } from "lucide-react"

export default function MarketsPage() {
  return (
    /* We remove 'min-h-screen' and 'bg-background' to prevent it from covering the sidebar */
    <div className="p-4 md:p-8 space-y-10">
      
      {/* Page Header */}
      <header className="space-y-2 border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <TrendingUp className="h-7 w-7 text-green-500" />
          Market Intelligence
        </h1>
        <p className="text-muted-foreground text-sm">
          Real-time global asset search and market performance.
        </p>
      </header>

      <div className="max-w-5xl space-y-12">
        
        {/* SLIM SEARCH SECTION */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-green-500">
            <Search className="h-4 w-4" />
            <h2 className="text-[10px] font-black uppercase tracking-widest">Symbol Search</h2>
          </div>
          
          {/* Height set to 72px for a single-line search bar feel */}
          <div className="rounded-lg border border-border bg-black/50 overflow-hidden h-[72px]">
            <SymbolSearch />
          </div>
          
          <p className="text-[10px] text-muted-foreground italic pl-1">
            Tip: Type "AAPL" or "NVDA" and press Enter.
          </p>
        </section>

        {/* HEATMAP SECTION */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Heatmap</h2>
          <div className="rounded-xl border border-border bg-black/20 overflow-hidden min-h-[500px]">
            <MarketWidget />
          </div>
        </section>

      </div>
    </div>
  )
}
