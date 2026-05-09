import { createClient } from "@/lib/supabase/server"
import { TrendingUp } from "lucide-react"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    <div className="w-full bg-black border-b border-white/5 py-8 px-4">
      {/* CHANGES MADE: 
          - Removed 'overflow-x-auto' from the outer div
          - Added 'justify-center' and 'flex-wrap' to the inner container
      */}
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {indicators.map((item) => {
          let displayValue = "";
          if (item.symbol === 'GDPC1') {
            displayValue = `$${(item.value / 1000).toFixed(1)}T`;
          } else {
            displayValue = `${item.value}%`;
          }

          return (
            <div 
              key={item.symbol} 
              className="group relative flex flex-col items-center text-center p-6 bg-[#0D0D0D] border border-white/5 rounded-xl min-w-[260px] shadow-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* WATERMARK BACKGROUND */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] grayscale group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <img src="https://flagcdn.com/w320/us.png" alt="" className="w-32 h-auto" />
              </div>

              {/* HEADER */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-3 h-2 opacity-70" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {item.indicator_name}
                </span>
              </div>
              
              {/* CENTERED VALUE */}
              <div className="flex items-baseline justify-center w-full mb-3 relative z-10">
                <span className="text-5xl font-black text-white tracking-tighter italic font-mono uppercase">
                  {displayValue}
                </span>
              </div>

              {/* FOOTER TREND */}
              <div className="flex items-center justify-center gap-2 mt-2 relative z-10">
                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500">
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
