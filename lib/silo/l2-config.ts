// ============================================================================
// L2 二级分类集合页配置（数据驱动，单一通用模板复用全站所有 L2 子分类）
// 仅新增，不改动 lib/silo/config.ts 与任何原有 L1 配置。
// 复用 L1 的 seo / procurement / faqs 数据结构，从而 100% 复用现有 silo 组件：
//   SiloSeoContent / SiloProcurementTags / SiloFaq / SiloCrossLinks
// 图片 alt 统一模板沿用 lib/silo/config.ts 的 buildAlt()。
// ============================================================================

import type { SiloConfig, SiloFaqItem } from "@/lib/silo/config"

export type L2Config = {
  /** 所属 L1 Silo slug（用于面包屑上链 + 跨 Silo 高亮） */
  parentSlug: string
  /** L1 显示名（面包屑中间段） */
  parentLabel: string
  /** L2 路由 slug（拼接为 /{parentSlug}/{slug}） */
  slug: string
  /** L2 显示名（面包屑末段 / H1 兜底） */
  label: string
  /**
   * 当前 L2 对应的 Supabase 分类 slug（候选，严格隔离仅查当前细分品类）。
   * 多候选用于兼容历史 slug，命中第一个有数据的即可，绝不混入其它品类。
   */
  productCategorySlugs: string[]
  /** 细分品类核心关键词，用于图片 alt 模板 */
  keyword: string
  /** 页面唯一 H1 */
  h1: string
  /** 独立 meta title（站点 layout 会自动追加品牌名，无需手动拼） */
  metaTitle: string
  /** 独立 meta description */
  metaDescription: string
  metaKeywords: string
  /** 细分合集 Banner 图（复用站点现有 WebP 资源） */
  bannerImage: string
  /** 细分简介（约 60-90 词，B 端口吻） */
  intro: string
  /** 300 词 L2 专属 SEO 长文（复用 SiloSeoContent 结构，末段自带 Silo 隔离结束语） */
  seo: SiloConfig["seo"]
  /** 采购优势标签（复用 SiloProcurementTags 结构） */
  procurement: SiloConfig["procurement"]
  /** 细分专属 FAQ（复用 SiloFaq + FAQPage Schema） */
  faqs: SiloFaqItem[]
}

// ----------------------------------------------------------------------------
// Bakeware（烘焙）Silo —— 通用 L2 模板的标准落地样例
// ----------------------------------------------------------------------------

