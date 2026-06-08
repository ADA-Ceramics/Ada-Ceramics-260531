import { HomeClient } from "@/components/home/home-client";
import { Metadata } from "next";

// 👇 这就是你要的新 SEO 标题 + 描述
export const metadata: Metadata = {
  title: "ADA Ceramics | Custom Ceramic Tableware Manufacturing | OEM/ODM Factory Direct",
  description:
    "From concept to finished goods, we create custom ceramic tableware for brands, restaurants, and retailers worldwide!",
};

const fixedCategories = [
  {
    name: "Custom OEM/ODM Solutions",
    description: "From concept to finished goods, we create fully custom ceramic tableware for brands, restaurants, and retailers worldwide.",
    image: "/wholesale-ceramics-supplier.webp",
    alt: "Custom OEM ODM ceramic tableware manufacturing for brands, restaurants, and retailers",
    slug: "oem-odm", // 
  },
  {
    name: "Wholesale Plates",
    description: "Chip-resistant dinner plates for busy restaurants and catering services.",
    image: "/wholesale-plates.webp",
    alt: "wholesale ceramic plates for busy restaurants and catering",
    slug: "plates",
  },
  {
    name: "Wholesale Bowls",
    description: "Versatile soup & salad bowls, food-safe for busy commercial kitchens.",
    image: "/wholesale-bowls.webp",
    alt: "versatile ceramic soup bowls for busy commercial kitchens",
    slug: "bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Coordinated hotel & restaurant tableware collections for hospitality.",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "wholesale ceramic dinnerware sets for hospitality",
    slug: "dinnerware-sets",
  },
  {
    name: "Wholesale Cups & Mugs",
    description: "Branded-ready ceramic drinkware for cafes and corporate gifting.",
    image: "/wholesale-cups-mugs.webp",
    alt: "wholesale ceramic cups and mugs for cafes",
    slug: "cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe ceramic baking tools for commercial kitchens and bakeries.",
    image: "/wholesale-bakeware.webp",
    alt: "wholesale ceramic bakeware for commercial bakeries",
    slug: "bakeware",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
