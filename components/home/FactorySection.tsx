import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface FactorySectionProps {
  locale: string
}

/**
 * 工厂展示模块 —— OUR FACILITY
 *
 * 图片 URL 集中在下方 FACTORY_IMAGES 中，后期可直接在这里替换 src 换图。
 * - 支持本地路径（如 "/factory-tour.webp"）或完整的外链 URL。
 * - large 为左上角带 "Factory Tour" 标签的主图，其余 3 张为拼贴小图。
 */
const FACTORY_IMAGES = {
  // 左上主图（带 Factory Tour 标签）
  large: "/factory-production-line.png",
  // 右上小图
  topRight: "/factory-warehouse-stock.png",
  // 左下小图
  bottomLeft: "/factory-building-exterior.png",
  // 右下小图
  bottomRight: "/factory-quality-inspection.png",
}

const STATS = [
  { value: "30,000", label: "sqm Factory" },
  { value: "200+", label: "Skilled Workers" },
  { value: "8+", label: "Production Lines" },
  { value: "98%", label: "Quality Rate" },
]

export default function FactorySection({ locale }: FactorySectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧：文案 + 数据卡片 + 按钮 */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#8a6d3b] uppercase mb-3">
              Our Facility
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-5 text-balance">
              State-of-the-Art Manufacturing
            </h2>
            <p className="text-[#6b6862] leading-relaxed mb-8 max-w-xl text-pretty">
              Our 30,000 sqm facility combines traditional craftsmanship with modern technology,
              featuring 8+ production lines and a dedicated team of 200+ skilled workers.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#ece7dd] bg-[#faf8f4] px-6 py-6 text-center"
                >
                  <div className="font-serif text-2xl md:text-3xl text-[#1a1a2e] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6b6862]">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#8a6d3b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#725a30]"
            >
              Visit Our Factory Online
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 右侧：图片拼贴 */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 aspect-square lg:aspect-[4/3]">
            {/* 主图 + Factory Tour 标签 */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGES.large}
                alt={`Ada Ceramics factory production line and manufacturing facility tour`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-md bg-[#4a6b8a]/90 px-3 py-1.5 text-sm font-medium text-white">
                Factory Tour
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGES.topRight}
                alt="Ceramic tableware warehouse and bulk stock storage"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGES.bottomLeft}
                alt="Ada Ceramics factory building exterior"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGES.bottomRight}
                alt="Quality inspection of ceramic products in the factory"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
