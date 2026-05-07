"use client"

import { Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  category: string
  isBreaking?: boolean
}

const breakingNews: NewsItem[] = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cut in September Meeting",
    source: "Reuters",
    time: "2 min ago",
    category: "Economy",
    isBreaking: true,
  },
  {
    id: "2",
    title: "Apple Reports Record Q3 Revenue Beating Analyst Expectations",
    source: "Bloomberg",
    time: "15 min ago",
    category: "Tech",
  },
  {
    id: "3",
    title: "Oil Prices Surge 3% on Supply Concerns in Middle East",
    source: "CNBC",
    time: "32 min ago",
    category: "Commodities",
  },
  {
    id: "4",
    title: "Tesla Announces New Gigafactory Location in Mexico",
    source: "WSJ",
    time: "45 min ago",
    category: "Auto",
  },
  {
    id: "5",
    title: "Bitcoin Crosses $65,000 Mark Amid ETF Inflows",
    source: "CoinDesk",
    time: "1 hr ago",
    category: "Crypto",
  },
  {
    id: "6",
    title: "Amazon Web Services Launches New AI Infrastructure",
    source: "TechCrunch",
    time: "1.5 hr ago",
    category: "Tech",
  },
  {
    id: "7",
    title: "European Markets Close Higher on Strong Earnings",
    source: "Financial Times",
    time: "2 hr ago",
    category: "Markets",
  },
  {
    id: "8",
    title: "Goldman Sachs Upgrades Tech Sector to Overweight",
    source: "MarketWatch",
    time: "2.5 hr ago",
    category: "Analysis",
  },
]

export function BreakingNews() {
  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Breaking News
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px] sm:h-[calc(100vh-280px)]">
          <div className="space-y-1 px-3 sm:px-4 pb-3 sm:pb-4">
            {breakingNews.map((news) => (
              <div
                key={news.id}
                className="group cursor-pointer rounded-lg p-2 sm:p-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                  <Badge
                    variant={news.isBreaking ? "destructive" : "secondary"}
                    className="text-[10px] sm:text-xs px-1.5 sm:px-2"
                  >
                    {news.isBreaking ? "BREAKING" : news.category}
                  </Badge>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-foreground leading-tight mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                  <span>{news.source}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {news.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
