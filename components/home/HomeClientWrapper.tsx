"use client"
import dynamic from "next/dynamic"

// 在这里懒加载 ContactClient，设置 ssr: false
const LazyContactClient = dynamic(() => import("@/components/home/ContactClient"), {
  ssr: false
})

export default function HomeClientWrapper() {
  return <LazyContactClient />
}
