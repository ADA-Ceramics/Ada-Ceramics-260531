import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function FactorySection() {
  return (
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
  )
}
