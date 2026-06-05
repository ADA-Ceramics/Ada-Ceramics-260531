'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

// 放在产品详情页面图片区块，product来自supabase查询数据，gallery_images为产品表数组字段
const ProductImageBlock = ({ product }) => {
  // 合并主图+细节图库，默认选中主图
  const allImgList = [product.main_image, ...(product.gallery_images || [])].filter(Boolean)
  const [activeImg, setActiveImg] = useState(allImgList[0] || '')

  return (
    <div className="space-y-4">
      {/* 主图展示区 */}
      <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
        {activeImg ? (
          <Image
            src={activeImg}
            alt={product.name || 'product'}
            fill
            className="object-cover transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-24 h-24 text-[#d1d5db]" />
          </div>
        )}
      </div>

      {/* 下方细节缩略图 */}
      {allImgList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImgList.map((imgSrc, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImg(imgSrc)}
              className={`w-20 h-20 rounded overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all
                ${activeImg === imgSrc ? 'border-blue-500' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <Image
                src={imgSrc}
                alt={`detail-${idx}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageBlock
