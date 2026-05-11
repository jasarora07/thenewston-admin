export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-black text-white italic uppercase mb-8">Privacy <span className="text-primary">Policy</span></h1>
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed uppercase font-medium tracking-tight">
          <section>
            <h2 className="text-white font-bold mb-2">1. Data Encryption</h2>
            <p>The NewsTon utilizes AES-256 encryption for all stored user data. Your calculation history is stored in a private, siloed database environment powered by Supabase.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">2. Information Collection</h2>
            <p>We collect your email address solely for identity verification and account recovery. Financial inputs provided in the "Calculate Financials" suite are stored to provide you with a personal history terminal and are never shared with third parties.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">3. Cookies & Tracking</h2>
            <p>We use essential cookies to maintain your secure session. We do not utilize third-party tracking pixels for advertising purposes within the Intelligence Suite.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">4. User Rights</h2>
            <p>Users maintain full sovereignty over their data. You may request account termination and full data erasure at any time via the user settings terminal.</p>
          </section>
          <p className="text-[10px] text-zinc-600 pt-8 border-t border-white/5">Last Updated: May 2026 // The NewsTon Legal Department</p>
        </div>
      </div>
    </div>
  );
}
