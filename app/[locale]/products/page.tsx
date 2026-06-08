import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Package, Layers, Gift, Settings, Zap, Clock, Award, Truck } from "lucide-react"
import { getAllProducts } from "@/lib/supabase/products"
import { getCategoryCardsGrouped } from "@/lib/supabase/category-cards"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// ============================================================
// SEO Metadata
// ============================================================
export const metadata: Metadata = {
  title: "Wholesale Ceramic Tableware | Factory Direct Manufacturing | ADA Ceramics",
  description: "Professional ceramic factory supplying wholesale plates, bowls, mugs and bakeware. FDA/LFGB certified, low MOQ, custom OEM/ODM available. Factory direct pricing for global wholesalers.",
  keywords: "wholesale ceramic, bulk tableware, ceramic plates, ceramic bowls, ceramic mugs, restaurant supplies, hotel dinnerware, OEM ceramic, FDA certified",
  openGraph: {
    title: "Wholesale Ceramic Tableware | ADA Ceramics",
    description: "Factory direct ceramic tableware for restaurants, hotels and catering businesses.",
    type: "website",
  },
}

// ============================================================
// 静态数据
// ============================================================

// Selling points
const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: Gift, title: "Free Samples" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

// Category tabs 和产品数据
const categoryTabs = [
  { id: "all", name: "All Products" },
  { id: "plates", name: "Wholesale Plates" },
  { id: "bowls", name: "Wholesale Bowls" },
  { id: "sets", name: "Wholesale Dinnerware Sets" },
  { id: "cups", name: "Wholesale Cups & Mugs" },
  { id: "bakeware", name: "Wholesale Bakeware" },
]

