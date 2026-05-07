import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { TrendingUp, TrendingDown, Bitcoin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Crypto {
  rank: number
  symbol: string
  name: string
  price: string
  change24h: number
  change7d: number
  marketCap: string
  volume24h: string
  supply: string
}

const cryptoData: Crypto[] = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: "67,234.56", change24h: 2.34, change7d: 5.67, marketCap: "1.32T", volume24h: "28.5B", supply: "19.6M BTC" },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: "3,456.78", change24h: -1.23, change7d: 3.45, marketCap: "415B", volume24h: "15.2B", supply: "120.2M ETH" },
  { rank: 3, symbol: "BNB", name: "BNB", price: "567.89", change24h: 0.89, change7d: -2.34, marketCap: "86.7B", volume24h: "1.8B", supply: "153M BNB" },
  { rank: 4, symbol: "SOL", name: "Solana", price: "145.67", change24h: 4.56, change7d: 12.34, marketCap: "64.2B", volume24h: "3.2B", supply: "441M SOL" },
  { rank: 5, symbol: "XRP", name: "XRP", price: "0.5234", change24h: -0.45, change7d: -1.23, marketCap: "28.9B", volume24h: "1.2B", supply: "55.2B XRP" },
  { rank: 6, symbol: "ADA", name: "Cardano", price: "0.4567", change24h: 1.23, change7d: 4.56, marketCap: "16.2B", volume24h: "456M", supply: "35.5B ADA" },
  { rank: 7, symbol: "DOGE", name: "Dogecoin", price: "0.1234", change24h: 3.45, change7d: 8.90, marketCap: "17.8B", volume24h: "1.1B", supply: "144B DOGE" },
  { rank: 8, symbol: "AVAX", name: "Avalanche", price: "34.56", change24h: -2.34, change7d: 1.23, marketCap: "13.4B", volume24h: "567M", supply: "388M AVAX" },
  { rank: 9, symbol: "DOT", name: "Polkadot", price: "7.89", change24h: 0.67, change7d: -0.89, marketCap: "10.8B", volume24h: "312M", supply: "1.37B DOT" },
  { rank: 10, symbol: "LINK", name: "Chainlink", price: "14.56", change24h: 2.89, change7d: 6.78, marketCap: "8.5B", volume24h: "456M", supply: "587M LINK" },
  { rank: 11, symbol: "MATIC", name: "Polygon", price: "0.7234", change24h: -1.45, change7d: 2.34, marketCap: "7.2B", volume24h: "345M", supply: "9.9B MATIC" },
  { rank: 12, symbol: "UNI", name: "Uniswap", price: "9.87", change24h: 1.67, change7d: 3.45, marketCap: "5.9B", volume24h: "189M", supply: "600M UNI" },
  { rank: 13, symbol: "LTC", name: "Litecoin", price: "78.90", change24h: -0.89, change7d: -2.34, marketCap: "5.8B", volume24h: "423M", supply: "73.8M LTC" },
  { rank: 14, symbol: "ATOM", name: "Cosmos", price: "8.45", change24h: 2.12, change7d: 5.67, marketCap: "3.2B", volume24h: "178M", supply: "381M ATOM" },
  { rank: 15, symbol: "XLM", name: "Stellar", price: "0.1123", change24h: 0.45, change7d: 1.23, marketCap: "3.1B", volume24h: "89M", supply: "28.1B XLM" },
]

const marketStats = {
  totalMarketCap: "$2.45T",
  totalVolume: "$98.5B",
  btcDominance: "52.4%",
  ethDominance: "17.8%",
  activeCryptos: "2.4M+",
  exchanges: "750+"
}

export default function CryptoPage() {
  return (
    <main className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Cryptocurrency</h1>
            <p className="text-xs sm:text-base text-muted-foreground">Top cryptocurrencies by market cap</p>
          </div>
        </div>

        {/* Market Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Total Market Cap</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{marketStats.totalMarketCap}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">24h Volume</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{marketStats.totalVolume}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">BTC Dominance</p>
              <p className="text-sm sm:text-lg font-bold text-primary">{marketStats.btcDominance}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">ETH Dominance</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{marketStats.ethDominance}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Active Cryptos</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{marketStats.activeCryptos}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-2.5 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Exchanges</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{marketStats.exchanges}</p>
            </CardContent>
          </Card>
        </div>

        {/* Crypto Table */}
        <Card className="bg-card border-border">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-xl">
              <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary" />
              Top Cryptocurrencies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-[10px] sm:text-sm w-8 sm:w-12 px-2 sm:px-4">#</TableHead>
                    <TableHead className="text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4">Name</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4">Price</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4">24h</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4 hidden sm:table-cell">7d</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4 hidden md:table-cell">Market Cap</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4 hidden lg:table-cell">Volume</TableHead>
                    <TableHead className="text-right text-muted-foreground text-[10px] sm:text-sm px-2 sm:px-4 hidden xl:table-cell">Supply</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptoData.map((crypto) => (
                    <TableRow key={crypto.symbol} className="border-border hover:bg-secondary/50">
                      <TableCell className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">{crypto.rank}</TableCell>
                      <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                          <span className="font-semibold text-foreground text-xs sm:text-sm">{crypto.name}</span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">{crypto.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">${crypto.price}</TableCell>
                      <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-4">
                        <span className={`flex items-center justify-end gap-0.5 sm:gap-1 text-[10px] sm:text-sm ${
                          crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          ) : (
                            <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          )}
                          {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-4 hidden sm:table-cell">
                        <span className={`flex items-center justify-end gap-0.5 sm:gap-1 text-[10px] sm:text-sm ${
                          crypto.change7d >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {crypto.change7d >= 0 ? (
                            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          ) : (
                            <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          )}
                          {crypto.change7d >= 0 ? "+" : ""}{crypto.change7d.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden md:table-cell">${crypto.marketCap}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden lg:table-cell">${crypto.volume24h}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4 hidden xl:table-cell">{crypto.supply}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
