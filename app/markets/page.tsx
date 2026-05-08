import MarketWidget from "@/components/market-widget"
import SymbolSearch from "@/components/symbol-search"
import { ArrowLeft, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MarketsPage() {
  return (
    /* The min-h-screen and bg-background ensure the theme doesn't break */
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        
        {/* Navigation / Breadcrumb to get back to home */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold bg-secondary px-2 py-1 rounded">
            Live Market Terminal
          </div>
        </div>

        <header className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Market Intelligence
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Real-time analytics across global equities, forex, and digital assets. 
            Use the terminal below to search specific symbols.
          </p>
        </header>

        <div className="grid gap-8">
          {/* SEARCH SECTION */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Search className="h-4 w-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Global Symbol Search</h2>
            </div>
            {/* We wrap the component in a relative div to ensure it anchors correctly */}
            <div className="relative w-full rounded-xl border border-border bg-card overflow-hidden">
              <SymbolSearch />
            </div>
          </section>

          {/* OVERVIEW SECTION */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Market Heatmap</h2>
            <div className="relative w-full rounded-xl border border-border bg-card overflow-hidden">
              <MarketWidget />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
