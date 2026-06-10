"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Check, 
  Paintbrush, 
  Palette, 
  Box, 
  Truck, 
  ChevronDown,
  ClipboardCheck,
  PenTool,
  Factory,
  MessageCircle,
  ShieldCheck,
  Ship,
  CheckCircle2
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"

export function OemOdmClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // 定制服务数据 - 2x2图片卡片网格
  const customServices = [
    {
      title: "Custom Shape & Design",
      description: "Unique shapes, sizes and styles tailored to your brand",
      image: "/image/oem-odm/ceramic-custom-shape-design.webp",
      imageAlt: "Custom ceramic shape and design, 3D modeling, prototype development",
      features: ["3D modeling", "Prototype development", "Exclusive molds"]
    },
    {
      title: "Logo & Pattern Printing",
      description: "High-quality decal, screen printing and embossing",
      image: "/color-glaze.webp",
      features: ["Full-color printing", "Gold/silver accents", "Under-glaze safe"]
    },
    {
      title: "Custom Colors & Glazes",
      description: "Exclusive colors, textures and reactive glazes",
      image: "/kiln-transformation.webp",
      features: ["Pantone matching", "Matte/glossy finish", "Reactive glazes"]
    },
    {
      title: "Private Label Packaging",
      description: "Complete branding with custom packaging solutions",
      image: "/alice.webp",
      features: ["Gift boxes", "Retail packaging", "Bulk cartons"]
    }
  ]

  // 轻定制流程数据（已补充imageAlt）
  const lightCustomSteps = [
    {
      step: 1,
      title: "Browse & Select",
      description: "Browse our catalog and select your preferred ceramic tableware shapes and styles.",
      image: "/color-glaze.webp",
      imageAlt: "Browse ADA Ceramics catalog to select ceramic tableware shapes and styles"
    },
    {
      step: 2,
      title: "Share Requirements",
      description: "Share product model numbers, custom logo files, packaging needs or modification ideas with our sales team.",
      image: "/image/oem-odm/custom-ceramic-cup-saucer.webp",
      imageAlt: "Share custom ceramic tableware requirements with ADA Ceramics sales team"
    },
    {
      step: 3,
      title: "Confirm Plan",
      description: "We review your request and finalize the customization plan with you.",
      image: "/image/oem-odm/oem-odm-custom-ceramic-coffee-cup-with-logo-design.webp",
      imageAlt: "Confirm custom ceramic tableware plan with ADA Ceramics"
    },
    {
      step: 4,
      title: "Create Samples",
      description: "We create custom samples based on your light customization plan.",
      image: "/image/oem-odm/creat-sample.webp",
      imageAlt: "ADA Ceramics creating custom ceramic tableware samples"
    },
    {
      step: 5,
      title: "Approve Samples",
      description: "You review and approve the samples to confirm all details.",
      image: "/image/oem-odm/approve-samples.webp",
      imageAlt: "Review and approve custom ceramic tableware samples"
    },
    {
      step: 6,
      title: "Mass Production",
      description: "After sample approval, we proceed with mass production for your custom order.",
      image: "/image/oem-odm/mass-production.webp",
      imageAlt: "ADA Ceramics mass production of custom ceramic tableware"
    }
  ]

  // 定制流程数据
  const processSteps = [
    { step: 1, icon: ClipboardCheck, title: "Inquiry", description: "Share your requirements" },
    { step: 2, icon: PenTool, title: "Design", description: "We create samples" },
    { step: 3, icon: CheckCircle2, title: "Confirm", description: "Approve the samples" },
    { step: 4, icon: Factory, title: "Production", description: "Mass manufacturing" },
    { step: 5, icon: ShieldCheck, title: "QC Check", description: "Quality inspection" },
    { step: 6, icon: Ship, title: "Delivery", description: "Ship to your door" }
  ]

  // 工厂优势数据
  const factoryAdvantages = [
    "30+ years of ceramic manufacturing experience",
    "FDA, LFGB, CA65 certified production facility",
    "In-house design team with 3D modeling capability",
    "Flexible MOQ starting from 500 pieces",
    "Strict quality control with AQL 2.5 standard",
    "On-time delivery rate over 98%",
    "Dedicated account manager for each client",
    "Free sample development for qualified orders"
  ]

  // FAQ数据
  const faqData = [
    {
      question: "What is your minimum order quantity (MOQ)?",
      answer: "Our standard MOQ is 500 pieces per design for stock items. For fully custom designs, MOQ starts from 1,000 pieces. We offer flexible arrangements for trial orders."
    },
    {
      question: "How long does sample development take?",
      answer: "Standard samples take 7-10 business days. Custom mold samples require 15-20 days. We provide free samples for orders over $5,000 (shipping excluded)."
    },
    {
      question: "What certifications do your products have?",
      answer: "All our products are FDA, LFGB, and CA Prop 65 compliant. We can provide test reports from SGS, Intertek, or Bureau Veritas upon request."
    },
    {
      question: "Can you match Pantone colors for custom glazes?",
      answer: "Yes, we can match most Pantone colors. Please note that ceramic glazing may have slight variations due to the firing process. We always send color samples for approval first."
    },
    {
      question: "What are your payment terms?",
      answer: "We accept T/T, L/C, and PayPal. Standard terms are 30% deposit with order confirmation, 70% balance before shipment. Alibaba Trade Assurance is also available."
    },
    {
      question: "How do you handle quality issues?",
      answer: "We conduct 100% inspection before shipment. If defects are found upon delivery, we offer replacement or refund based on documented evidence. Our defect rate is consistently below 1%."
    }
  ]

  // 案例展示图片
  const showcaseImages = [
    { src: "/alice.webp", alt: "Custom ceramic dinnerware set for hotel chain" },
    { src: "/color-glaze.webp", alt: "Branded coffee mugs for corporate client" },
    { src: "/kiln-transformation.webp", alt: "Private label ceramic bowls for retail" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* 1. 顶部导航栏 - 沿用现有 */}
      <Header />
      
      {/* 2. 首屏横幅 - 简洁背景色风格 */}
      <section className="bg-[#f5f5f0] pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题和描述 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1a1a2e] mb-6 leading-tight">
            OEM & ODM Custom Solution<br />
            | Reliable One-Stop Custom Ceramic Tableware Manufacturer
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl leading-relaxed">
            ADA Ceramics are a professional ceramic factory specializing in OEM and ODM manufacturing for ceramic tableware. 
            As a reliable daily ceramic tableware supplier with 30+ years production experience, we provide full custom services
            including shape design, pattern printing, Pantone glaze matching and custom export packaging.
            All custom dinnerware passes FDA, LFGB and CA65 certification, with flexible MOQ starting from 500pcs and on-time worldwide shipment.
          </p>
          
          {/* 新增：三个标签（移到这里） */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-[#8b7355]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-medium">FDA Certified</span>
            </div>
            <div className="flex items-center gap-2 text-[#8b7355]">
              <Factory className="w-5 h-5" />
              <span className="font-medium">Own Factory</span>
            </div>
            <div className="flex items-center gap-2 text-[#8b7355]">
              <Truck className="w-5 h-5" />
              <span className="font-medium">Global Shipping</span>
            </div>
          </div>
          
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact?type=sample"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#8b7355] rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg"
            >
              Get Free Samples
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-[#8b7355] border-2 border-[#8b7355] rounded-lg hover:bg-[#8b7355] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 轻定制流程板块 - 已改为横向带图片的6步流程（已删除连接线） */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 板块标题与介绍 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              Light Customization · Simple Personalized Ceramic Tableware Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              We offer flexible light customization services with no mold fees, lower MOQs, and faster lead times. These solutions are ideal for personalized upgrades based on our existing mature shapes, including custom logo printing, branded packaging, and minor appearance modifications.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The light customization process is simple and straightforward:
            </p>
          </div>

          {/* 横向流程展示 - 桌面端（已删除连接线） */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="grid grid-cols-6 gap-4">
                {lightCustomSteps.map((step) => (
                  <div key={step.step} className="relative text-center">
                    {/* 图片区域 */}
                    <div className="relative z-10 aspect-square mb-4 rounded-xl overflow-hidden shadow-md mx-auto w-full max-w-40">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-cover"
                      />
                      {/* 步骤号 */}
                      <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#8b7355] text-white text-lg font-bold flex items-center justify-center shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 垂直列表 - 移动端 */}
          <div className="lg:hidden space-y-8">
            {lightCustomSteps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-64 mb-4 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#8b7355] text-white text-lg font-bold flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* 按钮 - 保留原按钮Tell Us Your Needs及交互逻辑 */}
          <div className="mt-16 text-center">
            <Link
              href="/contact?type=inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg"
            >
              Tell Us Your Needs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 定制服务板块 - 2x2图片卡片网格 */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              Our Customization Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple logo printing to complete product development — see what we can create for your brand.
            </p>
          </div>
          
          {/* 2x2 图片网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {customServices.map((service, index) => (
              <div 
                key={service.title}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* 图片区域 */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 序号标签 */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#8b7355] flex items-center justify-center text-white font-semibold text-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* 内容区域 */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-semibold text-[#1a1a2e] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* 特点标签 */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span 
                        key={feature}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8b7355]/10 text-[#8b7355] text-sm rounded-full"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 底部按钮组 */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/en/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8b7355] text-lg font-medium rounded-lg border-2 border-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors"
            >
              View Our Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?type=custom"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white text-lg font-medium rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg"
            >
              Start Your Custom Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 定制流程板块 - 横向时间轴 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures smooth collaboration from initial inquiry to final delivery.
            </p>
          </div>
          
          {/* 横向时间轴 - 桌面端 */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* 连接线 */}
              <div className="absolute top-12 left-[8%] right-[8%] h-0.5 bg-[#8b7355]/20" />
              
              <div className="grid grid-cols-6 gap-4">
                {processSteps.map((step) => {
                  const IconComponent = step.icon
                  return (
                    <div key={step.step} className="relative text-center">
                      {/* 圆形图标 */}
                      <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full bg-white border-2 border-[#8b7355] flex items-center justify-center shadow-sm">
                        <IconComponent className="w-10 h-10 text-[#8b7355]" strokeWidth={1.5} />
                        {/* 步骤号 */}
                        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#8b7355] text-white text-sm font-bold flex items-center justify-center">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* 垂直列表 - 移动端 */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step) => {
              const IconComponent = step.icon
              return (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#8b7355]/10 flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#8b7355] text-white text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                      <h3 className="text-lg font-semibold text-[#1a1a2e]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Talk To Our Experts 按钮 */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                const message = "Hi, I'm interested in your OEM/ODM ceramic customization services. Could you tell me more about the process and pricing?";
                window.open(
                  `https://wa.me/8615919512131?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white text-lg font-medium rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Talk To Our Experts
            </button>
          </div>
        </div>
      </section>

      {/* 6. 案例展示区 - 三列图片画廊 */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              Our Custom Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we&apos;ve helped brands worldwide create their perfect ceramic tableware.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseImages.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
          
          {/* Explore All Wholesale Tableware 按钮 */}
          <div className="mt-12 text-center">
            <Link
              href="/en/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white text-lg font-medium rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg"
            >
              Explore All Wholesale Tableware
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 工厂优势板块 - 左右分栏 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左侧图片 */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/kiln-transformation.webp"
                alt="ADA Ceramics factory - modern ceramic production facility"
                fill
                className="object-cover"
              />
            </div>
            
            {/* 右侧优势列表 */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-8">
                Why Choose ADA Ceramics?
              </h2>
              <ul className="space-y-4">
                {factoryAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#8b7355] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-[#1a1a2e]">{advantage}</span>
                  </li>
                ))}
              </ul>
              
              {/* Tell Us Your Idea 按钮 */}
              <div className="mt-8">
                <Link
                  href="/contact?type=inquiry"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white font-medium rounded-lg hover:bg-[#6d5a43] transition-colors"
                >
                  Tell Us Your Idea
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 常见问答区 - 折叠面板 */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our OEM/ODM services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-lg font-medium text-[#1a1a2e] hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8b7355] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. 转化引导区 - Get In Touch 表单 */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a2e] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your custom ceramic tableware needs. Our team will respond within 24 hours.
            </p>
          </div>
          
          {/* 联系表单 */}
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const name = formData.get('name') as string
              const email = formData.get('email') as string
              const company = formData.get('company') as string
              const message = formData.get('message') as string
              
              // 构建 WhatsApp 消息
              const whatsappMessage = `Hi, I'm ${name} from ${company || 'N/A'}.\n\nEmail: ${email}\n\nMessage: ${message}`
              window.open(
                `https://wa.me/8615919512131?text=${encodeURIComponent(whatsappMessage)}`,
                "_blank"
              )
            }}
            className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="cta-name"
                  name="name"
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="cta-email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            {/* Company */}
            <div className="mb-6">
              <label htmlFor="cta-company" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="cta-company"
                name="company"
                placeholder="Your Company Ltd."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            {/* Message */}
            <div className="mb-8">
              <label htmlFor="cta-message" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                Your Message *
              </label>
              <textarea
                id="cta-message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your custom ceramic tableware requirements, quantity, design ideas..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-[#8b7355] text-white text-lg font-medium rounded-lg hover:bg-[#6d5a43] transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              Submit Inquiry
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* 10. 页脚区域 - 沿用现有 */}
      <Footer />
    </div>
  )
}
