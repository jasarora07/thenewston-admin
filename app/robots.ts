import { MetadataRoute } from 'next'

/**
 * HARDENED & ASSET-OPTIMIZED ROBOTS CONFIGURATION
 * Fixes the CSS asset rendering block in Google Search Console.
 * Explicitly allows stylesheet and media paths while guarding backend directories.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/_next/static/css/',   // CRITICAL: Allows Googlebot to read Tailwind stylesheets
        '/_next/static/media/', // Allows Googlebot to fetch UI image vectors and icons
        '/calculators',
        '/calculators/mortgage-refi-pivot',
        '/calculators/tax-exempt-wealth-gap',
        '/calculators/home-equity-liquidity',
        '/calculators/capital-allocation',
        '/calculators/purchasing-power',
      ],
      disallow: [
        '/private/',
        '/_next/static/chunks/',      // Blocks crawlers from downloading raw JS chunk loops
        '/_next/static/development/', // Shuts down development telemetry routing
        '/_next/data/',               // Restricts access to raw Next.js JSON data hydration paths
        '/api/',                      // Prevents access to serverless backend endpoints
        '/*?*',                       // Ignores dynamic parameters to optimize crawl budget
      ],
    },
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
