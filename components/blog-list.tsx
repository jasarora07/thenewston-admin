"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Clock, User, ArrowRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  imageUrl: string
}

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Change 'news' to whatever your actual table name is in Supabase
        const { data, error } = await supabase
          .from('news') 
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error
        if (data) setPosts(data)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground text-sm">Loading market analysis...</div>
  }

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="flex items-center justify-between text-sm sm:text-lg">
          <span>Deep Dive Analysis</span>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs sm:text-sm h-7 sm:h-9 px-2 sm:px-3">
            View All
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] sm:h-[calc(100vh-280px)]">
          <div className="space-y-3 sm:space-y-4 px-3 sm:px-4 pb-3 sm:pb-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer rounded-lg overflow-hidden bg-secondary/30 hover:bg-secondary/50 transition-all border border-border/50"
              >
                <div className="relative h-24 sm:h-32 w-full bg-muted">
                  <Image
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary/90 text-[10px] sm:text-xs">{post.category}</Badge>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-tight mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            {posts.length === 0 && !loading && (
              <div className="p-8 text-center text-muted-foreground text-xs italic">
                No news articles found in database.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
