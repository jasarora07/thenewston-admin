import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"

export default function MarketsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Market Intelligence</h1>
        <p className="text-muted-foreground">Global real-time data & analytics.</p>
      </header>

      {/* Symbol Search Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Search Assets</h2>
        <SymbolSearch />
      </div>

      {/* Market Tabs Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Market Heatmap</h2>
        <MarketWidget />
      </div>
    </div>
  )
}
