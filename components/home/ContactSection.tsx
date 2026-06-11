import { Mail, Phone, MapPin, Send } from "lucide-react"

type FormDataType = {
  fullName: string
  company: string
  email: string
  phone: string
  category: string
  quantity: string
  details: string
}

interface ContactSectionProps {
  formData: FormDataType
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export default function ContactSection({ formData, isSubmitting, onSubmit, onChange }: ContactSectionProps) {
  return (
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

          <form onSubmit={onSubmit} noValidate>
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                onChange={onChange}
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
  )
}
