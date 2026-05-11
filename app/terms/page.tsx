export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-black text-white italic uppercase mb-8">Terms of <span className="text-primary">Service</span></h1>
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed uppercase font-medium tracking-tight">
          <section className="border-l-2 border-primary pl-6 py-2 bg-primary/5">
            <h2 className="text-primary font-bold mb-2">No Financial Advice Disclaimer</h2>
            <p className="text-white italic">The NewsTon is a news and mathematics terminal. All calculations, projections, and news items are for informational and educational purposes only. We are not financial advisors, and nothing on this site constitutes professional investment, legal, or tax advice.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">1. Account Security</h2>
            <p>Users are responsible for maintaining the confidentiality of their Intelligence ID and Security Key. Unauthorized access resulting from user negligence is not the responsibility of The NewsTon.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">2. Accuracy of Models</h2>
            <p>While our calculators are optimized for 2026 fiscal parameters, financial markets are volatile. The NewsTon does not guarantee the accuracy of future-state projections.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">3. Prohibited Use</h2>
            <p>Reverse engineering the Intelligence Suite or utilizing automated bots to scrape terminal data is strictly prohibited and will result in immediate ID termination.</p>
          </section>
          <p className="text-[10px] text-zinc-600 pt-8 border-t border-white/5">Effective Date: May 2026 // The NewsTon Terminal Operations</p>
        </div>
      </div>
    </div>
  );
}
