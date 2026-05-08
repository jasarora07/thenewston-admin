import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"

export default function MarketsPage() {
  return (
    <main className="p-4 md:p-10 max-w-7xl mx-auto space-y-12">
      {/* Search Section - Reduced to a simple bar */}
      <section>
        <div className="mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Symbol Search
          </h2>
        </div>
        <div className="h-[60px] w-full rounded-md border border-border bg-background overflow-hidden">
          <SymbolSearch />
        </div>
      </section>

      {/* Heatmap Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Market Intelligence
          </h2>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden min-h-[600px]">
          <MarketWidget />
        </div>
      </section>
    </main>
  )
}
