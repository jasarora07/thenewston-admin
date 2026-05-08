import { createClient } from "@/lib/supabase/server"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export async function MacroBar() {
  const supabase = await createClient()
  
  // Explicitly selecting columns to ensure it's hitting the right schema
  const { data: indicators, error } = await supabase
    .from('macro_data')
    .select('symbol, indicator_name, value, date, category')

  if (error) {
    console.error("Supabase Error:", error.message)
    return null
  }

  // If data is still missing, we show a sleek 'Loading' state instead of a red bar
  if (!indicators || indicators.length === 0) {
    return (
      <div className="w-full bg-black border-b border-white/5 py-8 px-4 flex justify-center uppercase tracking-[0.3em] text-[10px] text-zinc-500 font-bold">
        <Activity className="h-3 w-3 mr-2 animate-pulse text-primary" /> 
        Terminal Data Syncing...
      </div>
    )
  }

  return (
    <div className="w-full bg-black border-b border-white/5 py-8 px-4 overflow-x-auto no-scrollbar">
      <div className="container mx-auto flex gap-5 min-w-max">
        {indicators.map((item) => (
          <div 
            key={item.symbol} 
            className="flex flex-col p-6 bg-[#0D0D0D] border border-white/5 rounded-xl min-w-[240px] shadow-2xl hover:border-white/20 transition-all duration-300"
          >
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
              {item.indicator_name}
            </span>
            
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-4xl font-bold text-white tracking-tighter italic">
                {item.value}
                {item.symbol !== 'GDPC1' && item.symbol !== 'CONCONF' ? '%' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {/* Mocking trend color logic for terminal feel */}
              <div className={`flex items-center gap-1 text-[11px] font-black ${
                item.indicator_name.includes('Inflation') ? 'text-red-500' : 'text-emerald-500'
              }`}>
                {item.indicator_name.includes('Inflation') ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                {item.indicator_name.includes('Inflation') ? '-0.3' : '+0.4'}
              </div>
              <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase ml-2 border-l border-white/10 pl-2">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
