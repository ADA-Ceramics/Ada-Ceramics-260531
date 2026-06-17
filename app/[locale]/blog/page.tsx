import { Metadata } from "next"
import { getAllPosts } from "@/lib/notion"
import { BlogList } from "@/components/blog/blog-list"

export const metadata: Metadata = {
  title: "Ceramic Tableware Wholesale Guides & Industry News | ADA Ceramics Blog",
  description:
    "Expert wholesale buying guides and industry news on dinnerware, bakeware, table decor & drinkware, and OEM custom ceramics for hotels, restaurants and bulk brand buyers.",
  keywords:
    "ceramic tableware wholesale guide, dinnerware buying tips, bakeware selection, table decor drinkware trends, OEM custom ceramics knowledge, bulk ceramic supplier news",
  alternates: { canonical: "https://www.adaceramics.com/en/blog" },
  openGraph: {
    title: "Ceramic Tableware Wholesale Guides & Industry News | ADA Ceramics Blog",
    description:
      "Wholesale buying guides and industry news across dinnerware, bakeware, table decor drinkware and OEM custom ceramics.",
    type: "website",
  },
}

export const revalidate = 60

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { posts, error } = await getAllPosts()

  return <BlogList posts={posts} error={error} locale={locale} />
}
