'use client'
import { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Layers, ShieldCheck, Settings, Zap, Check, Package, MessageCircle } from "lucide-react"
import { getProductBySlug, getProductsByCategory } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"

// ============================================================
// SEO Metadata
// ============================================================
interface PageProps {
  params: Promise<{ locale: string; subcategory: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale, subcategory } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | ADA Ceramics",
      description: "The requested product could not be found.",
    }
  }

  const seoTitle = `${product.name} | Wholesale Ceramic Tableware | ADA Ceramics`
  const seoDescription = product.description
    ? `${product.description.slice(0, 120)}... Factory direct pricing, low MOQ, FDA/LFGB certified. Request a quote today!`
    : `Wholesale ${product.name} from ADA Ceramics. Premium quality ceramic tableware for restaurants, hotels and catering.`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [product.name, "wholesale ceramic", "bulk tableware", "restaurant supplies", "hotel dinnerware"].join(", "),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: product.main_image ? [{ url: product.main_image, width: 800, height: 800, alt: product.main_image_alt || product.name }] : [],
    },
    alternates: {
      canonical: `https://adaceramics.com/${locale}/products/${subcategory}/${product.slug}`,
    },
  }
}

// ============================================================
// 静态数据
// ============================================================
const sellingPoints = [
  { icon: Layers, title: "Low MOQ", description: "From 100 pieces" },
  { icon: ShieldCheck, title: "FDA/LFGB Certified", description: "Food-safe quality" },
  { icon: Settings, title: "Custom OEM/ODM", description: "Your design welcome" },
  { icon: Zap, title: "Fast Delivery", description: "15-30 days" },
]

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
// 页面主体
// ============================================================
export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, subcategory, slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  // 合并所有图片，同时带上对应的 alt 文本（完全匹配你表结构）
  const allImages = [
    {
      url: product.main_image,
      alt: product.main_image_alt || product.name
    },
    ...(product.gallery_images || []).map((url: string, index: number) => ({
      url,
      alt: product.gallery_images_alt?.[index] || `${product.name} - detail ${index + 1}`
    }))
  ].filter(item => item.url)

  // 查找分类
  const findCurrentCategory = () => {
    for (const parent of categoryTree) {
      if (parent.slug === subcategory) return { parent, child: null }
      const child = parent.children.find(c => c.slug === subcategory)
      if (child) return { parent, child }
    }
    return { parent: categoryTree[0], child: null }
  }

  const { parent: currentParent, child: currentChild } = findCurrentCategory()
  const categoryName = currentChild?.name || currentParent?.name || "Products"

  // 相关产品
  const allCategoryProducts = await getProductsByCategory(currentParent.slug)
  const relatedProducts = allCategoryProducts
    .filter(p => p.slug !== product.slug)
    .slice(0, 5)

  const specifications = product.specifications || {}
  const features = product.features || []

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `Wholesale ${product.name} from ADA Ceramics`,
    image: product.main_image || "",
    sku: product.id,
    brand: { "@type": "Brand", name: "ADA Ceramics" },
    manufacturer: { "@type": "Organization", name: "ADA Ceramics", url: "https://adaceramics.com" },
    category: categoryName,
  }

  return (
    <ProductDetailUI
      locale={locale}
      subcategory={subcategory}
      product={product}
      allImages={allImages}
      categoryName={categoryName}
      currentParent={currentParent}
      currentChild={currentChild}
      relatedProducts={relatedProducts}
      specifications={specifications}
      features={features}
      jsonLd={jsonLd}
    />
  )
}

// ============================================================
// 客户端交互组件（图片切换）
// ============================================================
function ProductDetailUI(props: any) {
  const {
    locale, subcategory, product, allImages,
    categoryName, currentParent, currentChild,
    relatedProducts, specifications, features, jsonLd
  } = props

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-6 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href={`/${locale}`}>Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`}>Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products/${currentParent.slug}`}>{currentParent.name}</Link>
            {currentChild && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/${locale}/products/${currentChild.slug}`}>{currentChild.name}</Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 py-4">
            {sellingPoints.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#8b7355] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8b7355]" />
                  </div>
                  <span className="text-sm font-medium">{p.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 产品主体 */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* 图片区域 + 缩略图（适配你的表结构） */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
                <Image
                  src={allImages[selectedIndex]?.url}
                  alt={allImages[selectedIndex]?.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded border overflow-hidden cursor-pointer transition-all ${
                      selectedIndex === idx
                        ? 'border-[#8b7355] ring-2 ring-[#8b7355]/20'
                        : 'border-[#e5e7eb] hover:border-[#8b7355]/50'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#8b7355] font-medium mb-2">{categoryName}</p>
                <h1 className="text-2xl sm:text-3xl font-serif mb-3">{product.name}</h1>
                <p className="text-sm text-[#6b7280]">SKU: {product.id}</p>
              </div>

              {product.description && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Product Description</h2>
                  <p className="text-[#4b5563] leading-relaxed">{product.description}</p>
                </div>
              )}

              {features.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Key Features</h2>
                  <ul className="space-y-2">
                    {features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#8b7355] mt-0.5" />
                        <span className="text-[#4b5563]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Object.keys(specifications).length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Specifications</h2>
                  <div className="bg-[#f9fafb] rounded-lg p-4">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {Object.entries(specifications).map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="text-[#6b7280]">{k}</dt>
                          <dd className="font-medium">{v as string}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="#quote-form"
                  className="px-6 py-3 text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43]"
                >
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  Request a Quote
                </Link>
                <Link
                  href={`/${locale}/products/${subcategory}`}
                  className="px-6 py-3 text-[#8b7355] border border-[#8b7355] rounded-md hover:bg-[#8b7355] hover:text-white"
                >
                  View More Products
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
                {sellingPoints.map((p) => {
                  const Icon = p.icon
                  return (
                    <div key={p.title} className="text-center">
                      <Icon className="w-6 h-6 text-[#8b7355] mx-auto mb-1" />
                      <p className="text-xs font-medium">{p.title}</p>
                      <p className="text-xs text-[#6b7280]">{p.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-serif mb-4">Why Choose ADA Ceramics for Wholesale {categoryName}?</h2>
            <div className="prose prose-sm text-[#4b5563]">
              <p>As a leading ceramic tableware manufacturer in China, ADA Ceramics specializes in producing high-quality {categoryName.toLowerCase()} for the global hospitality industry.</p>
              <p className="mt-3">All our ceramic products are FDA and LFGB certified, ensuring they meet the highest food safety standards. We offer competitive factory-direct pricing with flexible MOQ options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif mb-3">Related Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Explore more wholesale {categoryName.toLowerCase()} from our collection. All products are FDA/LFGB certified with factory-direct pricing.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {relatedProducts.map((rp: any) => (
                <Link
                  key={rp.id}
                  href={`/${locale}/products/${subcategory}/${rp.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={rp.main_image || "/alice.webp"}
                      alt={rp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="50vw, 33vw, 20vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-[#8b7355]">{rp.name}</h3>
                    {rp.min_order_quantity && (
                      <p className="text-xs text-muted-foreground mt-1">MOQ: {rp.min_order_quantity} pcs</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/products/${currentParent.slug}`}
                className="px-6 py-3 text-[#8b7355] border border-[#8b7355] rounded-lg hover:bg-[#8b7355] hover:text-white"
              >
                View All {currentParent.name}
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div id="quote-form">
        <QuoteForm />
      </div>

      <Footer />
    </div>
  )
}
