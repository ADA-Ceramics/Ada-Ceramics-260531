import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Package, Layers, ShieldCheck, Settings, Zap } from "lucide-react"
import { getProductsByCategory, getAllProducts } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "./CategorySidebar"

// ============================================================
// 动态 Metadata
// ============================================================
interface PageProps {
  params: Promise<{ locale: string; subcategory: string }>
}

// 分类内容配置
const subcategoryContent: Record<string, { title: string; description: string }> = {
  "plates": {
    title: "Wholesale Ceramic Plates For Bulk Food Service",
    description: "We supply durable, food-safe dinner plates, soup plates and serving platters for restaurants and caterers. All products meet FDA/LFGB standards with custom designs available."
  },
  "dinner-plates": {
    title: "Wholesale Dinner Plates | Bulk Ceramic Tableware",
    description: "Premium quality ceramic dinner plates for restaurants, hotels and catering businesses. Available in various sizes, shapes and designs with low MOQ and fast delivery."
  },
  "dessert-side-plates": {
    title: "Wholesale Dessert & Side Plates | Ceramic Tableware",
    description: "Elegant dessert and side plates perfect for appetizers, salads and pastries. Food-safe ceramic with custom branding options."
  },
  "soup-plates": {
    title: "Wholesale Soup Plates | Deep Ceramic Bowls",
    description: "Deep soup plates ideal for soups, pasta and risotto service. Durable ceramic construction with professional-grade quality."
  },
  "oval-serving-plates": {
    title: "Wholesale Oval & Serving Platters | Ceramic",
    description: "Large oval platters and serving dishes for family-style dining and buffet service. Available in multiple sizes."
  },
  "bowls": {
    title: "Wholesale Ceramic Bowls For Commercial Use",
    description: "High-quality ceramic bowls for soup, salad, ramen and snacks. Perfect for restaurants, hotels and food service businesses."
  },
  "soup-bowls": {
    title: "Wholesale Soup Bowls | Ceramic Restaurant Ware",
    description: "Deep ceramic soup bowls designed for commercial food service. Stackable, chip-resistant and dishwasher safe."
  },
  "salad-bowls": {
    title: "Wholesale Salad Bowls | Fresh Food Service",
    description: "Versatile ceramic salad bowls in various sizes for fresh food presentation. Ideal for restaurants and cafes."
  },
  "ramen-bowls": {
    title: "Wholesale Ramen Bowls | Asian Restaurant Supply",
    description: "Traditional-style ramen bowls perfect for noodle dishes and Asian cuisine. Large capacity with authentic designs."
  },
  "snack-bowls": {
    title: "Wholesale Snack Bowls | Small Ceramic Dishes",
    description: "Compact snack and dipping bowls for appetizers and condiments. Perfect for tapas and shared dining."
  },
  "dinnerware-sets": {
    title: "Wholesale Dinnerware Sets | Complete Tableware Collections",
    description: "Complete ceramic dinnerware sets for daily use and professional catering. Coordinated designs with plates and bowls."
  },
  "daily-tableware-sets": {
    title: "Wholesale Daily Tableware Sets | Home & Hospitality",
    description: "Everyday dinnerware sets for hotels, B&Bs and retail. Durable ceramic construction with elegant designs."
  },
  "restaurant-catering-sets": {
    title: "Wholesale Restaurant & Catering Sets | Professional Grade",
    description: "Commercial-grade dinnerware sets designed for high-volume restaurant and catering use."
  },
  "cups-mugs": {
    title: "Wholesale Ceramic Cups & Mugs | Coffee Service",
    description: "Premium ceramic mugs and coffee cups for cafes, restaurants and corporate gifting."
  },
  "ceramic-mugs": {
    title: "Wholesale Ceramic Mugs | Custom Branded Drinkware",
    description: "Classic ceramic mugs perfect for coffee shops, offices and promotional merchandise."
  },
  "coffee-cups-saucers": {
    title: "Wholesale Coffee Cups & Saucers | Espresso Sets",
    description: "Elegant coffee cup and saucer sets for cafes and fine dining. Espresso, cappuccino and latte sizes."
  },
  "water-cups": {
    title: "Wholesale Water Cups | Ceramic Drinkware",
    description: "Simple and elegant ceramic water cups for restaurants and hospitality."
  },
  "bakeware": {
    title: "Wholesale Ceramic Bakeware | Oven-Safe Dishes",
    description: "Professional ceramic bakeware for commercial kitchens and retail. Oven-safe, freezer-safe."
  },
  "baking-dishes": {
    title: "Wholesale Baking Dishes | Ceramic Casserole Pans",
    description: "Versatile ceramic baking dishes for casseroles, lasagna and roasted dishes."
  },
  "ramekins": {
    title: "Wholesale Ramekins | Individual Baking Cups",
    description: "Classic ceramic ramekins for soufflés, crème brûlée and individual portions."
  },
  "pie-pizza-plates": {
    title: "Wholesale Pie & Pizza Plates | Ceramic Baking",
    description: "Ceramic pie plates and pizza stones for bakeries and restaurants."
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subcategory } = await params
  const content = subcategoryContent[subcategory] || {
    title: `Wholesale ${subcategory} | Ceramic Tableware`,
    description: `High-quality ceramic ${subcategory} for restaurants and hotels. Factory direct with low MOQ.`
  }
  
  return {
    title: `${content.title} | ADA Ceramics`,
    description: content.description,
    keywords: `wholesale ${subcategory}, ceramic ${subcategory}, bulk tableware, restaurant supplies`,
  }
}

// ============================================================
// 静态数据
// ============================================================

const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: ShieldCheck, title: "FDA/LFGB Certified" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

