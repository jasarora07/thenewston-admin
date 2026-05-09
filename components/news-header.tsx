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
    /* FIX: Instead of guessing the top offset (e.g. top-[42px]), 
      we use 'relative' so it sits naturally below the ticker in the flow, 
      then we use 'sticky top-0' so it sticks ONLY once it hits the top.
    */
    <div className="relative w-full z-30">
      <header className="sticky top-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl">
        <div className="container flex h-14 items-center justify-between px-4">
          
          <div className="flex items-center gap-6 overflow-hidden flex-1">
            {/* Logo Icon Only on Mobile for Space */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="h-7 w-7 rounded bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="text-black font-black text-xs italic">N</span>
              </div>
            </Link>

            {/* NAV LINKS: Horizontal scroll with no overlap */}
            <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`flex items-center gap-2 whitespace-nowrap uppercase font-bold text-[10px] tracking-[0.25em] transition-all ${
                      isActive 
                        ? "text-emerald-400 border-b-2 border-emerald-400 pb-1" 
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1 shrink-0 ml-4">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
