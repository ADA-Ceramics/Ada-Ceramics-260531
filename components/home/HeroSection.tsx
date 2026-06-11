import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Globe } from "lucide-react"

export default function HeroSection() {
  return (
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
  )
}
