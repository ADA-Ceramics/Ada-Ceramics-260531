import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react"
import { SiloL2Banner } from "@/components/silo/l2/SiloL2Banner"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import { OemGallery } from "./OemGallery"
import { OemWhatsAppFloat } from "./OemWhatsAppFloat"
import {
  getOemServicePage,
  getAllOemServicePages,
  OEM_PARENT_SLUG,
  OEM_PARENT_LABEL,
  OEM_CASE_STUDIES_SLUG,
  OEM_APPLICABLE_COLLECTIONS,
  type OemServicePageData,
} from "@/lib/silo/oem-service-config"
import { notFound } from "next/navigation"

/** 工厂全流程照片步骤（沿用旧 /oemodm 页设计与素材） */
const OEM_PROCESS_STEPS = [
  {
    step: 1,
    title: "Browse & Select",
    description: "Browse our catalog and select preferred ceramic dinnerware shapes and styles.",
    image: "/image/oem-odm/oem-odm-custom-logo-catalog_.webp",
    imageAlt: "Browse ADA Ceramics catalog to select ceramic tableware shapes and styles",
  },
  {
    step: 2,
    title: "Share Requirements",
    description: "Share product model numbers, custom logo files, packaging needs or modification ideas with our sales team.",
    image: "/image/oem-odm/custom-ceramic-cup-saucer.webp",
    imageAlt: "Share custom ceramic tableware requirements with ADA Ceramics sales team",
  },
  {
    step: 3,
    title: "Confirm artwork",
    description: "We review your request and finalize the customization artwork with you.",
    image: "/image/oem-odm/oem-odm-custom-ceramic-coffee-cup-with-logo-design.webp",
    imageAlt: "Confirm custom ceramic tableware artwork with ADA Ceramics",
  },
  {
    step: 4,
    title: "Create Samples",
    description: "We create custom samples based on your confirmed artwork.",
    image: "/image/oem-odm/creat-sample.webp",
    imageAlt: "ADA Ceramics creating custom ceramic tableware samples",
  },
  {
    step: 5,
    title: "Approve Samples",
    description: "You review and approve the samples to confirm all details.",
    image: "/image/oem-odm/approve-samples.webp",
    imageAlt: "Review and approve custom ceramic tableware samples",
  },
  {
    step: 6,
    title: "Mass Production",
    description: "After sample approval, we proceed with mass production for your custom order.",
    image: "/image/oem-odm/mass-production.webp",
    imageAlt: "ADA Ceramics mass production of custom ceramic tableware",
  },
]

/**
 * OEM L3 服务页统一 10 模块 SEO 骨架（仅 OEM Silo 使用，不影响产品网格 L2 模板）。
 * 数据驱动：通过 lib/silo/oem-service-config.ts 一键切换文案/图片/关键词复用全部 OEM 服务页。
 * 模块顺序严格：面包屑→Hero→服务详情→图库→工厂流程→案例内链→FAQ→底部转化→同Silo互通→跨Silo。
 */
