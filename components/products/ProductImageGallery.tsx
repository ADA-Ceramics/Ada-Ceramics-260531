'use client'
import { useState } from 'react';
import Image from 'next/image';

type ProductImageGalleryProps = {
  images: string[];
};

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="product-image-gallery">
      <div className="main-image">
        <Image
          src={images[currentIndex]}
          alt="Product main image"
          width={800}
          height={800}
          priority
        />
      </div>
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={index === currentIndex ? 'active' : ''}
          >
            <Image src={img} alt={`Product thumbnail ${index + 1}`} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  );
}
