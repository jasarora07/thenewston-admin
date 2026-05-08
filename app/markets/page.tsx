import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { Search, TrendingUp } from "lucide-react"

export default function MarketsPage() {
  return (
    /* We removed 'min-h-screen' and 'flex-col'. Now it will sit inside your existing layout. */
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 md:h-8 md:h-8 text-primary" />
          Market Intelligence
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time global asset search and market performance.
        </p>
      </header>

      <div className="grid gap-8 max-w-6xl">
        {/* Search Bar Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Search className="h-4 w-4" />
            <h2 className="text-[10px] font-black uppercase tracking-widest">Symbol Search</h2>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <SymbolSearch />
          </div>
        </section>

        {/* Heatmap Section */}
        <section className="space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Heatmap</h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <MarketWidget />
          </div>
        </section>
      </div>
    </div>
  )
}