export function OemServicePage({ slug, locale }: { slug: string; locale: string }) {
  const data = getOemServicePage(slug)
  if (!data) notFound()

  const all = getAllOemServicePages()
  const siblings = all.filter((s) => s.slug !== slug)
  const caseHref = `/${locale}/${OEM_PARENT_SLUG}/${OEM_CASE_STUDIES_SLUG}`
  const l1Href = `/${locale}/${OEM_PARENT_SLUG}`
  const quoteHref = `/${locale}/contact`

  // FAQPage Schema（模块7）
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 模块1+2：面包屑（含 Schema）+ Hero 首屏（唯一 H1 + 双 CTA） */}
      <SiloL2Banner
        locale={locale}
        parentSlug={OEM_PARENT_SLUG}
        parentLabel={OEM_PARENT_LABEL}
        slug={data.slug}
        label={data.label}
        h1={data.h1}
        intro={data.intro}
        bannerImage={data.bannerImage}
        keyword={data.keyword}
      />

      {/* 模块3：服务详情细分（两段 H2）+ 适配三大产品 Silo 横向卡片 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Custom Service Details &amp; Technical Specs
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              {data.seo.procurementScenario}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              {data.seo.customService}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              {data.seo.qualityLogistics}
            </p>

            {/* 模块内锚文本交叉内链其他 OEM L3 服务页 + 回链 L1 */}
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              Build a complete program by combining this service with{" "}
              {siblings.map((s, i) => (
                <span key={s.slug}>
                  <Link
                    href={`/${locale}/${OEM_PARENT_SLUG}/${s.slug}`}
                    className="text-[#8b7355] underline underline-offset-2 hover:text-[#75603f]"
                  >
                    {s.label}
                  </Link>
                  {i < siblings.length - 2 ? ", " : i === siblings.length - 2 ? " and " : ""}
                </span>
              ))}
              . Explore the full{" "}
              <Link
                href={l1Href}
                className="text-[#8b7355] underline underline-offset-2 hover:text-[#75603f]"
              >
                {OEM_PARENT_LABEL}
              </Link>{" "}
              service range to plan your private-label launch.
            </p>
          </div>

          <h2 className="mt-14 font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
            Applicable Ceramic Tableware Collections
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {OEM_APPLICABLE_COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/${c.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-black/10 bg-[#f5f3ef] hover:border-[#8b7355] transition-colors"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={c.image || "/placeholder.svg"}
                    alt={c.keyword}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif text-lg text-[#1a1a2e]">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {c.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                    View Collection
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 模块4：实拍案例图库（点击放大） */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
            Real Finished Custom Ceramic Samples
          </h2>
          <OemGallery images={data.extras.gallery} />
        </div>
      </section>

      {/* 模块5：一站式 OEM 工厂全流程（旧版照片流程布局） */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-10 text-balance">
            Our Full Custom Production Workflow
          </h2>

          {/* 横向流程展示 - 桌面端 */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-6 gap-4">
              {OEM_PROCESS_STEPS.map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="relative z-10 aspect-square mb-4 rounded-xl overflow-hidden shadow-md mx-auto w-full max-w-40">
                    <Image src={step.image} alt={step.imageAlt} fill className="object-cover" sizes="160px" />
                    <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#8b7355] text-white text-lg font-bold flex items-center justify-center shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 垂直列表 - 移动端 */}
          <div className="lg:hidden space-y-8">
            {OEM_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-64 mb-4 rounded-xl overflow-hidden shadow-md">
                  <Image src={step.image} alt={step.imageAlt} fill className="object-cover" sizes="256px" />
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#8b7355] text-white text-lg font-bold flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模块6：客户项目案例内链区（全部内链案例页） */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Successful Brand OEM &amp; ODM Project Cases
            </h2>
            <Link
              href={caseHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f]"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.extras.caseHighlights.map((c, i) => (
              <Link
                key={i}
                href={caseHref}
                className="group flex flex-col rounded-xl bg-white p-6 border border-black/10 hover:border-[#8b7355] transition-colors"
              >
                <h3 className="font-serif text-lg text-[#1a1a2e]">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                  Read the case study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 模块7：专属 FAQ（含 FAQPage Schema，schema 已在顶部注入） */}
      <SiloFaq faqs={data.faqs} />

      {/* 模块8：底部核心转化引导区 */}
      <section className="py-16 lg:py-20 bg-[#1a1a2e] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-balance">
            Ready to Start Your {data.label} Project?
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed text-pretty">{data.extras.closingPitch}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Low MOQ</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Free Sampling</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Global Delivery</span>
          </div>
          <Link
            href={quoteHref}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-md bg-[#8b7355] text-white text-base font-medium hover:bg-[#75603f] transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Request Custom Quote
          </Link>
        </div>
      </section>

      {/* 模块9：同 Silo 全 L3 服务页互通卡片（含当前页，全部互相内链 + 回链 L1） */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Explore All Our OEM Custom Ceramic Services
            </h2>
            <Link href={l1Href} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f]">
              Back to {OEM_PARENT_LABEL}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {all.map((s) => {
              const isCurrent = s.slug === slug
              return (
                <Link
                  key={s.slug}
                  href={`/${locale}/${OEM_PARENT_SLUG}/${s.slug}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`group flex flex-col rounded-xl overflow-hidden border transition-colors ${
                    isCurrent ? "border-[#8b7355] bg-[#f5f3ef]" : "border-black/10 hover:border-[#8b7355]"
                  }`}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={s.bannerImage || "/placeholder.svg"}
                      alt={`${s.keyword} OEM and ODM service for Horeca bulk wholesale brands`}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base text-[#1a1a2e]">{s.label}</h3>
                      {isCurrent && (
                        <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#8b7355] text-white">
                          You are here
                        </span>
                      )}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                      View Service
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* 末尾标��� Silo 隔离引导句 */}
          <p className="mt-10 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {data.seo.siloGuide}
          </p>
        </div>
      </section>

      {/* 模块10：全站统一四大 Silo 导流卡片 */}
      <SiloCrossLinks locale={locale} currentSlug={OEM_PARENT_SLUG} />

      {/* 合规悬浮 WhatsApp 按钮（固定侧边，无遮罩） */}
      <OemWhatsAppFloat serviceName={data.label} />
    </>
  )
}

export type { OemServicePageData }
