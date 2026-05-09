import { createClient } from "@/lib/supabase/server"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { TrendingUp, TrendingDown, Bitcoin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const dynamic = 'force-dynamic'

export default async function CryptoPage() {
  const supabase = await createClient()
  
  // 1. Fetch data
  const { data: rawData, error } = await supabase
    .from('crypto_assets')
    .select('*')
    .order('rank', { ascending: true })

  // 2. FIX: Convert BigInt strings/objects to Numbers to prevent the Server Error
  const cryptoData = rawData?.map(coin => ({
    ...coin,
    market_cap: Number(coin.market_cap), // Convert from BigInt to Number
    volume_24h: Number(coin.volume_24h)  // Convert from BigInt to Number
  })) || [];

  const formatCurrency = (val: number) => {
    if (!val) return "---";
    if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
    if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
    if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
    return val.toLocaleString();
  }

  if (error) return <div className="text-white p-20 text-center font-mono">Terminal Error: Data Link Severed</div>

  return (
    <main className="min-h-screen bg-black">
      <TickerBar />
      <NewsHeader />
      
      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-10 border-l-2 border-primary pl-6">
          <Bitcoin className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">Digital <span className="text-primary">Assets</span></h1>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Global Crypto Exchange Feed</p>
          </div>
        </div>

        <Card className="bg-[#080808] border-white/5 rounded-none shadow-2xl">
          <CardHeader className="bg-white/[0.02] border-b border-white/5 py-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Market Capitalization Ranking</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-zinc-700 font-bold uppercase text-[9px] py-4 pl-8"># Asset</TableHead>
                    <TableHead className="text-right text-zinc-700 font-bold uppercase text-[9px]">Last Price</TableHead>
                    <TableHead className="text-right text-zinc-700 font-bold uppercase text-[9px]">24H %</TableHead>
                    <TableHead className="text-right text-zinc-700 font-bold uppercase text-[9px] pr-8">Market Cap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptoData.map((coin) => (
                    <TableRow key={coin.symbol} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                      <TableCell className="py-5 pl-8">
                        <div className="flex flex-col">
                          <span className="font-black font-mono text-white text-md tracking-tighter italic group-hover:text-primary transition-colors">
                            {coin.symbol}
                          </span>
                          <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{coin.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-zinc-300">
                        ${coin.price < 1 ? coin.price.toFixed(5) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end gap-1 font-mono font-black text-xs ${coin.change_24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                          {coin.change_24h >= 0 ? "+" : ""}{coin.change_24h.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8 font-mono text-zinc-500 text-[11px] font-bold">
                        ${formatCurrency(coin.market_cap)}
                      </TableCell>
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
