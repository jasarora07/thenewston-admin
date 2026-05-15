import type { Metadata } from "next"
import MarketsView from "./markets-view" // This imports the client file you just created

export const metadata: Metadata = {
  title: "Western Market Terminal | Real-Time Global Index Tracking",
  description: "Institutional-grade market visualizer for S&P 500, Nasdaq, and European Indices. Real-time 2026 terminal integration.",
  alternates: {
    canonical: './', // CRITICAL: This is the fix for your Bing Screenshot error
  },
}

export default function MarketsPage() {
  return <MarketsView />
}
