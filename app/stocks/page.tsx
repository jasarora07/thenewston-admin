import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Stock {
  symbol: string
  name: string
  price: string
  change: number
  changePercent: number
  volume: string
  marketCap: string
}

interface IndexStocks {
  indexName: string
  indexSymbol: string
  stocks: Stock[]
}

const stocksByIndex: IndexStocks[] = [
  {
    indexName: "S&P 500",
    indexSymbol: "SPX",
    stocks: [
      { symbol: "AAPL", name: "Apple Inc.", price: "189.45", change: 2.34, changePercent: 1.25, volume: "52.3M", marketCap: "2.95T" },
      { symbol: "MSFT", name: "Microsoft Corp.", price: "378.91", change: -1.23, changePercent: -0.32, volume: "21.8M", marketCap: "2.81T" },
      { symbol: "NVDA", name: "NVIDIA Corp.", price: "875.30", change: 12.45, changePercent: 1.44, volume: "45.2M", marketCap: "2.16T" },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: "178.25", change: 1.89, changePercent: 1.07, volume: "38.9M", marketCap: "1.86T" },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: "141.80", change: 3.45, changePercent: 2.49, volume: "28.4M", marketCap: "1.78T" },
    ]
  },
  {
    indexName: "NASDAQ 100",
    indexSymbol: "NDX",
    stocks: [
      { symbol: "META", name: "Meta Platforms Inc.", price: "505.12", change: -2.78, changePercent: -0.55, volume: "18.5M", marketCap: "1.29T" },
      { symbol: "TSLA", name: "Tesla Inc.", price: "248.50", change: 5.67, changePercent: 2.33, volume: "98.2M", marketCap: "790B" },
      { symbol: "AVGO", name: "Broadcom Inc.", price: "1,284.50", change: 18.90, changePercent: 1.49, volume: "3.2M", marketCap: "598B" },
      { symbol: "COST", name: "Costco Wholesale", price: "728.45", change: -3.21, changePercent: -0.44, volume: "2.1M", marketCap: "323B" },
      { symbol: "NFLX", name: "Netflix Inc.", price: "628.90", change: 8.45, changePercent: 1.36, volume: "4.8M", marketCap: "275B" },
    ]
  },
  {
    indexName: "Dow Jones",
    indexSymbol: "DJI",
    stocks: [
      { symbol: "UNH", name: "UnitedHealth Group", price: "524.30", change: -4.56, changePercent: -0.86, volume: "3.4M", marketCap: "485B" },
      { symbol: "GS", name: "Goldman Sachs", price: "412.75", change: 6.78, changePercent: 1.67, volume: "2.1M", marketCap: "138B" },
      { symbol: "HD", name: "Home Depot Inc.", price: "348.90", change: 2.34, changePercent: 0.68, volume: "4.5M", marketCap: "346B" },
      { symbol: "CAT", name: "Caterpillar Inc.", price: "312.45", change: -1.89, changePercent: -0.60, volume: "2.8M", marketCap: "154B" },
      { symbol: "MCD", name: "McDonald's Corp.", price: "278.60", change: 1.23, changePercent: 0.44, volume: "3.2M", marketCap: "200B" },
    ]
  },
  {
    indexName: "FTSE 100",
    indexSymbol: "FTSE",
    stocks: [
      { symbol: "SHEL", name: "Shell PLC", price: "31.45", change: 0.45, changePercent: 1.45, volume: "12.3M", marketCap: "198B" },
      { symbol: "AZN", name: "AstraZeneca PLC", price: "118.90", change: 2.34, changePercent: 2.01, volume: "5.6M", marketCap: "186B" },
      { symbol: "HSBA", name: "HSBC Holdings", price: "7.12", change: -0.08, changePercent: -1.11, volume: "28.9M", marketCap: "142B" },
      { symbol: "ULVR", name: "Unilever PLC", price: "44.78", change: 0.34, changePercent: 0.77, volume: "4.2M", marketCap: "115B" },
      { symbol: "BP", name: "BP PLC", price: "5.34", change: -0.12, changePercent: -2.20, volume: "32.1M", marketCap: "92B" },
    ]
  },
  {
    indexName: "Nikkei 225",
    indexSymbol: "N225",
    stocks: [
      { symbol: "7203.T", name: "Toyota Motor Corp.", price: "3,456", change: 45, changePercent: 1.32, volume: "8.9M", marketCap: "45.2T" },
      { symbol: "6758.T", name: "Sony Group Corp.", price: "12,890", change: -156, changePercent: -1.20, volume: "4.5M", marketCap: "16.1T" },
      { symbol: "8306.T", name: "Mitsubishi UFJ", price: "1,456", change: 23, changePercent: 1.60, volume: "18.2M", marketCap: "17.5T" },
      { symbol: "9984.T", name: "SoftBank Group", price: "8,234", change: 178, changePercent: 2.21, volume: "12.3M", marketCap: "12.1T" },
      { symbol: "6861.T", name: "Keyence Corp.", price: "67,890", change: 890, changePercent: 1.33, volume: "0.8M", marketCap: "16.5T" },
    ]
  },
  {
    indexName: "DAX 40",
    indexSymbol: "GDAXI",
    stocks: [
      { symbol: "SAP", name: "SAP SE", price: "178.45", change: 2.34, changePercent: 1.33, volume: "2.1M", marketCap: "207B" },
      { symbol: "SIE", name: "Siemens AG", price: "172.30", change: -1.56, changePercent: -0.90, volume: "1.8M", marketCap: "137B" },
      { symbol: "ALV", name: "Allianz SE", price: "256.80", change: 3.45, changePercent: 1.36, volume: "1.2M", marketCap: "102B" },
      { symbol: "DTE", name: "Deutsche Telekom", price: "22.45", change: 0.23, changePercent: 1.04, volume: "8.9M", marketCap: "111B" },
      { symbol: "MBG", name: "Mercedes-Benz Group", price: "72.34", change: -0.89, changePercent: -1.22, volume: "2.3M", marketCap: "77B" },
    ]
  },
]

export default function StocksPage() {
  return (
    <main className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Top Stocks by Index</h1>
            <p className="text-xs sm:text-base text-muted-foreground">Top 5 performing stocks from major indices</p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-8">
          {stocksByIndex.map((indexGroup) => (
            <Card key={indexGroup.indexSymbol} className="bg-card border-border">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-xl">
                  <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary" />
                  {indexGroup.indexName}
                  <span className="text-xs sm:text-sm font-normal text-muted-foreground">({indexGroup.indexSymbol})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4">Symbol</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4 hidden sm:table-cell">Company</TableHead>
                        <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4">Price</TableHead>
                        <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4">Change</TableHead>
                        <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4 hidden md:table-cell">Volume</TableHead>
                        <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4 hidden lg:table-cell">Market Cap</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {indexGroup.stocks.map((stock) => (
                        <TableRow key={stock.symbol} className="border-border hover:bg-secondary/50">
                          <TableCell className="font-semibold text-primary text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">{stock.symbol}</TableCell>
                          <TableCell className="text-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden sm:table-cell">{stock.name}</TableCell>
                          <TableCell className="text-right font-medium text-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">${stock.price}</TableCell>
                          <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-4">
                            <span className={`flex items-center justify-end gap-0.5 sm:gap-1 text-[10px] sm:text-sm ${
                              stock.change >= 0 ? "text-green-500" : "text-red-500"
                            }`}>
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              ) : (
                                <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              )}
                              {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden md:table-cell">{stock.volume}</TableCell>
                          <TableCell className="text-right text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden lg:table-cell">${stock.marketCap}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
