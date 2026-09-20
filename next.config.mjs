/** @type {import('next').NextConfig} */
const LEGACY_CATEGORY_TO_SILO = {
  // Bakeware
  ramekins: 'bakeware/ramekin-bowls',
  'baking-dishes': 'bakeware/baking-dishes-casseroles',
  'pie-pizza-plates': 'bakeware/loaf-pie-pizza-pans',
  // Dinnerware
  'wholesale-plates': 'dinnerware/plates',
  plates: 'dinnerware/plates',
  'wholesale-bowls': 'dinnerware/bowls',
  bowls: 'dinnerware/bowls',
  'wholesale-dinnerware-sets': 'dinnerware/dinnerware-sets',
  'dinnerware-sets': 'dinnerware/dinnerware-sets',
  'oval-serving-plates': 'dinnerware/serve-dishes',
  'serve-dishes': 'dinnerware/serve-dishes',
  'serving-dishes': 'dinnerware/serve-dishes',
  // Table Decor & Drinkware
  'wholesale-cups-mugs': 'table-decor-drinkware/cups-mugs',
  'cups-mugs': 'table-decor-drinkware/cups-mugs',
  vases: 'table-decor-drinkware/vases',
  'storage-condiment-jars': 'table-decor-drinkware/storage-condiment-jars',
  'serving-trays': 'table-decor-drinkware/serving-trays',
  'candle-holders': 'table-decor-drinkware/candle-holders',
  // OEM Custom Ceramics
  'custom-logo-printing': 'oem-custom-ceramics/custom-logo-printing',
  'custom-glaze-color': 'oem-custom-ceramics/custom-glaze-color',
  'new-mold-development': 'oem-custom-ceramics/new-mold-development',
  'oem-odm-case-studies': 'oem-custom-ceramics/oem-odm-case-studies',
}
const legacyProductRedirects = Object.entries(LEGACY_CATEGORY_TO_SILO).flatMap(
  ([categorySlug, target]) => [
    {
      source: `/en/products/${categorySlug}`,
      destination: `/en/${target}`,
      permanent: true,
    },
    {
      source: `/en/products/${categorySlug}/:slug`,
      destination: `/en/${target}/:slug`,
      permanent: true,
    },
  ],
)
const nextConfig = {
  output: 'export', // ✅ 静态导出，Cloudflare Pages核心配置
  trailingSlash: true, // ✅ 静态页面路径带 /，避免404
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // ✅ 静态导出必须改成true！Next不再优化图片，Cloudflare负责图片
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  // 【重要注释】下面redirects这段代码保留仅做记录，静态打包不会执行。
  // 所有301跳转，需要复制到Cloudflare Redirect Rules后台配置
  redirects: async () => {
    return [
      {
        source: '/en/about-us',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/oem-odm',
        destination: '/en/oem-custom-ceramics',
        permanent: true,
      },
      {
        source: '/en/custom-oem-odm',
        destination: '/en/oem-custom-ceramics',
        permanent: true,
      },
      {
        source: '/en/custom-solutions',
        destination: '/en/oem-custom-ceramics',
        permanent: true,
      },
      ...legacyProductRedirects,
    ]
  },
  experimental: {
    optimizeCss: true,
  },
}
export default nextConfig
