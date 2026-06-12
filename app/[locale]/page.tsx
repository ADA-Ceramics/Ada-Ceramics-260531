import { Metadata } from "next";
import dynamic from "next/dynamic";
// 仅首屏核心组件直接导入
import HeroSection from "@/components/home/HeroSection";

// SEO 元数据（保留原有内容）
export const metadata: Metadata = {
  title: "ADA Ceramics | OEM & ODM Ceramic Tableware Wholesale Factory",
  description:
    "Professional OEM/ODM ceramic tableware manufacturer. Wholesale plates, bowls, mugs and dinnerware sets for restaurants, hotels and global retailers.",
  keywords: "custom ceramic tableware, OEM/ODM dinnerware, wholesale plates, mugs, bakeware",
  robots: "index, follow",
  openGraph: {
    title: "ADA Ceramics | OEM & ODM Ceramic Tableware Wholesale Factory",
    description: "Professional OEM/ODM ceramic tableware manufacturer. Wholesale plates, bowls, mugs and dinnerware sets for restaurants, hotels and global retailers.",
    type: "website"
  }
};

const fixedCategories = [
  {
    name: "Custom OEM/ODM Solutions",
    description: "Professional custom ceramic tableware tailored for global brands, restaurants and retail partners.",
    image: "/wholesale-ceramics-supplier.webp",
    alt: "Custom OEM/ODM ceramic tableware manufacturing",
    slug: "oem-odm",
  },
  {
    name: "Wholesale Plates",
    description: "Chip-resistant dinner plates for busy restaurants and catering services.",
    image: "/wholesale-plates.webp",
    alt: "Wholesale ceramic dinner plates",
    slug: "wholesale-plates",
  },
  {
    name: "Wholesale Bowls",
    description: "Versatile soup and salad bowls, food-safe for busy commercial kitchens.",
    image: "/wholesale-bowls.webp",
    alt: "Wholesale ceramic soup and salad bowls",
    slug: "wholesale-bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Matching tableware collections for hotels and hospitality businesses.",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "Wholesale ceramic dinnerware sets for hospitality",
    slug: "wholesale-dinnerware-sets",
  },
  {
    name: "Wholesale Cups and Mugs",
    description: "Customizable ceramic drinkware for cafes and corporate gifts.",
    image: "/wholesale-cups-mugs.webp",
    alt: "Wholesale ceramic cups and mugs",
    slug: "wholesale-cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe ceramic bakeware for commercial kitchens and bakeries.",
    image: "/wholesale-bakeware.webp",
    alt: "Wholesale ceramic bakeware",
    slug: "wholesale-bakeware",
  },
];

// 非首屏组件统一懒加载
const LazyCategorySection = dynamic(() => import("@/components/home/CategorySection"), { ssr: true });
const LazyFactorySection = dynamic(() => import("@/components/home/FactorySection"), { ssr: true });
const LazyIndustrySection = dynamic(() => import("@/components/home/IndustrySection"), { ssr: true });
const LazyWhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"), { ssr: true });
const LazyCustomSection = dynamic(() => import("@/components/home/CustomSection"), { ssr: true });
const LazyBlogSection = dynamic(() => import("@/components/home/BlogSection"), { ssr: true });

// 表单+弹窗 懒加载：关闭SSR，纯客户端渲染，解决#130报错
const LazyContactClient = dynamic(() => import("@/components/home/ContactClient"), { ssr: false });

const LazyFooter = dynamic(() => import("@/components/layout/footer"), { ssr: true });

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LazyCategorySection categories={fixedCategories} />
      <LazyFactorySection />
      <LazyIndustrySection />
      <LazyWhyUsSection />
      <LazyCustomSection />
      <LazyBlogSection />
      <LazyContactClient />
      <LazyFooter />
    </>
  );
}
