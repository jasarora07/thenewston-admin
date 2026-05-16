import { MetadataRoute } from 'next'

/**
 * HARDENED ROBOTS CONFIGURATION
 * Optimizes crawl budget for 2026 GSC indexing criteria.
 * Ensures decision models are prioritized while stripping out parameter noise.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/calculators',
        '/calculators/mortgage-refi-pivot',
        '/calculators/tax-exempt-wealth-gap',
        '/calculators/home-equity-liquidity',
        '/calculators/capital-allocation',
        '/calculators/purchasing-power',
      ],
      disallow: [
        '/private/',
        '/_next/',     // Blocks crawling of raw webpack build manifests
        '/api/',       // Prevents access to serverless backend endpoints
        '/*?*',        // CRITICAL: Tells Google to ignore dynamic parameter query strings
      ],
    },
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
