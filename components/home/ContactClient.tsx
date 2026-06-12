"use client"

import { useState, useEffect, useCallback } from "react"
import type { KeyboardEvent } from "react"
import ContactSection from "./ContactSection"
import SuccessModal from "./SuccessModal"
import { WHATSAPP_PHONE, CONTACT_API } from "./types"

type FormDataType = {
  fullName: string
  company: string
  email: string
  phone: string
  category: string
  quantity: string
  details: string
}

export default function ContactClient() {
  const [formData, setFormData] = useState<FormDataType>({
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

  // ESC 关闭弹窗 + 滚动锁定（修复CLS）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        closeModal()
      }
    }

    if (showSuccessModal) {
      document.addEventListener("keydown", handleKeyDown)
      document.documentElement.classList.add("modal-open")
    } else {
      document.documentElement.classList.remove("modal-open")
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.documentElement.classList.remove("modal-open")
    }
  }, [showSuccessModal, closeModal])

  // 优化后的提交逻辑（带超时和错误处理）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.category || !formData.details) {
      alert("Please fill in all required fields marked with *")
      return
    }

    setIsSubmitting(true)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error("Request failed")
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        alert("Request timeout, please try again")
      } else {
        alert("Submit failed, please try later")
      }
      console.error("邮件发送失败：", error)
    } finally {
      clearTimeout(timeoutId)
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <SuccessModal show={showSuccessModal} onClose={closeModal} />
      <ContactSection
        formData={formData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
    </>
  )
}
