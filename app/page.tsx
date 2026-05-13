import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { MacroBar } from "@/components/macro-bar"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { ContactTrigger } from "@/components/contact-trigger"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

// 1. UPDATED SEO METADATA
export const metadata: Metadata = {
  title: "The Newston | Institutional Financial Intelligence & Terminals",
  description: "Access 2026 mortgage refi pivots, tax-exempt growth models, and equity liquidity engines. Institutional grade data for the modern fiscal environment.",
  alternates: {
    canonical: 'https://thenewston.com',
  },
}

export default async function HomePage() {
  const supabase = await createClient()

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

      <div className="w-full border-b border-white/10 mt-16 bg-black z-30">
        <MacroBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {featured.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900 aspect-[4/5] md:aspect-auto flex flex-col min-h-[400px]"
                >
                  <div className="relative flex-1 overflow-hidden">
                    <img 
                      src={item.imageUrl || "/api/placeholder/400/600"} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      alt="Hero News"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 p-5 space-y-2 w-full text-left">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.source}</span>
                    <h2 className="text-sm md:text-base font-bold text-white uppercase leading-tight tracking-tighter line-clamp-3">
                      {item.title}
                    </h2>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            {/* UPDATED: INTELLIGENCE TERMINAL ACCESS */}
            <div className="bg-zinc-950 border border-primary/20 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all shadow-lg shadow-primary/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Institutional Engine</span>
                </div>
                <h3 className="text-sm font-black text-white italic uppercase tracking-tighter mb-2 leading-none">
                   Financial <span className="text-primary group-hover:text-white transition-colors text-left italic">Terminal Hub</span>
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mb-6 leading-relaxed">
                  Analyze Refi Pivots, Tax Drag, and Equity Liquidity. <span className="text-white underline decoration-primary/40 underline-offset-2 tracking-tight italic">2026 Fiscal Models.</span>
                </p>
                <div className="flex gap-2 pt-2">
                  <Link href="/calculators" className="flex-[2] bg-primary text-black text-[10px] font-black py-3 rounded-md uppercase tracking-widest text-center hover:bg-white transition-all shadow-md shadow-primary/10 italic">Access</Link>
                  <Link href="/auth/gate?mode=signup" className="flex-1 border border-white/10 text-white text-[10px] font-black py-3 rounded-md uppercase tracking-widest text-center hover:bg-white/5 transition-all italic">Join</Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Business <span className="text-primary font-black">Updates</span></h4>
              </div>
              <div className="space-y-5 text-left">
                {businessUpdates.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-4 group items-start">
                    <div className="w-12 h-12 shrink-0 rounded border border-white/10 bg-zinc-900 overflow-hidden">
                      <img src={item.imageUrl || "/api/placeholder/100/100"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="thumb" />
                    </div>
                    <h5 className="font-bold text-[10px] leading-snug text-zinc-400 group-hover:text-white transition-colors uppercase">{item.title}</h5>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">Latest <span className="text-primary">News</span></h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={7} />
        </section>
      </main>

      <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-20 text-[10px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center font-black text-black italic text-xs uppercase">N</div>
                <span className="font-black italic uppercase text-white tracking-tighter">The Newston</span>
              </div>
              <p className="leading-relaxed text-zinc-400 uppercase tracking-wider max-w-[200px]">Institutional grade financial intelligence. 2026 Fiscal parameters applied.</p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-black uppercase tracking-widest text-white">Terminals</h5>
              <nav className="flex flex-col gap-2 font-bold uppercase text-zinc-500">
                <Link href="/calculators" className="hover:text-primary transition-colors italic">Institutional Hub</Link>
                <Link href="/calculators/mortgage-refi-pivot" className="hover:text-primary transition-colors">Mortgage Pivot</Link>
                <Link href="/calculators/tax-exempt-wealth-gap" className="hover:text-primary transition-colors">Tax Alpha</Link>
                <Link href="/calculators/home-equity-liquidity" className="hover:text-primary transition-colors">Equity Liquidity</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-black uppercase tracking-widest text-white italic">Contact</h5>
              <ContactTrigger />
            </div>

            <div className="space-y-4 text-right md:text-left">
              <h5 className="font-black uppercase tracking-widest text-white">Status</h5>
              <div className="flex items-center gap-2 justify-end md:justify-start">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-emerald-500 uppercase tracking-widest italic">Systems Nominal</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 font-bold uppercase tracking-[0.2em]">
            <p>© 2026 THE NEWSTON INTELLIGENCE UNIT</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span className="hover:text-white cursor-pointer transition-colors italic text-[8px]">API [V1.2]</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
