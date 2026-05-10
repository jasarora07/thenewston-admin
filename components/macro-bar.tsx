import { createClient } from "@/lib/supabase/server"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    <div className="sticky top-[100px] z-30 w-full bg-black/95 backdrop-blur-md border-b border-white/10 py-3">
      {/* 'container mx-auto' centers the content block on the page.
         'flex justify-center' centers the items inside that block.
      */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-10 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {indicators.map((item, i) => {
            let displayValue = "";
            if (item.symbol === 'GDPC1') {
              displayValue = `$${(item.value / 1000).toFixed(1)}T`;
            } else {
              displayValue = `${item.value}%`;
            }

            return (
              <div key={item.symbol} className="flex items-center gap-4 shrink-0 group">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-0.5">
                    <img 
                      src="https://flagcdn.com/w40/us.png" 
                      alt="US" 
                      className="w-3.5 h-auto border border-white/10 shadow-sm" 
                    />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-primary transition-colors">
                      {item.indicator_name}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-white italic font-mono uppercase tracking-tighter">
                      {displayValue}
                    </span>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>
                </div>

                {i !== indicators.length - 1 && (
                  <div className="h-6 w-px bg-white/20 ml-4 self-center" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
