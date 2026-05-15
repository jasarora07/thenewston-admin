import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thenewston.com'

  // Define static routes with Module 05 and Partnership added
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },           // Home (News updates daily)
    { path: '/calculators', priority: 0.9, changeFrequency: 'daily' }, // Hub
    { path: '/partnership', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculators/mortgage-refi-pivot', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculators/tax-exempt-wealth-gap', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculators/home-equity-liquidity', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculators/capital-allocation', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculators/purchasing-power', priority: 0.8, changeFrequency: 'monthly' },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }))
}
