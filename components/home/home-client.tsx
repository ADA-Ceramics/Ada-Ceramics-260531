"use client"

import { useState, useEffect, useCallback } from "react"
import { Footer } from "@/components/layout/footer"
import { CategoryData, WHATSAPP_PHONE, CONTACT_API } from "./types"

// 导入所有拆分后的区块
import SuccessModal from "./SuccessModal"
import HeroSection from "./HeroSection"
import CategorySection from "./CategorySection"
import FactorySection from "./FactorySection"
import IndustrySection from "./IndustrySection"
import WhyUsSection from "./WhyUsSection"
import CustomSection from "./CustomSection"
import BlogSection from "./BlogSection"
import ContactSection from "./ContactSection"

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

  // 关闭弹窗
  const closeModal = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  // ESC 关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        closeModal()
      }
    }

    if (showSuccessModal) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [showSuccessModal, closeModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <SuccessModal show={showSuccessModal} onClose={closeModal} />

      <HeroSection />
      <CategorySection categories={categories} />
      <FactorySection />
      <IndustrySection />
      <WhyUsSection />
      <CustomSection />
      <BlogSection />

      <ContactSection
        formData={formData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />

      <Footer />
    </div>
  )
}
