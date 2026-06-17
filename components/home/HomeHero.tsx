import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Globe } from "lucide-react"

interface HomeHeroProps {
  locale: string
}

// 区块 2：全屏 Hero 双栏 Banner —— 承载页面唯一 H1，均衡覆盖 4 大 Silo 核心词根
const HERO_TILES = [
  { src: "/wholesale-plates.webp", label: "Dinnerware" },
  { src: "/wholesale-bakeware.webp", label: "Bakeware" },
  { src: "/ceramic-gift-mug.webp", label: "Table Decor & Drinkware" },
  { src: "/custom-ceramic-tableware-logo-branding-services.webp", label: "OEM Custom Ceramics" },
]

export default function HomeHero({ locale }: HomeHeroProps) {
  return (
    <section className="bg-[#f5f3ef] pt-28 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 左区：文案 + 唯一 H1 + 双 CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#e3dccf] rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355]" aria-hidden="true" />
              <span className="text-xs font-medium tracking-wide text-[#8b7355] uppercase">
                Wholesale & Custom Ceramic Manufacturer
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] leading-tight text-[#1a1a2e] text-balance mb-5">
              Wholesale Custom Ceramic Tableware Manufacturer For Horeca & Global Brands
            </h1>

            <p className="text-base sm:text-lg text-[#5a5750] leading-relaxed mb-4">
              FDA &amp; LFGB Certified Dinnerware, Bakeware, Decor Drinkware &amp; Full OEM Ceramic
              Customization.
            </p>

            <p className="text-sm sm:text-base text-[#6b6862] leading-relaxed mb-8 max-w-xl">
              ADA Ceramics supplies bulk wholesale ceramic dinnerware, oven-safe bakeware and table decor
              drinkware to restaurants, hotels, importers and retail brands worldwide. As a full OEM custom
              ceramics factory in Chaozhou, we deliver low-MOQ private-label production with custom logo,
              glaze colour and new mold development — one accountable partner across all four product lines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href={`/${locale}/dinnerware`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold transition-colors hover:bg-[#2c2c4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a2e]"
              >
                Browse Product Collections
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
              >
                Request Custom Quote
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="inline-flex items-center gap-2 text-sm text-[#6b6862]">
                <ShieldCheck className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
                FDA &amp; LFGB Certified
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-[#6b6862]">
                <Globe className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
                Worldwide Bulk Shipping
              </span>
            </div>
          </div>

          {/* 右区：4 大产品线拼合实景大图 */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {HERO_TILES.map((tile, i) => (
                <div
                  key={tile.label}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <Image
                    src={tile.src}
                    alt={
                      i === 0
                        ? "Wholesale custom ceramic tableware - dinnerware, bakeware, table decor drinkware & OEM custom ceramics for hotel bulk buyers"
                        : `Wholesale ceramic ${tile.label} for Horeca bulk buyers`
                    }
                    fill
                    priority={i < 2}
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-2 left-2 text-[11px] font-medium text-white bg-black/45 rounded px-2 py-0.5">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
