/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // SEO PROTECTION: Redirect ghost maintenance page
  async redirects() {
    return [
      {
        source: '/maintenance',
        destination: '/',
        permanent: true, // Sends 301 status to remove it from Google/Bing index
      },
    ]
  },
}

export default nextConfig
