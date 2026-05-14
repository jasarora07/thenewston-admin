import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thenewston.com'

  // Define static routes with Module 05 and Partnership added
  const staticRoutes = [
    '',                                   // Home
    '/partnership',                       // Partner Protocol
    '/calculators',                       // Hub
    '/calculators/mortgage-refi-pivot',    // Module 01
    '/calculators/tax-exempt-wealth-gap', // Module 02
    '/calculators/home-equity-liquidity', // Module 03
    '/calculators/capital-allocation',    // Module 04
    '/calculators/purchasing-power',      // Module 05
  ].map((route) => {
    // Determine priority based on importance
    let priority = 0.8
    if (route === '') priority = 1.0
    if (route === '/calculators') priority = 0.9

    // Determine frequency based on update cadence
    let changeFrequency: 'always' | 'weekly' | 'monthly' = 'monthly'
    if (route === '') changeFrequency = 'always'
    if (route === '/calculators') changeFrequency = 'weekly'

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })

  return [...staticRoutes]
}
