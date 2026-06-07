// lib/supabase/products.ts
import { createClient } from "@/lib/supabaseClient"

export type Product = {
  id: string
  name: string
  slug: string
  main_image: string | null
  category: string // 一级分类ID（UUID）
  subcategory: string | null // 二级分类ID（UUID）
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // 你表里有的其他字段也可以加上
}

// 拿到：当前slug对应的分类ID + 它所有子分类ID
async function getCategoryAndChildIds(rootSlug: string): Promise<string[]> {
  const supabase = createClient()

  // 1. 先拿到 root 分类（根据 slug）
  const { data: rootCat } = await supabase
    .from("product_categories")
    .select("id, slug")
    .eq("slug", rootSlug)
    .single()

  if (!rootCat) return []

  // 2. 拿到所有分类，用于递归找子分类
  const { data: allCats } = await supabase
    .from("product_categories")
    .select("id, parent_id")

  if (!allCats) return [rootCat.id]

  // 3. 递归收集所有子分类 id
  const childIds: string[] = []
  const stack = allCats.filter(c => c.parent_id === rootCat.id)

  while (stack.length > 0) {
    const curr = stack.pop()!
    childIds.push(curr.id)
    stack.push(...allCats.filter(c => c.parent_id === curr.id))
  }

  // 返回：当前分类ID + 所有子分类ID
  return [rootCat.id, ...childIds]
}

// 核心：根据 slug（一级/二级）获取对应产品
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const supabase = createClient()

  // 1. 先查这个 slug 是一级还是二级分类
  const { data: cat } = await supabase
    .from("product_categories")
    .select("id, parent_id")
    .eq("slug", slug)
    .single()

  if (!cat) return []

  let ids: string[]

  // 2. 分两种情况：
  // 情况A：一级分类（parent_id 为 null）→ 包含自己+所有子分类
  if (cat.parent_id === null) {
    ids = await getCategoryAndChildIds(slug)
    // 产品存在 products.category 字段
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .in("category", ids)
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("getProductsByCategory (一级):", error)
      return []
    }
    return data || []
  }

  // 情况B：二级分类（parent_id 不为 null）→ 只查 subcategory = 自己id
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("subcategory", cat.id)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("getProductsByCategory (二级):", error)
    return []
  }
  return data || []
}

// 可选：获取所有产品（用于首页/全部产品页）
export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("getAllProducts:", error)
    return []
  }
  return data || []
}

// 可选：获取单个产品详情
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("getProductBySlug:", error)
    return null
  }
  return data
}
