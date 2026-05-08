import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"

export default function MarketsPage() {
  return (
    /* md:ml-64 pushes the content to the right to reveal the sidebar */
    /* pt-20 reveals the top 'Newston' header */
    <div className="md:ml-64 pt-20 p-6 md:p-10 min-h-screen bg-transparent">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Search Bar - Increased height slightly to ensure it's clickable */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">
            Symbol Search Terminal
          </h2>
          <div className="h-[60px] w-full overflow-hidden rounded-lg border border-border bg-[#0a0a0a] relative z-50">
            <SymbolSearch />
          </div>
        </section>

        {/* Heatmap Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
            Market Intelligence Heatmap
          </h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden min-h-[500px] relative z-10">
            <MarketWidget />
          </div>
        </section>
      </div>
    </div>
  )
}
