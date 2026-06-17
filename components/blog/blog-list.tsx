"use client"

import Link from "next/link"
import Image from "next/image"
import { AlertCircle, Search, ArrowRight, Tag } from "lucide-react"
import { useMemo, useState } from "react"
import type { BlogPost } from "@/lib/notion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SiloBreadcrumb } from "@/components/silo/SiloBreadcrumb"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"

interface BlogListProps {
  posts: BlogPost[]
  error?: string | null
  locale: string
}

/**
 * 分类筛选标签：对应 4 大产品线 + OEM 定制 + 工厂批发资讯。
 * keywords 用于把 Notion 文章 tags 归类到对应分类（无配置时按标题关键词兜底匹配）。
 */
const CATEGORY_FILTERS = [
  { id: "all", label: "All Articles", keywords: [] as string[] },
  { id: "dinnerware", label: "Dinnerware Guides", keywords: ["dinnerware", "plate", "bowl", "dinner"] },
  { id: "bakeware", label: "Bakeware Tips", keywords: ["bakeware", "oven", "baking", "bake"] },
  { id: "table-decor", label: "Table Decor Trends", keywords: ["table decor", "drinkware", "mug", "cup", "decor"] },
  { id: "oem", label: "OEM Custom Knowledge", keywords: ["oem", "custom", "logo", "mold", "odm"] },
  { id: "factory", label: "Factory & Wholesale FAQs", keywords: ["factory", "wholesale", "bulk", "moq", "shipping"] },
] as const

// 资讯专属 FAQ（承接低竞争采购问答长尾词，内嵌 FAQPage Schema）
const BLOG_FAQS = [
  {
    q: "How to buy bulk ceramic tableware from a manufacturer?",
    a: "Start by requesting a catalog and quote with your target quantities. As a direct factory, ADA Ceramics supports low MOQ bulk orders of dinnerware, bakeware and drinkware, provides samples for approval, and handles worldwide shipping with full export documentation.",
  },
  {
    q: "What is the typical MOQ for custom ceramic tableware?",
    a: "Custom ceramic MOQ usually starts from a few hundred to a few thousand pieces per design depending on shape, glaze and decoration. Our OEM custom ceramics team offers flexible minimums for new brands and scalable volume pricing for established buyers.",
  },
  {
    q: "How do I choose oven safe bakeware for commercial use?",
    a: "Look for high-fired stoneware or porcelain rated for thermal shock, with food-safe FDA and LFGB certified glazes. Our bakeware selection guide covers material, wall thickness and temperature ratings for hotel, restaurant and retail kitchens.",
  },
  {
    q: "Can you produce custom logo and branded ceramic tableware?",
    a: "Yes. We provide full OEM and ODM services including custom logo printing, decal decoration, bespoke shapes via new mold development, and custom color glazes, all manufactured in our own factory for consistent quality and lead times.",
  },
]

