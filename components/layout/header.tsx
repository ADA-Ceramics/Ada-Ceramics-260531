"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// 产品分类数据 - 链接到二级分类页
const PRODUCT_CATEGORIES = [
  { id: "plates", name: "Wholesale Plates", description: "Dinner, dessert, soup & serving plates", slug: "wholesale-plates" },
  { id: "bowls", name: "Wholesale Bowls", description: "Soup, salad, ramen & snack bowls", slug: "wholesale-bowls" },
  { id: "sets", name: "Wholesale Dinnerware Sets", description: "Daily & restaurant tableware sets", slug: "wholesale-dinnerware-sets" },
  { id: "cups", name: "Wholesale Cups & Mugs", description: "Ceramic mugs, coffee cups & water cups", slug: "wholesale-cups-mugs" },
  { id: "bakeware", name: "Wholesale Bakeware", description: "Baking dishes, ramekins & pie plates", slug: "wholesale-bakeware" },
]

// 严格对应你本地实际文件名
const LANGUAGES = [
  { code: "en", name: "EN", flag: "/flags/en.webp", googleLang: "en" },
  { code: "es", name: "ES", flag: "/flags/es.webp", googleLang: "es" },
  { code: "fr", name: "FR", flag: "/flags/fr.webp", googleLang: "fr" },
  { code: "de", name: "DE", flag: "/flags/de.webp", googleLang: "de" },
  { code: "pt", name: "PT", flag: "/flags/pt.webp", googleLang: "pt" },
  { code: "it", name: "IT", flag: "/flags/it.webp", googleLang: "it" },
  { code: "nl", name: "NL", flag: "/flags/nl.webp", googleLang: "nl" },
  { code: "ja", name: "JA", flag: "/flags/ja.webp", googleLang: "ja" },
]

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new(options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()

  // 从当前URL路径中提取语言代码
  const getCurrentLocale = () => {
    const segments = pathname.split('/')
    const locale = segments[1]
    return LANGUAGES.find(l => l.code === locale)?.code || 'en'
  }

  const [currentLangCode, setCurrentLangCode] = useState(getCurrentLocale())

  // 触发Google翻译到指定语言
  const triggerGoogleTranslate = (langCode: string, shouldReload = false) => {
    const lang = LANGUAGES.find(l => l.code === langCode)
    if (!lang) return

    // 如果是英语，需要恢复原文
    if (langCode === 'en') {
      // 清除所有Google翻译相关cookie
      const clearGoogleTranslateCookies = () => {
        const hostname = window.location.hostname
        const domains = ['', '.'+hostname, hostname]
        const paths = ['/', '']
        
        domains.forEach(domain => {
          paths.forEach(path => {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domain ? '; domain='+domain : ''}`
            document.cookie = `googtrans=/en/en; path=${path}${domain ? '; domain='+domain : ''}`
          })
        })
        // 额外清除根域名的cookie
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost'
      }
      
      clearGoogleTranslateCookies()
      
      // 尝试通过Google翻译API恢复原文
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement
      if (combo) {
        combo.value = 'en'
        combo.dispatchEvent(new Event("change", { bubbles: true }))
      }
      
      // 如果是用户主动切换（shouldReload为true），刷新页面彻底清除翻译状态
      if (shouldReload) {
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
      return
    }

    // 非英语：触发翻译
    const tryTriggerTranslate = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement
      if (combo) {
        combo.value = lang.googleLang
        combo.dispatchEvent(new Event("change", { bubbles: true }))
        return true
      }
      return false
    }

    if (!tryTriggerTranslate()) {
      setTimeout(tryTriggerTranslate, 500)
    }
  }

  // 监听路径变化，更新当前语言并同步翻译状态
  useEffect(() => {
    const locale = getCurrentLocale()
    setCurrentLangCode(locale)
    
    // 当Google翻译准备好后，根据URL语言触发翻译（不刷新页面）
    if (isGoogleTranslateReady) {
      triggerGoogleTranslate(locale, false)
    }
  }, [pathname, isGoogleTranslateReady])

  // 初始化谷歌免费翻译挂件
  useEffect(() => {
    // 避免重复加载
    if (document.getElementById('google-translate-script')) {
      return
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,pt,it,nl,ja",
          // 使用HORIZONTAL布局以生成下拉select
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL || 1,
          autoDisplay: false
        }, "google_translate_widget")
        
        // 延迟设置ready状态，等待Google翻译组件完全初始化
        setTimeout(() => {
          setIsGoogleTranslateReady(true)
        }, 1000)
      }
    }

    const script = document.createElement("script")
    script.id = 'google-translate-script'
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  // 切换语种：更新URL子目录并触发翻译
  const changeLang = (langCode: string) => {
    setCurrentLangCode(langCode)
    setIsLangMenuOpen(false)
    
    // 获取当前路径并替换语言代码
    const segments = pathname.split('/')
    segments[1] = langCode // 替换语言代码部分
    const newPath = segments.join('/') || `/${langCode}`
    
    // 对于英语，直接跳转到英语URL并刷新以清除翻译状态
    if (langCode === 'en') {
      // 清除cookies后直接通过window.location跳转，确保完全刷新
      const clearGoogleTranslateCookies = () => {
        const hostname = window.location.hostname
        const domains = ['', '.'+hostname, hostname]
        const paths = ['/', '']
        
        domains.forEach(domain => {
          paths.forEach(path => {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domain ? '; domain='+domain : ''}`
          })
        })
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost'
      }
      
      clearGoogleTranslateCookies()
      // 使用window.location直接跳转，确保URL更新和页面刷新同时完成
      window.location.href = newPath
    } else {
      // 非英语：先触发翻译，再导航
      triggerGoogleTranslate(langCode, false)
      router.push(newPath)
    }
  }

  const currentLang = LANGUAGES.find(item => item.code === currentLangCode) || LANGUAGES[0]

  const navItems = [
    { name: "Home", href: `/${currentLangCode}` },
    { name: "Products", href: `/${currentLangCode}/products`, hasDropdown: true },
    { name: "Custom Solutions", href: "/oem-odm" },
    { name: "About Us", href: `/${currentLangCode}/about` },
    { name: "Factory", href: "/factory" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  // 页面滚动效果
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 点击外部关闭语言菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isLangMenuOpen && !target.closest('[data-lang-menu]')) {
        setIsLangMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isLangMenuOpen])

  return (
    <>
      {/* 隐藏原生翻译控件，后台调度使用 */}
      <div id="google_translate_widget" className="hidden" style={{ display: 'none' }}></div>
      
      {/* 隐藏Google翻译顶部栏 */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        div#goog-gt-,
        .goog-text-highlight {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-gadget {
          display: none !important;
        }
      `}</style>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur shadow" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 网站Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold">ADA CERAMICS</span>
            </Link>

            {/* 桌面导航栏 */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium py-2",
                          pathname.startsWith("/products") ? "text-primary" : "hover:text-primary"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isProductsOpen && "rotate-180")} />
                      </Link>
                      <div className={cn(
                        "absolute left-0 top-full pt-2 transition-all duration-200",
                        isProductsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      )}>
                        <div className="bg-white shadow-lg rounded-xl border py-2 min-w-[280px]">
                          <div className="px-4 py-2 border-b">
                            <p className="text-xs text-gray-500 uppercase">Product Categories</p>
                          </div>
                          {PRODUCT_CATEGORIES.map((category) => (
                            <Link
                              key={category.id}
                              href={`/${currentLangCode}/products/${category.slug}`}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                              onClick={() => setIsProductsOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <div className="w-6 h-6 rounded bg-primary/20"></div>
                              </div>
                              <div>
                                <p className="text-sm">{category.name}</p>
                                <p className="text-xs text-gray-400 line-clamp-1">{category.description}</p>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t mt-2 pt-2 px-4">
                            <Link href={`/${currentLangCode}/products`} className="text-sm text-primary hover:underline">
                              View All Products →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium py-2 hover:text-primary",
                        pathname === item.href && "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* 桌面端国旗语种选择器，显示国旗+语言代码 */}
              <div className="relative" data-lang-menu>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src={currentLang.flag}
                    alt={`${currentLang.code} flag`}
                    width={22}
                    height={16}
                    className="rounded object-cover"
                    style={{ height: 'auto' }}
                    unoptimized
                  />
                  <span className="text-sm font-medium">{currentLang.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                <div className={cn(
                  "absolute right-0 top-full mt-1 w-36 bg-white shadow-lg rounded-lg border z-50 transition-all",
                  isLangMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm",
                        currentLangCode === lang.code && "bg-gray-100 text-primary"
                      )}
                    >
                      <Image
                        src={lang.flag}
                        alt={`${lang.code} flag`}
                        width={20}
                        height={14}
                        className="rounded object-cover"
                        style={{ height: 'auto' }}
                        unoptimized
                      />
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* 移动端按钮区域 */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="relative" data-lang-menu>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded hover:bg-gray-100"
                >
                  <Image
                    src={currentLang.flag}
                    alt={`${currentLang.code} flag`}
                    width={22}
                    height={16}
                    className="rounded"
                    style={{ height: 'auto' }}
                    unoptimized
                  />
                  <span className="text-xs font-medium">{currentLang.name}</span>
                </button>
                <div className={cn(
                  "absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-lg border z-50",
                  isLangMenuOpen ? "block" : "hidden"
                )}>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm",
                        currentLangCode === lang.code && "bg-gray-100 text-primary"
                      )}
                    >
                      <Image
                        src={lang.flag}
                        alt={`${lang.code} flag`}
                        width={18}
                        height={13}
                        className="rounded"
                        style={{ height: 'auto' }}
                        unoptimized
                      />
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端下拉菜单 */}
      <div className={cn(
        "lg:hidden bg-white border-t overflow-hidden transition-all duration-300 fixed top-20 left-0 right-0 z-40",
        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="px-4 py-3 space-y-1">
          {navItems.map(item => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="w-full flex justify-between items-center px-3 py-3 font-medium"
                  >
                    {item.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isProductsOpen && "rotate-180")} />
                  </button>
                  <div className={cn("overflow-hidden", isProductsOpen ? "max-h-96" : "max-h-0")}>
                    <div className="pl-4 pb-2 space-y-1">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <Link
                          key={category.id}
                          href={`/${currentLangCode}/products/${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600"
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link
                        href={`/${currentLangCode}/products`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-primary"
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 font-medium rounded",
                    pathname === item.href && "bg-gray-100 text-primary"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