const ramekinBowls: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "ramekin-bowls",
  label: "Ramekin Bowls",
  productCategorySlugs: ["ramekins"],
  keyword: "ramekin bowls",
  h1: "Wholesale Ceramic Ramekin Bowls for Soufflé, Crème Brûlée & Sides",
  metaTitle: "Wholesale Ceramic Ramekin Bowls | Oven-Safe Bulk Ramekins",
  metaDescription:
    "Bulk oven-safe ceramic ramekin bowls direct from a Chaozhou factory. Soufflé, crème brûlée, dipping and side ramekins for restaurants, bakeries and retail. Low MOQ, thermal-shock resistant, full OEM/ODM customization.",
  metaKeywords:
    "wholesale ramekins, ceramic ramekin bowls bulk, souffle dishes supplier, creme brulee ramekins, oven-safe ramekin factory",
  bannerImage: "/ceramic-snack-plate-for-home.webp",
  intro:
    "ADA Ceramics supplies oven-safe ceramic ramekin bowls in commercial-ready sizes for soufflés, crème brûlée, dipping sauces, baked eggs and portioned sides. Each ramekin is high-temperature fired for thermal-shock resistance and a dense, easy-clean body built for daily restaurant, bakery and catering service, with low MOQs and full OEM/ODM branding.",
  seo: {
    h2: "Oven-Safe Wholesale Ramekin Bowls Built for Daily Service",
    procurementScenario:
      "Restaurants, patisseries, hotels and caterers depend on ramekins that move straight from oven to table and back through the dishwasher without crazing or cracking. Our ceramic ramekin bowls are fired at high temperature for even heat retention and reliable thermal-shock resistance, so soufflés rise evenly, crème brûlée sets consistently and portioned sides plate beautifully. Standard 2oz to 8oz capacities let buyers cover dipping sauces, condiments, baked starters and dessert programs from a single durable range, lowering breakage costs across busy service.",
    customService:
      "As a full OEM/ODM manufacturer we customize ramekin capacity, rim profile, fluting, glaze colour, embossed logos and retail-ready packaging to your specification. Send artwork for branded ramekins, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial fresh ramekin ranges, and our in-house sampling team delivers approved pre-production samples quickly to protect your launch timeline.",
    qualityLogistics:
      "Every ramekin order is produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed bakeware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need larger oven-to-table pieces? Browse our Baking Dishes & Casseroles and Loaf, Pie & Pizza Pans sub-categories within the Bakeware Silo, or explore the Dinnerware and Table Decor & Drinkware Silos for plates, bowls and drinkware.",
  },
  procurement: {
    heading: "Shop Ramekin Bowls by Procurement Need",
    tags: [
      { label: "Soufflé Ramekins", href: "/bakeware/ramekin-bowls" },
      { label: "Crème Brûlée Dishes", href: "/bakeware/ramekin-bowls" },
      { label: "Dipping & Sauce Pots", href: "/bakeware/ramekin-bowls" },
      { label: "Baked Side Ramekins", href: "/bakeware/ramekin-bowls" },
      { label: "Custom Branded Ramekins", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic ramekins oven and thermal-shock safe?",
      a: "Yes. Our ramekin bowls are high-temperature fired and thermal-tested for direct oven use, with a dense body that resists cracking through normal heating and cooling cycles in professional kitchens.",
    },
    {
      q: "What capacities and sizes of ramekins do you offer?",
      a: "Standard ramekins range from about 2oz to 8oz (60ml–240ml) covering dipping pots, crème brûlée dishes, soufflé ramekins and portioned side dishes. Custom capacities are available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale ramekin bowls?",
      a: "Standard MOQ starts at 500 pieces per design for stock ramekins. Custom OEM/ODM ramekins generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can ramekins be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, rim and fluting changes, and new mold development, plus retail-ready branded packaging for private-label lines.",
    },
    {
      q: "Are your ramekins microwave and dishwasher safe?",
      a: "Our ceramic ramekins are microwave and dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const bakingDishes: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "baking-dishes",
  label: "Baking Dishes & Casseroles",
  productCategorySlugs: ["baking-dishes"],
  keyword: "baking dishes and casseroles",
  h1: "Wholesale Ceramic Baking Dishes & Casseroles for Oven-to-Table Service",
  metaTitle: "Wholesale Ceramic Baking Dishes & Casseroles | Oven-Safe Bulk",
  metaDescription:
    "Family-size ceramic baking dishes and lidded casseroles direct from a Chaozhou factory. Oven-to-table bakeware for restaurants, hotels and retail. Low MOQ, thermal-shock resistant, full OEM/ODM customization.",
  metaKeywords:
    "wholesale baking dishes, ceramic casserole bulk, lasagna dish supplier, oven-to-table bakeware, casserole factory",
  bannerImage: "/wholesale-bakeware.webp",
  intro:
    "ADA Ceramics manufactures family-size ceramic baking dishes and lidded casseroles engineered for oven-to-table service. Fired for even heat distribution and thermal-shock resistance, our rectangular, oval and round bakers handle gratins, lasagne, roasts and casseroles in busy kitchens and look refined on the table, with low MOQs and full OEM/ODM customization.",
  seo: {
    h2: "Wholesale Baking Dishes & Casseroles for Professional Kitchens",
    procurementScenario:
      "Restaurants, hotels, caterers and retail homeware brands need baking dishes that cook evenly, retain heat at service and survive constant oven and dishwasher cycles. Our ceramic baking dishes and casseroles are high-temperature fired for thermal-shock resistance and uniform heat distribution, ideal for gratins, lasagne, roasts, bakes and slow-cooked casseroles. A coordinated range of rectangular, oval and round sizes lets buyers standardize one durable oven-to-table program across every outlet while keeping presentation consistent.",
    customService:
      "Our OEM/ODM service customizes dish dimensions and capacity, handle styling, lid options, glaze colour, embossed branding and retail gift packaging. Submit artwork for branded casseroles, match a signature colour, or develop new molds for an exclusive bakeware line. Low minimum order quantities let buyers trial new ranges, and our sampling team delivers approved pre-production samples fast to keep launches on schedule.",
    qualityLogistics:
      "All baking dishes are produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging built for ocean freight. Our logistics team consolidates mixed bakeware loads, handles documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Looking for individual portions or flat bakeware? Explore our Ramekin Bowls and Loaf, Pie & Pizza Pans sub-categories within the Bakeware Silo, or visit the Dinnerware and Table Decor & Drinkware Silos for complementary ranges.",
  },
  procurement: {
    heading: "Shop Baking Dishes & Casseroles by Procurement Need",
    tags: [
      { label: "Lasagne & Gratin Dishes", href: "/bakeware/baking-dishes" },
      { label: "Lidded Casseroles", href: "/bakeware/baking-dishes" },
      { label: "Oval Roasting Bakers", href: "/bakeware/baking-dishes" },
      { label: "Oven-to-Table Sets", href: "/bakeware/baking-dishes" },
      { label: "Custom Branded Bakers", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your baking dishes oven and thermal-shock safe?",
      a: "Yes. Our baking dishes and casseroles are high-temperature fired and thermal-tested for oven use, with a dense body that resists cracking from normal heating and cooling in professional kitchens.",
    },
    {
      q: "What sizes of baking dishes and casseroles do you supply?",
      a: "We offer rectangular, oval and round bakers in a range of family and service sizes, from individual gratins to large lasagne dishes, with custom dimensions available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale baking dishes?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM baking dishes generally start from 1,000–3,000 pieces depending on mold and glaze requirements.",
    },
    {
      q: "Can casseroles be customized with lids, colours or branding?",
      a: "Yes. We customize lids, handles, capacity, glaze colour and embossed or printed logos, plus retail-ready packaging for private-label oven-to-table ranges.",
    },
    {
      q: "Are your baking dishes microwave and dishwasher safe?",
      a: "Our ceramic baking dishes are microwave and dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const piePizzaPans: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "pie-pizza-pans",
  label: "Loaf, Pie & Pizza Pans",
  productCategorySlugs: ["pie-pizza-plates"],
  keyword: "loaf pie and pizza pans",
  h1: "Wholesale Ceramic Loaf, Pie & Pizza Pans for Bakeries & Kitchens",
  metaTitle: "Wholesale Ceramic Loaf, Pie & Pizza Pans | Oven-Safe Bulk",
  metaDescription:
    "Oven-safe ceramic loaf, pie and pizza pans direct from a Chaozhou factory. Bulk baking pans for bakeries, restaurants and retail. Low MOQ, thermal-shock resistant, full OEM/ODM customization.",
  metaKeywords:
    "wholesale pie pans, ceramic pizza stone bulk, loaf pan supplier, baking pans factory, oven-safe pie dish",
  bannerImage: "/amazon-hotsell-ceramic.webp",
  intro:
    "ADA Ceramics produces oven-safe ceramic loaf, pie and pizza pans for bakeries, restaurant kitchens and homeware retailers. Fired for even browning and thermal-shock resistance, our pans deliver consistent crusts and bakes batch after batch, with low MOQs and full OEM/ODM customization of size, colour and branding.",
  seo: {
    h2: "Wholesale Loaf, Pie & Pizza Pans Engineered for Even Baking",
    procurementScenario:
      "Bakeries, restaurants, hotels and retail brands need flat and formed bakeware that browns evenly and withstands continuous high-heat baking. Our ceramic loaf, pie and pizza pans are high-temperature fired for excellent heat retention and thermal-shock resistance, producing crisp pizza bases, golden pie crusts and well-risen loaves. A consistent range of diameters and capacities lets buyers standardize their baking program and supply retail shelves with dependable, attractive bakeware.",
    customService:
      "Our OEM/ODM service customizes pan diameter, depth, fluting, glaze colour, embossed logos and retail gift packaging. Send artwork for branded pans, match a signature colour, or commission new mold development for an exclusive design. Low minimum order quantities let buyers test new ranges, and our sampling team produces approved pre-production samples quickly to keep launches on track.",
    qualityLogistics:
      "All loaf, pie and pizza pans are produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging for ocean freight. Our logistics team consolidates mixed bakeware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need individual portions or deeper bakers? Explore our Ramekin Bowls and Baking Dishes & Casseroles sub-categories within the Bakeware Silo, or browse the Dinnerware and Table Decor & Drinkware Silos for plates and drinkware.",
  },
  procurement: {
    heading: "Shop Loaf, Pie & Pizza Pans by Procurement Need",
    tags: [
      { label: "Pizza Baking Pans", href: "/bakeware/pie-pizza-pans" },
      { label: "Pie & Quiche Dishes", href: "/bakeware/pie-pizza-pans" },
      { label: "Loaf & Bread Pans", href: "/bakeware/pie-pizza-pans" },
      { label: "Bakery Supply", href: "/bakeware/pie-pizza-pans" },
      { label: "Custom Branded Pans", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your pie and pizza pans oven and thermal-shock safe?",
      a: "Yes. Our loaf, pie and pizza pans are high-temperature fired and thermal-tested for oven use, resisting cracking from normal heating and cooling cycles in busy bakeries and kitchens.",
    },
    {
      q: "Do ceramic pizza pans give a crisp base?",
      a: "Our ceramic pizza pans retain and distribute heat evenly, helping produce a crisp, well-browned base, and they transition cleanly from oven to table for service.",
    },
    {
      q: "What is the MOQ for wholesale loaf, pie and pizza pans?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM pans generally start from 1,000–3,000 pieces depending on mold and glaze requirements.",
    },
    {
      q: "Can pans be customized with our brand or colours?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, dimension changes and new mold development, plus retail-ready branded packaging for private-label ranges.",
    },
    {
      q: "Are your baking pans dishwasher safe?",
      a: "Our ceramic loaf, pie and pizza pans are dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for international markets.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 汇总 + 查询辅助（键名固定为 `${parentSlug}/${slug}`，便于路由按 silo+l2 取配置）
// ----------------------------------------------------------------------------

export const L2_CONFIGS: Record<string, L2Config> = {
  "bakeware/ramekin-bowls": ramekinBowls,
  "bakeware/baking-dishes": bakingDishes,
  "bakeware/pie-pizza-pans": piePizzaPans,
}

/** 取某个 L2 配置 */
export function getL2Config(parentSlug: string, slug: string): L2Config | undefined {
  return L2_CONFIGS[`${parentSlug}/${slug}`]
}

/** 取某个 L1 Silo 下全部 L2 配置（用于横向兄弟跳转 + 静态参数生成） */
export function getL2ConfigsByParent(parentSlug: string): L2Config[] {
  return Object.values(L2_CONFIGS).filter((c) => c.parentSlug === parentSlug)
}
