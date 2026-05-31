"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  main_image: string;
  category_slug: string;
}

interface ProductsClientProps {
  products: Product[];
  activeCat: string;
}

export function ProductsClient({ products, activeCat }: ProductsClientProps) {
  const pathname = usePathname()
  // 从路径中提取语言代码，默认为en
  const locale = pathname.split('/')[1] || 'en'

  const fixedCategories = [
    { slug: "all", name: "All Products" },
    { slug: "wholesale-plates", name: "Wholesale Plates" },
    { slug: "wholesale-bowls", name: "Wholesale Bowls" },
    { slug: "wholesale-dinnerware-sets", name: "Wholesale Dinnerware Sets" },
    { slug: "wholesale-cups-mugs", name: "Wholesale Cups & Mugs" },
    { slug: "wholesale-bakeware", name: "Wholesale Bakeware" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground">
            Explore our full collection of premium ceramic tableware. Factory direct wholesale worldwide.
          </p>
        </div>
      </section>
      
      {/* Products Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {fixedCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${locale}/products?cat=${cat.slug}`}
                      className={`block w-full text-left py-2 px-3 rounded hover:bg-gray-100 ${
                        activeCat === cat.slug ? "bg-gray-200 font-medium" : ""
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">No products found</div>
              ) : (
                products.map((product) => {
                  // 处理category_slug为空的情况，使用默认分类
                  const categorySlug = product.category_slug || 'wholesale-plates'
                  return (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${categorySlug}/${product.slug}`}
                    className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="w-full p-2 bg-white relative aspect-square">
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 mt-auto">
                      <h3 className="text-lg font-semibold notranslate" translate="no">{product.name}</h3>
                    </div>
                  </Link>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
