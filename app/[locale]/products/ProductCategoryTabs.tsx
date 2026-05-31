"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Package } from "lucide-react"

interface CategoryTab {
  id: string
  name: string
}

interface CategoryProduct {
  name: string
  slug: string
  image: string
  alt?: string
}

interface ProductCategoryTabsProps {
  locale: string
  categoryTabs: CategoryTab[]
  categoryProducts: Record<string, CategoryProduct[]>
}

export function ProductCategoryTabs({ locale, categoryTabs, categoryProducts }: ProductCategoryTabsProps) {
  const [activeTab, setActiveTab] = useState("all")

  // 监听 URL hash 变化
  useEffect(() => {
    const hashToTabMap: Record<string, string> = {
      'all-products-section': 'all',
      'wholesale-plates-tab': 'plates',
      'wholesale-bowls-tab': 'bowls',
      'dinnerware-sets-tab': 'sets',
      'cups-mugs-tab': 'cups',
      'bakeware-tab': 'bakeware',
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && hashToTabMap[hash]) {
        setActiveTab(hashToTabMap[hash])
        setTimeout(() => {
          const element = document.getElementById('all-products-section')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const currentProducts = categoryProducts[activeTab] || []

  return (
    <section id="all-products-section" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div id="category-tabs" className="flex flex-wrap justify-center gap-2 mb-10 scroll-mt-24">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              id={`category-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-[#8b7355] text-white"
                  : "bg-[#f5f3ef] text-[#4b5563] hover:bg-[#e5e1db] hover:text-[#1a1a1a]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid - 跳转到二级分类页 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.slug}
              className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative bg-[#f9fafb]">
                <Image
                  src={product.image}
                  alt={product.alt || `${product.name} - wholesale ceramic tableware from China factory`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-[#1a1a1a] mb-4">
                  {product.name}
                </h3>
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
