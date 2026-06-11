import Link from "next/link"
import Image from "next/image"

export default function IndustrySection() {
  const industryList = [
    { title: "Hotels & Resorts", desc: "Bulk order friendly, durable designs, custom branded options", image: "/porcelain-tableware-for-hotel-restore.webp", alt: "Tableware for hotel" },
    { title: "Restaurants", desc: "Chip-resistant dinnerware, stackable designs, custom logos", image: "/porcelain-tableware-for-restaurants.webp", alt: "Tableware for restaurant" },
    { title: "Cafes & Bistros", desc: "Custom branding, space-saving stackable tableware", image: "/coffee-cup-cafe.webp", alt: "Ceramic mugs for cafe" },
    { title: "Catering Services", desc: "Bulk serving dishes, easy-to-clean tableware", image: "/ceramic-plates-for-catering-service.webp", alt: "Tableware for catering" },
    { title: "Retail Stores", desc: "Shelf-ready displays, custom retail packaging", image: "/ceramic-retail.webp", alt: "Ceramics for retail" },
    { title: "Online Sellers", desc: "Retail-ready packaging, fast shipping", image: "/amazon-hotsell-ceramic.webp", alt: "Ceramics for e-commerce" },
    { title: "Corporate Gifts", desc: "Logo-printed ceramic gifts, bulk gifting", image: "/ceramic-gift-mug.webp", alt: "Custom ceramic gifts" },
    { title: "Home & Living", desc: "Daily use ceramic sets, custom designs", image: "/ceramic-snack-plate-for-home.webp", alt: "Ceramic homeware" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-medium uppercase tracking-widest mb-4">Who We Serve</p>
          <h2 className="font-serif text-4xl md:text-[56px] text-[#1a1a1a] mb-5 leading-tight">
            Custom Ceramic Solutions <br />
            for Every Industry
          </h2>
          <p className="text-gray-400 text-base max-w-[680px] mx-auto leading-relaxed">
            From luxury hotels to cozy cafes, we deliver custom branded & wholesale ceramic tableware tailored to your brand’s unique needs, serving diverse industries worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {industryList.map((item, index) => (
            <Link
              key={index}
              href={item.title === "Retail Stores" || item.title === "Corporate Gifts" ? "/en/oem-odm" : "/en/products"}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-gray-200 mt-2">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
