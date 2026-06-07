// app/[locale]/products/[subcategory]/[slug]/page.tsx
import { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Package } from "lucide-react"
import { getProductBySlug } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface PageProps {
  params: Promise<{
    locale: string
    subcategory: string
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  return {
    title: product?.name ? `${product.name} | ADA Ceramics` : "Product Details",
    description: product?.description || "Premium ceramic tableware",
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, subcategory, slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link
            href={`/${locale}/products/${subcategory}`}
            className="text-[#8b7355] hover:underline"
          >
            ← Back to Category
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* 返回按钮 */}
        <Link
          href={`/${locale}/products/${subcategory}`}
          className="inline-flex items-center text-sm text-[#8b7355] mb-8 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to {subcategory}
        </Link>

        {/* 产品详情 */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* 产品图片 */}
          <div className="aspect-square bg-[#f9fafb] rounded-lg overflow-hidden">
            {product.main_image ? (
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#9ca3af]">
                <Package className="w-24 h-24 opacity-20" />
              </div>
            )}
          </div>

          {/* 产品信息 */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>
            <div className="p-4 bg-[#f5f3ef] rounded-lg">
              <p className="text-sm text-gray-500">SKU: {product.id}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
