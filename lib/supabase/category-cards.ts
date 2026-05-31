import { createClient } from './server'

export interface CategoryCard {
  id: string
  slug: string
  name: string
  image_url: string | null
  alt_text: string | null
  parent_category: string | null
  display_order: number
  is_active: boolean
}

/**
 * 获取所有产品分类卡片
 */
export async function getAllCategoryCards(): Promise<CategoryCard[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('product_category_cards')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching category cards:', error)
    return []
  }
  
  return data || []
}

/**
 * 按父分类获取产品分类卡片
 */
export async function getCategoryCardsByParent(parentCategory: string): Promise<CategoryCard[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('product_category_cards')
    .select('*')
    .eq('parent_category', parentCategory)
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching category cards by parent:', error)
    return []
  }
  
  return data || []
}

/**
 * 获取分类卡片并按父分类分组
 * 返回格式与现有 categoryProducts 结构一致
 */
export async function getCategoryCardsGrouped(): Promise<Record<string, { name: string; slug: string; image: string; alt: string }[]>> {
  const allCards = await getAllCategoryCards()
  
  // 初始化分组
  const grouped: Record<string, { name: string; slug: string; image: string; alt: string }[]> = {
    all: [],
    plates: [],
    bowls: [],
    sets: [],
    cups: [],
    bakeware: [],
  }
  
  // 分组处理
  for (const card of allCards) {
    const cardData = {
      name: card.name,
      slug: card.slug,
      // 如果没有图片则使用占位符
      image: card.image_url || `/images/categories/${card.slug}.webp`,
      // SEO友好的alt文本
      alt: card.alt_text || `${card.name} - wholesale ceramic ${card.parent_category || 'tableware'} from China factory`,
    }
    
    // 添加到 all 分类
    grouped.all.push(cardData)
    
    // 添加到对应的父分类
    if (card.parent_category && grouped[card.parent_category]) {
      grouped[card.parent_category].push(cardData)
    }
  }
  
  return grouped
}
