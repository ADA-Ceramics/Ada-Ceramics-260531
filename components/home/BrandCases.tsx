import Link from "next/link"
import Image from "next/image"

interface BrandCasesProps {
  locale: string
}

// 区块 7：服务行业场景展示区 —— 全部内链 OEM 案例 L3 页面，承接「custom ceramic brand manufacturer」长尾词
const CASE_STUDIES_HREF = "/oem-custom-ceramics/oem-odm-case-studies"

const INDUSTRIES = [
  {
    title: "Hotels & Resorts",
    image: "/porcelain-tableware-for-hotel-restore.webp",
    alt: "wholesale porcelain tableware for hotels and resorts",
  },
  {
    title: "Restaurants",
    image: "/porcelain-tableware-for-restaurants.webp",
    alt: "commercial ceramic dinnerware for restaurants",
  },
  {
    title: "Cafes & Bistros",
    image: "/coffee-cup-cafe.webp",
    alt: "ceramic coffee cups and mugs for cafes and bistros",
  },
  {
    title: "Catering Services",
    image: "/ceramic-plates-for-catering-service.webp",
    alt: "ceramic plates for catering services",
  },
  {
    title: "Retail Stores",
    image: "/ceramic-retail.webp",
    alt: "private label ceramic tableware for retail stores",
  },
  {
    title: "Online Sellers",
    image: "/amazon-hotsell-ceramic.webp",
    alt: "bestselling ceramic products for online sellers and marketplaces",
  },
  {
    title: "Corporate Gifts",
    image: "/ceramic-gift-mug.webp",
    alt: "custom ceramic mugs for corporate gifts",
  },
  {
    title: "Home & Living",
    image: "/ceramic-snack-plate-for-home.webp",
    alt: "ceramic snack plates and tableware for home and living",
  },
]

export default function BrandCases({ locale }: BrandCasesProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">Who We Serve</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a2e] text-balance mb-4">
            Ceramic Solutions for Every Industry
          </h2>
          <p className="text-[#6b6862] leading-relaxed max-w-2xl mx-auto text-pretty">
            From luxury hotels to cozy cafes, our ceramic tableware serves diverse industries worldwide. Quality products
            tailored to meet your unique business needs.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INDUSTRIES.map((item) => (
            <Link
              key={item.title}
              href={`/${locale}${CASE_STUDIES_HREF}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                aria-hidden="true"
              />
              <h3 className="absolute bottom-4 left-4 right-4 font-serif text-base sm:text-lg text-white drop-shadow-sm">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
