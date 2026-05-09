"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, House } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsHeader() {
  const pathname = usePathname();

  // "Economy" has been removed from this list
  const navLinks = [
    { name: "Home", href: "/", icon: <House className="h-3 w-3" /> },
    { name: "Markets", href: "/markets" },
    { name: "Crypto", href: "/crypto" },
  ];

  return (
    <header className="sticky top-[42px] sm:top-[44px] z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <div className="container flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4">
        
        <div className="flex items-center gap-4 sm:gap-8 overflow-hidden flex-1">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xs sm:text-sm italic">N</span>
            </div>
            <span className="hidden sm:inline font-black text-lg text-foreground italic uppercase tracking-tighter">
              The Newston
            </span>
          </Link>

          <nav className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`flex items-center gap-1.5 whitespace-nowrap uppercase font-black text-[10px] tracking-[0.2em] transition-all duration-200 ${
                    isActive 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-zinc-500 hover:text-foreground"
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-foreground">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-foreground">
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