// 静态分类产品（作为后备数据，当Supabase无数据时使用）
const fallbackCategoryProducts: Record<string, { name: string; slug: string; image: string; alt: string }[]> = {
  all: [
    { name: "Dinner Plates", slug: "dinner-plates", image: "/images/categories/dinner-plates.webp", alt: "Wholesale ceramic dinner plates" },
    { name: "Dessert & Side Plates", slug: "dessert-side-plates", image: "/images/categories/side-plates.webp", alt: "Ceramic dessert plates wholesale" },
    { name: "Soup Plates", slug: "soup-plates", image: "/images/categories/soup-plates.webp", alt: "Deep rim ceramic soup plates" },
    { name: "Oval & Serving Plates", slug: "oval-serving-plates", image: "/images/categories/oval-plates.webp", alt: "Large oval ceramic serving platters" },
    { name: "Soup Bowls", slug: "soup-bowls", image: "/images/categories/ceramic-soup-bowl.webp", alt: "Ceramic soup bowls wholesale" },
    { name: "Salad Bowls", slug: "salad-bowls", image: "/images/categories/ceramic-salad-bowl.webp", alt: "Large ceramic salad bowls" },
    { name: "Ramen Bowls", slug: "ramen-bowls", image: "/images/categories/ceramic-ramen-bowl.webp", alt: "Asian ceramic ramen bowls" },
    { name: "Snack Bowls", slug: "snack-bowls", image: "/images/categories/ceramic-snack-bowl.webp", alt: "Small ceramic snack bowls" },
    { name: "Daily Tableware Sets", slug: "daily-tableware-sets", image: "/images/categories/ceramic-daily-tableware-set.webp", alt: "Complete ceramic dinnerware sets" },
    { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", image: "/images/categories/ceramic-restaurant-catering-set.webp", alt: "Professional restaurant tableware sets" },
    { name: "Ceramic Mugs", slug: "ceramic-mugs", image: "/images/categories/ceramic-mug.webp", alt: "Custom ceramic coffee mugs wholesale" },
    { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", image: "/images/categories/ceramic-coffee-cup-saucer.webp", alt: "Elegant ceramic coffee cups with saucers" },
    { name: "Water Cups", slug: "water-cups", image: "/images/categories/ceramic-water-cup.webp", alt: "Ceramic water cups wholesale supplier" },
    { name: "Baking Dishes", slug: "baking-dishes", image: "/images/categories/ceramic-baking-dish.webp", alt: "Ceramic baking dishes wholesale" },
    { name: "Ramekins", slug: "ramekins", image: "/images/categories/ceramic-ramekin.webp", alt: "Small ceramic ramekins wholesale" },
    { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", image: "/images/categories/ceramic-pie-pizza-plate.webp", alt: "Ceramic pie and pizza plates wholesale" },
  ],
  plates: [
    { name: "Dinner Plates", slug: "dinner-plates", image: "/images/categories/dinner-plates.webp", alt: "Wholesale ceramic dinner plates" },
  ],
  bowls: [
    { name: "Soup Bowls", slug: "soup-bowls", image: "/images/categories/ceramic-soup-bowl.webp", alt: "Ceramic soup bowls wholesale" },
  ],
  sets: [
    { name: "Daily Tableware Sets", slug: "daily-tableware-sets", image: "/images/categories/ceramic-daily-tableware-set.webp", alt: "Complete ceramic dinnerware sets" },
  ],
  cups: [
    { name: "Ceramic Mugs", slug: "ceramic-mugs", image: "/images/categories/ceramic-mug.webp", alt: "Custom ceramic coffee mugs wholesale" },
  ],
  bakeware: [
    { name: "Baking Dishes", slug: "baking-dishes", image: "/images/categories/ceramic-baking-dish.webp", alt: "Ceramic baking dishes wholesale" },
  ],
}

// Business solutions
const businessSolutions = [
  { title: "Hotel & Restaurant Bulk Supplies", href: "/en/products", image: "/porcelain-tableware-for-hotel-restore.webp", alt: "Hotel tableware" },
  { title: "Amazon & Retail Packaging", href: "/en/products", image: "/amazon-hotsell-ceramic.webp", alt: "Retail ceramic" },
  { title: "Wedding & Event Catering", href: "/en/products", image: "/ceramic-plates-for-catering-service.webp", alt: "Catering plates" },
  { title: "Custom Corporate Gifting", href: "/en/custom-oem-odm", image: "/ceramic-gift-mug.webp", alt: "Gift mugs" },
]

// Why choose us
const whyChooseUs = [
  { icon: Clock, title: "30+ Years Export to EU/US", href: "/about-us" },
  { icon: Award, title: "FDA/LFGB Certified", href: "/en/products" },
  { icon: Package, title: "Flexible MOQ & Fast Samples", href: "/en/custom-oem-odm" },
  { icon: Truck, title: "45-50Day On-Time Delivery", href: "/en/products" },
]

// FAQ
const faqItems = [
  { question: "Do your products meet FDA (US) and LFGB (EU)?", answer: "Yes, all pass FDA & LFGB tests." },
  { question: "Microwave & dishwasher safe?", answer: "Yes, except gold trim items." },
  { question: "Sample & production time?", answer: "Sample 10-15 days, production 45-55 days." },
  { question: "Custom design & MOQ?", answer: "Yes, MOQ 500-1000pcs." },
  { question: "Packaging & reports?", answer: "Safe export packing, test reports available." },
]

// ============================================================
// 页面组件
// ============================================================
interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params
  const products = await getAllProducts()
  const supabaseCategoryCards = await getCategoryCardsGrouped()
  const categoryProducts = supabaseCategoryCards.all.length > 0 ? supabaseCategoryCards : fallbackCategoryProducts

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Products</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-serif mb-4">Wholesale Ceramic Tableware</h1>
          <p className="text-muted-foreground mb-8 max-w-4xl">Professional ceramic factory supplying wholesale tableware.</p>

          <div className="flex flex-wrap justify-center gap-8">
            {sellingPoints.map((point) => {
              const Icon = point.icon
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-3">
                    <Icon className="w-7 h-7 text-[#8b7355]" />
                  </div>
                  <span className="text-sm font-medium">{point.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== 核心修复：一行标签 + 右侧按钮 ===================== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* 分类标签（可横向滚动） */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors whitespace-nowrap"
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Custom Solutions 按钮（固定右侧，必显示） */}
            <Link
              href="/oem-odm"
              className="flex-shrink-0 px-5 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Custom Solutions
            </Link>
          </div>

          {/* 产品卡片（和标签对齐） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.all.map((item) => (
              <Link key={item.slug} href={`/${locale}/products/${item.slug}`} className="group rounded-lg overflow-hidden border hover:shadow-md">
                <div className="aspect-[4/3] relative bg-[#f5f3ef]">
                  <Image src={item.image} alt={item.alt} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium group-hover:text-[#8b7355]">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ====================================================================== */}

      {/* Solutions For Your Business */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs uppercase tracking-widest mb-2">BUSINESS SOLUTIONS</p>
            <h2 className="font-serif text-3xl">Solutions For Your Business</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSolutions.map((item) => (
              <Link key={item.title} href={item.href} className="group border rounded-lg overflow-hidden hover:shadow-md">
                <div className="aspect-[4/3] relative bg-[#f5f3ef]">
                  <Image src={item.image} alt={item.alt} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium group-hover:text-[#8b7355]">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs uppercase tracking-widest mb-2">OUR ADVANTAGES</p>
            <h2 className="font-serif text-3xl">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.title} href={item.href} className="group flex flex-col items-center text-center p-6 border rounded-lg hover:border-[#8b7355]/30">
                  <div className="w-14 h-14 bg-[#f5f3ef] rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#8b7355]" />
                  </div>
                  <h3 className="text-base font-medium group-hover:text-[#8b7355]">{item.title}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="font-serif text-3xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <QuoteForm />
      <Footer />
    </div>
  )
}
