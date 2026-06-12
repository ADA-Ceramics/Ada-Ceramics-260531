"use client" // 加在第一行！

import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";

// 下面的代码完全不变，直接保留
export const metadata: Metadata = { /* ... */ };
const fixedCategories = [ /* ... */ ];

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
