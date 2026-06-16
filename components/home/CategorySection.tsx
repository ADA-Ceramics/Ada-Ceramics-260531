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

  // 复制一份分组用于无缝循环（纯 CSS 轮播：滚动到末尾后无缝回到第一个）
  const loopGroups = [...groups, ...groups]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#8b7355] text-sm font-semibold uppercase tracking-wider mb-3">Our Collections</p>
          <h2 className="font-serif text-4xl md:text-[56px] text-[#1a1a1a] mb-4">Standard Collections & Custom Solutions</h2>
          <p className="text-gray-600 text-base max-w-[600px] mx-auto leading-relaxed">
            Browse our standard tableware collections, fully customizable with logos, glazes and packaging for brands, restaurants and retail stores.
          </p>
        </div>

        {/* 左 40% OEM 模块（与右侧单卡同高，顶部对齐） + 右 60% 横向滚动合并模块 */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8">
          {/* 左侧：Custom OEM/ODM Solutions，占 40% 宽度并通高横跨 */}
          {oemCard && (
            <div className="lg:w-2/5 lg:shrink-0">
              {/* 与右侧卡片格式一致：顶部标题 → 中间图片 → 底部按钮；暖米色背景 + 1px 浅棕边框 */}
              <div className="h-[380px] rounded-2xl overflow-hidden border border-[#d8c4a8] bg-[#f8f2e9] flex flex-col">
                <div className="px-6 pt-6 pb-4 border-b border-[#e6d8c2]">
                  <h3 className="text-base font-bold text-[#1a1a1a] truncate">{oemCard.name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-1">{oemCard.description}</p>
                </div>
                <div className="flex flex-col gap-4 p-6 flex-1 min-h-0">
                  <div className="overflow-hidden rounded-xl flex-1 min-h-0">
                    <div className="relative w-full h-full bg-gray-100">
                      {oemCard.image ? (
                        <Image
                          src={oemCard.image}
                          alt={oemCard.alt}
                          fill
                          loading="eager"
                          priority
                          fetchPriority="high"
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package size={48} />
                        </div>
                      )}
                    </div>
                  </div>
                  <Link
                    href={getLinkHref(oemCard.slug)}
                    className="no-underline inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
                  >
                    Explore Custom Solutions
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 右侧：移动端单列垂直滚动（原生触屏滑动）；lg+ 切换为纯 CSS 自动横向轮播（每5秒左移一个模块，无限循环，hover 暂停） */}
          <div className="lg:w-3/5 min-w-0 ada-carousel-viewport">
            <style>{`
              /* 移动端默认：单列垂直滚动，支持触屏滑动 */
              .ada-carousel-viewport {
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 560px;
                -webkit-overflow-scrolling: touch;
                touch-action: pan-y;
              }
              .ada-carousel-track {
                display: flex;
                flex-direction: column;
                gap: 24px;
              }
              .ada-carousel-card {
                width: 100%;
                height: 380px;
              }
              /* 移动端隐藏用于横向无缝循环的复制卡片 */
              .ada-carousel-dup {
                display: none;
              }

              @keyframes adaCategoryCarousel {
                0%, 26.66%   { transform: translateX(0%); }
                33.33%, 59.99% { transform: translateX(-16.6667%); }
                66.66%, 93.33% { transform: translateX(-33.3333%); }
                100%         { transform: translateX(-50%); }
              }

              /* lg+：横向自动轮播 */
              @media (min-width: 1024px) {
                .ada-carousel-viewport {
                  overflow: hidden;
                  max-height: none;
                  touch-action: auto;
                }
                .ada-carousel-track {
                  display: block;
                  width: calc((280px + 32px) * 6);
                  animation: adaCategoryCarousel 20s ease-in-out infinite;
                }
                /* hover 暂停 */
                .ada-carousel-track:hover {
                  animation-play-state: paused;
                }
                .ada-carousel-card {
                  float: left;
                  width: 280px;
                  height: 380px;
                  margin-right: 32px;
                }
                .ada-carousel-dup {
                  display: block;
                }
              }
            `}</style>
            <div className="ada-carousel-track pb-4">
              {loopGroups.map((group, i) => {
                // 该品类的核心合集图：沿用本品类第一张原卡片的 image/alt（不改动任何已对接内容）
                const hero = group.items[0]
                const tagline = GROUP_TAGLINES[group.title] ?? ""
                // 首屏可视区的前 3 张原始卡片优先加载；复制卡片（用于无缝循环）保留懒加载
                const isAboveFold = i < groups.length
                return (
                  <div
                    key={`${group.title}-${i}`}
                    className={`ada-carousel-card${i >= groups.length ? " ada-carousel-dup" : ""} bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col`}
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
                              loading={isAboveFold ? "eager" : "lazy"}
                              priority={isAboveFold}
                              fetchPriority={isAboveFold ? "high" : "auto"}
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
                        // 链接保持可点击（仅禁用容器的手动滚动/滑动交互，不改动原有链接逻辑）
                        style={{ pointerEvents: "auto" }}
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
