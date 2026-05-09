import { createClient } from "@/lib/supabase/server"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { TrendingUp, TrendingDown, BarChart3, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const dynamic = 'force-dynamic'

export default async function StocksPage() {
  const supabase = await createClient()
  
  const { data: stockData, error } = await supabase
    .from('stocks')
    .select('*')
    .order('price', { ascending: false })

  const indices = ["S&P 500", "NASDAQ 100", "Dow Jones"];
  
  // If no data yet, show a professional loading/empty state
  if (!stockData || stockData.length === 0) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">
        <Loader2 className="h-6 w-6 animate-spin mb-4 text-primary" />
        Establishing Terminal Connection...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tighter italic uppercase">Market <span className="text-primary">Equities</span></h1>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Global Exchange Feed // Verified</p>
          </div>
        </div>

        <div className="grid gap-8">
          {indices.map((indexName) => {
            const groupStocks = stockData.filter(s => s.index_group === indexName);
            if (groupStocks.length === 0) return null; // Don't show empty index cards

            return (
              <Card key={indexName} className="bg-[#0A0A0A] border-white/5 overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                  <CardTitle className="text-sm font-black italic uppercase flex items-center gap-2 tracking-widest text-zinc-400">
                    <div className="h-3 w-1 bg-primary" />
                    {indexName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-zinc-600 font-bold uppercase text-[9px] pl-6">Ticker</TableHead>
                        <TableHead className="text-right text-zinc-600 font-bold uppercase text-[9px]">Price</TableHead>
                        <TableHead className="text-right text-zinc-600 font-bold uppercase text-[9px] pr-6">Day Chg</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupStocks.map((stock) => (
                        <TableRow key={stock.symbol} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                          <TableCell className="font-black font-mono text-white pl-6">
                            {stock.symbol}
                            <span className="block text-[8px] text-zinc-600 font-sans uppercase tracking-tighter uppercase">{stock.name}</span>
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold text-zinc-200">
                            ${stock.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <span className={`flex items-center justify-end gap-1 font-mono font-bold text-xs ${stock.change_percent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                              {stock.change_percent >= 0 ? "+" : ""}{stock.change_percent?.toFixed(2)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
