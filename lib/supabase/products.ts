import { createClient } from './server'
import type { Product } from './types'
import { CATEGORY_INFO } from './types'

// ============ 辅助：获取指定分类及其所有子分类的 slug 列表 ============
async function getCategoryAndChildSlugs(rootSlug: string): Promise<string[]> {
  const supabase = await createClient()

  const { data: allCats } = await supabase
    .from('product_categories')
    .select('id, slug, parent_id')

  if (!allCats) return [rootSlug]

  const root = allCats.find(c => c.slug === rootSlug)
  if (!root) return [rootSlug]

  const childIds: string[] = []
  const stack = allCats.filter(c => c.parent_id === root.id)
  while (stack.length > 0) {
    const curr = stack.pop()!
    childIds.push(curr.id)
    stack.push(...allCats.filter(c => c.parent_id === curr.id))
  }

  const childSlugs = allCats
    .filter(c => childIds.includes(c.id))
    .map(c => c.slug)

  return [rootSlug, ...childSlugs]
}

// ============ 获取所有产品 ============
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
  
  return (data || []).map(item => ({
    ...item,
    category_slug: item.product_categories?.slug || ''
  }))
}

// ============ 获取指定分类（含所有子分类）的产品 ============
export async function getProductsByCategory(categorySlug: string) {
  const supabase = await createClient()

  const slugs = await getCategoryAndChildSlugs(categorySlug)
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('is_active', true)
    .in('product_categories.slug', slugs)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data || []
}

// ============ 获取单个产品 ============
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  
  const decodedSlug = decodeURIComponent(slug)
  
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

// ============ 获取分类下的产品数量 ============
export async function getProductCountByCategory(categorySlug: string): Promise<number> {
  const supabase = await createClient()

  const slugs = await getCategoryAndChildSlugs(categorySlug)
  
  const { count, error } = await supabase
    .from('products')
    .select('*, product_categories!products_category_fkey(slug)', { count: 'exact', head: true })
    .eq('is_active', true)
    .in('product_categories.slug', slugs)
  
  if (error) {
    console.error('Error fetching product count:', error)
    return 0
  }
  
  return count || 0
}

// ============ 从数据库获取所有分类 ============
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
