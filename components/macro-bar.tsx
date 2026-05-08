import { createClient } from "@/lib/supabase/server"
import { TrendingUp, TrendingDown } from "lucide-react"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    <div className="w-full bg-black border-b border-white/5 py-8 px-4 overflow-x-auto no-scrollbar">
      <div className="container mx-auto flex gap-5 min-w-max">
        {indicators.map((item) => {
          // Logic for Unit Formatting
          let displayValue = "";
          if (item.symbol === 'GDPC1') {
            // GDP comes in Billions (e.g., 24000). Convert to Trillions.
            displayValue = `$${(item.value / 1000).toFixed(1)}T`;
          } else {
            // Rates and Inflation are percentages
            displayValue = `${item.value}%`;
          }

          return (
            <div key={item.symbol} className="flex flex-col p-6 bg-[#0D0D0D] border border-white/5 rounded-xl min-w-[240px] shadow-2xl">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4 font-sans">
                {item.indicator_name}
              </span>
              
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-bold text-white tracking-tighter italic font-mono">
                  {displayValue}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {/* Visual Logic: If unemployment/inflation is up, it's often viewed as a "warning" (Red) */}
                <div className={`flex items-center gap-1 text-[11px] font-black ${
                  item.symbol === 'CPIAUCSL' || item.symbol === 'UNRATE' ? 'text-orange-500' : 'text-emerald-500'
                }`}>
                   <TrendingUp className="h-3 w-3" />
                   +0.4
                </div>
                <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase ml-2 border-l border-white/10 pl-2">
                  {item.date}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
