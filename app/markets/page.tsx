import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { TrendingUp, TrendingDown, Globe, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IndexData {
  name: string
  symbol: string
  value: string
  change: number
  changePercent: number
  region: string
  status: "open" | "closed"
}

const worldIndices: IndexData[] = [
  // Americas
  { name: "Dow Jones Industrial", symbol: "DJI", value: "38,654.42", change: 125.08, changePercent: 0.32, region: "Americas", status: "open" },
  { name: "S&P 500", symbol: "SPX", value: "5,123.41", change: 18.52, changePercent: 0.36, region: "Americas", status: "open" },
  { name: "NASDAQ Composite", symbol: "IXIC", value: "16,156.33", change: -45.23, changePercent: -0.28, region: "Americas", status: "open" },
  { name: "Russell 2000", symbol: "RUT", value: "2,054.75", change: 12.34, changePercent: 0.60, region: "Americas", status: "open" },
  { name: "S&P/TSX Composite", symbol: "GSPTSE", value: "21,892.45", change: -78.12, changePercent: -0.36, region: "Americas", status: "closed" },
  { name: "Bovespa", symbol: "BVSP", value: "128,456.78", change: 892.34, changePercent: 0.70, region: "Americas", status: "closed" },
  // Europe
  { name: "FTSE 100", symbol: "FTSE", value: "7,842.65", change: 34.21, changePercent: 0.44, region: "Europe", status: "closed" },
  { name: "DAX", symbol: "GDAXI", value: "17,892.45", change: -56.78, changePercent: -0.32, region: "Europe", status: "closed" },
  { name: "CAC 40", symbol: "FCHI", value: "8,012.34", change: 28.45, changePercent: 0.36, region: "Europe", status: "closed" },
  { name: "Euro Stoxx 50", symbol: "STOXX50E", value: "4,892.12", change: 15.67, changePercent: 0.32, region: "Europe", status: "closed" },
  { name: "IBEX 35", symbol: "IBEX", value: "10,456.78", change: -23.45, changePercent: -0.22, region: "Europe", status: "closed" },
  { name: "SMI", symbol: "SSMI", value: "11,234.56", change: 45.67, changePercent: 0.41, region: "Europe", status: "closed" },
  // Asia Pacific
  { name: "Nikkei 225", symbol: "N225", value: "38,912.45", change: 234.56, changePercent: 0.61, region: "Asia Pacific", status: "closed" },
  { name: "Hang Seng", symbol: "HSI", value: "16,892.34", change: -123.45, changePercent: -0.73, region: "Asia Pacific", status: "closed" },
  { name: "Shanghai Composite", symbol: "SSEC", value: "3,045.67", change: 12.34, changePercent: 0.41, region: "Asia Pacific", status: "closed" },
  { name: "ASX 200", symbol: "AXJO", value: "7,756.89", change: 28.90, changePercent: 0.37, region: "Asia Pacific", status: "closed" },
  { name: "KOSPI", symbol: "KS11", value: "2,678.45", change: -15.67, changePercent: -0.58, region: "Asia Pacific", status: "closed" },
  { name: "Sensex", symbol: "BSESN", value: "72,456.78", change: 345.67, changePercent: 0.48, region: "Asia Pacific", status: "closed" },
]

const regions = ["Americas", "Europe", "Asia Pacific"]

export default function MarketsPage() {
  return (
    <main className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">World Markets</h1>
            <p className="text-xs sm:text-base text-muted-foreground">Global indices and market performance</p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-8">
          {regions.map((region) => (
            <section key={region}>
              <h2 className="text-base sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
                {region}
              </h2>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {worldIndices
                  .filter((index) => index.region === region)
                  .map((index) => (
                    <Card key={index.symbol} className="bg-card border-border hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-1.5 sm:pb-2 p-3 sm:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle className="text-xs sm:text-base font-medium leading-tight">{index.name}</CardTitle>
                          <span className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap ${
                            index.status === "open" 
                              ? "bg-green-500/20 text-green-500" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {index.status === "open" ? "Open" : "Closed"}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{index.symbol}</p>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-6 pt-0">
                        <div className="flex items-end justify-between gap-2">
                          <span className="text-lg sm:text-2xl font-bold text-foreground">{index.value}</span>
                          <div className={`flex items-center gap-0.5 sm:gap-1 ${
                            index.change >= 0 ? "text-green-500" : "text-red-500"
                          }`}>
                            {index.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                            <span className="text-[10px] sm:text-sm font-medium">
                              {index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
