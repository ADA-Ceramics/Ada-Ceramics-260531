import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const baseUrl = 'https://www.adaceramics.com'

// 用 SERVICE ROLE 建服务端客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/oem-odm`, lastModified: new Date() },
    { url: `${baseUrl}/factory`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ]

  // 2. 从 products 表拿 active 产品的 slug + updated_at
  const { data: products, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)

  if (error) {
    console.error('Sitemap query error:', error)
    return staticPages
  }

  // 3. 拼接成 /products/[slug]
  const productUrls: MetadataRoute.Sitemap = (products || []).map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
  }))

  // 静态 + 动态产品页合并
  return [...staticPages, ...productUrls]
}
