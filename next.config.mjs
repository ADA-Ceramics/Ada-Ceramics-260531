/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 开启 Gzip/Brotli 压缩（Pingdom 那个 F 级关键项）
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

  // 官方CSS优化，自动内联关键CSS、消除渲染阻塞，SEO友好
  experimental: {
    optimizeCss: true
  }
}

export default nextConfig
