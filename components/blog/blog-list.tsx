"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AlertCircle, Search, ArrowRight } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/notion"
import { Header } from "@/components/layout/header"

interface BlogListProps {
  posts: BlogPost[]
  error?: string | null
}

// Blog tags for filtering and SEO
const blogTags = [
  "Wholesale Guide",
  "Custom Dinnerware",
  "Industry News",
  "Manufacturing",
  "Design Trends",
  "Buying Tips",
]

export function BlogList({ posts, error }: BlogListProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Header - 保持全站一致性 */}
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section - 简洁背景色风格，与全站一致 */}
        <section className="bg-[#f5f5f0] pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1a1a2e] mb-6 leading-tight">
              Blogs & News
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Welcome to ADA Ceramics Blog. Here you will find the latest industry news, product updates, 
              design trends, and professional knowledge about ceramic tableware wholesale and manufacturing.
            </p>
          </div>
        </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Blog Posts - Main Content */}
            <div className="flex-1 lg:w-2/3">
              {error ? (
                /* Configuration Error State */
                <div className="py-12">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Notion Configuration Required
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Please share your Notion database with your integration to display blog posts.
                      </p>
                      <div className="bg-muted/30 rounded-lg p-5 text-sm">
                        <h4 className="font-medium text-foreground mb-3">Setup Steps (Free - No upgrade needed):</h4>
                        <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                          <li>Open your Notion database page</li>
                          <li>Click the <code className="bg-white px-1.5 py-0.5 rounded border text-xs">...</code> menu</li>
                          <li>Select <code className="bg-white px-1.5 py-0.5 rounded border text-xs">Add connections</code></li>
                          <li>Search and select your integration</li>
                          <li>Refresh this page</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-16 text-center">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {searchQuery ? "No posts match your search" : "No posts available yet"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery ? "Try a different search term" : "Check back soon for latest updates and articles"}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <article 
                      key={post.id}
                      className="group flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0"
                    >
                      {/* Post Image */}
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="relative w-full sm:w-80 h-56 sm:h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={post.coverImage || "/alice.webp"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 320px"
                        />
                      </Link>
                      
                      {/* Post Content */}
                      <div className="flex-1 flex flex-col">
                        <Link href={`/${locale}/blog/${post.slug}`}>
                          <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1a1a2e] mb-3 group-hover:text-[#8b7355] transition-colors leading-tight">
                            {post.title}
                          </h2>
                        </Link>
                        
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <div className="mt-auto flex items-center justify-between">
                          <time className="text-sm text-muted-foreground">
                            {formatDate(post.publishedAt)}
                          </time>
                          <Link
                            href={`/${locale}/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#8b7355] hover:text-[#6d5a43] transition-colors"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28 space-y-8">
                
                {/* Search Box */}
                <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full text-muted-foreground hover:border-[#8b7355] hover:text-[#8b7355] cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Products */}
                <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">Featured Products</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Wholesale Ceramic Dinner Plates", image: "/alice.webp" },
                      { name: "Custom Color Glaze Bowls", image: "/color-glaze.webp" },
                      { name: "Restaurant Dinnerware Sets", image: "/kiln-transformation.webp" },
                    ].map((product, index) => (
                      <Link
                        key={index}
                        href={`/${locale}/products`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <span className="text-sm text-[#1a1a2e] group-hover:text-[#8b7355] transition-colors leading-snug">
                          {product.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/${locale}/products`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#8b7355] hover:text-[#6d5a43] transition-colors"
                    >
                      View More Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-[#8b7355] rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Custom Ceramics?</h3>
                  <p className="text-white/80 text-sm mb-4">Get a free quote for your wholesale order</p>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-block px-5 py-2.5 bg-white text-[#8b7355] font-medium text-sm rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
