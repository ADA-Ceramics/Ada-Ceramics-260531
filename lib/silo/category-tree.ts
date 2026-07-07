// ============================================================================
// 「Product Categories」前端分类树配置（纯前端过滤用，可自由补充/修改）
// ----------------------------------------------------------------------------
// 这里是分类树的唯一数据源：修改分组、增删子分类、调整匹配规则都在本文件完成。
// 分类树只做纯前端过滤，不产生任何 <a href> 独立超链接。
//
// 匹配规则（某个产品是否属于某个分类节点）：
//   1) 若产品的 categorySlug 命中该节点的 matchSlugs -> 命中
//   2) 或产品文本(name/description/specifications/features)包含该节点任一 keyword -> 命中
//   3) 父节点(L2)命中 = 自身命中 或 任意子节点(L3)命中
// ============================================================================

export type CategoryNode = {
  /** 唯一 id（用于选中态与展开态标识） */
  id: string
  /** 显示名（与截图文案一致） */
  label: string
  /** 命中的 Supabase 分类 slug（可留空，交由 keywords 匹配） */
  matchSlugs?: string[]
  /** 命中关键词（小写匹配 name/description/specifications/features） */
  keywords?: string[]
  /** 子分类（L3） */
  children?: CategoryNode[]
}

// 与截图完全一致的层级结构；keywords / matchSlugs 可按实际产品数据继续补充
export const PRODUCT_CATEGORY_TREE: CategoryNode[] = [
  {
    id: "plates",
    label: "Wholesale Plates",
    matchSlugs: ["plates", "dinner-plates", "serving-plates"],
    keywords: ["plate", "platter"],
    children: [
      { id: "dinner-plates", label: "Dinner Plates", matchSlugs: ["dinner-plates"], keywords: ["dinner plate"] },
      { id: "dessert-side-plates", label: "Dessert & Side Plates", matchSlugs: ["dessert-plates", "side-plates"], keywords: ["dessert plate", "side plate", "salad plate"] },
      { id: "soup-plates", label: "Soup Plates", matchSlugs: ["soup-plates"], keywords: ["soup plate", "pasta plate", "rim soup"] },
      { id: "oval-serving-plates", label: "Oval & Serving Plates", matchSlugs: ["serving-plates", "oval-plates"], keywords: ["oval plate", "serving plate", "platter"] },
    ],
  },
  {
    id: "bowls",
    label: "Wholesale Bowls",
    matchSlugs: ["bowls", "soup-bowls", "salad-bowls"],
    keywords: ["bowl"],
    children: [
      { id: "soup-bowls", label: "Soup Bowls", matchSlugs: ["soup-bowls"], keywords: ["soup bowl"] },
      { id: "salad-bowls", label: "Salad Bowls", matchSlugs: ["salad-bowls"], keywords: ["salad bowl", "serving bowl"] },
      { id: "ramen-bowls", label: "Ramen Bowls", matchSlugs: ["ramen-bowls"], keywords: ["ramen bowl", "noodle bowl", "pho bowl"] },
      { id: "snack-bowls", label: "Snack Bowls", matchSlugs: ["snack-bowls"], keywords: ["snack bowl", "dip bowl", "rice bowl"] },
    ],
  },
  {
    id: "dinnerware-sets",
    label: "Wholesale Dinnerware Sets",
    matchSlugs: ["dinnerware-sets", "tableware-sets"],
    keywords: ["dinner set", "dinnerware set", "tableware set", "set"],
    children: [
      { id: "daily-tableware-sets", label: "Daily Tableware Sets", matchSlugs: ["daily-tableware-sets"], keywords: ["daily set", "family set", "home set"] },
      { id: "restaurant-catering-sets", label: "Restaurant & Catering Sets", matchSlugs: ["restaurant-sets", "catering-sets"], keywords: ["restaurant set", "catering set", "hotel set"] },
    ],
  },
  {
    id: "bakeware",
    label: "Wholesale Bakeware",
    matchSlugs: ["bakeware", "baking-dishes", "ramekins"],
    keywords: ["bake", "oven", "casserole"],
    children: [
      { id: "baking-dishes", label: "Baking Dishes", matchSlugs: ["baking-dishes"], keywords: ["baking dish", "casserole", "bakeware"] },
      { id: "ramekins", label: "Ramekins", matchSlugs: ["ramekins"], keywords: ["ramekin", "soufflé", "souffle", "crème brûlée", "creme brulee"] },
      { id: "pie-pizza-plates", label: "Pie & Pizza Plates", matchSlugs: ["pie-plates", "pizza-plates"], keywords: ["pie plate", "pizza plate", "pie dish"] },
    ],
  },
  {
    id: "cups-mugs",
    label: "Wholesale Drinkware",
    matchSlugs: ["cups-mugs", "mugs", "cups", "drinkware"],
    keywords: ["cup", "mug", "drinkware"],
    children: [
      { id: "ceramic-mugs", label: "Ceramic Mugs", matchSlugs: ["mugs", "ceramic-mugs"], keywords: ["mug"] },
      { id: "coffee-cups-saucers", label: "Coffee Cups & Saucers", matchSlugs: ["coffee-cups", "cups-saucers"], keywords: ["coffee cup", "espresso", "saucer", "tea cup"] },
    ],
  },
  {
    id: "table-decor",
    label: "Wholesale Table Decor",
    matchSlugs: ["table-decor", "decor"],
    keywords: ["decor", "vase", "jar", "tray", "candle"],
    children: [
      { id: "vase", label: "Vase", matchSlugs: ["vase", "vases"], keywords: ["vase", "flower vase"] },
      { id: "storage-condiment-jars", label: "Storage & Condiment Jars", matchSlugs: ["storage-jars", "condiment-jars", "jars"], keywords: ["jar", "storage jar", "condiment", "canister"] },
      { id: "serving-trays", label: "Serving Trays", matchSlugs: ["serving-trays", "trays"], keywords: ["tray", "serving tray", "platter tray"] },
      { id: "candle-holders", label: "Candle Holders", matchSlugs: ["candle-holders"], keywords: ["candle", "candle holder", "tealight"] },
    ],
  },
]

