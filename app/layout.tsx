import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { NewsHeader } from "@/components/news-header" 
import { TickerBar } from "@/components/ticker-bar"  
import { ComplianceBanner } from "@/components/compliance-banner" 
import { StructuredData } from "@/components/structured-data"
import ClientLayout from "@/components/client-layout"

import "@/app/globals.css"
import { Suspense } from "react"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thenewston.com'),
  title: {
    default: "The Newston | Institutional Financial Tools & Market Intelligence",
    template: "%s | The Newston Terminal"
  },
  description: "Access institutional-grade financial decision models for free. Calculate your Mortgage Refi Pivot and Wealth Gap with real-time 2026 market data.",
  keywords: [
    "free mortgage refi calculator", 
    "refi break even tool", 
    "tax-exempt wealth gap simulator", 
    "total interest savings calculator", 
    "financial intelligence terminal",
    "2026 market projections"
  ],
  
  // FIX: Added the Icons registry to resolve the generic globe in browser tabs
  icons: {
    icon: '/favicon.ico', // Standard favicon
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png', // For mobile bookmarks
  },

  alternates: {
    canonical: 'https://thenewston.com',
  },
  authors: [{ name: "The Newston Editorial Team" }],
  
  // BING ROBOTS FIX: Explicitly tells Bing we are a high-value indexable site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "The Newston | Free Financial Decision Engines",
    description: "Institutional tools to calculate total interest savings and tax-efficiency strategies.",
    type: "website",
    url: "https://thenewston.com",
    siteName: "The Newston",
    images: [{ url: "/og-image-calculators.png", width: 1200, height: 630 }], 
  },
  twitter: {
    card: "summary_large_image",
    title: "The Newston Financial Terminal",
    description: "Project your 2026 fiscal outcomes with our institutional decision models.",
    images: ["/og-image-calculators.png"],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <StructuredData /> 
            
            <TickerBar />
            
            {/* SEO NOTE: Ensure NewsHeader doesn't contain un-suspended dynamic logic */}
            <NewsHeader /> 
            
            <Suspense fallback={<div className="flex-1 bg-black" />}>
              <PageTransition>
                <ClientLayout>
                  <main className="flex-1">
                    {children}
                  </main>
                </ClientLayout>
              </PageTransition>
            </Suspense>

            <ComplianceBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
