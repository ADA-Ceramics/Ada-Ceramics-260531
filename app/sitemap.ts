import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adaceramics.com'
  const now = new Date()

  // 首页/核心固定页（高权重）
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/oem-odm`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/factory`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.65
    },
  ]

  // 产品分类路径
  const productPages = [
    // 一级大类
    "/products/wholesale-plates",
    "/products/wholesale-bowls",
    "/products/wholesale-dinnerware-sets",
    "/products/wholesale-cups-mugs",
    "/products/wholesale-bakeware",
    // 二级细分
    "/products/dinner-plates",
    "/products/dessert-side-plates",
    "/products/soup-plates",
    "/products/oval-serving-plates",
    "/products/soup-bowls",
    "/products/salad-bowls",
    "/products/ramen-bowls",
    "/products/snack-bowls",
    "/products/daily-tableware-sets",
    "/products/restaurant-catering-sets",
    "/products/ceramic-mugs",
    "/products/coffee-cups-saucers",
    "/products/water-cups",
    "/products/baking-dishes",
    "/products/ramekins",
    "/products/pie-pizza-plates",
  ]

  // 产品统一配置：每周抓取、权重0.8
  const productUrls = productPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [...staticPages, ...productUrls]
}
