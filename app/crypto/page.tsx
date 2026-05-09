import { createClient } from "@/lib/supabase/server"
// ... (imports remain the same)

export const dynamic = 'force-dynamic'

export default async function CryptoPage() {
  const supabase = await createClient()
  const { data: cryptoData } = await supabase
    .from('crypto_assets')
    .select('*')
    .order('rank', { ascending: true })

  // Use a fallback to prevent "No data" flickers if the DB is responding slowly
  const displayData = cryptoData || [];

  return (
    <main className="min-h-screen bg-black">
      {/* ... (Header & NewsHeader remain same) */}
      
      <div className="container px-4 py-8">
         {/* ... (Market Overview Stats) */}

        <Card className="bg-[#080808] border-white/5 rounded-none">
          {/* ... (Table Header) */}
          <CardContent className="p-0">
            <Table>
               {/* ... (TableHeader) */}
              <TableBody>
                {displayData.length > 0 ? (
                  displayData.map((coin) => (
                    <TableRow key={coin.symbol} className="border-white/5 hover:bg-white/[0.03]">
                       {/* ... (Cells) */}
                    </TableRow>
                  ))
                ) : (
                  // Elegant skeleton-style rows for first-load
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse border-white/5">
                      <TableCell colSpan={4} className="h-16 bg-white/[0.01]" />
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
