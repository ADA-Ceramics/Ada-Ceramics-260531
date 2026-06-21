import { getL2ConfigsByParent, L2_CONFIGS } from "@/lib/silo/l2-config"

// ====================== 静态页面（顺序完全匹配顶部导航栏） ======================
export const staticPages = [
  // 1. 首页 Home
  { path: "/", priority: 1.0, changefreq: "weekly" },
  // 2. 产品汇总页（原/products，四大分类入口页）
  { path: "/products", priority: 0.8, changefreq: "weekly" },
  // 3. OEM Custom Ceramics 定制总入口
  { path: "/oem-custom-ceramics", priority: 0.8, changefreq: "weekly" },
  // 4. Company 下拉：About Us
  { path: "/about-us", priority: 0.6, changefreq: "monthly" },
  // 5. Company 下拉：Factory
  { path: "/factory", priority: 0.6, changefreq: "monthly" },
  // 6. Company 下拉：Blog
  { path: "/blog", priority: 0.7, changefreq: "daily" },
  // 7. Contact 联系页
  { path: "/contact", priority: 0.6, changefreq: "monthly" },
]

// ====================== 产品分页 按4大Silo分组（匹配导航下拉菜单顺序） ======================
export const productPages = [
  // -------------------------- 第一组：Dinnerware（正餐餐具） --------------------------
  // L1 顶层分类页
  { path: "/dinnerware", priority: 0.85, changefreq: "weekly" },
  // L2 子分类（和下拉菜单顺序完全一致：Sets → Plates → Bowls → Serve Dishes）
  { path: "/dinnerware/dinnerware-sets", priority: 0.8, changefreq: "weekly" },
  { path: "/dinnerware/plates", priority: 0.8, changefreq: "weekly" },
  { path: "/dinnerware/bowls", priority: 0.8, changefreq: "weekly" },
  { path: "/dinnerware/serve-dishes", priority: 0.8, changefreq: "weekly" },

  // -------------------------- 第二组：Bakeware（烘焙器具） --------------------------
  // L1 顶层分类页
  { path: "/bakeware", priority: 0.85, changefreq: "weekly" },
  // L2 子分类（下拉顺序：Ramekin Bowls → Baking Dishes & Casseroles → Loaf & Pie & Pizza Pans）
  { path: "/bakeware/ramekin-bowls", priority: 0.8, changefreq: "weekly" },
  { path: "/bakeware/baking-dishes-casseroles", priority: 0.8, changefreq: "weekly" },
  { path: "/bakeware/loaf-pie-pizza-pans", priority: 0.8, changefreq: "weekly" },

  // -------------------------- 第三组：Table Decor & Drinkware（饮具桌面装饰） --------------------------
  // L1 顶层分类页
  { path: "/table-decor-drinkware", priority: 0.85, changefreq: "weekly" },
  // L2 子分类（下拉顺序：Cups & Mugs → Vases → Storage & Condiment Jars → Serving Trays → Candle Holders）
  { path: "/table-decor-drinkware/cups-mugs", priority: 0.8, changefreq: "weekly" },
  { path: "/table-decor-drinkware/vases", priority: 0.8, changefreq: "weekly" },
  { path: "/table-decor-drinkware/storage-condiment-jars", priority: 0.8, changefreq: "weekly" },
  { path: "/table-decor-drinkware/serving-trays", priority: 0.8, changefreq: "weekly" },
  { path: "/table-decor-drinkware/candle-holders", priority: 0.8, changefreq: "weekly" },

  // -------------------------- 第四组：OEM Custom Ceramics（定制服务） --------------------------
  // L2 定制细分页面（下拉菜单顺序）
  { path: "/oem-custom-ceramics/custom-logo-printing", priority: 0.75, changefreq: "monthly" },
  { path: "/oem-custom-ceramics/custom-glaze-color", priority: 0.75, changefreq: "monthly" },
  { path: "/oem-custom-ceramics/new-mold-development", priority: 0.75, changefreq: "monthly" },
  { path: "/oem-custom-ceramics/oem-odm-case-studies", priority: 0.75, changefreq: "monthly" },
  { path: "/oem-custom-ceramics/request-custom-quote", priority: 0.7, changefreq: "monthly" },
]

// ====================== 工具函数：自动生成多语言sitemap（适配en/其他locale） ======================
export function generateLocaleSitemap(locale: string = "en") {
  const prefix = locale === "en" ? "" : `/${locale}`

  // 拼接静态页面多语言路径
  const localizedStatic = staticPages.map((page) => ({
    ...page,
    path: `${prefix}${page.path}`,
  }))

  // 拼接产品分类多语言路径
  const localizedProducts = productPages.map((page) => ({
    ...page,
    path: `${prefix}${page.path}`,
  }))

  return [...localizedStatic, ...localizedProducts]
}

// 导出全部英文站点完整路径（sitemap.xml生成入口）
export const enSiteUrls = generateLocaleSitemap("en")
// 原有所有代码不动，直接加下面这行
export default enSiteUrls;
