"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

/**
 * 全局合规悬浮 WhatsApp 咨询组件（native <a>，爬虫可抓取，不阻塞渲染）。
 * - 暖米色容器 + 官方绿气泡图标 + 白色按钮，视觉与全站暖调统一。
 * - 仅首页保留「Instant OEM Quote」气泡，其余页面隐藏。
 * - OEM 定制 L2/L3 详情页已自带 OemWhatsAppFloat，这里自动跳过以避免重复。
 */
const WHATSAPP_NUMBER = "8615919512131"

export function GlobalWhatsAppFloat() {
  const pathname = usePathname()
  const [showTip, setShowTip] = useState(true)

  // 去掉语言前缀（/en、/es...）得到纯路径段
  const segments = (pathname || "/").split("/").filter(Boolean)
  const localeStripped = segments.slice(1) // 移除 locale 段

  // OEM 定制 L2/L3 详情页（/[locale]/oem-custom-ceramics/<slug>）已自带悬浮按钮，跳过
  const isOemDetailPage =
    localeStripped[0] === "oem-custom-ceramics" && localeStripped.length >= 2
  if (isOemDetailPage) return null

  const message =
    "Hi, I'm interested in ADA Ceramics. Please share OEM/ODM options, MOQ and wholesale pricing."
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3">
      {/* 白色药丸提示气泡（与 OEM L3 一致） */}
      {showTip && (
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-black/5 px-4 py-2">
          <span className="text-sm text-[#1a1a2e]">Chat with our team</span>
          <button
            type="button"
            onClick={() => setShowTip(false)}
            aria-label="Dismiss WhatsApp tip"
            className="text-muted-foreground hover:text-[#1a1a2e] text-lg leading-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* 绿色方形圆角 WhatsApp 按钮（squircle，与 OEM L3 一致） */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact ADA Ceramics via WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.027zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  )
}
