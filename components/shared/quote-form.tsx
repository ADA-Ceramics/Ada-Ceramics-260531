"use client"

import { useRef, useState } from "react"
import { Send, Mail, Phone, MapPin, Clock, Check, Paperclip, X } from "lucide-react"
import {
  ATTACHMENT_ACCEPT,
  ATTACHMENT_HINT,
  mergeFilesWithinLimit,
  readFileAsBase64,
} from "@/lib/attachments"

interface QuoteFormProps {
  variant?: "full" | "compact"
  className?: string
}

export function QuoteForm({ variant = "full", className = "" }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : []
    if (selected.length === 0) return
    const next = mergeFilesWithinLimit(files, selected)
    if (!next) {
      alert("Total attachment size cannot exceed 10MB.")
      return
    }
    setFiles(next)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const attachments = await Promise.all(files.map(readFileAsBase64))
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          details: formData.message,
          attachments,
        }),
      })
    } catch {
      // 静默处理错误
    }

    setIsSubmitting(false)
    setShowSuccessModal(true)

    // 2秒后跳转WhatsApp
    setTimeout(() => {
      const whatsappMessage = `Hi, I'm ${formData.fullName} from ${formData.company}. 
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`;
      
      window.open(
        `https://wa.me/8615919512131?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
      );
      setShowSuccessModal(false)
      // 重置表单
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      })
      setFiles([])
    }, 2000)
  }

  const attachmentField = (
    <div className="mb-5">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFilesSelected}
        className="hidden"
        accept={ATTACHMENT_ACCEPT}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#d1d5db] rounded-md text-sm font-medium text-[#6b7280] bg-white hover:border-[#8b7355] hover:text-[#8b7355] transition-colors"
      >
        <Paperclip className="w-4 h-4" />
        Add Attachment
      </button>
      <p className="text-xs text-[#9ca3af] mt-2">{ATTACHMENT_HINT}</p>

      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-md"
            >
              <span className="text-sm text-[#1a1a1a] truncate">
                {file.name}
                <span className="text-xs text-[#9ca3af] ml-2">{(file.size / 1024).toFixed(0)} KB</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-[#9ca3af] hover:text-red-500 transition-colors flex-shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  if (variant === "compact") {
    return (
      <div className={`bg-[#f9fafb] rounded-xl ${className}`}>
        {/* 成功提示弹窗 */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
              <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
            </div>
          </div>
        )}
        <div className="px-6 py-10 md:px-10 md:py-12">
          <div className="text-center mb-10">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              GET IN TOUCH
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#1a1a1a] mb-3">
              Request a Quote
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-serif text-lg font-normal text-[#1a1a1a] mb-6">
                  Contact Information
                </h3>

                <div className="flex flex-col gap-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                      <Mail className="w-4 h-4 text-[#6b7280]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9ca3af] mb-1">Email</p>
                      <p className="text-sm font-medium text-[#1a1a1a]">sukichoi@adaceramics.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                      <Phone className="w-4 h-4 text-[#6b7280]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9ca3af] mb-1">Phone</p>
                      <p className="text-sm font-medium text-[#1a1a1a]">+86 15919512131</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                      <MapPin className="w-4 h-4 text-[#6b7280]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9ca3af] mb-1">Address</p>
                      <p className="text-sm font-medium text-[#1a1a1a] leading-relaxed">
                        Tangbian, Shuanggang Village<br />
  Fengtang Town, Chao'an District<br />
  Chaozhou, Guangdong Province, China 515646
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f3f4f6] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#6b7280]" />
                    <h4 className="text-sm font-semibold text-[#1a1a1a]">Business Hours</h4>
                  </div>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    Monday to Friday<br />
                    9:00 AM - 6:00 PM (GMT+8)
                  </p>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      How Can We Help? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                      placeholder="Tell us your requirements..."
                    />
                  </div>

                  {attachmentField}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1f2937] text-white py-3 rounded-md text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }

  return (
    <section id="contact" className={`py-20 bg-white ${className}`}>
      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
          </div>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-medium mb-4 tracking-[0.15em] uppercase">
            GET IN TOUCH
          </p>
          <h2 className="font-serif text-[42px] font-normal italic text-[#1a1a1a] mb-4 leading-tight">
            Request a Quote
          </h2>
          <p className="text-[#9ca3af] text-base max-w-[600px] mx-auto leading-relaxed">
            Let us know your requirements, and we’ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="font-serif text-[22px] font-normal text-[#1a1a1a] mb-7">
              Contact Information
            </h3>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f9fafb] rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                  <Mail className="w-[18px] h-[18px] text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#9ca3af] mb-1">Email</p>
                  <p className="text-[15px] font-medium text-[#1a1a1a]">sukichoi@adaceramics.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f9fafb] rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                  <Phone className="w-[18px] h-[18px] text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#9ca3af] mb-1">Phone</p>
                  <p className="text-[15px] font-medium text-[#1a1a1a]">+86 15919512131</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f9fafb] rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                  <MapPin className="w-[18px] h-[18px] text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#9ca3af] mb-1">Address</p>
                  <p className="text-[15px] font-medium text-[#1a1a1a] leading-relaxed">
                    Tangbian, Shuanggang Village<br />
  Fengtang Town, Chao'an District<br />
  Chaozhou, Guangdong Province, China 515646
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f3f4f6] rounded-lg px-6 py-5">
              <h4 className="text-[15px] font-semibold text-[#1a1a1a] mb-2">Business Hours</h4>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Monday to Friday<br />
                9:00 AM - 6:00 PM (GMT+8)
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white"
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Your Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white resize-vertical"
                    placeholder="Tell us about your product, quantity, design..."
                  />
                </div>

                {attachmentField}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#1f2937] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}
