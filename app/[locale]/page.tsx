import { HomeClient } from "@/components/home/home-client";
import { Metadata } from "next";

// 👇 这就是你要的新 SEO 标题 + 描述
export const metadata: Metadata = {
  title: "ADA Ceramics | Wholesale Ceramic Mugs & Tableware",
  description:
    "Professional ceramic manufacturer & supplier. Wholesale high-quality ceramic mugs, dinnerware, teapots. Custom OEM/ODM available. Contact us!",
};

const fixedCategories = [
  {
    name: "Wholesale Ceramics",
    description: "Explore our complete collection of ceramic tableware for hotels, restaurants and retail.",
    image: "/wholesale-ceramics-supplier.webp",
    alt: "wholesale ceramic tableware collection for bulk order",
    slug: "all",
  },
  {
    name: "Wholesale Plates",
    description: "Durable dinner plates, soup plates and serving platters for commercial food service.",
    image: "/wholesale-plates.webp",
    alt: "wholesale ceramic plates for restaurants and hotels",
    slug: "plates",
  },
  {
    name: "Wholesale Bowls",
    description: "Versatile soup bowls, salad bowls and ramen bowls for professional kitchens.",
    image: "/wholesale-bowls.webp",
    alt: "wholesale ceramic bowls for food service industry",
    slug: "bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Complete tableware sets for hotels, B&Bs and restaurant catering services.",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "wholesale ceramic dinnerware sets for hospitality",
    slug: "dinnerware-sets",
  },
  {
    name: "Wholesale Cups & Mugs",
    description: "Premium ceramic mugs and coffee cups for cafes, offices and promotional use.",
    image: "/wholesale-cups-mugs.webp",
    alt: "wholesale ceramic cups and mugs for cafes",
    slug: "cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe baking dishes, ramekins and pie plates for commercial kitchens.",
    image: "/wholesale-bakeware.webp",
    alt: "wholesale ceramic bakeware for professional baking",
    slug: "bakeware",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
