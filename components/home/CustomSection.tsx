import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CustomSection() {
  const customList = [
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
  ]

  return (
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
          {customList.map((item, index) => (
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
  )
}
