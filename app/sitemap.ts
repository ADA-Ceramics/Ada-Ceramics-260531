import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adaceramics.com'

  // 你的固定页面（保留）
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/oem-odm`, lastModified: new Date() },
    { url: `${baseUrl}/factory`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ]

  // 👇 在这里把你所有产品分类 + 产品手动加进去
  const productPages = [
    // 一级分类
    "/products/wholesale-plates",
    "/products/wholesale-bowls",
    "/products/wholesale-dinnerware-sets",
    "/products/wholesale-cups-mugs",
    "/products/wholesale-bakeware",

    // 二级分类
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

  const productUrls = productPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  return [...staticPages, ...productUrls]
}
