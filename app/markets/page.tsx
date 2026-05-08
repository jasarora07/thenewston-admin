import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MarketsPage() {
  return (
    // "flex-1" and "h-full" ensure it fits inside your sidebar/header layout
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      
      {/* Navigation Helper: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
        <p className="text-muted-foreground text-sm">Search assets and monitor global performance.</p>
      </header>

      <div className="grid gap-6">
        {/* Search Bar Section */}
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-xs font-bold uppercase tracking-tighter text-muted-foreground mb-4">Global Search</h2>
          <div className="h-[300px]"> {/* Fixed height is required for TradingView Search */}
            <SymbolSearch />
          </div>
        </section>

        {/* Live Overview Section */}
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-xs font-bold uppercase tracking-tighter text-muted-foreground mb-4">Market Heatmap</h2>
          <div className="h-[600px]">
             <MarketWidget />
          </div>
        </section>
      </div>
    </div>
  )
}
