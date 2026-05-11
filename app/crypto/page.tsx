import { createClient } from "@/lib/supabase/server"
// REMOVED TickerBar and NewsHeader imports as they are global now
import { TrendingUp, TrendingDown, Bitcoin, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ sort?: string; order?: 'asc' | 'desc' }>
}

export default async function CryptoPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { sort = 'rank', order = 'asc' } = await searchParams

  // Fetch data with dynamic sorting
  const { data: rawData } = await supabase
    .from('crypto_assets')
    .select('*')
    .order(sort, { ascending: order === 'asc' })

  const cryptoData = rawData?.map(coin => ({
    ...coin,
    market_cap: Number(coin.market_cap),
    volume_24h: Number(coin.volume_24h)
  })) || [];

  const formatCurrency = (val: number) => {
    if (!val) return "---";
    if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
    if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
    return val.toLocaleString();
  }

  const getSortLink = (column: string) => {
    const newOrder = sort === column && order === 'desc' ? 'asc' : 'desc'
    return `?sort=${column}&order=${newOrder}`
  }

  return (
    // REMOVED <TickerBar /> and <NewsHeader /> from here
    <main className="min-h-screen bg-black">
      <div className="container max-w-6xl px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Bitcoin className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-black italic uppercase text-white tracking-tight">
            Market <span className="text-primary">Cap</span> Ranking
          </h1>
        </div>

        <Card className="bg-[#0A0A0A] border-white/10 rounded-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-white/[0.03]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="py-4 pl-6">
                    <Link href={getSortLink('rank')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider">
                      # <ArrowUpDown className="h-3 w-3" />
                    </Link>
                  </TableHead>
                  <TableHead>
                    <Link href={getSortLink('symbol')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider">
                      Asset <ArrowUpDown className="h-3 w-3" />
                    </Link>
                  </TableHead>
                  <TableHead className="text-right">
                    <Link href={getSortLink('price')} className="flex items-center justify-end gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider">
                      Price <ArrowUpDown className="h-3 w-3" />
                    </Link>
                  </TableHead>
                  <TableHead className="text-right">
                    <Link href={getSortLink('change_24h')} className="flex items-center justify-end gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider">
                      24H % <ArrowUpDown className="h-3 w-3" />
                    </Link>
                  </TableHead>
                  <TableHead className="text-right pr-6">
                    <Link href={getSortLink('market_cap')} className="flex items-center justify-end gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider">
                      Market Cap <ArrowUpDown className="h-3 w-3" />
                    </Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {cryptoData.map((coin) => (
                  <TableRow key={coin.symbol} className="border-white/5 hover:bg-white/[0.04] group transition-colors">
                    <TableCell className="py-3 pl-6 font-mono text-zinc-500 text-xs">
                      {coin.rank}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col leading-tight">
                        <span className="font-bold text-white text-sm group-hover:text-primary transition-colors uppercase italic">
                          {coin.symbol}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-zinc-200 text-sm">
                      ${coin.price < 1 ? coin.price.toFixed(5) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-mono font-black text-xs ${coin.change_24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {coin.change_24h >= 0 ? "+" : ""}{coin.change_24h.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-mono text-white text-xs font-medium">
                      ${formatCurrency(coin.market_cap)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