export function BlogList({ posts, error, locale }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  // 文章归类：依据 tags + 标题关键词匹配分类
  const matchesCategory = (post: BlogPost, categoryId: string) => {
    if (categoryId === "all") return true
    const cat = CATEGORY_FILTERS.find((c) => c.id === categoryId)
    if (!cat) return true
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase()
    return cat.keywords.some((kw) => haystack.includes(kw))
  }

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          matchesCategory(post, activeCategory) &&
          `${post.title} ${post.excerpt}`.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [posts, activeCategory, searchQuery],
  )

  // 热门标签云：聚合 Notion 文章 tags（无则用分类标签兜底）
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
    const fromNotion = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
    return fromNotion.length > 0
      ? fromNotion.slice(0, 12)
      : ["Wholesale Guide", "Custom Dinnerware", "Bakeware", "Drinkware", "OEM Custom", "Industry News"]
  }, [posts])

  // 热门推荐文章（取前 3 篇，无数据则用 4 大 Silo 导流占位）
  const recommended = filteredPosts.slice(0, 3)

  // 右侧 + 底部核心导流卡片：4 大产品 Silo + OEM 定制
  const siloLinks = [
    { label: "Dinnerware Wholesale", href: `/${locale}/dinnerware` },
    { label: "Bakeware Wholesale", href: `/${locale}/bakeware` },
    { label: "Table Decor & Drinkware", href: `/${locale}/table-decor-drinkware` },
    { label: "OEM Custom Ceramics", href: `/${locale}/oem-custom-ceramics` },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BLOG_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="min-h-screen bg-background">
        {/* 区块 1：面包屑 Home > Blogs & News（含 BreadcrumbSchema） */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <SiloBreadcrumb locale={locale} slug="blog" label="Blogs & News" />
        </div>

        {/* 区块 2：博客 Hero 首屏（唯一 H1 + 搜索框） */}
        <section className="bg-[#f5f3ef] pt-10 pb-14 mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1a1a2e] mb-5 leading-tight text-balance">
                  Ceramic Tableware Wholesale Guides &amp; Industry News
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Expert buying guides, design trends and factory insights covering wholesale{" "}
                  <strong className="font-medium text-[#1a1a2e]">dinnerware</strong>,{" "}
                  <strong className="font-medium text-[#1a1a2e]">bakeware</strong>,{" "}
                  <strong className="font-medium text-[#1a1a2e]">table decor &amp; drinkware</strong> and{" "}
                  <strong className="font-medium text-[#1a1a2e]">OEM custom ceramics</strong> for hotels, restaurants
                  and bulk brand buyers worldwide.
                </p>
              </div>
              <div className="w-full lg:w-80 shrink-0">
                <label htmlFor="blog-hero-search" className="sr-only">
                  Search articles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="blog-hero-search"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 区块 3：分类标签横向筛选栏 */}
        <section className="border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2.5">
              {CATEGORY_FILTERS.map((cat) => {
                const active = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={active}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                      active
                        ? "bg-[#8b7355] text-white border-[#8b7355]"
                        : "bg-white text-muted-foreground border-gray-200 hover:border-[#8b7355] hover:text-[#8b7355]"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 区块 4：左右分栏（左：文章网格 / 右：侧边栏） */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* 左侧主区域：Notion 文章渲染网格 */}
              <div className="flex-1 lg:w-2/3">
                {error ? (
                  <div className="rounded-xl border border-gray-100 bg-[#f9fafb] p-8 text-center">
                    <h2 className="text-lg font-medium text-foreground mb-2">No articles to display yet</h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Articles will appear here automatically once the Notion database is connected. Setup details are
                      available at the bottom of this page.
                    </p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="py-16 text-center">
                    <h2 className="text-lg font-medium text-foreground mb-2">
                      {searchQuery || activeCategory !== "all" ? "No matching articles" : "No articles available yet"}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {searchQuery || activeCategory !== "all"
                        ? "Try a different keyword or category, or browse our product collections below."
                        : "New wholesale guides and industry news are published regularly. Check back soon."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 bg-white transition-all hover:shadow-md hover:border-gray-200"
                      >
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="relative aspect-[16/10] overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={post.coverImage || "/ceramic-manufacturer.webp"}
                            alt={`${post.title} - wholesale ceramic tableware guide for hotel & bulk brand buyers`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        </Link>
                        <div className="flex flex-col flex-1 p-5">
                          {post.tags[0] && (
                            <span className="inline-flex w-fit items-center gap-1 text-xs font-medium text-[#8b7355] mb-2">
                              <Tag className="w-3 h-3" aria-hidden="true" />
                              {post.tags[0]}
                            </span>
                          )}
                          <Link href={`/${locale}/blog/${post.slug}`}>
                            <h2 className="text-lg font-serif font-normal text-[#1a1a2e] mb-2 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                          </Link>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between">
                            <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt)}
                            </time>
                            <Link
                              href={`/${locale}/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-[#8b7355] hover:text-[#6d5a43] transition-colors"
                            >
                              Read More
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* 右侧侧边栏：搜索 / 热门标签云 / 核心导流 */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24 space-y-8">
                  {/* ① 文章搜索框（与顶部联动同一 state） */}
                  <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                    <h2 className="text-base font-semibold text-[#1a1a2e] mb-3">Search Articles</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                      <label htmlFor="blog-sidebar-search" className="sr-only">
                        Search articles
                      </label>
                      <input
                        id="blog-sidebar-search"
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* ② 热门标签云（读取 Notion 文章标签筛选） */}
                  <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                    <h2 className="text-base font-semibold text-[#1a1a2e] mb-4">Popular Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full text-muted-foreground hover:border-[#8b7355] hover:text-[#8b7355] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ③ 核心导流卡片：4 大产品 Silo + OEM 定制 */}
                  <div className="bg-[#1a1a2e] rounded-lg p-6">
                    <h2 className="text-base font-semibold text-white mb-4">Shop Our Collections</h2>
                    <ul className="space-y-2.5">
                      {siloLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/25"
                          >
                            {link.label}
                            <ArrowRight
                              className="w-4 h-4 text-[#c9a87c] transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${locale}/contact`}
                      className="mt-5 block w-full text-center px-5 py-2.5 bg-[#8b7355] text-white font-medium text-sm rounded-lg hover:bg-[#6d5a43] transition-colors"
                    >
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 区块 5：热门推荐文章 Recommended Reading */}
        {recommended.length > 0 && (
          <section className="py-14 bg-[#f5f3ef]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">Recommended Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommended.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${post.slug}`}
                    className="group flex gap-4 rounded-xl bg-white border border-gray-100 p-4 transition-all hover:shadow-md"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={post.coverImage || "/wholesale-ceramics-supplier.webp"}
                        alt={`${post.title} - wholesale ceramic tableware guide for hotel & bulk brand buyers`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-[#1a1a2e] leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[#8b7355]">
                        Read article
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 区块 7：FAQ 资讯专属问答区块（SiloFaq + FAQPage Schema） */}
        <SiloFaq faqs={BLOG_FAQS} />

        {/* 区块 6：Notion 配置提示（低优先级，弱化样式，放页面下半区） */}
        {error && (
          <section className="py-10 bg-[#f9fafb] border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <details className="rounded-lg border border-gray-200 bg-white p-5 text-sm">
                <summary className="flex items-center gap-2 cursor-pointer text-muted-foreground font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  Admin: Notion database setup (deployment only)
                </summary>
                <div className="mt-4 text-muted-foreground">
                  <p className="mb-3">
                    Connect your Notion database to automatically sync and display all uploaded blog articles:
                  </p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Open your Notion database page</li>
                    <li>
                      Click the <code className="bg-gray-100 px-1.5 py-0.5 rounded border text-xs">...</code> menu
                    </li>
                    <li>
                      Select <code className="bg-gray-100 px-1.5 py-0.5 rounded border text-xs">Add connections</code>
                    </li>
                    <li>Search and select your integration</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
              </details>
            </div>
          </section>
        )}

        {/* 区块 8：全站统一 4 大 Silo 底部导流 */}
        <SiloCrossLinks locale={locale} currentSlug="blog" />
      </main>

      {/* 区块 9：标准全站 Footer */}
      <Footer />
    </>
  )
}
