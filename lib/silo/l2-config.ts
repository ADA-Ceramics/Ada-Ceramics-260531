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
// Dinnerware（正餐餐具）Silo —— 复用同一通用 L2 模板
// ----------------------------------------------------------------------------

const dinnerwarePlates: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "plates",
  label: "Plates",
  productCategorySlugs: ["wholesale-plates", "plates"],
  keyword: "dinner plates",
  h1: "Wholesale Ceramic Plates for Restaurants, Hotels & Catering",
  metaTitle: "Wholesale Ceramic Plates | Bulk Dinner, Dessert & Side Plates",
  metaDescription:
    "Chip-resistant ceramic plates in bulk direct from a Chaozhou factory. Dinner, dessert, side and charger plates for restaurants, hotels and caterers. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale plates, ceramic dinner plates bulk, restaurant plates supplier, dessert plates factory, charger plates OEM",
  bannerImage: "/wholesale-plates.webp",
  intro:
    "ADA Ceramics supplies chip-resistant ceramic plates in commercial-ready sizes for dinner, dessert, side and charger service. Each plate is high-temperature fired for a dense, impact-resistant body and a smooth, stain-resistant glaze built for constant stacking, washing and plating in restaurants, hotels and catering, with low MOQs and full OEM/ODM branding.",
  seo: {
    h2: "Chip-Resistant Wholesale Plates Built for High-Volume Service",
    procurementScenario:
      "Restaurants, hotels, canteens and caterers need plates that survive constant stacking, washing and plating without chipping or losing their finish. Our ceramic plates are fired at high temperature for dense, impact-resistant bodies and a smooth non-porous glaze that resists staining and scratching. A coordinated range of dinner, dessert, side and charger sizes lets buyers standardize one durable plating program across every outlet, lowering breakage costs and keeping table presentation consistent at scale.",
    customService:
      "As a full OEM/ODM manufacturer we customize plate diameter, rim profile, coupe or rimmed shape, glaze colour, embossed or printed logos and retail-ready packaging. Send artwork for branded plates, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial new ranges, and our sampling team delivers approved pre-production samples quickly to protect launch timelines.",
    qualityLogistics:
      "Every plate order is produced under strict QC with FDA and LFGB food-contact certification, edge-impact testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need matching bowls or full table programs? Browse our Bowls, Dinnerware Sets and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Plates by Procurement Need",
    tags: [
      { label: "Dinner Plates", href: "/dinnerware/plates" },
      { label: "Dessert & Side Plates", href: "/dinnerware/plates" },
      { label: "Charger Plates", href: "/dinnerware/plates" },
      { label: "Coupe Plates", href: "/dinnerware/plates" },
      { label: "Custom Branded Plates", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic plates chip-resistant?",
      a: "Yes. Our plates are high-temperature fired for a dense, impact-resistant body with reinforced edges, tested to withstand constant stacking, washing and plating in professional kitchens.",
    },
    {
      q: "What plate sizes do you offer?",
      a: "Standard ranges cover dinner plates (about 10–12in), dessert and side plates (about 6–8in) and charger plates, with custom diameters and rim profiles available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale plates?",
      a: "Standard MOQ starts at 500 pieces per design for stock plates. Custom OEM/ODM plates generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can plates be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, rim and shape changes, and new mold development, plus retail-ready branded packaging for private-label lines.",
    },
    {
      q: "Are your plates dishwasher and microwave safe?",
      a: "Our ceramic plates are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareBowls: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "bowls",
  label: "Bowls",
  productCategorySlugs: ["wholesale-bowls", "bowls"],
  keyword: "soup and salad bowls",
  h1: "Wholesale Ceramic Bowls for Restaurants, Hotels & Catering",
  metaTitle: "Wholesale Ceramic Bowls | Bulk Soup, Salad & Ramen Bowls",
  metaDescription:
    "Chip-resistant ceramic bowls in bulk direct from a Chaozhou factory. Soup, salad, ramen and snack bowls for restaurants, hotels and caterers. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale bowls, ceramic soup bowls bulk, salad bowls supplier, ramen bowls factory, snack bowls OEM",
  bannerImage: "/wholesale-bowls.webp",
  intro:
    "ADA Ceramics supplies chip-resistant ceramic bowls in commercial-ready sizes for soup, salad, ramen, rice and snack service. Each bowl is high-temperature fired for a dense, durable body and a smooth, stain-resistant glaze built for daily restaurant, hotel and catering use, with low MOQs and full OEM/ODM branding.",
  seo: {
    h2: "Versatile Wholesale Bowls Built for Daily Service",
    procurementScenario:
      "Restaurants, hotels, canteens and caterers rely on bowls that handle constant stacking, washing and plating across soup, salad, ramen, rice and snack programs. Our ceramic bowls are fired at high temperature for dense, impact-resistant bodies and a smooth non-porous glaze that resists staining and odour. A coordinated range of capacities lets buyers standardize one durable bowl program across every outlet, lowering replacement costs while keeping presentation consistent at scale.",
    customService:
      "As a full OEM/ODM manufacturer we customize bowl capacity, depth, rim profile, glaze colour, embossed or printed logos and retail-ready packaging. Send artwork for branded bowls, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial new ranges, and our sampling team delivers approved pre-production samples quickly.",
    qualityLogistics:
      "Every bowl order is produced under strict QC with FDA and LFGB food-contact certification, impact testing and reinforced export packaging engineered for ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need matching plates or full table programs? Browse our Plates, Dinnerware Sets and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Bowls by Procurement Need",
    tags: [
      { label: "Soup & Cereal Bowls", href: "/dinnerware/bowls" },
      { label: "Salad & Pasta Bowls", href: "/dinnerware/bowls" },
      { label: "Ramen & Noodle Bowls", href: "/dinnerware/bowls" },
      { label: "Rice & Snack Bowls", href: "/dinnerware/bowls" },
      { label: "Custom Branded Bowls", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic bowls chip-resistant?",
      a: "Yes. Our bowls are high-temperature fired for a dense, impact-resistant body, tested to withstand constant stacking, washing and plating in professional kitchens.",
    },
    {
      q: "What bowl sizes and capacities do you offer?",
      a: "Standard ranges cover snack and rice bowls, soup and cereal bowls, salad and pasta bowls and large ramen bowls, with custom capacities available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale bowls?",
      a: "Standard MOQ starts at 500 pieces per design for stock bowls. Custom OEM/ODM bowls generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can bowls be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, shape and capacity changes, and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your bowls dishwasher and microwave safe?",
      a: "Our ceramic bowls are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareSets: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "dinnerware-sets",
  label: "Dinnerware Sets",
  productCategorySlugs: ["wholesale-dinnerware-sets", "dinnerware-sets"],
  keyword: "dinnerware sets",
  h1: "Wholesale Ceramic Dinnerware Sets for Hotels, Retail & Private Label",
  metaTitle: "Wholesale Ceramic Dinnerware Sets | Bulk Matched Tableware",
  metaDescription:
    "Fully matched ceramic dinnerware sets direct from a Chaozhou factory. Coordinated plates, bowls and mugs for hotels, retail and private-label brands. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale dinnerware sets, ceramic tableware sets bulk, hotel dinnerware supplier, private label dinner set, matched tableware factory",
  bannerImage: "/wholesale-dinnerware-sets.webp",
  intro:
    "ADA Ceramics manufactures fully coordinated ceramic dinnerware sets pairing plates, bowls and mugs in a single durable glaze program. High-temperature fired for strength and a consistent finish, our sets suit hotel table standards, retail gift ranges and private-label collections, with low MOQs and complete OEM/ODM customization.",
  seo: {
    h2: "Coordinated Wholesale Dinnerware Sets for Consistent Tables",
    procurementScenario:
      "Hotels, retailers and homeware brands need dinnerware sets that match perfectly across plates, bowls and mugs and stay consistent reorder after reorder. Our ceramic sets are fired at high temperature for dense, durable bodies and a uniform glaze finish, so every place setting looks coordinated and survives daily washing and stacking. Buyers can standardize one matched program across rooms, outlets or retail SKUs, simplifying replenishment while protecting brand presentation.",
    customService:
      "As a full OEM/ODM manufacturer we configure set composition (piece count, shapes, capacities), glaze colour, decal or embossed branding and retail gift packaging. Build an exclusive collection from new molds, match a signature colourway, or adapt an existing range for your market. Low minimum order quantities let private-label brands trial fresh set concepts, with fast approved pre-production samples.",
    qualityLogistics:
      "Every dinnerware set is produced under strict QC with FDA and LFGB food-contact certification, impact testing and reinforced retail-ready export packaging engineered for ocean freight. Our logistics team consolidates mixed loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Want to build sets from individual pieces? Browse our Plates, Bowls and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Dinnerware Sets by Procurement Need",
    tags: [
      { label: "Hotel Table Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Retail Gift Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Coupe Dinner Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Stackable Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Private-Label Sets", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "How many pieces are in your dinnerware sets?",
      a: "We configure set composition to your spec — common formats include 12-, 16-, 18- and 30-piece sets pairing plates, bowls and mugs, with custom counts available for private-label ranges.",
    },
    {
      q: "Are the sets fully colour and glaze matched?",
      a: "Yes. All pieces in a set are produced from the same glaze batch program for a consistent colour and finish across plates, bowls and mugs, and stay consistent on reorder.",
    },
    {
      q: "What is the MOQ for wholesale dinnerware sets?",
      a: "Standard MOQ starts at 500 sets per design for stock ranges. Custom OEM/ODM sets generally start from 1,000–3,000 sets depending on composition, glaze and mold requirements.",
    },
    {
      q: "Can sets be customized and gift-packaged for retail?",
      a: "Yes. We offer custom glaze colours, decals or embossed logos, new mold development and retail-ready gift packaging designed for shelf and e-commerce presentation.",
    },
    {
      q: "Are your dinnerware sets dishwasher and microwave safe?",
      a: "Our ceramic dinnerware sets are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareServeDishes: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "serve-dishes",
  label: "Serve Dishes",
  productCategorySlugs: ["oval-serving-plates", "serve-dishes", "serving-dishes"],
  keyword: "serve dishes",
  h1: "Wholesale Ceramic Serve Dishes & Platters for Buffet & Banquet Service",
  metaTitle: "Wholesale Ceramic Serve Dishes | Bulk Platters & Serving Bowls",
  metaDescription:
    "Oven-to-table ceramic serve dishes and platters direct from a Chaozhou factory. Oval platters, serving bowls and buffet dishes for restaurants, hotels and caterers. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale serve dishes, ceramic platters bulk, serving bowls supplier, buffet dishes factory, oval serving plates OEM",
  bannerImage: "/ceramic-plates-for-catering-service.webp",
  intro:
    "ADA Ceramics supplies oven-to-table ceramic serve dishes, oval platters and serving bowls for buffet, banquet and family-style service. High-temperature fired for thermal-shock resistance and a refined glaze finish, our serving pieces move cleanly from kitchen to table and present beautifully, with low MOQs and full OEM/ODM branding.",
  seo: {
    h2: "Oven-to-Table Wholesale Serve Dishes for Volume Presentation",
    procurementScenario:
      "Restaurants, hotels and caterers need serving pieces that present large-format dishes attractively and survive constant buffet and banquet service. Our ceramic serve dishes, platters and serving bowls are high-temperature fired for thermal-shock resistance and a smooth, stain-resistant glaze, moving from oven or fridge to table without crazing. A coordinated range of oval, round and rectangular formats lets buyers build a consistent serving program for buffets, family-style menus and banquet plating.",
    customService:
      "As a full OEM/ODM manufacturer we customize platter dimensions and depth, rim profile, glaze colour, embossed or printed logos and packaging. Send artwork for branded serveware, match a signature glaze, or commission new mold development for exclusive presentation pieces. Low minimum order quantities let buyers trial new ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every serve dish order is produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need everyday plates and bowls too? Browse our Plates, Bowls and Dinnerware Sets sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Serve Dishes by Procurement Need",
    tags: [
      { label: "Oval Platters", href: "/dinnerware/serve-dishes" },
      { label: "Buffet Serving Bowls", href: "/dinnerware/serve-dishes" },
      { label: "Banquet Platters", href: "/dinnerware/serve-dishes" },
      { label: "Family-Style Dishes", href: "/dinnerware/serve-dishes" },
      { label: "Custom Branded Serveware", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your serve dishes oven and thermal-shock safe?",
      a: "Yes. Our serve dishes and platters are high-temperature fired and thermal-tested, moving from oven or fridge to table without crazing under normal professional use.",
    },
    {
      q: "What shapes and sizes of serve dishes do you offer?",
      a: "We supply oval, round and rectangular platters and serving bowls across buffet and banquet sizes, with custom dimensions available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale serve dishes?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM serveware generally starts from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can serveware be customized with our brand or colours?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, dimension changes and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your serve dishes dishwasher safe?",
      a: "Our ceramic serve dishes are dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for international markets.",
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
  "dinnerware/plates": dinnerwarePlates,
  "dinnerware/bowls": dinnerwareBowls,
  "dinnerware/dinnerware-sets": dinnerwareSets,
  "dinnerware/serve-dishes": dinnerwareServeDishes,
}

/** 取某个 L2 配置 */
export function getL2Config(parentSlug: string, slug: string): L2Config | undefined {
  return L2_CONFIGS[`${parentSlug}/${slug}`]
}

/** 取某个 L1 Silo 下全部 L2 配置（用于横向兄弟跳转 + 静态参数生成） */
export function getL2ConfigsByParent(parentSlug: string): L2Config[] {
  return Object.values(L2_CONFIGS).filter((c) => c.parentSlug === parentSlug)
}
