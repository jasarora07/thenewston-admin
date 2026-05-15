import type { Metadata } from "next"
import PartnershipView from "./partnership-view"

export const metadata: Metadata = {
  title: "Professional Partner Network | The Newston Terminal",
  description: "Join the Newston Institutional Network. Exclusive integration for verified Lenders, Advisors, and CPAs using our 2026 fiscal models.",
  alternates: {
    /* FIXES BING ERROR: 
       Setting canonical to './' ensures Bing indexes this as /partnership 
       instead of a duplicate of the homepage.
    */
    canonical: './', 
  },
}

export default function PartnershipPage() {
  return <PartnershipView />
}
