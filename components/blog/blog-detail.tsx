"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react"
import type { BlogPostDetail, NotionBlock } from "@/lib/notion"
import { QuoteForm } from "@/components/shared/quote-form"

interface BlogDetailProps {
  post: BlogPostDetail
}

export function BlogDetail({ post }: BlogDetailProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-border">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-slate max-w-none">
            {post.content.map((block) => (
              <NotionBlockRenderer key={block.id} block={block} />
            ))}
          </article>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm variant="compact" />
        </div>
      </section>
    </main>
  )
}

// Notion块渲染器
function NotionBlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      if (!block.content) return <div className="h-4" />
      return (
        <p
          className="text-foreground leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "heading_1":
      return (
        <h2
          className="text-3xl font-bold text-foreground mt-12 mb-6"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "heading_2":
      return (
        <h3
          className="text-2xl font-semibold text-foreground mt-10 mb-4"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "heading_3":
      return (
        <h4
          className="text-xl font-semibold text-foreground mt-8 mb-3"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "bulleted_list_item":
      return (
        <li
          className="text-foreground ml-6 list-disc mb-2"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "numbered_list_item":
      return (
        <li
          className="text-foreground ml-6 list-decimal mb-2"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "to_do":
      return (
        <div className="flex items-start gap-3 mb-2">
          <input
            type="checkbox"
            checked={block.checked}
            readOnly
            className="mt-1.5 rounded border-border"
          />
          <span
            className={block.checked ? "line-through text-muted-foreground" : "text-foreground"}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        </div>
      )

    case "quote":
      return (
        <blockquote
          className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case "callout":
      return (
        <div className="bg-muted/50 border border-border rounded-lg p-4 my-6">
          <p
            className="text-foreground"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        </div>
      )

    case "code":
      return (
        <pre className="bg-[#1a1a2e] text-white rounded-lg p-4 my-6 overflow-x-auto">
          <code className={`language-${block.language || "text"}`}>
            {block.content}
          </code>
        </pre>
      )

    case "image":
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.url}
              alt={block.caption || "Blog image"}
              className="w-full h-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case "video":
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <video
              src={block.url}
              controls
              className="w-full h-full"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case "embed":
    case "bookmark":
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-6 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <span className="text-primary underline">{block.url}</span>
          {block.caption && (
            <span className="block text-sm text-muted-foreground mt-1">
              {block.caption}
            </span>
          )}
        </a>
      )

    case "divider":
      return <hr className="my-8 border-border" />

    case "toggle":
      return (
        <details className="my-4 border border-border rounded-lg">
          <summary
            className="px-4 py-3 cursor-pointer font-medium text-foreground hover:bg-muted/50 transition-colors"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
          {block.children && (
            <div className="px-4 pb-4">
              {block.children.map((child) => (
                <NotionBlockRenderer key={child.id} block={child} />
              ))}
            </div>
          )}
        </details>
      )

    default:
      return null
  }
}
