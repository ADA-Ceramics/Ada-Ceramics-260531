"use client"

import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Check, Paperclip, X } from "lucide-react"

interface HomeQuoteFormProps {
  locale?: string
}

const MAX_TOTAL_SIZE = 10 * 1024 * 1024 // 10MB 附件上限

function readFileAsBase64(file: File): Promise<{ filename: string; content: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ filename: file.name, content: String(reader.result) })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function HomeQuoteForm({ locale }: HomeQuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    details: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : []
    if (selected.length === 0) return
    const next = [...files, ...selected]
    const total = next.reduce((sum, f) => sum + f.size, 0)
    if (total > MAX_TOTAL_SIZE) {
      alert("Total attachment size cannot exceed 10MB.")
      return
    }
    setFiles(next)
    // 允许再次选择相同文件
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

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, attachments }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setShowSuccessModal(true)

        setTimeout(() => {
          const whatsappMessage = `Hi, I'm ${formData.fullName} from ${formData.company}. 
Email: ${formData.email}
Phone: ${formData.phone}
Product Category: ${formData.category}
Quantity: ${formData.quantity}
Details: ${formData.details}`

          window.open(
            `https://wa.me/8615919512131?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
          )
          setShowSuccessModal(false)
        }, 2000)
      } else {
        console.error("提交失败", data)
        alert("Failed to send message: " + (data.error || "Please try again"))
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      alert("Network error, please try again later")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="request-a-quote" className="py-20 bg-white">
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
        <div className="text-center mb-14">
          <p className="text-[#8b7355] text-xs font-medium mb-4 tracking-[0.15em] uppercase">
            GET IN TOUCH
          </p>
          <h2 className="font-serif text-3xl md:text-[42px] font-normal italic text-[#1a1a1a] mb-4 leading-tight">
            Request a Quote
          </h2>
          <p className="text-[#9ca3af] text-base max-w-[600px] mx-auto leading-relaxed text-pretty">
            Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 左侧联系信息 */}
          <div>
            <h3 className="font-serif text-[22px] font-normal text-[#1a1a1a] mb-7">
              Contact Information
            </h3>

            <div className="flex flex-col gap-6">
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
                  <p className="text-[13px] text-[#9ca3af] mb-1">Phone / WhatsApp</p>
                  <p className="text-[15px] font-medium text-[#1a1a1a]">+86 15919512131</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f9fafb] rounded-full flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                  <MapPin className="w-[18px] h-[18px] text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#9ca3af] mb-1">Factory Address</p>
                  <p className="text-[15px] font-medium text-[#1a1a1a] leading-relaxed">
                    Tangbian, Shuanggang Village, Fengtang Town<br />
                    Chao&apos;an District, Chaozhou, Guangdong Province<br />
                    China 515646
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧表单 */}
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
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
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
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
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
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                  >
                    <option value="">Select product category</option>
                    <option value="Dinnerware">Dinnerware</option>
                    <option value="Plates">Plates</option>
                    <option value="Bowls">Bowls</option>
                    <option value="Dinnerware Sets">Dinnerware Sets</option>
                    <option value="Cups & Mugs">Cups &amp; Mugs</option>
                    <option value="Bakeware">Bakeware</option>
                    <option value="OEM Custom">OEM Custom Ceramics</option>
                    <option value="Other">Other Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                    placeholder="e.g. 5,000 pieces"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-md text-sm text-[#1a1a1a] bg-white resize-vertical focus:outline-none focus:ring-2 focus:ring-[#8b7355]/20 focus:border-[#8b7355]"
                  placeholder="Please describe your requirements, including product specifications, customization needs, target price, etc."
                />
              </div>

              {/* 附件上传 */}
              <div className="mb-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ai,.zip"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#d1d5db] rounded-md text-sm font-medium text-[#6b7280] bg-white hover:border-[#8b7355] hover:text-[#8b7355] transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                  Add Attachment
                </button>
                <p className="text-xs text-[#9ca3af] mt-2">
                  Optional. Images, PDF, Word, Excel, AI, ZIP. Max 10MB total.
                </p>

                {files.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {files.map((file, index) => (
                      <li
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-md"
                      >
                        <span className="text-sm text-[#1a1a1a] truncate">
                          {file.name}
                          <span className="text-xs text-[#9ca3af] ml-2">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-[#1f2937] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
