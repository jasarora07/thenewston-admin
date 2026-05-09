import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
// ... (rest of imports remain same)

export default async function HomePage() {
  const supabase = await createClient()

  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  const featured = newsItems?.slice(0, 2) 
  const businessUpdates = newsItems?.slice(2, 7) 
  const initialGridNews = newsItems?.slice(7, 15) 

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TickerBar />
      <NewsHeader />
      <MacroBar />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* HERO & SIDEBAR SECTION (Same as before) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           {/* ... code for featured and businessUpdates ... */}
        </section>

        {/* LATEST NEWS GRID WITH LOAD MORE */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase">LATEST <span className="text-primary">NEWS</span></h2>
          </div>
          
          <NewsGrid initialItems={initialGridNews || []} />
        </div>
      </main>

      <footer className="...">
        {/* ... (footer remains same) */}
      </footer>
    </div>
  )
}
