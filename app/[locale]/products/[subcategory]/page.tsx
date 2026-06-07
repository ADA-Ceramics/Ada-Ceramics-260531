import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Package, Layers, ShieldCheck, Settings, Zap } from "lucide-react"
import { getProductsByCategory, getCategoryTree, getCategoryBySlug } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "./CategorySidebar"

interface PageProps {
  params: Promise<{ locale: string; subcategory: string }>
}

const subcategoryContent: Record<string, { title: string; description: string }> = {
  "plates": { title: "Wholesale Ceramic Plates For Bulk Food Service", description: "We supply durable, food-safe dinner plates, soup plates and serving platters for restaurants and caterers." },
  "dinner-plates": { title: "Wholesale Dinner Plates | Bulk Ceramic Tableware", description: "Premium quality ceramic dinner plates for restaurants, hotels and catering businesses." },
  "dessert-side-plates": { title: "Wholesale Dessert & Side Plates | Ceramic Tableware", description: "Elegant dessert and side plates perfect for appetizers, salads and pastries." },
  "soup-plates": { title: "Wholesale Soup Plates | Deep Ceramic Bowls", description: "Deep soup plates ideal for soups, pasta and risotto service." },
  "oval-serving-plates": { title: "Wholesale Oval & Serving Platters | Ceramic", description: "Large oval platters and serving dishes for family-style dining and buffet service." },
  "bowls": { title: "Wholesale Ceramic Bowls For Commercial Use", description: "High-quality ceramic bowls for soup, salad, ramen and snacks." },
  "soup-bowls": { title: "Wholesale Soup Bowls | Ceramic Restaurant Ware", description: "Deep ceramic soup bowls designed for commercial food service." },
  "salad-bowls": { title: "Wholesale Salad Bowls | Fresh Food Service", description: "Versatile ceramic salad bowls in various sizes for fresh food presentation." },
  "ramen-bowls": { title: "Wholesale Ramen Bowls | Asian Restaurant Supply", description: "Traditional-style ramen bowls perfect for noodle dishes and Asian cuisine." },
  "snack-bowls": { title: "Wholesale Snack Bowls | Small Ceramic Dishes", description: "Compact snack and dipping bowls for appetizers and condiments." },
  "dinnerware-sets": { title: "Wholesale Dinnerware Sets | Complete Tableware Collections", description: "Complete ceramic dinnerware sets for daily use and professional catering." },
  "daily-tableware-sets": { title: "Wholesale Daily Tableware Sets | Home & Hospitality", description: "Everyday dinnerware sets for hotels, B&Bs and retail." },
  "restaurant-catering-sets": { title: "Wholesale Restaurant & Catering Sets | Professional Grade", description: "Commercial-grade dinnerware sets designed for high-volume restaurant and catering use." },
  "cups-mugs": { title: "Wholesale Ceramic Cups & Mugs | Coffee Service", description: "Premium ceramic mugs and coffee cups for cafes, restaurants and corporate gifting." },
  "ceramic-mugs": { title: "Wholesale Ceramic Mugs | Custom Branded Drinkware", description: "Classic ceramic mugs perfect for coffee shops, offices and promotional merchandise." },
  "coffee-cups-saucers": { title: "Wholesale Coffee Cups & Saucers | Espresso Sets", description: "Elegant coffee cup and saucer sets for cafes and fine dining." },
  "water-cups": { title: "Wholesale Water Cups | Ceramic Drinkware", description: "Simple and elegant ceramic water cups for restaurants and hospitality." },
  "bakeware": { title: "Wholesale Ceramic Bakeware | Oven-Safe Dishes", description: "Professional ceramic bakeware for commercial kitchens and retail." },
  "baking-dishes": { title: "Wholesale Baking Dishes | Ceramic Casserole Pans", description: "Versatile ceramic baking dishes for casseroles, lasagna and roasted dishes." },
  "ramekins": { title: "Wholesale Ramekins | Individual Baking Cups", description: "Classic ceramic ramekins for soufflés, crème brûlée and individual portions." },
  "pie-pizza-plates": { title: "Wholesale Pie & Pizza Plates | Ceramic Baking", description: "Ceramic pie plates and pizza stones for bakeries and restaurants." },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subcategory } = await params
  const content = subcategoryContent[subcategory] || { title: `Wholesale ${subcategory}`, description: `High-quality ceramic ${subcategory} for restaurants.` }
  return { title: `${content.title} | ADA Ceramics`, description: content.description }
}

const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: ShieldCheck, title: "FDA/LFGB Certified" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

export default async function SubcategoryPage({ params }: PageProps) {
  const { locale, subcategory } = await params
  const categoryTree = await getCategoryTree()
  const currentCat = await getCategoryBySlug(subcategory)
  const products = await getProductsByCategory(subcategory)

  const findCurrent = () => {
    for (const p of categoryTree) {
      if (p.slug === subcategory) return { parent: p, child: null }
      const c = p.children.find(ch => ch.slug === subcategory)
      if (c) return { parent: p, child: c }
    }
    return { parent: categoryTree[0], child: null }
  }

  const { parent: currentParent, child: currentChild } = findCurrent()
  const displayName = currentChild?.name || currentParent?.name || "Products"
  const currentContent = subcategoryContent[subcategory] || { title: `Wholesale ${displayName}`, description: `High-quality ceramic ${displayName.toLowerCase()} for restaurants.` }

  const displayProducts = products.length > 0 ? products : [
    { id: "1", name: "Classic Round Plate", slug: "classic-round-plate", main_image: null },
    { id: "2", name: "Elegant Rim Plate", slug: "elegant-rim-plate", main_image: null },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-8 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`}>Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`}>Products</Link>
            {currentChild && <>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${locale}/products/${currentParent.slug}`}>{currentParent.name}</Link>
            </>}
            <ChevronRight className="w-4 h-4" />
            <span>{displayName}</span>
          </nav>
          <h1 className="text-3xl font-serif mb-4">{currentContent.title}</h1>
          <p className="text-muted-foreground mb-8">{currentContent.description}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {sellingPoints.map((p, i) => {
              const Icon = p.icon
              return <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-2">
                  <Icon className="w-7 h-7 text-[#8b7355]" />
                </div>
                <span className="text-sm font-medium">{p.title}</span>
              </div>
            })}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar
              locale={locale}
              categoryTree={categoryTree}
              currentParentId={currentParent?.id}
              currentChildId={currentChild?.id}
            />
            <main className="flex-1">
              <div className="mb-8">
                <h2 className="text-2xl font-serif mb-2">{displayName}</h2>
                <p className="text-[#6b7280]">Showing {displayProducts.length} products</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayProducts.map((product: any) => (
                  <Link key={product.id} href={`/${locale}/products/${subcategory}/${product.slug}`} className="group border rounded-lg hover:shadow-lg">
                    <div className="aspect-square bg-[#f9fafb] relative">
                      {product.main_image ? (
                        <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#9ca3af]">
                          <Package className="w-16 h-16 opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-medium mb-4 group-hover:text-[#8b7355]">{product.name}</h3>
                      <span className="px-4 py-2 text-sm bg-[#8b7355] text-white rounded-md">View Details</span>
                    </div>
                  </Link>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
