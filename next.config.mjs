/** @type {import('next').NextConfig} */

// 旧扁平产品分类 slug → 新四大 Silo 层级路径（/[silo]/[l2]）的唯一映射。
// 与 lib/silo/l2-config.ts 的 productCategorySlugs 完全对齐，
// 用于把历史 /en/products/[categorySlug]/[productSlug] 301 收敛到 Silo 层级详情页，杜绝死链与重复 URL。
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

// 由映射表生成旧产品路由的 301 跳转（保留产品 slug，层级集合页与单品页各一条）
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
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
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
  redirects: async () => {
    return [
      {
        source: '/en/about-us',
        destination: '/en/about',
        permanent: true,
      },
      // 旧 OEM 落地页统一收敛到第四大 Silo（/oem-odm 路由已下线）
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
      // 旧扁平产品浏览/详情路由 → 新 Silo 层级路径
      ...legacyProductRedirects,
    ]
  },
  // 新增：官方CSS优化，自动内联关键CSS、消除渲染阻塞资源，SEO友好
  experimental: {
    optimizeCss: true,
  },
}
export default nextConfig
