/** @type {import('next').NextConfig} */
const nextConfig = {
  // 保留你原来的配置，不动！
  typescript: {
    ignoreBuildErrors: true,
  },
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

  // 安全的优化（不会报错）
  productionBrowserSourceMaps: false, // 关闭source map，加快加载
}

export default nextConfig
