{/* Product Image */}
<div className="space-y-4">
  <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
    {product.main_image ? (
      <Image
        src={product.main_image}
        alt={product.name}
        fill
        className="object-cover"
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

  {/* 细节缩略图 补充SEO友好alt */}
  {allImages.length > 1 && (
    <div className="flex gap-3 overflow-x-auto py-1">
      {allImages.map((img, idx) => (
        <div
          key={idx}
          className="w-20 h-20 rounded overflow-hidden border border-gray-200 flex-shrink-0"
        >
          <Image
            src={img}
            alt={`${product.name} detail picture ${idx + 1}, wholesale ceramic tableware`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  )}
</div>
