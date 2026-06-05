'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

export default function ProductImageGallery({ product }) {
  const allImages = [product.main_image, ...(product.gallery_images || [])].filter(Boolean)
  const [activeImage, setActiveImage] = useState(allImages[0] || "")

  return (
    <div className="space-y-4">
      <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
        {activeImage ? (
          <Image src={activeImage} alt={product.name} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" quality={75} priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-24 h-24 text-[#d1d5db]" />
          </div>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <div key={idx} onClick={()=>setActiveImage(img)} className={`w-20 h-20 rounded overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all ${activeImage===img?'border-[#8b7355]':'border-gray-200 hover:border-gray-400'}`}>
              <Image src={img} alt={`${product.name} detail ${idx+1}`} width={80} height={80} className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
