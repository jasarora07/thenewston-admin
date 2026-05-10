"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, House, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <House className="h-3 w-3" /> },
    { name: "Markets", href: "/markets" },
    { name: "Crypto", href: "/crypto" },
  ];

  const activeLink = navLinks.find(link => link.href === pathname) || navLinks[0];

  return (
    <header className="sticky top-[44px] w-full bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl z-50">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        
        <div className="flex items-center gap-6 flex-1">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-black font-black text-sm italic">N</span>
            </div>
            <span className="font-black text-lg text-white italic uppercase tracking-tighter hidden sm:inline-block">
              The Newston
            </span>
          </Link>

          {/* MOBILE DROPDOWN */}
          <div className="relative sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest text-primary"
            >
              {activeLink.name}
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl py-2 z-[60]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-[10px] font-black uppercase tracking-widest ${
                      pathname === link.href ? "text-primary bg-white/5" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`flex items-center gap-1.5 uppercase font-black text-[10px] tracking-[0.2em] transition-all border-b-2 py-1 ${
                  pathname === link.href ? "text-primary border-primary" : "text-zinc-500 border-transparent hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
