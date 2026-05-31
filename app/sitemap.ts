import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// 基础配置
const baseUrl = 'https://www.adaceramics.com'

// Supabase 客户端（只在服务端用）
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 👉 你原来的所有静态页面（完全保留）
const staticPages = [
  '',
  '/about',
  '/products',
  '/oem-odm',
  '/factory',
  '/blog',
  '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // 1. 加入你原来的静态页面
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
    })
  }

  // 2. 动态从 Supabase 取所有已上架产品
  let products: { slug: string; updated_at: string }[] = []
  try {
    const { data } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true)

    products = data || []
  } catch (e) {
    // 防止构建时连不上数据库报错
    products = []
  }

  // 3. 把产品详情页加入 sitemap
  for (const p of products) {
    entries.push({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.updated_at || new Date()),
    })
  }

  return entries
}
