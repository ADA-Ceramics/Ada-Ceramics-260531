import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { buildAlt } from "@/lib/silo/config"

interface SiloHubCardsProps {
  locale: string
}

type HubCard = {
  slug: string
  title: string
  description: string
  image: string
  keyword: string
}

// 区块 3：6 大单品分类卡片枢纽区 —— 两行三列展示核心批发品类
const HUB_CARDS: HubCard[] = [
  {
    slug: "dinnerware/plates",
    title: "Wholesale Plates",
    description: "Durable dinner plates, soup plates and serving platters for commercial food service.",
    image: "/wholesale-plates.webp",
    keyword: "plates",
  },
  {
    slug: "dinnerware/bowls",
    title: "Wholesale Bowls",
    description: "Versatile soup bowls, salad bowls and ramen bowls for professional kitchens.",
    image: "/wholesale-bowls.webp",
    keyword: "bowls",
  },
  {
    slug: "dinnerware/dinnerware-sets",
    title: "Wholesale Dinnerware Sets",
    description: "Complete tableware sets for hotels, B&Bs and restaurant catering services.",
    image: "/wholesale-dinnerware-sets.webp",
    keyword: "dinnerware sets",
  },
  {
    slug: "bakeware",
    title: "Wholesale Bakeware",
    description: "Oven-safe baking dishes, ramekins and pie plates for commercial kitchens.",
    image: "/wholesale-bakeware.webp",
    keyword: "bakeware",
  },
  {
    slug: "table-decor-drinkware/cups-mugs",
    title: "Wholesale Cups & Mugs",
    description: "Premium ceramic mugs and coffee cups for cafes, offices and promotional use.",
    image: "/wholesale-cups-mugs.webp",
    keyword: "cups and mugs",
  },
  {
    slug: "products/all",
    title: "Wholesale Ceramics",
    description: "Explore our complete collection of ceramic tableware for hotels, restaurants and retail.",
    image: "/wholesale-ceramics-supplier.webp",
    keyword: "ceramics",
  },
]

export default function SiloHubCards({ locale }: SiloHubCardsProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#1a1a2e] text-balance">
            Product Categories
          </h2>
         <p className="text-sm text-gray-600 mt-2 mb-8">
  Explore our wide range of high-quality products designed for both everyday use and special occasions.
</p> 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={`/${locale}/${card.slug}`}
              className="group flex flex-col rounded-2xl border border-[#ece7dd] bg-[#faf8f4] overflow-hidden transition-all hover:shadow-lg hover:border-[#d8c4a8]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt={buildAlt(card.keyword)}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-xl text-[#1a1a2e] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6b6862] leading-relaxed flex-1">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b7355]">
                  Explore Subcategories
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
