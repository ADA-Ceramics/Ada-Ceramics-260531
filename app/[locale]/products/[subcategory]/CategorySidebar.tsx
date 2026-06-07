"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface ChildCategory {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
  children: ChildCategory[]
}

interface CategorySidebarProps {
  locale: string
  categoryTree: Category[]
  currentParentId?: string
  currentChildId?: string
}

export function CategorySidebar({ locale, categoryTree, currentParentId, currentChildId }: CategorySidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(categoryTree.map(c => c.id))

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-28 bg-[#f9fafb] rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4 pb-3 border-b">Product Categories</h2>
        <nav className="space-y-1">
          {categoryTree.map(cat => {
            const isOpen = expanded.includes(cat.id)
            const isActive = currentParentId === cat.id && !currentChildId
            return (
              <div key={cat.id}>
                <div className="flex items-center">
                  <button onClick={() => setExpanded(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id])} className="p-1 hover:bg-[#e5e1db] rounded">
                    <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                  </button>
                  <Link href={`/${locale}/products/${cat.slug}`} className={`flex-1 py-2 px-2 text-sm rounded ${isActive ? "text-[#8b7355] bg-[#8b7355]/10 font-medium" : "text-[#1a1a1a] hover:bg-[#f5f3ef]"}`}>{cat.name}</Link>
                </div>
                {isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {cat.children.map(ch => {
                      const active = currentChildId === ch.id
                      return (
                        <Link key={ch.id} href={`/${locale}/products/${ch.slug}`} className={`block py-2 px-3 text-sm rounded ${active ? "text-[#8b7355] bg-[#8b7355]/10 font-medium" : "text-[#6b7280] hover:bg-[#f5f3ef]"}`}>{ch.name}</Link>
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
