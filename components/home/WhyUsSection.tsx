import Link from "next/link"
import { ArrowRight, Award, Shield, Package, Globe } from "lucide-react"

export default function WhyUsSection() {
  return (
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
  )
}
