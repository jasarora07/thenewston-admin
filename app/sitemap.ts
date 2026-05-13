import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thenewston.com'

  // Only include internal pages that belong to your domain
  const staticRoutes = [
    '',                                 // Home
    '/calculators',                     // Hub
    '/calculators/mortgage-refi-pivot', // Module 01
    '/calculators/tax-exempt-wealth-gap', // Module 02
    '/calculators/home-equity-liquidity', // Module 03
    '/calculators/capital-allocation',   // Module 04
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('always' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...staticRoutes]
}
