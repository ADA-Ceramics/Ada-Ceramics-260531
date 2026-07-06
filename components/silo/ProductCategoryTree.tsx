"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { CategoryNode } from "@/lib/silo/category-tree"

interface ProductCategoryTreeProps {
  tree: CategoryNode[]
  /** 当前选中节点 id（null 表示全部） */
  selectedId: string | null
  /** 点击分类回调 —— 纯前端过滤，无跳转 */
  onSelect: (id: string | null) => void
  /** 默认展开的父节点 id 列表 */
  defaultExpanded?: string[]
  title?: string
}

export function ProductCategoryTree({
  tree,
  selectedId,
  onSelect,
  defaultExpanded,
  title = "Product Categories",
}: ProductCategoryTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded ?? tree.map((n) => n.id)),
  )

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <nav aria-label={title} className="notranslate" translate="no">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-[#1a1a2e]">{title}</h3>
        {selectedId && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs font-medium text-[#8b7355] hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {tree.map((parent) => {
          const isOpen = expanded.has(parent.id)
          const parentSelected = selectedId === parent.id
          return (
            <li key={parent.id} className="border-t border-border/60 first:border-t-0">
              <div className="flex items-center">
                {parent.children && parent.children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(parent.id)}
                    aria-label={isOpen ? `Collapse ${parent.label}` : `Expand ${parent.label}`}
                    aria-expanded={isOpen}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onSelect(parentSelected ? null : parent.id)}
                  aria-pressed={parentSelected}
                  className={`flex-1 text-left py-2 pr-2 text-sm font-semibold rounded-md transition-colors ${
                    parentSelected
                      ? "text-[#8b7355] bg-[#f5f3ef]"
                      : "text-[#1a1a2e] hover:text-[#8b7355]"
                  }`}
                >
                  {parent.label}
                </button>
              </div>

              {parent.children && parent.children.length > 0 && isOpen && (
                <ul className="pb-1.5">
                  {parent.children.map((child) => {
                    const childSelected = selectedId === child.id
                    return (
                      <li key={child.id}>
                        <button
                          type="button"
                          onClick={() => onSelect(childSelected ? null : child.id)}
                          aria-pressed={childSelected}
                          className={`block w-full text-left pl-8 pr-2 py-1.5 text-sm rounded-md transition-colors ${
                            childSelected
                              ? "text-[#8b7355] font-medium bg-[#f5f3ef]"
                              : "text-muted-foreground hover:text-[#8b7355]"
                          }`}
                        >
                          {child.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
