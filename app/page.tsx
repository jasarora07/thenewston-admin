import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { MacroBar } from "@/components/macro-bar"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Home, Banknote } from "lucide-center"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch 15 items: 2 for Hero, 5 for Sidebar, 8 for Grid
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  const featured = newsItems?.slice(0, 2) || []
  const businessUpdates = newsItems?.slice(2, 7) || []
  const initialGridNews = newsItems?.slice(7, 15) || []

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "The Newston",
    "url": "https://thenewston.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://thenewston.com/logo.png"
    },
    "sameAs": ["https://twitter.com/thenewston"]
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* --- RE-POSITIONED & STICKY MACROBAR --- */}
      {/* 'top-14' matches the height of your NewsHeader 'h-14' */}
      <div className="sticky top-14 z-40 w-full border-b border-white/5 bg-black/90 backdrop-blur-md">
        <MacroBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* --- MAIN HERO SECTION (8/4 Split) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT: PRIMARY NEWS FEED (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {featured.map((item) => (
                <a key={item.id} href={item.url} target="_blank" className="group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900 aspect-[4/5] md:aspect-auto flex flex-col min-h-[400px]">
                  <div className="relative flex-1 overflow-hidden">
                    <img 
                      src={item.imageUrl || "/api/placeholder/400/600"} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 p-5 space-y-2 w-full">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.source}</span>
                    <h2 className="text-sm md:text-base font-bold text-white uppercase leading-tight tracking-tighter line-clamp-3">
                      {item.title}
                    </h2>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: COMPACT SIDEBAR (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* COMPACT FREE ANALYSIS WIDGET */}
            <div className="bg-zinc-950 border border-primary/20 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all shadow-lg shadow-primary/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Intelligence Tool</span>
                </div>
                
                <h3 className="text-sm font-black text-white italic uppercase tracking-tighter mb-2 leading-none">
                  Free 2026 <span className="text-primary group-hover:text-white transition-colors">Mortgage Analysis</span>
                </h3>
                
                <p className="text-[10px] text-zinc-500 font-bold uppercase mb-6 leading-relaxed">
                  Project savings on new fiscal rates. <span className="text-white underline decoration-primary/40 underline-offset-2 tracking-tight italic">100% Free Analysis.</span>
                </p>

                <div className="flex gap-2 pt-2">
                  <Link href="/calculate-financials" className="flex-[2] bg-primary text-black text-[10px] font-black py-3 rounded-md uppercase tracking-widest text-center hover:bg-white transition-all shadow-md shadow-primary/10">
                    Access
                  </Link>
                  <Link href="/auth/gate?mode=signup" className="flex-1 border border-white/10 text-white text-[10px] font-black py-3 rounded-md uppercase tracking-widest text-center hover:bg-white/5 transition-all">
                    Join
                  </Link>
                </div>
              </div>
            </div>

            {/* RESTORED BUSINESS UPDATES */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  Business <span className="text-primary font-black">Updates</span>
                </h4>
              </div>
              <div className="space-y-5">
                {businessUpdates.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" className="flex gap-4 group items-start">
                    <div className="w-12 h-12 shrink-0 rounded border border-white/10 bg-zinc-900 overflow-hidden">
                      <img 
                        src={item.imageUrl || "/api/placeholder/100/100"} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </div>
                    <h5 className="font-bold text-[10px] leading-snug text-zinc-400 group-hover:text-white transition-colors uppercase">
                      {item.title}
                    </h5>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* --- LATEST NEWS GRID --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">
              Latest <span className="text-primary">News</span>
            </h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={7} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-20 text-[10px]">
        {/* ... (Footer content remains same) ... */}
      </footer>
    </div>
  )
}
