import { createClient } from "@/lib/supabase/server"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase
    .from('macro_data')
    .select('*')
    .order('indicator_name')

  if (!indicators) return null

  return (
    <div className="w-full bg-background border-b border-border py-4 px-4 overflow-x-auto no-scrollbar">
      <div className="max-w-[1400px] mx-auto flex gap-4 min-w-max">
        {indicators.map((item) => (
          <div 
            key={item.symbol} 
            className="flex flex-col p-4 bg-secondary/10 border border-border/50 rounded-lg min-w-[180px] hover:border-primary/50 transition-colors"
          >
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              {item.indicator_name}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black font-mono tracking-tighter">
                {item.value}{item.symbol === 'GDPC1' ? '' : '%'}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Activity className="h-3 w-3 text-primary/50" />
              <span className="text-[9px] font-mono text-muted-foreground uppercase">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
