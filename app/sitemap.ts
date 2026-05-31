import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// 👇 你的网站配置（已固定）
const BASE_URL = 'https://www.adaceramics.com'
const LOCALES = ['', 'en'] // 空字符串=中文根路径；en=英文

// 👇 你的 Supabase 客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 👇 你的产品分类（按你截图1:1还原）
const CATEGORIES = [
  // 一级分类
  'wholesale-plates',
  'wholesale-bowls',
  'wholesale-dinnerware-sets',
  'wholesale-cups-mugs',
  'wholesale-bakeware',

  // 二级分类
  'dinner-plates',
  'dessert-side-plates',
  'soup-plates',
  'oval-serving-plates',
  'soup-bowls',
  'salad-bowls',
  'ramen-bowls',
  'snack-bowls',
  'daily-tableware-sets',
  'restaurant-catering-sets',
  'ceramic-mugs',
  'coffee-cups-saucers',
  'water-cups',
  'baking-dishes',
  'ramekins',
  'pie-pizza-plates',
]

// =============================================
// 1. 【自动】从 Supabase 读取所有产品（只取 is_active=true 的）
// =============================================
async function getAllActiveProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true) // 只包含已发布/上架的产品

  return products || []
}

// =============================================
// 2. 生成完整 sitemap
// =============================================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const products = await getAllActiveProducts()

  // --------------------------
  // 静态页面：首页、about、contact
  // --------------------------
  const staticPages = ['', 'about', 'contact']
  for (const locale of LOCALES) {
    for (const page of staticPages) {
      const url = `${BASE_URL}${locale ? `/${locale}` : ''}${page ? `/${page}` : ''}`
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // --------------------------
  // 产品列表页：/products
  // --------------------------
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}${locale ? `/${locale}` : ''}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // --------------------------
  // 分类页：/products/xxx（一级+二级）
  // --------------------------
  for (const locale of LOCALES) {
    for (const cat of CATEGORIES) {
      entries.push({
        url: `${BASE_URL}${locale ? `/${locale}` : ''}/products/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      })
    }
  }

  // --------------------------
  // ✅ 产品详情页：自动从 Supabase 读取（只取已上架的）
  // --------------------------
  for (const locale of LOCALES) {
    for (const prod of products) {
      entries.push({
        url: `${BASE_URL}${locale ? `/${locale}` : ''}/products/${prod.slug}`,
        lastModified: new Date(prod.updated_at || new Date()),
        changeFrequency: 'monthly',
        priority: 0.75,
      })
    }
  }

  return entries
}
