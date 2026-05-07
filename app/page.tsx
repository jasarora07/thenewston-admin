import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { BreakingNews } from "@/components/breaking-news"
import { BlogList } from "@/components/blog-list"
import { TopStocks } from "@/components/top-stocks"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Ticker Bar */}
      <TickerBar />

      {/* Header */}
      <NewsHeader />

      {/* Main Content */}
      <main className="container px-4 py-6">
        {/* Dashboard Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">
            Financial Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time market news and insights
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Breaking News */}
          <div className="lg:col-span-1">
            <BreakingNews />
          </div>

          {/* Column 2: Deep-Dive Blog List */}
          <div className="lg:col-span-1">
            <BlogList />
          </div>

          {/* Column 3: Top 5 Stocks */}
          <div className="lg:col-span-1">
            <TopStocks />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-8">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="text-sm text-muted-foreground">
                2026 The Newston. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
