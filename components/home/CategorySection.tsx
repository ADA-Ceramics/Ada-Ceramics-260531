"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { CategoryData } from "./types"

interface CategorySectionProps {
  categories: CategoryData[]
}

// 各一级品类的英文短描述（仅用于视觉展示，单行截断）
const GROUP_TAGLINES: Record<string, string> = {
  Dinnerware: "Commercial-grade chip-resistant sets",
  Bakeware: "High-temperature safe bakeware",
  "Table Decor and Drinkware": "Stylish table accents & drinkware",
}

// 根据分类 slug 生成跳转链接（保持原有逻辑不变）
function getLinkHref(slug: string) {
  return slug === "oem-odm"
    ? "/en/oem-odm"
    : slug === "all"
    ? "/en/products"
    : `/en/products/${slug}`
}

// 仅做视觉合并的品类分组配置：每个合并模块保留原属品类的所有卡片
const MERGED_GROUPS: { title: string; slugs: string[] }[] = [
  {
    title: "Dinnerware",
    slugs: ["wholesale-plates", "wholesale-bowls", "wholesale-dinnerware-sets"],
  },
  {
    title: "Bakeware",
    slugs: ["wholesale-bakeware"],
  },
  {
    title: "Table Decor and Drinkware",
    slugs: ["wholesale-cups-mugs"],
  },
]

export default function CategorySection({ categories }: CategorySectionProps) {
  // 取出左侧固定通高的 OEM 模块
  const oemCard = categories.find((c) => c.slug === "oem-odm")

  // 将剩余模块按品类合并为 3 个分组（保留每张原始卡片的全部内容）
  const groups = MERGED_GROUPS.map((group) => ({
    title: group.title,
    items: group.slugs
      .map((slug) => categories.find((c) => c.slug === slug))
      .filter((c): c is CategoryData => Boolean(c)),
  })).filter((group) => group.items.length > 0)

  // 横向滚动容器自动播放：每 5 秒平滑切换一个模块，循环；hover 暂停、离开恢复
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      if (pausedRef.current) return
      const cards = Array.from(container.children) as HTMLElement[]
      if (cards.length === 0) return

      const current = container.scrollLeft
      // 找到下一张尚未完全滚动到的卡片
      const next = cards.find((card) => card.offsetLeft > current + 1)
      const maxScroll = container.scrollWidth - container.clientWidth

      if (next && next.offsetLeft <= maxScroll) {
        container.scrollTo({ left: next.offsetLeft, behavior: "smooth" })
      } else {
        // 已到末尾则循环回到起点
        container.scrollTo({ left: 0, behavior: "smooth" })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#8b7355] text-sm font-semibold uppercase tracking-wider mb-3">Our Collections</p>
          <h2 className="font-serif text-[56px] text-[#1a1a1a] mb-4">Standard Collections & Custom Solutions</h2>
          <p className="text-gray-600 text-base max-w-[600px] mx-auto leading-relaxed">
            Browse our standard tableware collections, fully customizable with logos, glazes and packaging for brands, restaurants and retail stores.
          </p>
        </div>

        {/* 左 40% OEM 模块（与右侧单卡同高，顶部对齐） + 右 60% 横向滚动合并模块 */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8">
          {/* 左侧：Custom OEM/ODM Solutions，占 40% 宽度并通高横跨 */}
          {oemCard && (
            <div className="lg:w-2/5 lg:shrink-0">
              <Link
                href={getLinkHref(oemCard.slug)}
                className="no-underline block focus:outline-none focus:ring-2 focus:ring-[#8b7355] rounded-2xl"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all flex flex-col">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {oemCard.image ? (
                      <Image
                        src={oemCard.image}
                        alt={oemCard.alt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-2">{oemCard.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{oemCard.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 右侧：3 个按品类合并的模块，横向滚动 */}
          <div className="lg:w-3/5 min-w-0">
            <div
              ref={scrollRef}
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
              className="flex gap-6 md:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory items-start"
            >
              {groups.map((group) => {
                // 该品类的核心合集图：沿用本品类第一张原卡片的 image/alt（不改动任何已对接内容）
                const hero = group.items[0]
                const tagline = GROUP_TAGLINES[group.title] ?? ""
                return (
                  <div
                    key={group.title}
                    className="snap-start shrink-0 w-[280px] h-[380px] bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                      <h3 className="text-base font-bold text-[#1a1a1a] truncate">{group.title}</h3>
                      <p className="text-xs text-gray-400 truncate mt-1">{tagline}</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 flex-1 min-h-0">
                      <div className="overflow-hidden rounded-xl flex-1 min-h-0">
                        <div className="relative w-full h-full bg-gray-100">
                          {hero.image ? (
                            <Image
                              src={hero.image}
                              alt={hero.alt}
                              fill
                              loading="lazy"
                              className="object-cover"
                              sizes="280px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={40} />
                            </div>
                          )}
                        </div>
                      </div>
                      <Link
                        href={getLinkHref(hero.slug)}
                        className="no-underline inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
