import { NewsHeader } from "@/components/news-header"
import { TickerBar } from "@/components/ticker-bar"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-400 font-sans flex flex-col">
      <TickerBar />
      <NewsHeader />

      <div className="container max-w-4xl mx-auto px-4 py-16 space-y-12">
        <section className="space-y-4">
          <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            Last Updated: May 2026
          </p>
          <div className="h-px bg-white/10 w-full" />
        </section>

        <div className="space-y-10 text-sm leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">1. Data Collection</h2>
            <p>
              The Newston Intelligence Unit ("we", "us", or "our") collects minimal personal data. This includes 
              information you provide directly, such as when you sign up for alerts, and technical data 
              collected automatically, including IP addresses, browser types, and usage patterns via cookies 
              to optimize terminal performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">2. Use of Information</h2>
            <p>
              Data collected is utilized solely to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-500">
              <li>Maintain and stabilize the terminal interface.</li>
              <li>Provide real-time market intelligence and crypto asset tracking.</li>
              <li>Monitor system health and prevent fraudulent activity.</li>
              <li>Improve user experience through anonymous analytical processing.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">3. Third-Party Integration</h2>
            <p>
              We leverage institutional-grade third-party services (such as Supabase for data management and 
              CoinGecko for market feeds). These entities may process data according to their own privacy 
              standards. We do not sell, trade, or rent user data to third-party marketing firms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">4. Data Security</h2>
            <p>
              We implement rigorous security protocols to protect your information. However, no method of 
              transmission over the internet or electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">5. Rights & Compliance</h2>
            <p>
              Users retain the right to request access to, correction of, or deletion of their personal 
              information. The Newston complies with standard data protection regulations relevant to 
              digital financial reporting.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-white font-black uppercase tracking-widest text-xs">Contact Intelligence Unit</h2>
            <p className="font-mono text-zinc-500 text-xs">
              Direct inquiries to: <span className="text-primary">terminal@thenewston.com</span>
            </p>
          </section>
        </div>
      </div>

      <footer className="mt-auto border-t border-white/5 py-8 text-center">
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
          © 2026 THE NEWSTON INTELLIGENCE UNIT
        </p>
      </footer>
    </main>
  )
}
