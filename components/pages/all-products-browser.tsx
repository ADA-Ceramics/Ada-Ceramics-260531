"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Package, SlidersHorizontal, X } from "lucide-react"
import {
  PRODUCT_CATEGORY_TREE,
  categoryMatches,
  findCategoryNode,
  type MatchableProduct,
} from "@/lib/silo/category-tree"
import { ProductCategoryTree } from "@/components/silo/ProductCategoryTree"

export type BrowserProduct = MatchableProduct & {
  id: string
  name: string
  main_image: string | null
  /** 卡片跳转地址（已含 locale 前缀） */
  href: string
}

interface AllProductsBrowserProps {
  products: BrowserProduct[]
}

export function AllProductsBrowser({ products }: AllProductsBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!selectedCategory) return products
    const node = findCategoryNode(selectedCategory)
    if (!node) return products
    return products.filter((p) => categoryMatches(node, p))
  }, [products, selectedCategory])

  const activeLabel = selectedCategory ? findCategoryNode(selectedCategory)?.label : null

  return (
    <section translate="no" className="notranslate py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] mb-2 text-balance">
            Browse by Product Category
          </h2>
          <p className="text-muted-foreground">
            Select a category on the left to instantly filter our full ceramic range.
          </p>
        </div>

        {/* 移动端分类开关 */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() => setMobileFiltersOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium bg-white"
            aria-expanded={mobileFiltersOpen}
          >
            {mobileFiltersOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{mobileFiltersOpen ? "Hide Categories" : "Browse Categories"}</span>
            {selectedCategory && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8b7355] text-white text-[10px]">
                1
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧分类树 */}
          <aside className="w-full lg:w-64 shrink-0">
            <div
              className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block bg-white rounded-xl border border-border p-5 lg:sticky lg:top-28`}
            >
              <ProductCategoryTree
                tree={PRODUCT_CATEGORY_TREE}
                selectedId={selectedCategory}
                onSelect={(id) => {
                  setSelectedCategory(id)
                  setMobileFiltersOpen(false)
                }}
              />
            </div>
          </aside>

          {/* 右侧产品网格 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                {activeLabel && (
                  <span className="text-[#1a1a1a] font-medium">{activeLabel}: </span>
                )}
                <span>{`${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}</span>
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square bg-[#f9fafb] overflow-hidden relative">
                      {product.main_image ? (
                        <img
                          src={product.main_image || "/placeholder.svg"}
                          alt={`Wholesale ceramic ${product.name} for Horeca bulk buyers`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#9ca3af]">
                          <Package className="w-14 h-14 opacity-30" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5">
                      <h3 className="text-sm sm:text-base font-medium text-[#1a1a1a] mb-3 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">MOQ: 500 pcs</span>
                        <span className="text-xs font-semibold text-[#8b7355]">View Collection</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-white p-10 text-center">
                <Package className="w-12 h-12 mx-auto text-[#8b7355]/40 mb-4" aria-hidden="true" />
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No products match this category yet. Select another category to keep browsing.
                </p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  View All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
