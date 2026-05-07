"use client"

import Image from "next/image"
import { Clock, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

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

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Financial Markets: A Deep Dive",
    excerpt: "Exploring how artificial intelligence is reshaping trading strategies and market analysis in 2024.",
    author: "Sarah Chen",
    date: "May 7, 2026",
    readTime: "8 min read",
    category: "Technology",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Understanding Market Volatility: What Investors Need to Know",
    excerpt: "A comprehensive guide to navigating uncertain market conditions and protecting your portfolio.",
    author: "Michael Roberts",
    date: "May 6, 2026",
    readTime: "12 min read",
    category: "Investing",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    title: "ESG Investing: Trends and Opportunities in 2026",
    excerpt: "How environmental, social, and governance factors are driving investment decisions globally.",
    author: "Emma Thompson",
    date: "May 5, 2026",
    readTime: "10 min read",
    category: "ESG",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Central Bank Digital Currencies: The Next Frontier",
    excerpt: "Analyzing the global race to develop CBDCs and their potential impact on traditional banking.",
    author: "David Park",
    date: "May 4, 2026",
    readTime: "15 min read",
    category: "Crypto",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Emerging Markets: Hidden Gems for Growth Investors",
    excerpt: "Discovering undervalued opportunities in developing economies poised for explosive growth.",
    author: "Ana Martinez",
    date: "May 3, 2026",
    readTime: "9 min read",
    category: "Markets",
    imageUrl: "/placeholder.svg",
  },
]

export function BlogList() {
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
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer rounded-lg overflow-hidden bg-secondary/30 hover:bg-secondary/50 transition-all border border-border/50"
              >
                <div className="relative h-24 sm:h-32 w-full bg-muted">
                  <Image
                    src={post.imageUrl}
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
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
