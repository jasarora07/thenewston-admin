import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"

export default function MarketsPage() {
  return (
    /* We use 'contents' so this div doesn't create a new layout box */
    <div className="p-6 md:p-10 space-y-10">
      
      {/* Search Bar - Forced to single line height */}
      <section className="max-w-4xl">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
          Symbol Search
        </h2>
        <div className="h-[48px] w-full overflow-hidden rounded-md border border-border bg-background">
          <SymbolSearch />
        </div>
      </section>

      {/* Heatmap Section */}
      <section className="max-w-6xl">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
          Market Intelligence Heatmap
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden min-h-[500px]">
          <MarketWidget />
        </div>
      </section>
    </div>
  )
}
