import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Layers, ShieldCheck, Settings, Zap, Check, Package, MessageCircle } from "lucide-react"
import { getProductBySlug, getProductsByCategory } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"

// ============================================================
// 1. 服务端 Metadata（SEO 友好）
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
// 2. 静态数据
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
// 3. 页面主体（服务端渲染）
// ============================================================
export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, subcategory, slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  // 合并所有图片（主图 + 细节图）
  const allImages = [
    {
      url: product.main_image,
      alt: product.main_image_alt || product.name
    },
    ...(product.gallery_images || []).map((url: string, index: number) => ({
      url,
      alt: product.gallery_images_alt?.[index] || `${product.name} - detail ${index + 1}`
    })),
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

  // JSON-LD（SEO 结构化数据）
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
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
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 py-4">
              {sellingPoints.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-[#8b7355] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-[#1a1a1a]">{p.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

              {/* 图片区域（静态渲染 + 纯HTML 实现图片切换，无 use client） */}
              <div className="space-y-4">
                <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
                  <Image
                    src={allImages[0]?.url}
                    alt={allImages[0]?.alt || product.name}
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
                      className="w-20 h-20 flex-shrink-0 rounded border border-[#8b7355] overflow-hidden cursor-pointer"
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
                  <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] mb-3">
                    {product.name}
                  </h1>
                  <p className="text-sm text-[#6b7280]">SKU: {product.id}</p>
                </div>

                {product.description && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Product Description</h2>
                    <p className="text-[#4b5563] leading-relaxed">{product.description}</p>
                  </div>
                )}

                {features.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Key Features</h2>
                    <ul className="space-y-2">
                      {features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#8b7355] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4b5563]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Object.keys(specifications).length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Specifications</h2>
                    <div className="bg-[#f9fafb] rounded-lg p-4">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {Object.entries(specifications).map(([key, value]) => (
                          <div key={key} className="contents">
                            <dt className="text-[#6b7280]">{key}</dt>
                            <dd className="text-[#1a1a1a] font-medium">{value as string}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="#quote-form"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Request a Quote
                  </Link>
                  <Link
                    href={`/${locale}/products/${subcategory}`}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#8b7355] border border-[#8b7355] rounded-md hover:bg-[#8b7355] hover:text-white transition-colors"
                  >
                    View More Products
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e5e7eb]">
                  {sellingPoints.map((point) => {
                    const IconComponent = point.icon
                    return (
                      <div key={point.title} className="text-center">
                        <IconComponent className="w-6 h-6 text-[#8b7355] mx-auto mb-1" strokeWidth={1.5} />
                        <p className="text-xs font-medium text-[#1a1a1a]">{point.title}</p>
                        <p className="text-xs text-[#6b7280]">{point.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* SEO Content */}
            <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
              <h2 className="text-xl font-serif font-normal text-[#1a1a1a] mb-4">
                Why Choose ADA Ceramics for Wholesale {categoryName}?
              </h2>
              <div className="prose prose-sm max-w-none text-[#4b5563]">
                <p>
                  As a leading ceramic tableware manufacturer in China, ADA Ceramics specializes in producing
                  high-quality {categoryName.toLowerCase()} for the global hospitality industry.
                </p>
                <p className="mt-3">
                  All our ceramic products are FDA and LFGB certified, ensuring they meet the highest food
                  safety standards. We offer competitive factory-direct pricing with flexible MOQ options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-normal text-[#1a1a2e] mb-3">
                  Related Products
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore more wholesale {categoryName.toLowerCase()} from our collection.
                  All products are FDA/LFGB certified with factory-direct pricing.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/${locale}/products/${subcategory}/${relatedProduct.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={relatedProduct.main_image || "/alice.webp"}
                        alt={`${relatedProduct.name} - Wholesale ceramic tableware`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-[#1a1a2e] line-clamp-2 group-hover:text-[#8b7355] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.min_order_quantity && (
                        <p className="text-xs text-muted-foreground mt-1">
                          MOQ: {relatedProduct.min_order_quantity} pcs
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  href={`/${locale}/products/${currentParent.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[#8b7355] border border-[#8b7355] rounded-lg hover:bg-[#8b7355] hover:text-white transition-colors"
                >
                  View All {currentParent.name}
                  <ChevronRight className="w-4 h-4" />
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
    </>
  )
}
