import { Metadata } from "next"
import { getAllPosts } from "@/lib/notion"
import { BlogList } from "@/components/blog/blog-list"

export const metadata: Metadata = {
  title: "Blog | ADA Ceramics",
  description: "Latest ceramic industry insights, tableware design trends, manufacturing guides and wholesale tips from ADA Ceramics factory expert.",
  keywords: "ceramic industry news, ceramic tableware trends, ceramic manufacturing, FDA certified ceramics, LFGB tableware, wholesale ceramic supplier",
  openGraph: {
    title: "Blog | ADA Ceramics",
    description: "Latest ceramic industry insights, tableware design trends and manufacturing guides from ADA Ceramics.",
    type: "website",
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const { posts, error } = await getAllPosts()
  
  return <BlogList posts={posts} error={error} />
}
