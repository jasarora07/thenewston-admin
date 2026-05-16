import { MetadataRoute } from 'next'

/**
 * HARDENED SITEMAP ARCHITECTURE
 * Optimizes the lastModified timeline to fix GSC crawl budget drag.
 * Ensures static decision models indicate structural permanence while the hub reflects real-time freshness.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thenewston.com'

  // Standardized ISO timeline for static 2026 modules
  const staticReleaseDate = new Date('2026-05-16T12:00:00.000Z')

  const routes = [
    // HIGH VELOCITY INTERFACES (Changes frequently)
    { 
      path: '', 
      priority: 1.0, 
      changeFrequency: 'daily', 
      lastModified: new Date() 
    },
    { 
      path: '/calculators', 
      priority: 0.9, 
      changeFrequency: 'daily', 
      lastModified: new Date() 
    },
    
    // INSTITUTIONAL DECISION MODELS (Static, stable configurations)
    { 
      path: '/partnership', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
    { 
      path: '/calculators/mortgage-refi-pivot', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
    { 
      path: '/calculators/tax-exempt-wealth-gap', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
    { 
      path: '/calculators/home-equity-liquidity', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
    { 
      path: '/calculators/capital-allocation', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
    { 
      path: '/calculators/purchasing-power', 
      priority: 0.8, 
      changeFrequency: 'monthly', 
      lastModified: staticReleaseDate 
    },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }))
}