// 分类树
const categoryTree = [
  {
    id: "plates", name: "Wholesale Plates", slug: "plates",
    children: [
      { id: "dinner-plates", name: "Dinner Plates", slug: "dinner-plates" },
      { id: "dessert-side-plates", name: "Dessert & Side Plates", slug: "dessert-side-plates" },
      { id: "soup-plates", name: "Soup Plates", slug: "soup-plates" },
      { id: "oval-serving-plates", name: "Oval & Serving Plates", slug: "oval-serving-plates" },
    ],
  },
  {
    id: "bowls", name: "Wholesale Bowls", slug: "bowls",
    children: [
      { id: "soup-bowls", name: "Soup Bowls", slug: "soup-bowls" },
      { id: "salad-bowls", name: "Salad Bowls", slug: "salad-bowls" },
      { id: "ramen-bowls", name: "Ramen Bowls", slug: "ramen-bowls" },
      { id: "snack-bowls", name: "Snack Bowls", slug: "snack-bowls" },
    ],
  },
  {
    id: "dinnerware-sets", name: "Wholesale Dinnerware Sets", slug: "dinnerware-sets",
    children: [
      { id: "daily-tableware-sets", name: "Daily Tableware Sets", slug: "daily-tableware-sets" },
      { id: "restaurant-catering-sets", name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets" },
    ],
  },
  {
    id: "cups-mugs", name: "Wholesale Cups & Mugs", slug: "cups-mugs",
    children: [
      { id: "ceramic-mugs", name: "Ceramic Mugs", slug: "ceramic-mugs" },
      { id: "coffee-cups-saucers", name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers" },
      { id: "water-cups", name: "Water Cups", slug: "water-cups" },
    ],
  },
  {
    id: "bakeware", name: "Wholesale Bakeware", slug: "bakeware",
    children: [
      { id: "baking-dishes", name: "Baking Dishes", slug: "baking-dishes" },
      { id: "ramekins", name: "Ramekins", slug: "ramekins" },
      { id: "pie-pizza-plates", name: "Pie & Pizza Plates", slug: "pie-pizza-plates" },
    ],
  },
]

// ============================================================
// 页面组件
// ============================================================
export default async function SubcategoryPage({ params }: PageProps) {
  const { locale, subcategory } = await params

  // 查找当前分类信息
  const findCurrentCategory = () => {
    for (const parent of categoryTree) {
      if (parent.slug === subcategory) {
        return { parent, child: null }
      }
      const child = parent.children.find(c => c.slug === subcategory)
      if (child) {
        return { parent, child }
      }
    }
    return { parent: categoryTree[0], child: null }
  }

  const { parent: currentParent, child: currentChild } = findCurrentCategory()
  const displayName = currentChild?.name || currentParent?.name || "All Products"

  // ✅ 直接获取分类 + 子分类产品
  let products = await getProductsByCategory(subcategory)

  // 容错：如果为空，获取所有产品再过滤
  if (products.length === 0) {
    const allProducts = await getAllProducts()
    products = allProducts.filter(p => p.category_slug === subcategory)
  }

  // 获取当前分类的标题和描述
  const currentContent = subcategoryContent[subcategory] || {
    title: `Wholesale ${displayName} | Ceramic Tableware`,
    description: `High-quality ceramic ${displayName.toLowerCase()} for restaurants, hotels and catering businesses. Factory direct with low MOQ and custom designs available.`
  }

  // 占位数据
  const displayProducts = products.length > 0 ? products : [
    { id: "1", name: "Classic Round Plate", slug: "classic-round-plate", main_image: null },
    { id: "2", name: "Elegant Rim Plate", slug: "elegant-rim-plate", main_image: null },
    { id: "3", name: "Coupe Style Plate", slug: "coupe-style-plate", main_image: null },
    { id: "4", name: "Square Modern Plate", slug: "square-modern-plate", main_image: null },
    { id: "5", name: "Oval Serving Platter", slug: "oval-serving-platter", main_image: null },
    { id: "6", name: "Deep Soup Plate", slug: "deep-soup-plate", main_image: null },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            {currentChild ? (
              <>
                <Link href={`/${locale}/products/${currentParent.slug}`} className="hover:text-foreground transition-colors">
                  {currentParent.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{currentChild.name}</span>
              </>
            ) : (
              <span className="text-foreground">{displayName}</span>
            )}
          </nav>

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            {currentContent.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 max-w-4xl">
            {currentContent.description}
          </p>

          {/* Selling Points */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {sellingPoints.map((point) => {
              const IconComponent = point.icon
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-3">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{point.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Two Column Layout */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar - Category Tree */}
            <CategorySidebar
              locale={locale}
              categoryTree={categoryTree}
              currentParentId={currentParent?.id}
              currentChildId={currentChild?.id}
            />

            {/* Right Content - Product Grid */}
            <main className="flex-1">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#1a1a1a] mb-2">
                  {displayName}
                </h2>
                <p className="text-[#6b7280]">
                  Showing {displayProducts.length} products
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayProducts.map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${subcategory}/${product.slug}`}
                    className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square relative bg-[#f9fafb]">
                      {product.main_image ? (
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#9ca3af]">
                          <Package className="w-16 h-16 opacity-30" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-medium text-[#1a1a1a] mb-4 group-hover:text-[#8b7355] transition-colors">
                        {product.name}
                      </h3>
                      <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md group-hover:bg-[#6d5a43] transition-colors">
                        View Details
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-10 text-center">
                <button className="px-6 py-3 text-sm font-medium text-[#8b7355] border border-[#8b7355] rounded-md hover:bg-[#8b7355] hover:text-white transition-colors">
                  Load More Products
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
