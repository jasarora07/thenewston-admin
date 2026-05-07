"use client"

import { TrendingUp, TrendingDown, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Stock {
  rank: number
  symbol: string
  name: string
  price: string
  change: number
  changePercent: number
  volume: string
  marketCap: string
}

const topStocks: Stock[] = [
  {
    rank: 1,
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: "875.30",
    change: 12.45,
    changePercent: 1.44,
    volume: "42.5M",
    marketCap: "2.15T",
  },
  {
    rank: 2,
    symbol: "AAPL",
    name: "Apple Inc",
    price: "189.45",
    change: 2.34,
    changePercent: 1.25,
    volume: "58.2M",
    marketCap: "2.95T",
  },
  {
    rank: 3,
    symbol: "TSLA",
    name: "Tesla Inc",
    price: "248.50",
    change: 5.67,
    changePercent: 2.33,
    volume: "95.1M",
    marketCap: "791B",
  },
  {
    rank: 4,
    symbol: "META",
    name: "Meta Platforms",
    price: "505.12",
    change: -2.78,
    changePercent: -0.55,
    volume: "18.3M",
    marketCap: "1.28T",
  },
  {
    rank: 5,
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: "141.80",
    change: 3.45,
    changePercent: 2.49,
    volume: "24.7M",
    marketCap: "1.78T",
  },
]

export function TopStocks() {
  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="flex items-center justify-between text-sm sm:text-lg">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500" />
            Top 5 Stocks
          </span>
          <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-7 sm:h-9 px-2 sm:px-3">
            See All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-2 sm:px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-[10px] sm:text-xs w-6 sm:w-8 px-1 sm:px-4">#</TableHead>
              <TableHead className="text-muted-foreground text-[10px] sm:text-xs px-1 sm:px-4">Symbol</TableHead>
              <TableHead className="text-muted-foreground text-[10px] sm:text-xs text-right px-1 sm:px-4">Price</TableHead>
              <TableHead className="text-muted-foreground text-[10px] sm:text-xs text-right px-1 sm:px-4">Change</TableHead>
              <TableHead className="text-muted-foreground text-[10px] sm:text-xs text-right hidden lg:table-cell">Vol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topStocks.map((stock) => (
              <TableRow
                key={stock.symbol}
                className="border-border cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <TableCell className="text-muted-foreground text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-4">
                  {stock.rank}
                </TableCell>
                <TableCell className="py-2 sm:py-3 px-1 sm:px-4">
                  <div>
                    <div className="font-semibold text-foreground text-xs sm:text-sm">{stock.symbol}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[60px] sm:max-w-none">{stock.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm font-medium text-foreground py-2 sm:py-3 px-1 sm:px-4">
                  ${stock.price}
                </TableCell>
                <TableCell className="text-right py-2 sm:py-3 px-1 sm:px-4">
                  <div
                    className={`flex items-center justify-end gap-0.5 sm:gap-1 text-xs sm:text-sm ${
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    ) : (
                      <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    )}
                    <span>{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground py-2 sm:py-3 hidden lg:table-cell">
                  {stock.volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-3 sm:p-4 pt-2">
          <div className="rounded-lg bg-secondary/50 p-2 sm:p-3">
            <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1.5 sm:mb-2">
              <span className="text-muted-foreground">Market Sentiment</span>
              <span className="text-green-500 font-medium">Bullish</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 sm:h-2 rounded-full"
                style={{ width: "72%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs mt-1 text-muted-foreground">
              <span>Fear</span>
              <span>72</span>
              <span>Greed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
