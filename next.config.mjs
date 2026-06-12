/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  redirects: async () => {
    return [
      {
        source: '/en/ab',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/custom-oem-odm',
        destination: 'en/oem-odm',
        permanent: true,
      },
      {
        source: '/en/custom-solutions',
        destination: 'en/oem-odm',
        permanent: true,
      },
    ];
  },
  // 新增：官方CSS优化，自动内联关键CSS、消除渲染阻塞资源，SEO友好
  experimental: {
    optimizeCss: true,
  }
};
export default nextConfig;
