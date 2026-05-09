"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChevronDown, Loader2 } from "lucide-react"

interface NewsGridProps {
  initialItems: any[]
  totalCountBeforeGrid: number
}

export function NewsGrid({ initialItems, totalCountBeforeGrid }: NewsGridProps) {
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const supabase = createClient()

  const loadMore = async () => {
    if (loading) return
    setLoading(true)

    // OFFSET CALCULATION: 
    // We already have (totalCountBeforeGrid) items in Hero/Sidebar 
    // PLUS the items currently in the grid.
    const from = items.length + totalCountBeforeGrid
    const to = from + 7

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .range(from, to)

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    if (data && data.length > 0) {
      setItems(prev => [...prev, ...data])
      if (data.length < 8) setHasMore(false)
    } else {
      setHasMore(false)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <a key={item.id} href={item.url} target="_blank" className="group block space-y-3">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl">
              <img 
                src={item.imageUrl || "/api/placeholder/400/225"} 
                className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500 opacity-80 group-hover:opacity-100" 
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-zinc-500">
                <span className="text-primary">{item.source}</span>
                <span>{item.date ? new Date(item.date).toLocaleDateString() : ""}</span>
              </div>
              <h3 className="font-bold text-[12px] leading-tight group-hover:text-primary transition-colors text-zinc-300 line-clamp-3 uppercase">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pb-12">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="min-w-[200px] px-8 py-3 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-20"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : "Fetch More Intelligence"}
          </button>
        </div>
      )}
    </div>
  )
}
