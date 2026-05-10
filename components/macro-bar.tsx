import { createClient } from "@/lib/supabase/server"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    <div className="sticky top-[100px] z-30 w-full bg-black/90 backdrop-blur-md border-b border-white/5 py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* FIX: Removed 'no-scrollbar' class that relied on styled-jsx.
           Added 'scrollbar-hide' logic via standard Tailwind/CSS 
           (or simply let the browser handle it if the plugin isn't installed).
        */}
        <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {indicators.map((item, i) => {
            let displayValue = "";
            if (item.symbol === 'GDPC1') {
              displayValue = `$${(item.value / 1000).toFixed(1)}T`;
            } else {
              displayValue = `${item.value}%`;
            }

            return (
              <div 
                key={item.symbol} 
                className="flex items-center gap-3 shrink-0 group"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-2.5 h-auto opacity-30 grayscale" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {item.indicator_name}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-white italic font-mono uppercase tracking-tighter">
                      {displayValue}
                    </span>
                    <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>
                </div>

                {i !== indicators.length - 1 && (
                  <div className="h-4 w-px bg-white/10 ml-4 self-center" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
