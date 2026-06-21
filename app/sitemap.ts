import { MetadataRoute } from 'next'

async function getDynamicPages() {
  const productPages = [
    "/products/wholesale-plates",
    "/products/wholesale-bowls",
    "/products/wholesale-dinnerware-sets",
    "/products/wholesale-cups-mugs",
    "/products/wholesale-bakeware",
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

  const blogPages = []

  return { productPages, blogPages }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adaceramics.com'
  const today = new Date()

  // 完全按你网站导航顺序 + 业务权重排序
  const staticPages = [
    { url: baseUrl, lastModified: today }, // Home
    { url: `${baseUrl}/products`, lastModified: today }, // Products
    { url: `${baseUrl}/custom-solutions`, lastModified: today }, // Custom Solutions（原OEM/ODM）
    { url: `${baseUrl}/about-us`, lastModified: today }, // About Us
    { url: `${baseUrl}/factory`, lastModified: today }, // Factory
    { url: `${baseUrl}/blog`, lastModified: today }, // Blog
    { url: `${baseUrl}/contact`, lastModified: today }, // Contact
  ]

  const { productPages, blogPages } = await getDynamicPages()

  const productUrls = productPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: today,
  }))

  const blogUrls = blogPages.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: today,
  }))

  return [...staticPages, ...productUrls, ...blogUrls]
}
