import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['ecommerce.routemisr.com', 'images.unsplash.com'], // ✅ Allow images from these domains
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent ESLint from blocking your build
  },
  typescript: {
    ignoreBuildErrors: true, // ⛔ Optional: disables type checking at build time
  },
}

export default nextConfig
