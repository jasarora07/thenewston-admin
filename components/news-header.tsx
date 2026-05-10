"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, House } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsHeader() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <House className="h-3 w-3" /> },
    { name: "Markets", href: "/markets" },
    { name: "Crypto", href: "/crypto" },
  ];

  return (
    /* STACKING LOGIC:
      1. We use 'sticky' with 'top-[44px]' so it sits exactly under the TradingView ticker.
      2. z-40 ensures it stays above the content but below the ticker (z-50).
    */
    <header className="sticky top-[44px] w-full bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl z-40 transition-all duration-300">
      <div className="container flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4 mx-auto">
        
        <div className="flex items-center gap-3 sm:gap-8 overflow-hidden flex-1">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-black font-black text-xs sm:text-sm italic">N</span>
            </div>
            <span className="font-black text-sm sm:text-lg text-white italic uppercase tracking-tighter shrink-0">
              The Newston
            </span>
          </Link>

          {/* NAVIGATION: Ribbon Layout */}
          <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`flex items-center gap-1.5 whitespace-nowrap uppercase font-black text-[10px] tracking-[0.2em] transition-all duration-200 border-b-2 py-1 ${
                    isActive 
                      ? "text-primary border-primary" 
                      : "text-zinc-500 border-transparent hover:text-foreground"
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-2 sm:ml-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  )
}
