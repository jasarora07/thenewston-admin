import { createClient } from "@/lib/supabase/server"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    <div className="w-full bg-black border-b border-white/5 py-8 px-4">
      {/* Centered container for the cards */}
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
              className="group relative flex flex-col items-center text-center p-6 bg-[#0D0D0D] border border-white/5 rounded-xl min-w-[220px] shadow-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* SUBTLE WATERMARK BACKGROUND */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.02] grayscale group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <img src="https://flagcdn.com/w320/us.png" alt="" className="w-28 h-auto" />
              </div>

              {/* HEADER WITH FLAG */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-3 h-2 opacity-50" />
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {item.indicator_name}
                </span>
              </div>
              
              {/* REDUCED FONT SIZE (2xl instead of 5xl) */}
              <div className="flex items-baseline justify-center w-full mb-3 relative z-10">
                <span className="text-2xl font-black text-white tracking-tighter italic font-mono uppercase">
                  {displayValue}
                </span>
              </div>

              {/* FOOTER: DUMMY TREND REMOVED, DATE ONLY */}
              <div className="relative z-10">
                <span className="text-[9px] text-zinc-600 font-mono font-bold uppercase tracking-widest opacity-80">
                  AS OF {item.date}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
