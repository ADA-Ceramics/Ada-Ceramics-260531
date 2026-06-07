/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // 关键：开启 Gzip/Brotli 压缩（Pingdom F→A）
  compress: true,

  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  productionBrowserSourceMaps: false,

  // 官方CSS优化
  experimental: {
    optimizeCss: true
  }
}

export default nextConfig
