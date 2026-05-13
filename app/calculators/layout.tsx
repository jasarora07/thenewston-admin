import { MacroBar } from "@/components/macro-bar"

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* SHARED INFRASTRUCTURE: The MacroBar will now stay sticky at the top of every calculator */}
      <div className="w-full border-b border-white/10 mt-16">
        <MacroBar />
      </div>

      <div className="flex-1">
        {/* Each individual calculator (Spoke) will render here */}
        {children}
      </div>

      {/* SHARED INSTITUTIONAL FOOTER */}
      <footer className="py-8 border-t border-white/5 mt-12 text-center bg-black">
        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">
          The Newston Intelligence Terminal • Decision Support Systems • SEC 2026 Compliance
        </p>
      </footer>
    </div>
  )
}
