import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { Landmark, Clock, ArrowRight, TrendingUp, TrendingDown, AlertTriangle, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EconomyNews {
  id: string
  title: string
  summary: string
  source: string
  time: string
  category: "fed" | "trade" | "employment" | "inflation" | "global" | "policy"
  impact: "high" | "medium" | "low"
  region: "US" | "Global"
}

const economyNews: EconomyNews[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in September",
    summary: "Fed Chair Powell indicates inflation is moving toward target, suggesting the central bank may begin easing monetary policy later this year. Markets react positively to dovish tone.",
    source: "Federal Reserve",
    time: "2 hours ago",
    category: "fed",
    impact: "high",
    region: "US"
  },
  {
    id: "2",
    title: "US Unemployment Claims Drop to 6-Month Low",
    summary: "Initial jobless claims fell to 215,000, below expectations of 225,000, signaling continued strength in the labor market despite economic headwinds.",
    source: "Department of Labor",
    time: "4 hours ago",
    category: "employment",
    impact: "high",
    region: "US"
  },
  {
    id: "3",
    title: "China GDP Growth Slows to 4.7% in Q2",
    summary: "Chinese economy expands at slower pace amid property sector struggles and weak consumer spending, raising concerns about global growth prospects.",
    source: "National Bureau of Statistics",
    time: "6 hours ago",
    category: "global",
    impact: "high",
    region: "Global"
  },
  {
    id: "4",
    title: "US-EU Trade Talks Resume on Tariff Reduction",
    summary: "Senior officials from both sides meet in Brussels to discuss eliminating tariffs on industrial goods, potentially boosting transatlantic trade by $150 billion annually.",
    source: "US Trade Representative",
    time: "8 hours ago",
    category: "trade",
    impact: "medium",
    region: "Global"
  },
  {
    id: "5",
    title: "Core PCE Inflation Falls to 2.6% Year-over-Year",
    summary: "The Fed's preferred inflation measure continues its downward trend, moving closer to the 2% target. Housing and services costs remain sticky.",
    source: "Bureau of Economic Analysis",
    time: "10 hours ago",
    category: "inflation",
    impact: "high",
    region: "US"
  },
  {
    id: "6",
    title: "ECB Holds Rates Steady, Signals Caution on Future Cuts",
    summary: "European Central Bank maintains benchmark rate at 4.25%, citing persistent wage pressures despite easing headline inflation across the eurozone.",
    source: "European Central Bank",
    time: "12 hours ago",
    category: "global",
    impact: "medium",
    region: "Global"
  },
  {
    id: "7",
    title: "US Manufacturing PMI Expands for Second Consecutive Month",
    summary: "ISM Manufacturing Index rises to 51.2, indicating expansion in the sector. New orders and production show strongest gains since early 2022.",
    source: "ISM",
    time: "1 day ago",
    category: "employment",
    impact: "medium",
    region: "US"
  },
  {
    id: "8",
    title: "Treasury Yields Fall as Investors Bet on Rate Cuts",
    summary: "10-year Treasury yield drops to 4.15% as bond markets price in aggressive Fed easing cycle. Mortgage rates expected to follow.",
    source: "US Treasury",
    time: "1 day ago",
    category: "policy",
    impact: "high",
    region: "US"
  },
  {
    id: "9",
    title: "Japan Intervenes in Currency Markets to Support Yen",
    summary: "Bank of Japan suspected of selling dollars after yen weakens past 160 per dollar. Ministry of Finance declines to confirm intervention.",
    source: "Reuters",
    time: "1 day ago",
    category: "global",
    impact: "medium",
    region: "Global"
  },
  {
    id: "10",
    title: "Biden Administration Announces $50B Infrastructure Investment",
    summary: "White House unveils major spending package for bridges, roads, and broadband expansion. Projects expected to create 500,000 jobs over five years.",
    source: "White House",
    time: "2 days ago",
    category: "policy",
    impact: "high",
    region: "US"
  },
]

const economicIndicators = [
  { name: "GDP Growth", value: "2.8%", change: 0.3, period: "Q2 2024" },
  { name: "Inflation (CPI)", value: "3.0%", change: -0.3, period: "YoY" },
  { name: "Unemployment", value: "3.9%", change: 0.1, period: "June 2024" },
  { name: "Fed Funds Rate", value: "5.25-5.50%", change: 0, period: "Current" },
  { name: "10Y Treasury", value: "4.15%", change: -0.12, period: "Current" },
  { name: "Consumer Confidence", value: "100.4", change: 2.3, period: "June 2024" },
]

const categoryConfig = {
  fed: { label: "Federal Reserve", color: "bg-blue-500/20 text-blue-400" },
  trade: { label: "Trade", color: "bg-amber-500/20 text-amber-400" },
  employment: { label: "Employment", color: "bg-green-500/20 text-green-400" },
  inflation: { label: "Inflation", color: "bg-red-500/20 text-red-400" },
  global: { label: "Global", color: "bg-purple-500/20 text-purple-400" },
  policy: { label: "Policy", color: "bg-cyan-500/20 text-cyan-400" },
}

const impactConfig = {
  high: { icon: AlertTriangle, color: "text-red-500" },
  medium: { icon: TrendingUp, color: "text-amber-500" },
  low: { icon: TrendingDown, color: "text-muted-foreground" },
}

export default function EconomyPage() {
  return (
    <main className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Landmark className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Economy</h1>
            <p className="text-muted-foreground">Latest news impacting the US and world economy</p>
          </div>
        </div>

        {/* Economic Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {economicIndicators.map((indicator) => (
            <Card key={indicator.name} className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{indicator.name}</p>
                <p className="text-xl font-bold text-foreground">{indicator.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {indicator.change !== 0 && (
                    <span className={`text-xs flex items-center gap-0.5 ${
                      indicator.change > 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {indicator.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {indicator.change > 0 ? "+" : ""}{indicator.change}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{indicator.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured Story */}
          <Card className="lg:col-span-2 bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={categoryConfig[economyNews[0].category].color}>
                  {categoryConfig[economyNews[0].category].label}
                </Badge>
                <Badge variant="outline" className="border-border">
                  {economyNews[0].region === "US" ? "US Economy" : "Global"}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Clock className="h-3 w-3" />
                  {economyNews[0].time}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">{economyNews[0].title}</h2>
              <p className="text-muted-foreground mb-4">{economyNews[0].summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Source: {economyNews[0].source}</span>
                <button className="flex items-center gap-1 text-primary text-sm hover:underline">
                  Read full analysis <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* News List */}
          {economyNews.slice(1).map((news) => {
            const ImpactIcon = impactConfig[news.impact].icon
            return (
              <Card key={news.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={categoryConfig[news.category].color}>
                      {categoryConfig[news.category].label}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs">
                      {news.region === "Global" && <Globe className="h-3 w-3 text-muted-foreground" />}
                      <ImpactIcon className={`h-3 w-3 ${impactConfig[news.impact].color}`} />
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="h-3 w-3" />
                      {news.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{news.source}</span>
                    <button className="text-primary text-xs hover:underline flex items-center gap-1">
                      Read more <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