/** 供匹配用的最小产品形状（L2Product / SiloProduct 都满足） */
export type MatchableProduct = {
  categorySlug?: string | null
  name?: string | null
  description?: string | null
  specifications?: string | null
  features?: string | null
}

function toText(v: unknown): string {
  if (!v) return ""
  if (typeof v === "string") return v
  try {
    return JSON.stringify(v)
  } catch {
    return ""
  }
}

function haystack(p: MatchableProduct): string {
  return `${toText(p.name)} ${toText(p.description)} ${toText(p.specifications)} ${toText(p.features)}`.toLowerCase()
}

/** 单个节点自身是否命中某产品（不含子节点） */
function selfMatches(node: CategoryNode, p: MatchableProduct): boolean {
  const slug = (p.categorySlug ?? "").toLowerCase()
  if (node.matchSlugs?.some((s) => s.toLowerCase() === slug)) return true
  if (node.keywords && node.keywords.length > 0) {
    const hs = haystack(p)
    if (node.keywords.some((k) => hs.includes(k.toLowerCase()))) return true
  }
  return false
}

/** 节点（含子节点）是否命中某产品 —— 用于父级 L2 命中判断 */
export function categoryMatches(node: CategoryNode, p: MatchableProduct): boolean {
  if (selfMatches(node, p)) return true
  return (node.children ?? []).some((child) => categoryMatches(child, p))
}

/** 在整棵树中按 id 查找节点 */
export function findCategoryNode(id: string): CategoryNode | null {
  const walk = (nodes: CategoryNode[]): CategoryNode | null => {
    for (const n of nodes) {
      if (n.id === id) return n
      const hit = n.children ? walk(n.children) : null
      if (hit) return hit
    }
    return null
  }
  return walk(PRODUCT_CATEGORY_TREE)
}
