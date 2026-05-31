"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  children: { id: string; name: string; slug: string }[]
}

interface CategorySidebarProps {
  locale: string
  categoryTree: Category[]
  currentParentId?: string
  currentChildId?: string
}

export function CategorySidebar({ locale, categoryTree, currentParentId, currentChildId }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categoryTree.map(cat => cat.id) // 默认全部展开
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="lg:sticky lg:top-28 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4 pb-3 border-b border-[#e5e7eb]">
          Product Categories
        </h2>
        <nav className="space-y-1">
          {categoryTree.map((category) => {
            const isExpanded = expandedCategories.includes(category.id)
            const isParentActive = currentParentId === category.id

            return (
              <div key={category.id}>
                {/* Parent Category */}
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 hover:bg-[#e5e1db] rounded transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-[#6b7280] transition-transform ${
                        isExpanded ? "" : "-rotate-90"
                      }`}
                    />
                  </button>
                  <Link
                    href={`/${locale}/products/${category.slug}`}
                    className={`flex-1 py-2 px-2 text-sm font-medium rounded transition-colors ${
                      isParentActive && !currentChildId
                        ? "text-[#8b7355] bg-[#8b7355]/10"
                        : "text-[#1a1a1a] hover:text-[#8b7355] hover:bg-[#f5f3ef]"
                    }`}
                  >
                    {category.name}
                  </Link>
                </div>

                {/* Children */}
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.children.map((child) => {
                      const isChildActive = currentChildId === child.id
                      return (
                        <Link
                          key={child.id}
                          href={`/${locale}/products/${child.slug}`}
                          className={`block py-2 px-3 text-sm rounded transition-colors ${
                            isChildActive
                              ? "text-[#8b7355] bg-[#8b7355]/10 font-medium"
                              : "text-[#6b7280] hover:text-[#8b7355] hover:bg-[#f5f3ef]"
                          }`}
                        >
                          {child.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
