import { HomeClient } from "@/components/home/home-client";
import { Metadata } from "next";

// 👇 这就是你要的新 SEO 标题 + 描述
export const metadata: Metadata = {
  title: "ADA Ceramics | OEM & ODM Ceramic Tableware Wholesale Factory",
  description:
    "Professional OEM/ODM ceramic tableware manufacturer. Wholesale plates, bowls, mugs and dinnerware sets for restaurants, hotels and global retailers.",
};

const fixedCategories = [
  {
    name: "Custom OEM/ODM Solutions",
    description: "Professional custom ceramic tableware tailored for global brands, restaurants and retail partners.",
    image: "/wholesale-ceramics-supplier.webp",
    alt: "Custom OEM ODM ceramic tableware manufacturing",
    slug: "oem-odm", // 
  },
  {
    name: "Wholesale Plates",
    description: "Chip-resistant dinner plates for busy restaurants and catering services.",
    image: "/wholesale-plates.webp",
    alt: "Wholesale ceramic dinner plates",
    slug: "plates",
  },
  {
    name: "Wholesale Bowls",
    description: "Versatile soup & salad bowls, food-safe for busy commercial kitchens",
    image: "/wholesale-bowls.webp",
    alt: "Wholesale ceramic soup salad bowls",
    slug: "bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Matching tableware collections for hotels and hospitality industry.",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "wholesale ceramic dinnerware sets for hospitality",
    slug: "dinnerware-sets",
  },
  {
    name: "Wholesale Cups & Mugs",
    description: "Customizable ceramic drinkware for cafes and corporate gifts.",
    image: "/wholesale-cups-mugs.webp",
    alt: "Wholesale ceramic cups and mugs",
    slug: "cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe ceramic bakeware for commercial kitchens and bakeries.",
    image: "/wholesale-bakeware.webp",
    alt: "Wholesale ceramic bakeware",
    slug: "bakeware",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
