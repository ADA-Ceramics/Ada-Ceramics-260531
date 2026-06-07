import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Layers, ShieldCheck, Settings, Zap, Check, Package, MessageCircle } from "lucide-react"
import { getProductBySlug, getProductsByCategory } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"
import ProductDetailUI from "./ProductDetailUI"

// ============================================================
// 1. 服务端 Metadata 生成（保留在主文件）
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
// 2. 静态数据（移到主文件，不影响）
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
// 3. 页面主体：只做数据请求，把渲染交给客户端组件
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
      sellingPoints={sellingPoints}
    />
  )
}
