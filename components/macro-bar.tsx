import { createClient } from "@/lib/supabase/server"
import { TrendingUp, Activity } from "lucide-react"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase
    .from('macro_data')
    .select('*')
    .order('indicator_name')

  if (!indicators || indicators.length === 0) return <div className="p-4 bg-red-500 text-white">No Macro Data Found</div>

  return (
    <div className="w-full bg-background border-b border-border py-4 px-4 overflow-x-auto no-scrollbar">
      <div className="container mx-auto flex gap-4 min-w-max">
        {indicators.map((item) => (
          <div 
            key={item.symbol} 
            className="flex flex-col p-4 bg-secondary/10 border border-border/50 rounded-xl min-w-[190px] hover:border-primary/50 transition-colors group"
          >
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">
              {item.indicator_name}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black font-mono tracking-tighter">
                {item.value}
                {/* Logic to show % only for rates/inflation, not indices like Consumer Confidence */}
                {item.symbol !== 'GDPC1' && item.symbol !== 'CONCONF' ? '%' : ''}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 opacity-60">
              <Activity className="h-2.5 w-2.5 text-primary" />
              <span className="text-[8px] font-mono font-bold text-muted-foreground uppercase">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
