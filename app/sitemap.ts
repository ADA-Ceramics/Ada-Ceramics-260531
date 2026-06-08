import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Client } from '@notionhq/client'

// 初始化 Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 初始化 Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY!,
})

// --------------------------
// 1. 从 Supabase 读取所有已发布产品
// --------------------------
async function getPublishedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)

  if (error || !data) {
    console.error('读取Supabase产品失败:', error)
    return []
  }

  return data.map(product => ({
    path: `/products/${product.slug}`,
    lastModified: new Date(product.updated_at)
  }))
}

// --------------------------
// 2. 从 Notion 读取所有已发布博客
// --------------------------
async function getPublishedBlogs() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: '状态',
        select: {
          equals: '已完成'
        }
      }
    })

    return response.results.map(page => {
      const slugProperty = page.properties['slug']
      const slug = slugProperty?.rich_text?.[0]?.text?.content || ''
      return {
        path: `/blog/${slug}`,
        lastModified: new Date(page.last_edited_time)
      }
    }).filter(blog => blog.path !== '/blog/')
  } catch (error) {
    console.error('读取Notion博客失败:', error)
    return []
  }
}

// --------------------------
// 3. 主 sitemap 函数
// --------------------------
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adaceramics.com'
  const today = new Date()

  // 固定页面（按导航栏顺序）
  const staticPages = [
    { url: baseUrl, lastModified: today },
    { url: `${baseUrl}/products`, lastModified: today },
    { url: `${baseUrl}/custom-solutions`, lastModified: today },
    { url: `${baseUrl}/about-us`, lastModified: today },
    { url: `${baseUrl}/factory`, lastModified: today },
    { url: `${baseUrl}/blog`, lastModified: today },
    { url: `${baseUrl}/contact`, lastModified: today },
  ]

  // 动态页面：自动从数据库获取
  const productList = await getPublishedProducts()
  const blogList = await getPublishedBlogs()

  // 转成 sitemap 格式
  const productUrls = productList.map(p => ({
    url: `${baseUrl}${p.path}`,
    lastModified: p.lastModified
  }))

  const blogUrls = blogList.map(b => ({
    url: `${baseUrl}${b.path}`,
    lastModified: b.lastModified
  }))

  // 合并所有页面
  return [...staticPages, ...productUrls, ...blogUrls]
}
