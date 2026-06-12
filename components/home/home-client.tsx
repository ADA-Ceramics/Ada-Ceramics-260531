// app/[locale]/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
// 仅首屏核心组件 直接导入
import { HeroSection } from "@/components/home/HeroSection";

export const metadata = { /* 保留你原有metadata */ };

const fixedCategories = [ /* 保留原有数组不变 */ ];

// 非首屏区块 懒加载，拆分JS包
const LazyCategorySection = dynamic(() => import("@/components/home/CategorySection"));
const LazyFactorySection = dynamic(() => import("@/components/home/FactorySection"));
const LazyIndustrySection = dynamic(() => import("@/components/home/IndustrySection"));
const LazyWhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"));
const LazyCustomSection = dynamic(() => import("@/components/home/CustomSection"));
const LazyBlogSection = dynamic(() => import("@/components/home/BlogSection"));
// 表单+弹窗整组懒加载（剥离大量首屏JS）
const LazyContactClient = dynamic(() => import("@/components/home/ContactClient"));
const LazyFooter = dynamic(() => import("@/components/layout/footer"));

export default function HomePage() {
  return (
    <>
      {/* LCP 首屏：强制同步渲染 */}
      <HeroSection />

      {/* 以下全部懒加载，不阻塞首屏 */}
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
