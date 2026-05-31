import { createClient } from './server'
import type { Product } from './types'
import { CATEGORY_INFO } from './types'

// 获取所有产品 关联分类表拿到slug
export async function getAllProducts(): Promise<(Product & { category_slug: string })[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  // 把分类slug挂到产品上
  return (data || []).map(item => ({
    ...item,
    category_slug: item.product_categories?.slug || ''
  }))
}

// 获取指定分类的产品
export async function getProductsByCategory(categorySlug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('is_active', true)
    .eq('product_categories.slug', categorySlug)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data || []
}

// 获取单个产品 - 支持精确匹配和模糊匹配
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  
  // 尝试解码slug（处理URL编码的特殊字符）
  const decodedSlug = decodeURIComponent(slug)
  
  // 首先尝试精确匹配
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('slug', decodedSlug)
    .eq('is_active', true)
    .single()

  if (!error && data) {
    return {
      ...data,
      category_slug: data.product_categories?.slug || ''
    }
  }
  
  // 如果精确匹配失败，尝试模糊匹配（处理slug末尾可能有数字后缀的情况）
  // 移除末尾的数字后缀（如 -03, -02 等）进行模糊匹配
  const baseSlug = decodedSlug.replace(/-\d+$/, '')
  
  const { data: fuzzyData, error: fuzzyError } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .ilike('slug', `%${baseSlug}%`)
    .eq('is_active', true)
    .limit(1)
    .single()
  
  if (fuzzyError || !fuzzyData) {
    return null
  }
  
  return {
    ...fuzzyData,
    category_slug: fuzzyData.product_categories?.slug || ''
  }
}

// 获取分类下的产品数量
export async function getProductCountByCategory(categorySlug: string): Promise<number>
{
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('products')
    .select('*, product_categories!products_category_fkey(slug)', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('product_categories.slug', categorySlug)
  
  if (error) {
    console.error('Error fetching product count:', error)
    return 0
  }
  
  return count || 0
}

// 从数据库获取所有分类
export async function getCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('product_categories')
    .select('slug, name, description')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}
