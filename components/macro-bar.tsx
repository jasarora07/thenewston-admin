import { createClient } from "@/lib/supabase/server"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    /* STACKING FIX: 
       top-[100px] (Ticker 44px + Header 56px). 
       z-30 puts it behind the header but above the news.
       We changed py-8 to py-2 to make it a slim bar.
    */
    <div className="sticky top-[100px] z-30 w-full bg-black/90 backdrop-blur-md border-b border-white/5 py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Changed from 'flex-wrap justify-center' to 'flex overflow-x-auto' */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
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
                {/* Compact Terminal Style Item */}
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

                {/* Vertical Divider between items */}
                {i !== indicators.length - 1 && (
                  <div className="h-4 w-px bg-white/10 ml-4 self-center" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
