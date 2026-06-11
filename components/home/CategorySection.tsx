import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { CategoryData } from "./types"

interface CategorySectionProps {
  categories: CategoryData[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => {
           const linkHref = category.slug === "oem-odm" ? "/en/oem-odm" : category.slug === "all" ? "/en/products" : category.slug === "plates" ? "/en/products/plates" : /en/products/${category.slug};`
            return (
              <Link
                key={category.slug}
                href={linkHref}
                className="no-underline block focus:outline-none focus:ring-2 focus:ring-[#8b7355] rounded-2xl"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
