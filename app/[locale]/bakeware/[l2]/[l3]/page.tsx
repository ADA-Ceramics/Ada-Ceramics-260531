import type { Metadata } from "next"
import { SiloL3ProductPage } from "@/components/silo/l3/SiloL3ProductPage"
import { getL2Config } from "@/lib/silo/l2-config"
import { getL3Detail } from "@/lib/silo/l3-products"

const PARENT_SLUG = "bakeware"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; l2: string; l3: string }>
}): Promise<Metadata> {
  const { locale, l2, l3 } = await params
  const config = getL2Config(PARENT_SLUG, l2)
  if (!config) return {}

  const detail = await getL3Detail(config.productCategorySlugs, l3)
  if (!detail) return {}

  const name = detail.name || config.label
  const title = `${name} | Wholesale ${config.label} | ADA Ceramics`
  const description =
    detail.description?.trim() ||
    `Wholesale ${name} direct from a Chaozhou ceramic factory. FDA & LFGB certified, oven safe, low MOQ and full OEM/ODM customization for restaurants, hotels and bakeries.`

  return {
    title,
    description,
    keywords: `wholesale ${name}, bulk ${config.keyword}, custom ${config.keyword}, OEM ceramic ${config.keyword}`,
    alternates: {
      canonical: `https://www.adaceramics.com/${locale}/${PARENT_SLUG}/${l2}/${l3}`,
    },
    openGraph: {
      title,
      description,
      images: detail.images.length > 0 ? [detail.images[0].url] : [config.bannerImage],
      type: "website",
    },
  }
}

export default async function BakewareL3Page({
  params,
}: {
  params: Promise<{ locale: string; l2: string; l3: string }>
}) {
  const { locale, l2, l3 } = await params
  return (
    <SiloL3ProductPage
      parentSlug={PARENT_SLUG}
      l2Slug={l2}
      productSlug={l3}
      locale={locale}
    />
  )
}
