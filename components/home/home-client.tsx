"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { Footer } from "@/components/layout/footer"
import {
  ArrowRight,
  Shield,
  Award,
  Package,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  Send,
} from "lucide-react"

// 常量抽离，便于统一维护
const WHATSAPP_PHONE = "8615919512131"
const CONTACT_API = "/api/contact"

interface CategoryData {
  slug: string
  name: string
  description: string
  image: string | null
  alt: string
}

interface HomeClientProps {
  categories: CategoryData[]
}

export function HomeClient({ categories }: HomeClientProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    details: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // 关闭弹窗
  const closeModal = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  // ESC 按键关闭弹窗 + 点击遮罩关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        closeModal()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }

    if (showSuccessModal) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
      // 弹窗打开时禁止页面滚动
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [showSuccessModal, closeModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 前端简易校验
    if (!formData.fullName || !formData.email || !formData.category || !formData.details) {
      alert("Please fill in all required fields marked with *")
      return
    }

    setIsSubmitting(true)

    try {
      await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.log("邮件发送失败：", error)
    } finally {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }

    setTimeout(() => {
      const whatsappMessage = `Hi, I'm ${formData.fullName} from ${formData.company}.
Email: ${formData.email}
Phone: ${formData.phone}
Product Category: ${formData.category}
Quantity: ${formData.quantity}
Details: ${formData.details}`

      const encodedMsg = encodeURIComponent(whatsappMessage)
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`, "_blank", "noopener,noreferrer")
      closeModal()
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 成功弹窗 - 增强可访问性 */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          aria-hidden={!showSuccessModal}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 id="success-modal-title" className="text-xl font-semibold text-gray-900 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
          </div>
        </div>
      )}

      {/* 首屏 Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-[72px] bg-[#f5f3ef] overflow-hidden">
        <div className="absolute inset-0 bg-[#f5f3ef]">
          <Image
            src="/premium_beige_ceramic_plate_.webp"
            alt="Beige ceramic tableware"
            fill
            priority
            className="object-cover object-top opacity-60"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 text-center px-6 py-20 max-w-[900px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 rounded-full border border-gray-500"></div>
            <span className="text-sm text-gray-600">Wholesale & Custom Ceramic</span>
          </div>

          <h1 className="mb-6">
            <span className="block font-serif text-[56px] text-[#1a1a1a] leading-tight tracking-tight">
              Premium Custom & Wholesale Tableware
            </span>
            <span className="block font-serif text-[56px] text-[#8b7355] leading-tight tracking-tight mt-2">
              for Global Brands & Horeca
            </span>
          </h1>

          <p className="text-[17px] text-gray-600 leading-relaxed max-w-[640px] mx-auto mb-10">
            Professional tableware manufacturer providing OEM/ODM services, FDA and LFGB certified products with global delivery.
          </p>

          <div className="flex items-center justify-center flex-wrap gap-4 mb-12">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-7 py-3 rounded-lg text-sm font-medium no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Request Quote
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-gray-800 border border-gray-300 px-7 py-3 rounded-lg text-sm font-medium no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              View Products
            </Link>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">FDA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">LFGB Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">Global Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* 产品分类 */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#8b7355] text-sm font-semibold uppercase tracking-wider mb-3">Our Collections</p>
            <h2 className="font-serif text-[56px] text-[#1a1a1a] mb-4">Standard Collections & Custom Solutions</h2>
            <p className="text-gray-600 text-base max-w-[600px] mx-auto leading-relaxed">
              Browse our standard tableware collections, fully customizable with logos, glazes and packaging for brands, restaurants and retail stores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => {
              const linkHref = category.slug === "oem-odm"
                ? "/en/oem-odm"
                : category.slug === "all"
                  ? "/en/products"
                  : `/en/products/${category.slug}`

              return (
                <Link
                  key={category.slug}
                  href={linkHref}
                  className="no-underline block focus:outline-none focus:ring-2 focus:ring-[#8b7355] rounded-2xl"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all">
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.alt}
                          fill
                          loading="lazy"
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 工厂实力 */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#8b7355] text-sm font-semibold uppercase tracking-wider mb-3">Our Facility</p>
              <h2 className="font-serif text-4xl text-[#1a1a1a] mb-6">State-of-the-Art Manufacturing</h2>
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                Our 46,000 sqm facility combines traditional craftsmanship with modern technology, featuring 13+ production lines and a dedicated team of 340+ skilled workers.
              </p>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="font-serif text-3xl text-[#1a1a1a] mb-1">46,000</div>
                  <div className="text-gray-600 text-sm">sqm Factory</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="font-serif text-3xl text-[#1a1a1a] mb-1">340+</div>
                  <div className="text-gray-600 text-sm">Skilled Workers</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="font-serif text-3xl text-[#1a1a1a] mb-1">13+</div>
                  <div className="text-gray-600 text-sm">Production Lines</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="font-serif text-3xl text-[#1a1a1a] mb-1">98%</div>
                  <div className="text-gray-600 text-sm">Quality Rate</div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/en/factory"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
                >
                  Visit Our Factory Online
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="flex rounded-2xl overflow-hidden aspect-[3/2]">
              <div className="relative w-[60%] h-full">
                <Image
                  src="/chinese-ceraimc-manufacturer.webp"
                  alt="Ceramic factory exterior"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 60vw, 30vw"
                />
              </div>
              <div className="flex flex-col w-[40%] h-full">
                <div className="relative h-1/2">
                  <Image
                    src="/ceramic-manufacturer.webp"
                    alt="Production line"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 20vw"
                  />
                </div>
                <div className="relative h-1/2">
                  <Image
                    src="/high-quality-ceramic-manufacturer.webp"
                    alt="Quality inspection"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 20vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服务行业 */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium uppercase tracking-widest mb-4">Who We Serve</p>
            <h2 className="font-serif text-4xl md:text-[56px] text-[#1a1a1a] mb-5 leading-tight">
              Custom Ceramic Solutions <br />
              for Every Industry
            </h2>
            <p className="text-gray-400 text-base max-w-[680px] mx-auto leading-relaxed">
              From luxury hotels to cozy cafes, we deliver custom branded & wholesale ceramic tableware tailored to your brand’s unique needs, serving diverse industries worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: "Hotels & Resorts", desc: "Bulk order friendly, durable designs, custom branded options", image: "/porcelain-tableware-for-hotel-restore.webp", alt: "Tableware for hotel" },
              { title: "Restaurants", desc: "Chip-resistant dinnerware, stackable designs, custom logos", image: "/porcelain-tableware-for-restaurants.webp", alt: "Tableware for restaurant" },
              { title: "Cafes & Bistros", desc: "Custom branding, space-saving stackable tableware", image: "/coffee-cup-cafe.webp", alt: "Ceramic mugs for cafe" },
              { title: "Catering Services", desc: "Bulk serving dishes, easy-to-clean tableware", image: "/ceramic-plates-for-catering-service.webp", alt: "Tableware for catering" },
              { title: "Retail Stores", desc: "Shelf-ready displays, custom retail packaging", image: "/ceramic-retail.webp", alt: "Ceramics for retail" },
              { title: "Online Sellers", desc: "Retail-ready packaging, fast shipping", image: "/amazon-hotsell-ceramic.webp", alt: "Ceramics for e-commerce" },
              { title: "Corporate Gifts", desc: "Logo-printed ceramic gifts, bulk gifting", image: "/ceramic-gift-mug.webp", alt: "Custom ceramic gifts" },
              { title: "Home & Living", desc: "Daily use ceramic sets, custom designs", image: "/ceramic-snack-plate-for-home.webp", alt: "Ceramic homeware" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.title === "Retail Stores" || item.title === "Corporate Gifts" ? "/en/oem-odm" : "/en/products"}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-200 mt-2">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 选择我们 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium uppercase tracking-widest mb-4">Why Choose Us</p>
            <h2 className="font-serif text-[56px] text-[#1a1a1a] mb-5 leading-tight">Trusted Custom & Wholesale Ceramic Manufacturer</h2>
            <p className="text-gray-400 text-base max-w-[680px] mx-auto leading-relaxed">
              We combine decades of wholesale expertise with custom OEM/ODM solutions, delivering certified ceramic tableware for brands and hospitality worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <div className="bg-white rounded-xl p-7 border border-gray-200">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3 leading-snug">30+ Years Experience</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Decades of expertise in ceramic production, quality control, and custom manufacturing.</p>
            </div>
            <div className="bg-white rounded-xl p-7 border border-gray-200">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3 leading-snug">Certified Products</h3>
              <p className="text-gray-400 text-sm leading-relaxed">All products meet FDA, LFGB and international food safety standards, even for fully custom designs.</p>
            </div>
            <div className="bg-white rounded-xl p-7 border border-gray-200">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <Package size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3 leading-snug">Flexible MOQ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Low minimum order quantities for both wholesale orders and custom projects.</p>
            </div>
            <div className="bg-white rounded-xl p-7 border border-gray-200">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <Globe size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3 leading-snug">Global Shipping</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Reliable worldwide shipping for both bulk stock orders and custom OEM/ODM projects.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/en/oem-odm"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
            >
              Custom Service
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/en/products"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8b7355] text-[#8b7355] font-medium rounded-lg hover:bg-[#8b7355] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
            >
              View Stock Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 定制能力 */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium uppercase tracking-widest mb-4">OUR CAPABILITIES</p>
            <h2 className="font-serif text-4xl md:text-[56px] text-[#1a1a1a] mb-5 leading-tight">
              Customization Capabilities<br />
              for Your Ceramic Projects
            </h2>
            <p className="text-gray-400 text-base max-w-[720px] mx-auto leading-relaxed">
              From custom design and prototyping to mass production and packaging, we provide one-stop OEM/ODM ceramic manufacturing services.
              We specialize in custom ceramic tableware, including logo-printed, custom-color, shape development and custom packaging, with FDA/LFGB certification,
              flexible MOQ, and global shipping for small to large orders.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                title: "Logo & Brand Customization",
                subtitle: "Custom logo screen printing, embossing, debossing, laser engraving, electroplating and hand-painted branding to match your brand identity.",
                image: "/custom-ceramic-tableware-logo-branding-services.webp",
                alt: "Logo & branding customization"
              },
              {
                title: "Color & Glaze Customization",
                subtitle: "Matte, glossy, reactive, and custom glaze finishes, including FDA/LFGB-safe color options.",
                image: "/custom-color-glaze-ceramic.webp",
                alt: "Color and glaze customization"
              },
              {
                title: "Shape & Size Development",
                subtitle: "Custom mold making, 3D sampling, and unique shape design for plates, bowls, mugs, and more.",
                image: "/kiln-transformation.webp",
                alt: "Shape and size development"
              },
              {
                title: "Packaging & Labeling",
                subtitle: "Custom boxes, gift sets, hang tags, and retail-ready packaging solutions.",
                image: "/custom-ceramic-tableware-packaging-labeling-services.webp",
                alt: "Packaging and labeling"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/en/oem-odm"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
            >
              Get Custom Tableware Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 博客资讯 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-[48px] text-[#1a1a1a] mb-5 leading-tight">
              News & Blog
            </h2>
            <p className="text-gray-500 text-base max-w-[800px] mx-auto leading-relaxed">
              As a ceramic tableware manufacturer committed to sharing knowledge, we provide ceramic products information,
              industry news and wholesale guides to help our partners grow their business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Ceramic Dinnerware Wholesale Guide for Middle East Buyers", image: "/alice.webp", date: "May 15, 2026" },
              { title: "Custom Dinnerware Shape vs Glaze Customization Guide", image: "/color-glaze.webp", date: "May 10, 2026" },
              { title: "What Certifications Should Wholesale Ceramic Plates Have for Import?", image: "/kiln-transformation.webp", date: "April 28, 2026" },
              { title: "How Custom Ceramic Tableware Supports Private Dining Brands", image: "/alice.webp", date: "April 20, 2026" },
            ].map((post, index) => (
              <Link
                key={index}
                href="/en/blog"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-medium text-lg leading-snug mb-2">{post.title}</h3>
                  <p className="text-white/60 text-sm">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 联系表单 */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium uppercase tracking-[0.15em] mb-4">GET IN TOUCH</p>
            <h2 className="font-serif text-4xl italic text-[#1a1a1a] mb-4 leading-tight">Request a Quote</h2>
            <p className="text-gray-400 text-base max-w-[600px] mx-auto leading-relaxed">
              Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="font-serif text-xl text-[#1a1a1a] mb-7">Contact Information</h3>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-medium text-[#1a1a1a]">sukichoi@adaceramics.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone / WhatsApp</p>
                    <p className="text-sm font-medium text-[#1a1a1a]">+86 15919512131</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Factory Address</p>
                    <p className="text-sm font-medium text-[#1a1a1a] leading-relaxed">
                      Tangbian, Shuanggang Village, Fengtang Town<br />
                      Chao'an District, Chaozhou, Guangdong Province<br />
                      China 515646
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="home-product-category" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="home-product-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-500 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                  >
                    <option value="">Select product category</option>
                    <option value="white-porcelain">White High-temp Porcelain</option>
                    <option value="color-glaze">Color Glaze Ceramic</option>
                    <option value="kiln-change">Kiln Change Ceramic</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Estimated Quantity
                  </label>
                  <input
                    name="quantity"
                    type="text"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    placeholder="e.g., 5,000 pieces"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="details"
                  rows={4}
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-[#1a1a1a] bg-white resize-y focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                  placeholder="Please describe your requirements, including product specifications, customization needs, target price, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-md text-sm font-medium border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
