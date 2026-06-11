import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function BlogSection() {
  const blogList = [
    { title: "Ceramic Dinnerware Wholesale Guide for Middle East Buyers", image: "/alice.webp", date: "May 15, 2026" },
    { title: "Custom Dinnerware Shape vs Glaze Customization Guide", image: "/color-glaze.webp", date: "May 10, 2026" },
    { title: "What Certifications Should Wholesale Ceramic Plates Have for Import?", image: "/kiln-transformation.webp", date: "April 28, 2026" },
    { title: "How Custom Ceramic Tableware Supports Private Dining Brands", image: "/alice.webp", date: "April 20, 2026" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-[48px] text-[#1a1a1a] mb-5 leading-tight">
            News & Blog
          </h2>
          <p className="text-gray-500 text-base max-w-[800px] mx-auto leading-relaxed">
            As a ceramic tableware manufacturer committed to sharing knowledge, we provide ceramic products information,
            industry news and wholesale guides to help our partners grow their business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogList.map((post, index) => (
            <Link
              key={index}
              href="/en/blog"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-medium text-lg leading-snug mb-2">{post.title}</h3>
                <p className="text-white/60 text-sm">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/en/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
