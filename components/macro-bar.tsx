import { createClient } from "@/lib/supabase/server"

export async function MacroBar() {
  const supabase = await createClient()
  const { data: indicators } = await supabase.from('macro_data').select('*')

  if (!indicators || indicators.length === 0) return null

  return (
    /* Change: 'sm:sticky' instead of 'sticky' makes it only pin on desktop.
       Removed justify-center to ensure the first item (Fed Funds) is left-aligned on mobile.
    */
    <div className="sm:sticky sm:top-[100px] z-30 w-full bg-black border-b border-white/10 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center sm:justify-center gap-10 overflow-x-auto whitespace-nowrap no-scrollbar">
          {indicators.map((item, i) => {
            let displayValue = "";
            if (item.symbol === 'GDPC1') {
              displayValue = `$${(item.value / 1000).toFixed(1)}T`;
            } else {
              displayValue = `${item.value}%`;
            }

            return (
              <div key={item.symbol} className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col items-start sm:items-center">
                  <div className="flex items-center gap-2 mb-0.5">
                    <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-3.5 h-auto border border-white/10" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
                      {item.indicator_name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-white italic font-mono uppercase tracking-tighter">
                      {displayValue}
                    </span>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase">
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
